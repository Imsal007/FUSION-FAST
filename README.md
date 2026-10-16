# Fusion Fast: demo website

A concept site built by SAL Digital for Fusion Fast, the halal Lebanese grill at 284 Brixton Road, London SW9 6AG.

Static HTML, CSS and JS. No build step is needed to host it, and there are no monthly running costs.

## Pages
- `index.html`: home, with the scroll-driven doner story (The Fire, The Doner, The Burst, The Box)
- `menu.html`: full menu with filters and search, plus the "Say cheese" melt scene
- `order.html`: build a meal and send a collection order on WhatsApp, paid on collection
- `story.html`: how the food is cooked, with the drag-to-compare slider
- `visit.html`: address, hours, a click-to-load map and delivery app links

## Editing
- Menu and prices: `assets/js/menu-data.js`
- Page copy and SEO: `tools/build.py`, then run `python3 tools/build.py` to regenerate the HTML
- Before launch: set the real domain (`SITE` in `tools/build.py`) and the restaurant's own WhatsApp number (`whatsapp` in `menu-data.js`)

## Placeholders to replace after the photoshoot
Some food images are stock or AI-generated stand-ins. Real photos and a shop video should replace them before going live.
