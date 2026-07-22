---
title: 'Rebuilding this site: Astro, a pixel robot, and a chatbot with no API'
description: 'A build log for this portfolio — why Astro, how the client-side chatbot works, and the gradient descent game hiding in the arcade.'
pubDate: 2026-07-22
tags: ['astro', 'meta', 'web']
status: 'published'
---

<!-- TODO(harsha): this is a starter draft — rewrite in your own voice before publishing widely. -->

My old portfolio was a static HTML template with `[Your Profession / Title]` still in the hero. Time to fix that.

## Why Astro

I write ML pipelines for a living, so my bar for the site was the same as for a serving stack: fast, cheap to run, easy to extend. Astro ships zero JavaScript by default and lets me add small "islands" of interactivity only where I want them — the terminal hero, the chatbot, the roaming pixel robot, and a gradient descent mini-game.

## The chatbot has no API key

The chatbot on this site answers questions about my background with **zero backend calls**. It's a small keyword-retrieval knowledge base compiled from my resume, running entirely in your browser. Is it an LLM? No. Is it honest about that if you ask? Yes.

That constraint was deliberate: a static site on GitHub Pages can't hold API secrets, and I'd rather ship a transparent toy than leak a key. The upgrade path — a serverless endpoint fronting a real model with RAG over my notes — is a future post.

## What's next

- **GPT from scratch**: a public build log, tokenizer to KV cache
- **CUDA inference engineering**: profiling → custom kernels → benchmarks
- **Edge MLOps war stories**: what shipping models to 100+ devices teaches you

If any of that sounds interesting, the writing.log section on the homepage is where it'll land first.
