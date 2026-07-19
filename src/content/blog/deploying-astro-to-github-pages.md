---
title: 'Deploying an Astro site to GitHub Pages with a custom domain'
description: 'The exact setup that builds Astro in CI and keeps a custom domain working — CNAME and all.'
pubDate: 2026-07-18
category: tech
tags: ['astro', 'github-pages', 'ci']
draft: false
---

GitHub Pages serves static files, but Astro needs a build step. The trick is to
let a GitHub Action do the building and hand the output to Pages. Here's the
whole setup.

## The workflow

This lives at `.github/workflows/deploy.yml`. It builds the site and publishes it
using the official Astro action:

```yaml
- name: Build
  uses: withastro/action@v4

- name: Deploy
  id: deployment
  uses: actions/deploy-pages@v4
```

The `withastro/action` step runs `npm ci && npm run build` and uploads the
`dist/` folder as a Pages artifact. The `deploy-pages` step publishes it.

## Keeping the custom domain

The one thing that trips people up: a custom domain is stored in a `CNAME` file,
and a fresh build can wipe it out. The fix is to keep `CNAME` in Astro's
`public/` directory, which is copied verbatim into `dist/` on every build:

```
public/
  CNAME          # contains: www.keatonwall.com
```

Because it ships with every build, the domain never drops — no manual
re-entry after each deploy.

## Point Astro at the real URL

Set `site` in `astro.config.mjs` so canonical URLs, the sitemap, and RSS all use
the right host:

```js
export default defineConfig({
  site: 'https://www.keatonwall.com',
});
```

## One manual step

In the repo's **Settings → Pages**, set the source to **GitHub Actions**. After
that, every push to `main` rebuilds and redeploys automatically.

*(This is an example post demonstrating code highlighting — delete it whenever.)*
