---
title: 'How to put your own domain on a free GitHub Pages site'
description: 'Start to finish, from buying a domain to seeing your site load on it. Including the DNS part that trips everyone up.'
pubDate: 2026-07-20
category: tech
tags: ['github-pages', 'dns', 'domains', 'name.com']
draft: false
---

GitHub will host a website for you for free, on your own domain, with a real
HTTPS certificate. Most people don't realize that. The hosting costs nothing.
The only thing you pay for is the domain name itself, which runs about $15 a
year.

This is how I got `keatonwall.com` pointed at a GitHub Pages site. I'm writing
it as if you've never bought a domain before, because the DNS step is where
people usually give up.

## Step 1: Buy the domain

I use [name.com](https://www.name.com). Any registrar works (Namecheap,
Cloudflare, Porkbun), so if you already have one, skip ahead.

Search for the name you want and buy it. A `.com` is usually around $15 a year.

Two things I'd suggest while you're in there:

- **Turn on auto renew.** Losing a domain because a card expired is a bad day.
- **Turn on WHOIS privacy** if it isn't already included. Without it, your name,
  address, and phone number are in a public database. Most registrars include
  this for free now.

You do not need their website builder, hosting, email, or any of the add ons
they'll offer you at checkout. GitHub is doing the hosting.

## Step 2: Create the GitHub repository

Your repo has to be named a specific way for this to work. It must be:

```
yourusername.github.io
```

So if your username is `keatonwall`, the repo is `keatonwall.github.io`. That
exact name is what tells GitHub "this is my personal site." Make it **public**.

## Step 3: Put something in it

You need at least one file. Create `index.html` in the repo with anything in it:

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>Hello world</h1>
  </body>
</html>
```

Commit it. You can replace this with a real site later. Right now you just need
something to prove the pipeline works.

## Step 4: Turn on GitHub Pages

In your repo, go to **Settings**, then **Pages** in the left sidebar.

Under **Build and deployment**, set the source. If you're just publishing plain
HTML files, choose **Deploy from a branch** and pick `main`. If you're using a
site generator that needs a build step, choose **GitHub Actions** instead.

Give it a minute, then visit `https://yourusername.github.io`. You should see
your "Hello world." If you do, the hosting works and only the domain is left.

## Step 5: Point the domain at GitHub

This is the part that feels intimidating and isn't. You're going to add a few
records at your registrar that say "when someone asks for this name, send them
to GitHub."

In name.com, go to **My Domains**, click your domain, then **DNS Records**.

**First, four A records.** These handle the bare domain (`keatonwall.com` with
no www). Add four separate records, all with the host left blank (some
registrars show this as `@`), type **A**, pointing to each of these:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Four records, four different IPs, same host. That's not a mistake, it's
redundancy. If one of GitHub's servers is down, the others answer.

**Then one CNAME record.** This handles the `www` version:

| Type  | Host | Answer                   |
| ----- | ---- | ------------------------ |
| CNAME | www  | yourusername.github.io   |

Set that up even if you don't plan to use `www`. GitHub redirects between the
two automatically once both exist, so visitors get to the right place either
way.

**Optional but nice:** add four **AAAA** records, same blank host, for people on
IPv6 connections:

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

## Step 6: Tell GitHub about the domain

DNS now points at GitHub, but GitHub is hosting a lot of sites and doesn't know
which one is yours.

Back in **Settings**, then **Pages**, find **Custom domain**. Type your domain
and save.

This creates a file in your repo called `CNAME` containing just your domain
name. Leave that file alone. If it disappears, your domain stops working. This
matters if you use a site generator, because a build can wipe it out. Most
generators have a folder for files that get copied as is (in Astro it's
`public/`), and the `CNAME` file should live there.

## Step 7: Wait, then turn on HTTPS

DNS changes take time to spread. Usually it's minutes. It can be up to 24 hours.
If your domain doesn't work right away, that's almost always all this is.

Once GitHub verifies the domain, an **Enforce HTTPS** checkbox becomes available
on that same Pages settings screen. Check it. GitHub issues a certificate for
free and makes sure everyone gets the secure version.

That's it. Your site is live on your own name.

## Two things that bit me

**Renaming your GitHub username breaks your DNS quietly.**

I changed my username after setting all this up. GitHub politely redirects the
old name to the new one, so my site kept working and I assumed everything was
fine. It wasn't. My `www` CNAME still pointed at my old username.

That's worse than it sounds. Old usernames get released back to the public. If
someone else registered my old name and set up their own Pages site, my `www`
address would have started serving their content. So if you ever rename, go back
to your DNS and update the CNAME to your new username.

**Your repo name has to match your username too.** Renaming the account doesn't
rename the repo. Mine was left as `oldname.github.io` under the new account,
which is a mismatch. Rename the repo to match.

## What this costs

- Domain: about $15 a year
- Hosting: free
- HTTPS certificate: free

For the price of a couple of coffees a year, you own your corner of the internet
instead of renting it from a platform. Worth it.
