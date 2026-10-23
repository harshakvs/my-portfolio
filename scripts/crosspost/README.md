# Cross-posting to X and Substack

Publishing a post on the site also drafts an X thread and a Substack post. Nothing goes out until you approve it in GitHub.

## Writing flow

```bash
npm run new-post -- "Cutting inference latency from 7s to 2s"   # creates a draft
npm run dev                                                      # preview at localhost:4321/my-portfolio/blog/<slug>/
```

When it's ready, change `status: 'coming-soon'` to `status: 'published'` and push to `main`. Then:

1. **Deploy to GitHub Pages** publishes the post on the site.
2. **Cross-post to X and Substack → prepare** has Claude draft a 3–6 tweet thread. Read it in the run's summary page.
3. **publish** waits for your approval. Click **Review deployments → Approve** to continue, or **Reject** to post nothing.
4. After approval, the thread goes to X (the last tweet links to the post) and the post is created as a **Substack draft**. Open Substack, check it, and hit Publish there. That's also where you choose whether to email subscribers.

Each post is cross-posted once. `posted.json` records what went out, so re-runs never double-post. To keep a post off X and Substack, add `crosspost: false` to its frontmatter. To cross-post an older post by hand, use **Actions → Cross-post to X and Substack → Run workflow** and enter its slug.

Preview a thread locally without posting anything:

```bash
pip install -r scripts/crosspost/requirements.txt
ANTHROPIC_API_KEY=... python scripts/crosspost/crosspost.py prepare --slug <slug> --out /tmp/xp
```

## One-time setup

Add each value as a secret on the `crosspost` environment (**Settings → Environments → crosspost → Add secret**). Alternatively, run `gh secret set NAME --env crosspost` and paste the value when prompted, which keeps it out of your shell history.

| Secret | Where to get it |
|---|---|
| `ANTHROPIC_API_KEY` | console.anthropic.com → API Keys. Add it as a **repository** secret (Settings → Secrets and variables → Actions), since the `prepare` job runs before approval |
| `X_API_KEY`, `X_API_SECRET` | developer.x.com → your app → Keys and tokens → **API Key and Secret** |
| `X_ACCESS_TOKEN`, `X_ACCESS_TOKEN_SECRET` | Same page → **Access Token and Secret**. First set the app's User authentication settings to **Read and write**, *then* generate these, or posting fails with 403 |
| `SUBSTACK_PUBLICATION_URL` | Your publication's address, e.g. `https://yourname.substack.com` |
| `SUBSTACK_COOKIES` | Log in to Substack in Chrome → DevTools → Application → Cookies → `https://substack.com`. Copy `substack.sid` as `substack.sid=VALUE`. |

Any platform without secrets is skipped, so you can start with X only.

**Substack uses your login cookie, not an official API** (Substack doesn't offer one). When the cookie expires, the Substack step fails with an auth error. Copy a fresh `substack.sid` into the secret and re-run the job; X won't double-post.
