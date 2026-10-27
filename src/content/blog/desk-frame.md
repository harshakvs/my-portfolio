---
title: 'I turned a $50 photo frame into a desk command center that talks to Alexa'
description: 'Unlocking a PF1007L photo frame without flashing it, a checksum-verified 15.7 GB backup, WebView 106, a Cloudflare Worker dashboard, and Alexa in both directions. One evening, one frame, lots of yak shaving.'
pubDate: 2026-10-27
tags: ['hardware', 'android', 'cloudflare', 'alexa', 'side-project']
status: 'coming-soon'
---

<!-- TODO(harsha): add your photos/video at the MEDIA markers and read it once in your own voice before publishing. -->

<figure>
  <img src="/my-portfolio/blog/desk-frame/tour.gif" alt="Animated tour of the dashboard on the frame">
  <figcaption>Every frame of this GIF is a screenshot pulled off the device itself.</figcaption>
</figure>

<!-- MEDIA: hero photo of the frame on the desk -->

[Wes Bos posted](https://wesbos.com/hacking-smart-photo-frames) about turning cheap Amazon photo frames into family dashboards, and I had exactly one thought: *I need this on my desk.* So I bought the $50 frame, opened his [photo-frame-dashboard](https://github.com/wesbos/photo-frame-dashboard) repo, and then kept going.

By the end of one long evening, the frame:

- shows PSG's next match, live India cricket (who's batting, every ball of the over), my Fantasy PL team, a stock watchlist and news I can tap to read
- tracks groceries **with calories**, my to-dos, water and supplements
- has chess puzzles and a focus timer
- answers to **"Alexa, tell my desk I drank water"**
- turns my lights off when I tap *Good Night*

It all runs on a Cloudflare Worker, so the frame no longer needs my laptop. Here's how it went, including everything that bit me.

## The hardware: a tablet in a trench coat

Settings → About said **PF1007L**: an Allwinner A33 with 1 GB of RAM running Android 6.0.1, plus a vendor photo app. Wes's repo has a page for this exact board with reports from 30+ owners, and my firmware was the most-tested one on the list.

The repo also has a "rules we learned the hard way" section, which I treated as scripture: **no writes before a verified backup, one change at a time, and prove the way back before you close the way in.**

## Act 1: the cable that wasn't

First test: plug the frame into the Mac and look for it on USB. Nothing. The screen was on, so power was flowing, but there was no data at all.

The cable in the box was **charge-only**. That's a known trap with this board, and there's a second one: USB-C to USB-C cables give *no power and no data*, because the frame skips the USB-C detection resistors. A USB-A to USB-C **data** cable through my Anker hub finally made the Mac see it.

## Act 2: getting in without flashing anything

The usual route is a boot patch written from a microSD card. I didn't have one. (I checked my Roku, PS5, Quest and air purifier. None of them have one.)

The repo documents another route for this firmware that needs no flashing, using the vendor app's own network connection. A few minutes later I had a root shell and set the frame to keep ADB over USB after reboots. I won't turn this into a recipe here; the repo's [start page](https://github.com/wesbos/photo-frame-dashboard/blob/main/docs/pf1007l-start-here.md) has the procedure and its safety checks. The takeaway is what it revealed: **the stock vendor app is far more powerful than a photo app should be**, so disabling it was the first thing I did once I had a safe way back in.

**Plot twist I didn't see coming:** a temporary router setting from that step changed my *Mac's* hostname. My terminal prompt changed, and because I'd never set `git config user.email`, git started signing my commits with an address based on that hostname. That also explained why my commits never showed on my GitHub contribution graph. Two bugs, one router setting.

## Act 3: back it up like you mean it

Before changing a byte, I copied the whole **15.7 GB** of storage to the Mac in 61 chunks of 256 MB. Each chunk was hashed **on the frame** and **on the Mac**, and the two had to match: zero retries. The boot image's hash matched the known firmware, so I knew exactly which bytes I was dealing with. It took about 40 minutes, and it's why everything after felt safe.

## Act 4: dragging it out of 2015

- **A normal launcher first.** Then I *walked over and opened Settings → Apps by hand* before disabling anything. One owner in the repo locked themselves out by skipping that check.
- **Vendor apps off.** The photo app, its auto-updater and a factory test app were disabled, and stayed disabled across a reboot.
- **WebView 44 → 106.** The built-in browser engine was from 2015. I staged Chromium 106 next to the old one, compared every file byte for byte, then swapped the folders. The original is still on the frame for undo.
- **Missing root certificates.** Modern sites failed because the 2015 trust store doesn't have Let's Encrypt's ISRG Root X1. I added it and two Google roots, after checking each one against three independent sources.
- **Freezes at boot.** The Wi-Fi chip draws a current spike at boot, and on hub power the frame would hang. The repo's boot fixes start Wi-Fi a few seconds later, pin the MAC address, and sync the clock.
- **A clock stuck in 1969.** With no battery and no network, every boot starts in 1969. Now it syncs from `time.google.com` and saves the last good time.
- **No back button.** This firmware has no navigation bar, so the first time I opened Android Settings from the kiosk, I was stuck. The kiosk ships an accessibility service with floating **Back / Dashboard** buttons. The vendor's background manager kept switching it off, until I granted the kiosk permission to switch it back on itself.

## Act 5: the dashboard

