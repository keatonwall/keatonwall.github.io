# Working on this repo

Personal blog for Keaton Wall, live at **www.keatonwall.com**.
Astro + GitHub Pages, deployed by GitHub Actions on every push to `main`.

## Two people publish here. Always pull first.

Posts get written **two ways**, and both commit to this repo:

1. **Pages CMS** (app.pagescms.org) — Keaton writes in the browser, it commits
   Markdown directly to `main` on GitHub.
2. **Claude / local** — editing files here and pushing.

Because of that, the local clone goes stale whenever Keaton publishes from the
CMS. **Before editing anything, run:**

```sh
git pull origin main
```

If that's skipped, a push can conflict with or overwrite a post Keaton wrote in
the CMS. Pull first, every time.

## Writing voice

Keaton's voice: warm, direct, plain language, contractions, short readable
sentences, and the "why" spelled out. Not corporate, not stiff.

- **Never use em dashes (—).** Hard rule, no exceptions in user-facing copy.
  Use periods, commas, parentheses, or hyphens for ranges.
- No buzzwords or slogans. Say the thing plainly.
- Parentheticals are in-voice for quick asides.
- Don't oversell. "There's no gate on it" beats "Join my journey!"

## Content model

Posts are Markdown in `src/content/blog/`. Frontmatter:

```yaml
title: 'Post title'
description: 'One sentence, shows in listings and search results.'
pubDate: 2026-07-20
category: tech        # exactly one, see below
tags: ['freeform', 'any-number']
heroImage: /images/optional.jpg
draft: false          # true hides it from the live site
```

**Categories** are a fixed list of seven, defined once in `src/consts.ts`:
`tech`, `work`, `home`, `family`, `money`, `faith`, `learning`.

Changing categories means updating **both** `src/consts.ts` and `.pages.yml`,
or the CMS dropdown and the site schema drift apart.

**Tags** are freeform. Tag pages and the `/tags` index generate themselves from
whatever tags posts use. Nothing to maintain.

## Gotchas

- **`public/CNAME`** holds the custom domain. If it's lost, the domain breaks.
  Never delete it.
- **`public/engagement.html`** is a preserved redirect to an old YouTube link.
  Leave it alone.
- **Search needs a build.** Pagefind indexes the built HTML, so `/search` is
  empty under `npm run dev`. Test with `npm run build && npm run preview`.
- **Pushing** uses a token for the `keatonwall` account. The macOS keychain also
  holds a `keatonhs` (work) credential, which does NOT have access here. The
  remote embeds the username to avoid picking the wrong one.
- **If a push fails with "Invalid username or token,"** the personal access
  token expired or was regenerated. Regenerating changes the token value, so the
  cached copy stops working. Git erases the bad credential on failure, which
  means the next push needs to prompt for the new token. Claude's shell is
  non-interactive and cannot answer that prompt, so **Keaton has to run
  `git push origin main` once from his own terminal** (username `keatonwall`,
  token as the password) to re-seed the keychain. After that Claude can push
  again normally.

## Commands

```sh
npm run dev      # localhost:4321 (no search)
npm run build    # builds site + search index
npm run preview  # serve the build, use this to test search
```
