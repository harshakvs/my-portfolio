// Usage: npm run new-post -- "Cutting inference latency from 7s to 2s"
// Creates src/content/blog/<slug>.md as a draft (status: coming-soon).
// Change status to `published` and push to go live and trigger cross-posting.
import { existsSync, writeFileSync } from 'node:fs';

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Usage: npm run new-post -- "Post title"');
  process.exit(1);
}
const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const path = `src/content/blog/${slug}.md`;
if (existsSync(path)) {
  console.error(`${path} already exists`);
  process.exit(1);
}
const today = new Date().toISOString().slice(0, 10);
writeFileSync(path, `---
title: '${title.replace(/'/g, "''")}'
description: 'One sentence on what the reader gets from this post.'
pubDate: ${today}
tags: []
status: 'coming-soon'
---

Start writing here.
`);
console.log(`Created ${path}`);
