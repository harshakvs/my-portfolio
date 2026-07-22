# sreeharsha.kotta — portfolio

Dark ML-lab themed portfolio built with [Astro](https://astro.build). Static, fast, no trackers.

## Features

- **Terminal hero** with typed intro + neural-constellation canvas background
- **Projects** driven by [src/data/projects.ts](src/data/projects.ts) — add a `github` URL to a card and the button appears
- **Pipeline section** — skills shown as the data → train → serve → observe flow they actually follow
- **Blog** via Astro content collections ([src/content/blog/](src/content/blog/)) — posts with `status: 'coming-soon'` show as teasers, `'published'` get pages
- **sk-bot** — client-side retrieval chatbot over resume facts (no API keys, upgradeable to a real LLM later)
- **Pixel robot** roaming the bottom of the page, sharing facts
- **Gradient Descent arcade game** — tune the learning rate, find the global minimum
- **flag_rush quiz** — visitors try to beat the 10/10 · 24.5s house record
- **Travel map** — dark Leaflet world map driven by [src/data/travel.ts](src/data/travel.ts); one line per pin

## Editing content

Everything personal lives in two files:

- [src/data/profile.ts](src/data/profile.ts) — name, tagline, socials (add YouTube/Medium URLs when live), terminal lines, avatar facts
- [src/data/projects.ts](src/data/projects.ts) — project cards + pipeline stages

Drop your photo at `public/me.jpg` (square crop works best) — until then the hero shows the logo.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```

## Deploy

Pushes to `main` auto-deploy to GitHub Pages via [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

Recommended: name the GitHub repo `harshakvs.github.io` so the site lives at the root URL.
If you keep another repo name, uncomment `base` in [astro.config.mjs](astro.config.mjs).
Then in the repo settings: **Settings → Pages → Source → GitHub Actions**.
