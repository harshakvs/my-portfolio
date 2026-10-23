"""Cross-post newly published blog posts to X and Substack.

Two steps, run by .github/workflows/crosspost.yml (and runnable locally):

  prepare  Find posts that became `status: published` in a push, have Claude
           draft an X thread for each, and write one JSON file per post.
  publish  Wait for the post to be live on the site, post the thread to X,
           create a Substack draft, and record both in posted.json so a post
           is never cross-posted twice.

Local preview of a thread (needs ANTHROPIC_API_KEY):
  python scripts/crosspost/crosspost.py prepare --slug my-post --out /tmp/xp
"""

import argparse
import json
import os
import pathlib
import subprocess
import sys
import time
import urllib.error
import urllib.request

import yaml

ROOT = pathlib.Path(__file__).resolve().parents[2]
BLOG_DIR = ROOT / "src" / "content" / "blog"
POSTED_FILE = pathlib.Path(__file__).resolve().parent / "posted.json"
SITE_URL = "https://harshakvs.github.io/my-portfolio"

MODEL = "claude-opus-5-5"
TWEET_LIMIT = 280
URL_WEIGHT = 23  # X counts every link as 23 characters, whatever its length

THREAD_SYSTEM = """You turn a technical blog post into an X thread for its author, \
Sreeharsha Kotta, an ML engineer who ships production AI systems.

Voice: first person, plain and specific, like an engineer explaining their work to peers. \
Lead with the most interesting result or insight from the post as the hook. \
Each tweet should stand on its own and carry one idea; use concrete numbers from the post. \
No hashtags, no emoji, no "🧵" or "1/" numbering, no hype words like "game-changer". \
Use only facts stated in the post; never invent numbers, tools, or claims.

Write 3 to 6 tweets. Each tweet must be at most 270 characters. \
The last tweet should invite people to read the full post; do not include any URL, \
it is appended automatically."""

THREAD_SCHEMA = {
    "type": "object",
    "properties": {
        "tweets": {
            "type": "array",
            "items": {"type": "string"},
            "minItems": 3,
            "maxItems": 6,
        }
    },
    "required": ["tweets"],
    "additionalProperties": False,
}


# ---------- posts ----------

def read_post(path: pathlib.Path) -> dict:
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        raise ValueError(f"{path.name}: missing frontmatter")
    _, fm, body = text.split("---", 2)
    meta = yaml.safe_load(fm) or {}
    slug = path.stem
    return {
        "slug": slug,
        "title": meta["title"],
        "description": meta.get("description", ""),
        "tags": meta.get("tags", []),
        "status": meta.get("status", "coming-soon"),
        "crosspost": meta.get("crosspost", True),
        "body": body.strip(),
        "url": f"{SITE_URL}/blog/{slug}/",
    }


def status_at(rev: str, path: pathlib.Path) -> str | None:
    """Frontmatter status of a post at a git revision, or None if it didn't exist."""
    rel = path.relative_to(ROOT).as_posix()
    shown = subprocess.run(["git", "show", f"{rev}:{rel}"], cwd=ROOT,
                           capture_output=True, text=True)
    if shown.returncode != 0:
        return None
    try:
        return (yaml.safe_load(shown.stdout.split("---", 2)[1]) or {}).get("status")
    except (IndexError, yaml.YAMLError):
        return None


def newly_published(before: str, after: str) -> list[pathlib.Path]:
    """Posts whose status is `published` at `after` but wasn't at `before`."""
    first_push = not before or set(before) == {"0"}
    changed = subprocess.run(
        ["git", "diff", "--name-only", f"{before}..{after}", "--", "src/content/blog"]
        if not first_push else ["git", "ls-files", "src/content/blog"],
        cwd=ROOT, capture_output=True, text=True, check=True,
    ).stdout.split()
    paths = [ROOT / p for p in changed if p.endswith(".md") and (ROOT / p).exists()]
    return [p for p in paths
            if read_post(p)["status"] == "published"
            and (first_push or status_at(before, p) != "published")]


def load_posted() -> dict:
    return json.loads(POSTED_FILE.read_text()) if POSTED_FILE.exists() else {}


# ---------- X thread ----------

def draft_thread(post: dict) -> list[str]:
    import anthropic

    client = anthropic.Anthropic()
    messages = [{"role": "user", "content":
                 f"Title: {post['title']}\nSummary: {post['description']}\n\n{post['body']}"}]

    for attempt in range(2):
        response = client.messages.create(
            model=MODEL,
            max_tokens=16000,
            system=THREAD_SYSTEM,
            messages=messages,
            output_config={"effort": "medium",
                           "format": {"type": "json_schema", "schema": THREAD_SCHEMA}},
            # On a safety decline, rerun on Anthropic's recommended fallback model.
            extra_headers={"anthropic-beta": "server-side-fallback-2026-07-01"},
            extra_body={"fallbacks": "default"},
        )
        if response.stop_reason == "refusal":
            raise RuntimeError(f"Claude declined to draft a thread for {post['slug']}")
        if response.stop_reason == "max_tokens":
            raise RuntimeError("Thread draft was cut off (max_tokens)")
        text = next(b.text for b in response.content if b.type == "text")
        tweets = [t.strip() for t in json.loads(text)["tweets"]]
        tweets[-1] = f"{tweets[-1]}\n\n{post['url']}"

        too_long = [i + 1 for i, t in enumerate(tweets)
                    if len(t.replace(post["url"], "x" * URL_WEIGHT)) > TWEET_LIMIT]
        if not too_long:
            return tweets
        messages += [
            {"role": "assistant", "content": text},
            {"role": "user", "content":
             f"Tweets {too_long} are over the limit. Shorten them so each is under 270 characters."},
        ]
    raise RuntimeError(f"Could not fit the thread for {post['slug']} into X's limit")


