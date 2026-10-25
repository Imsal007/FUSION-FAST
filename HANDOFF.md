# Handoff: SAL Digital restaurant demos and ads

Written so a fresh chat can continue without this chat's memory. Branch: `claude/vigilant-shannon-biqacz` of Imsal007/FUSION-FAST.

## Goal
Run ads for SAL Digital (saldigital.co). Ads send people to https://saldigital.co/lp/restaurants/ (free restaurant website demo, form at `#demo`, WhatsApp fallback). To make the ads, we built fictional restaurant demo sites, screen-record them, and cut reels, carousels and single images with a hook and copy. Reels from Instagram were inspiration only: take the idea (cinematic layered hero, product "breakdown" that comes apart on scroll), never copy footage.

## Decisions already made
- Advertiser: SAL Digital. Platform: Meta first. Budget: 5 GBP a day. Area: UK-wide. Meta Pixel and GA4 are already on the site.
- Demo cuisines and names (fictional, names not yet checked for real businesses): Cinder & Bun (burgers), Forno Nero (pizza), Saffron Lane (Bangladeshi and Indian), Sugar & Steam (desserts and coffee). Still to do later: Chinese, grill and kebab.
- Each demo goes in its own PUBLIC repo under Imsal007 with the same name as the slug, then GitHub Pages (Settings, Pages, main, root).
- Do not use the real Fusion Fast in ads unless its owner agrees.
- Creative plan (launch, about 15 pieces): 7 reels (4 demo walkthroughs, 2 problem-led, 1 compilation), 3 carousels, 4 single images, plus copy (3 lengths of primary text, 5 headlines, 3 hooks, UTM link per ad).
- House rules: no em dashes anywhere, no invented statistics, no "scroll" cue, no gradient text or neon glow, UK English.

## What exists
- `demos/<slug>/` source for each demo (config.json, img/, fonts/), shared code in `demos/_shared/` (demo.css, demo.js, GSAP, ScrollTrigger, Lenis).
- `tools/demo_builder.py` builds index.html from config.json. `tools/make_layers.py` cuts a food photo into hero layers (needs rembg). `tools/export_demo.py <slug> <dir>` makes a standalone site.
- `exports/<slug>/` READY standalone sites, one per demo repo. Copy the folder contents to the root of the matching repo and push.
- `tools/install-video-skills.sh` plus `.claude/settings.json` reinstall the video, motion and ads skills at session start.
- Each page: layered hero (plate, giant name, dish cutout, steam), second line on scroll, a pinned "breakdown" where the dish comes apart with labels then rebuilds into an add-to-order button, menu with tabs, basket drawer that sends the order to WhatsApp. Footer links to the SAL Digital landing page with UTMs (utm_source=demo-site, utm_campaign=<slug>).
- Verified in a simulated phone browser (390x844) and desktop: order flow, totals, WhatsApp text, no console errors, no sideways overflow. NOT verified on a real phone.

## To publish the demos
For each slug: clone the repo, copy `exports/<slug>/.` into it, commit on `main`, push, then enable Pages. The session that wrote this could not push (GitHub App not installed on the new repos), so check that your session can.

## Known issues
- Saffron Lane biryani cutout has a rough edge at the bottom of the plate (swap photo or clean up).
- Demo WhatsApp number 447508407866 is a placeholder shared with the Fusion Fast demo. Replace with a dedicated demo number before the pages are public.
- Demo images are Unsplash photos, cutouts made with rembg (u2net). Breakdown uses straight slices of one photo, not separate ingredients (no video or image generation key available).
- No tracking on the demo pages by design; conversion tracking lives on saldigital.co.

## Next
1. Push the four sites and enable Pages.
2. Record each demo as a vertical screen capture (Playwright, 720x1280 at device scale 2) with the breakdown as the hook moment.
3. Cut reels with the content-engine skill (Remotion for branded reels and carousels, HyperFrames for URL or footage promos). Hook in the first 2.5 seconds, CTA to saldigital.co.
4. Write carousels, single images and ad copy (see the ad-creative and ads skills).
5. Campaign sheet for Meta: one campaign, one ad set, 3 creatives, optimise for demo-form submits (or WhatsApp clicks if leads are too slow at 5 GBP a day). The user launches it in Ads Manager (no ad account access here).