<figure>
  <img src="/my-portfolio/blog/desk-frame/dashboard.jpg" alt="The main dashboard">
  <figcaption>The home screen: Claude button, weather, health, groceries and to-do, FPL, PSG, cricket, markets, news.</figcaption>
</figure>

**Architecture:** the frame runs Wes's tiny kiosk app (a full-screen WebView) pointed at a **Cloudflare Worker**. The Worker serves a plain HTML/CSS/JS page and an `/api/*` layer that fetches and trims every data source (ESPN, the FPL API, Open-Meteo, Yahoo Finance, NPR, CNBC, Lichess). The frame only ever renders small JSON. It sits at about **60–80 MB of RAM**.

**Design constraints that shaped the code:**

- **WebView 106, not a modern browser.** No `oklch()`, no `color-mix()`, no `:has()`, no CSS nesting. Plain JS with no build step.
- **1280×800 on a desk.** A fixed stage scaled to the screen, big tap targets, and cards that scroll.
- **Some feeds block Cloudflare's IPs.** ESPN's cricket host returns 403 to Workers, so I moved to the host that doesn't.
- **The frame can't load most images directly** (old trust store, and at first no internet at all), so logos and chess pieces go through an allowlisted image proxy on the Worker.

**Features that turned out fun to build:**

- **Groceries with calories.** "2 lb chicken" becomes item plus quantity. Each item gets a calorie estimate and a category, and a *basket mix* bar shows produce vs protein vs treats. Every item I check off is saved as a purchase, so after a few trips it suggests what I usually need ("usually every 7 days, last bought 8 days ago").
- **Live cricket.** When India is batting, the card shows both batters, the bowler's figures and every ball of the current over, built from the last page of ESPN's ball-by-ball feed.
- **FPL.** Deadline countdown, points, rank, bank, a captain pick and one transfer idea from form × fixture difficulty × availability. Free transfers aren't in the public API, so the Worker estimates them from my transfer history.
- **A reader mode.** Tap any headline or FPL article and the Worker extracts the text, so I can read Fantasy Football Scout on the frame with no ads.
- **Chess, focus and a screensaver.** Lichess puzzles with tap-to-move, a focus timer tied to my to-do list, and a photo screensaver that turns into a dim clock overnight.
- **A "say hi to Claude" button** that starts my Claude usage window early by having a GitHub Action send one tiny message.

<!-- MEDIA: photo or short clip of tapping around -->

<figure>
  <img src="/my-portfolio/blog/desk-frame/groceries.jpg" alt="Expanded grocery list with calories and basket mix">
  <figcaption>Groceries, expanded: quantities, calories, basket mix and suggestions.</figcaption>
</figure>

## Act 6: Alexa, in both directions

**Voice → frame.** I built a private Alexa skill called *my desk*. Alexa POSTs to `/alexa` on the Worker, and the skill reads and writes the same records the frame shows:

```text
"Alexa, ask my desk to add eggs"            → on the grocery list within 30 s
"Alexa, tell my desk I drank water"         → water counter goes up
"Alexa, ask my desk for my FPL score"       → "35 points this gameweek, rank 973,654,
                                               2 free transfers, £1.4m in the bank…"
```

Since Alexa can't send my dashboard key, the endpoint verifies each request the way Amazon requires: the signing certificate's URL, the RSA signature over the raw body, a fresh timestamp and my skill ID. Doing that in a Worker meant writing a small DER parser to pull the public key out of the certificate. That was the most "wait, I'm doing *what*" moment of the night.

**Frame → lights.** Alexa doesn't let outside apps control devices directly, so the frame's **Good Night** and **Lights** buttons call [Voice Monkey](https://voicemonkey.io), which fires an Alexa routine. The free plan allows three triggers, which is exactly enough for now.

<figure>
  <img src="/my-portfolio/blog/desk-frame/smart-home.jpg" alt="Smart home scenes on the frame">
  <figcaption>Two buttons, real lights.</figcaption>
</figure>

<!-- MEDIA: short video — "Alexa, tell my desk I drank water", the counter ticking up, then tapping Good Night -->

## Act 7: ship it

Every `git push` deploys the Worker through GitHub Actions in about 20 seconds. The page polls `/api/version` and reloads itself within a minute of a new deploy. I edit, push, and look up at my desk. Photos and contact birthdays live in Cloudflare KV instead of git, so deploys never carry or drop personal files.

## Things that bit me

- A **charge-only** cable in the box.
- Bricking fears, so: **back up first** and hash every chunk on both ends.
- A router setting that **renamed my Mac** and mislabeled my git commits.
- **Restarting the kiosk** silently disabled the floating back buttons.
- **Writing junk into the cloud store** during migration, because I copied before validating. Now every copy is validated first, and every storage read tolerates bad data.
- An Alexa catch-all slot that saved *"protein powder to my list"* as one grocery item.

## What's next

Home Assistant on a Raspberry Pi for real two-way device state, maybe a 3D model of the room, a commute card, and a Robinhood/Muse markets view.

## Credits

Huge thanks to [Wes Bos](https://github.com/wesbos) and everyone contributing to [photo-frame-dashboard](https://github.com/wesbos/photo-frame-dashboard). The unlock research, boot fixes and kiosk app are theirs; I just kept stacking features on top. The dashboard code is on [GitHub](https://github.com/harshakvs/desk-dashboard).