# ---------- steps ----------

def prepare(args) -> None:
    posted = load_posted()
    if args.slug:
        paths = [BLOG_DIR / f"{args.slug}.md"]
    else:
        paths = newly_published(args.before, args.after)

    out = pathlib.Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    summary = []
    for path in paths:
        post = read_post(path)
        if not post["crosspost"] or (post["slug"] in posted and not args.slug):
            print(f"skip {post['slug']} (crosspost off or already posted)")
            continue
        if post["status"] != "published":
            print(f"skip {post['slug']} (status is {post['status']})")
            continue
        post["tweets"] = draft_thread(post)
        (out / f"{post['slug']}.json").write_text(json.dumps(post, indent=2))
        summary.append(f"### {post['title']}\n{post['url']}\n\n"
                       + "\n\n".join(f"> {t}".replace("\n", "\n> ") for t in post["tweets"]))
        print(f"prepared {post['slug']}: {len(post['tweets'])} tweets")

    has_posts = "true" if summary else "false"
    if gh_out := os.environ.get("GITHUB_OUTPUT"):
        with open(gh_out, "a") as f:
            f.write(f"has_posts={has_posts}\n")
    report = ("## X threads waiting for approval\n\n" + "\n\n---\n\n".join(summary)
              if summary else "No newly published posts to cross-post.")
    if gh_summary := os.environ.get("GITHUB_STEP_SUMMARY"):
        with open(gh_summary, "a") as f:
            f.write(report + "\n")
    else:
        print("\n" + report)


def wait_until_live(url: str, timeout_s: int = 600) -> None:
    deadline = time.time() + timeout_s
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(url, timeout=15) as r:
                if r.status == 200:
                    return
        except urllib.error.URLError:
            pass
        time.sleep(15)
    raise RuntimeError(f"{url} was not live after {timeout_s}s; is the deploy finished?")


def post_to_x(tweets: list[str]) -> str:
    import tweepy

    client = tweepy.Client(
        consumer_key=os.environ["X_API_KEY"],
        consumer_secret=os.environ["X_API_SECRET"],
        access_token=os.environ["X_ACCESS_TOKEN"],
        access_token_secret=os.environ["X_ACCESS_TOKEN_SECRET"],
    )
    first_id = reply_to = None
    for tweet in tweets:
        resp = client.create_tweet(text=tweet, in_reply_to_tweet_id=reply_to)
        reply_to = resp.data["id"]
        first_id = first_id or reply_to
    return first_id


def substack_draft(post: dict) -> int:
    from substack import Api

    api = Api(cookies_string=os.environ["SUBSTACK_COOKIES"],
              publication_url=os.environ["SUBSTACK_PUBLICATION_URL"])
    markdown = (f"*Originally published on [my site]({post['url']}).*\n\n{post['body']}")
    result = api.create_draft_from_markdown(
        title=post["title"], subtitle=post["description"], markdown=markdown,
        tags=post["tags"] or None,
    )
    return result["draft"]["id"]


def publish(args) -> None:
    posted = load_posted()
    failures = []
    for path in sorted(pathlib.Path(args.input).glob("*.json")):
        post = json.loads(path.read_text())
        record = posted.setdefault(post["slug"], {})
        wait_until_live(post["url"])

        if "x_thread" in record:
            print(f"{post['slug']}: already on X")
        elif os.environ.get("X_API_KEY"):
            try:
                first = post_to_x(post["tweets"])
                record["x_thread"] = f"https://x.com/i/status/{first}"
                print(f"{post['slug']}: posted to X {record['x_thread']}")
            except Exception as e:  # keep going so Substack still gets its draft
                failures.append(f"X ({post['slug']}): {e}")
        else:
            print("X secrets not set; skipping X")

        if "substack_draft" in record:
            print(f"{post['slug']}: Substack draft already exists")
        elif os.environ.get("SUBSTACK_COOKIES"):
            try:
                record["substack_draft"] = substack_draft(post)
                print(f"{post['slug']}: Substack draft {record['substack_draft']}")
            except Exception as e:
                failures.append(f"Substack ({post['slug']}): {e}")
        else:
            print("Substack secrets not set; skipping Substack")

        if not record:
            posted.pop(post["slug"])
        POSTED_FILE.write_text(json.dumps(posted, indent=2) + "\n")

    if failures:
        sys.exit("Cross-post failures:\n  " + "\n  ".join(failures))


def main() -> None:
    parser = argparse.ArgumentParser()
    sub = parser.add_subparsers(dest="cmd", required=True)
    p = sub.add_parser("prepare")
    p.add_argument("--before", default="")
    p.add_argument("--after", default="HEAD")
    p.add_argument("--slug", default="", help="cross-post this post regardless of the diff")
    p.add_argument("--out", required=True)
    q = sub.add_parser("publish")
    q.add_argument("--input", required=True)
    args = parser.parse_args()
    prepare(args) if args.cmd == "prepare" else publish(args)


if __name__ == "__main__":
    main()
