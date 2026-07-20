---
title: 'Building this blog with Claude Code, and how I actually keep it fed'
description: 'Claude Code for the technical setup, Claude chat and a browser CMS for the writing. The whole point is removing friction between learning something and getting it written down.'
pubDate: 2026-07-20
category: tech
tags: ['claude', 'ai', 'workflow', 'writing']
draft: false
---

I've wanted a place to write things down for a long time. What stopped me wasn't
the writing. It was everything around the writing.

Picking a platform. Paying for hosting. Fighting a theme. Then eventually
realizing that publishing a post takes fifteen minutes of wrestling with
something, which means I don't do it, which means the whole thing dies.

So this time I split the problem in two, because building a site and feeding a
site are completely different jobs with completely different requirements.

## Two jobs, two tools

**Building it** is technical, one time, and fiddly. Domains, DNS, build
pipelines, deploy configs. You do it once and mostly never touch it again.

**Feeding it** is non technical, constant, and has to be nearly frictionless.
If writing a post feels like a chore, I won't write posts.

Those need different tools. Trying to use one tool for both is why I've
abandoned this a few times before.

## Part 1: Claude Code for the build

I used [Claude Code](https://claude.com/claude-code) for the setup. It's the
version of Claude that runs in your terminal and can actually edit files, run
commands, and see what's happening.

In one sitting it went from an empty "Hello World" page to:

- A working blog with a real design, light and dark mode
- Categories and tags that organize themselves
- Full text search across every post
- An RSS feed and sitemap
- A deploy pipeline that publishes automatically when anything changes

Hosting is free. It runs on GitHub Pages. The only thing I pay for is the domain
name, about $15 a year. I wrote up
[the domain part separately](/blog/domain-on-github-pages) if you want the step
by step.

What made this work wasn't that the AI wrote code fast. It's that it could
**check its own work**. It would make a change, load the actual page, look at
it, notice something was broken, and fix it before telling me it was done. That
is a very different thing from getting handed a block of code and being told
"this should work."

## Part 2: the writing loop

Once the site existed, I needed publishing to be effortless. I ended up with two
ways in, and I use both for different things.

**Claude chat, for thinking and drafting.** This is where I go when I've learned
something but haven't figured out what I actually think about it yet. I explain
it badly, it asks questions, and somewhere in there the real structure shows up.
Then it writes it into the site directly.

This is the one that matters most. Most of what I learn dies in the gap between
"that was useful" and "I sat down and wrote 800 words about it." Talking it
through closes that gap.

**Pages CMS, for writing it myself.** [Pages CMS](https://pagescms.org) gives me
a normal writing interface in the browser. Title, body, category, tags, publish.
It saves straight to my site and the post is live about a minute later.

No code, no terminal, works on my phone. When I already know what I want to say,
this is faster than explaining it to anyone.

Both write to the same place, so it doesn't matter which one I use.

## Why the split is the actual point

The efficiency isn't "AI writes my posts." I don't want that, and you'd be able
to tell.

The efficiency is that **every step between learning something and having it
written down has been removed except the thinking.** No hosting decisions. No
deploy step. No formatting. No wondering where a post should live.

What's left is the part only I can do, which is deciding what's worth keeping
and what I actually think about it. That's the part I want to spend time on.

## What went wrong

It wasn't frictionless. A few things broke, and they're the useful part:

**Renaming my GitHub username quietly broke my DNS.** The site kept working, so
I didn't notice. My `www` record still pointed at the old username, which
someone else could have claimed and served their own content on my domain. Found
it by accident while writing a different post.

**The first post I published through the CMS took the whole site down.** Not the
site exactly, but the build. I saved a post without picking a category, the
system required one, and every deploy after that failed silently. If I'd
discovered that on a real post two weeks later I'd have been baffled.

I found it because I published a throwaway test post specifically to see if the
pipeline worked. Best fifteen seconds I spent all day. The fix was two parts:
make the field required so it can't happen, and make the site fall back to a
default so one bad post can never block everything again.

**Access tokens expire and it's confusing when they do.** Mine was set to seven
days. Regenerating it invalidated the saved copy, which produced an error
message that didn't obviously mean "your token changed."

None of these were hard to fix. All of them would have been genuinely confusing
to hit cold, months later, with no idea what changed.

## What I'd tell someone starting

1. **Split setup from writing.** Use a capable tool once for the technical part.
   Use something dead simple for the recurring part.
2. **Own the domain.** Hosting is free and replaceable. The address is the part
   that's yours.
3. **Break it on purpose first.** Publish a garbage test post before you write
   anything you care about. Then delete it.
4. **Write down what broke.** That's half of what ends up being worth sharing
   anyway. This post is mostly that.

The goal was never a website. It was to stop losing the things I learn. The
site is just the container.
