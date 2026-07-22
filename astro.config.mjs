import { defineConfig } from 'astro/config';

// Deployed as a GitHub Pages *project site* at harshakvs.github.io/my-portfolio.
// If you ever rename the repo to `harshakvs.github.io`, delete the `base` line.
export default defineConfig({
  site: 'https://harshakvs.github.io',
  base: '/my-portfolio',
});