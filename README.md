# keatonwall.com

Personal blog of Keaton Wall, built with [Astro](https://astro.build) and hosted
on GitHub Pages at [www.keatonwall.com](https://www.keatonwall.com).

## Writing posts

Two ways:

1. **In the browser (no code)** — via [Pages CMS](https://pagescms.org). Log in
   with GitHub at [app.pagescms.org](https://app.pagescms.org), pick this repo,
   and write. Saving commits a Markdown file to `src/content/blog/` and the site
   rebuilds automatically.
2. **Locally** — add a Markdown file to `src/content/blog/`. Frontmatter fields:

   ```yaml
   ---
   title: 'Post title'
   description: 'One-sentence summary.'
   pubDate: 2026-07-19
   category: tech        # tech | learning | work | faith
   tags: ['optional']
   heroImage: /images/optional.jpg
   draft: false          # true hides it from the live site
   ---
   ```

## Local development

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # output to ./dist
npm run preview  # preview the production build
```

## How it's wired

- **Content model:** `src/content.config.ts` (keep in sync with `.pages.yml`).
- **Categories:** defined once in `src/consts.ts`.
- **Deploy:** `.github/workflows/deploy.yml` builds on every push to `main` and
  publishes to GitHub Pages. Pages source must be set to **GitHub Actions**.
- **Custom domain:** `public/CNAME` (`www.keatonwall.com`) ships with every build.
- **Preserved redirect:** `public/engagement.html`.
