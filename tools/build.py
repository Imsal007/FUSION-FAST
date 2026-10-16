#!/usr/bin/env python3
"""Builds the static Fusion Fast site from shared partials.
Run:  python3 tools/build.py
Edit SITE below once the real domain is live."""
import json, os, datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://imsal007.github.io/FUSION-FAST"  # demo host. Change to the real domain at launch
TODAY = datetime.date.today().isoformat()
PHONE = "020 8075 1647"
PHONE_HREF = "tel:+442080751647"
MAPS = "https://www.google.com/maps/search/?api=1&query=Fusion+Fast+284+Brixton+Road+London+SW9+6AG"
UBER = "https://www.ubereats.com/gb/store/fusion-fast/DCAekJylQ6O1MS98WWAFcQ"
JUSTEAT = "https://www.just-eat.co.uk/restaurants-fusion--fast-lebanese-grill-nine-elms-/menu"
TIKTOK = "https://www.tiktok.com/@fusionfastofficial"
INSTA = "https://www.instagram.com/fusionfastofficial/"
# TEMPORARY demo WhatsApp number. Swap for the restaurant's own before launch (also in menu-data.js)
WA = "https://wa.me/447508407866?text=" + "Hi%20Fusion%20Fast%2C%20I%27d%20like%20to%20place%20an%20order"
EXT = 'target="_blank" rel="noopener noreferrer"'

RESTAURANT = {
    "@type": "Restaurant",
    "@id": SITE + "/#restaurant",
    "name": "Fusion Fast",
    "alternateName": "Fusion Fast Lebanese Grill",
    "description": "Halal Lebanese charcoal grill with Asian spice on Brixton Road, London SW9. Doner, shawarma, mixed grill, wings and lamb chops, cooked to order for collection or delivery.",
    "url": SITE + "/",
    "telephone": "+442080751647",
    "priceRange": "£10-£20",
    "servesCuisine": ["Lebanese", "Middle Eastern", "Grill", "Halal"],
    "address": {"@type": "PostalAddress", "streetAddress": "284 Brixton Road", "addressLocality": "London", "addressRegion": "Greater London", "postalCode": "SW9 6AG", "addressCountry": "GB"},
    "hasMap": MAPS,
    "areaServed": ["Brixton", "Stockwell", "Kennington", "Camberwell", "Clapham", "Lambeth"],
    "acceptsReservations": "False",
    "hasMenu": SITE + "/menu.html",
    "image": [SITE + "/assets/img/og.jpg"],
    "logo": SITE + "/assets/img/favicon.svg",
    "sameAs": [TIKTOK, INSTA, UBER, JUSTEAT],
    "potentialAction": {"@type": "OrderAction", "target": SITE + "/order.html", "deliveryMethod": "http://purl.org/goodrelations/v1#DeliveryModePickUp"},
}

ICONS = {
    "menu": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h10"/></svg>',
    "bag": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    "phone": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
    "wa": '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.2-.2-.5-.3z"/></svg>',
    "pin": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
}

NAV_ITEMS = [("index.html", "Home"), ("menu.html", "Menu"), ("order.html", "Order"), ("story.html", "Our Story"), ("visit.html", "Find Us")]


def head(title, desc, path, ld_extra=None, preload=None):
    graph = [dict(RESTAURANT), {"@type": "WebSite", "@id": SITE + "/#website", "url": SITE + "/", "name": "Fusion Fast", "publisher": {"@id": SITE + "/#restaurant"}, "inLanguage": "en-GB"}]
    page = {"@type": "WebPage", "@id": SITE + "/" + path + "#webpage", "url": SITE + "/" + path, "name": title, "description": desc, "isPartOf": {"@id": SITE + "/#website"}, "about": {"@id": SITE + "/#restaurant"}, "inLanguage": "en-GB", "dateModified": TODAY}
    graph.append(page)
    if path:
        name = dict(NAV_ITEMS).get(path, title)
        graph.append({"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"}, {"@type": "ListItem", "position": 2, "name": name, "item": SITE + "/" + path}]})
    if ld_extra:
        graph.extend(ld_extra)
    ld = json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False).replace("</", "<\\/")
    canon = SITE + "/" + path
    pre = f'<link rel="preload" as="image" href="{preload}" type="image/webp">' if preload else ""
    csp = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-src https://www.google.com; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests"
    return f"""<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="canonical" href="{canon}">
<meta http-equiv="Content-Security-Policy" content="{csp}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta name="theme-color" content="#0b0908">
<meta name="geo.region" content="GB-LBH">
<meta name="geo.placename" content="Brixton, London">
<meta property="og:type" content="restaurant">
<meta property="og:site_name" content="Fusion Fast">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{canon}">
<meta property="og:image" content="{SITE}/assets/img/og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="en_GB">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="preload" href="assets/fonts/big-shoulders-display-latin-900-normal.woff2" as="font" type="font/woff2" crossorigin>
{pre}
<link rel="stylesheet" href="assets/css/site.css">
<link rel="stylesheet" href="assets/css/pages.css">
<script type="application/ld+json">{ld}</script>
</head>
"""


def nav(active):
    links = "".join(f'<li><a href="{h}"{" aria-current=\"page\"" if h == active else ""}>{t}</a></li>' for h, t in NAV_ITEMS)
    big = "".join(f'<a class="big" href="{h}"{" aria-current=\"page\"" if h == active else ""}>{t}</a>' for h, t in NAV_ITEMS)
    return f"""<a class="sr" href="#main">Skip to content</a>
<div class="pt" aria-hidden="true"><div class="pt-panel"></div><div class="pt-panel p2"></div><div class="pt-mark"><i>Fusion</i> Fast</div></div>
<header class="nav">
  <div class="wrap">
    <a href="index.html" class="mark-wrap" aria-label="Fusion Fast home">
      <span class="mark"><span class="m1">Fusion</span><span class="m2">FAST</span></span>
      <small class="mark-sub" style="font-family:var(--f-display);font-weight:700;font-size:10px;letter-spacing:.32em;color:var(--smoke);margin-top:3px">LEBANESE GRILL · BRIXTON</small>
    </a>
    <nav aria-label="Main"><ul class="nav-links">{links}</ul></nav>
    <div class="nav-right">
      <button class="basket-btn" data-open-basket aria-label="Open your order">{ICONS['bag'].replace('<svg', '<svg width="20" height="20"')}<span class="lbl">Order</span><span class="count" data-count="always">0</span></button>
      <button class="burger" aria-label="Menu" aria-expanded="false" aria-controls="mnav"><span></span><span></span></button>
    </div>
  </div>
</header>
<div class="mnav" id="mnav">
  <nav aria-label="Mobile">{big}</nav>
  <div class="mnav-foot">284 Brixton Road, London SW9 6AG<br><a href="{PHONE_HREF}">{PHONE}</a></div>
</div>
"""


def mbar(active):
    def cls(h):
        return ' class="on"' if h == active else ""
    return f"""<nav class="mbar" aria-label="Quick actions">
  <a href="menu.html"{cls('menu.html')}>{ICONS['menu']}Menu</a>
  <a href="order.html" class="order">{ICONS['bag']}<span class="count" data-count></span>Order</a>
  <a href="{PHONE_HREF}">{ICONS['phone']}Call</a>
  <a href="{WA}" {EXT} class="wa">{ICONS['wa']}Chat</a>
  <a href="{MAPS}" {EXT}>{ICONS['pin']}Route</a>
</nav>
<a class="wa-float" href="{WA}" {EXT} aria-label="Chat with Fusion Fast on WhatsApp">{ICONS['wa']}<span>WhatsApp us</span></a>"""


ALLERGENS = ["Celery", "Cereals with gluten", "Crustaceans", "Eggs", "Fish", "Lupin", "Milk", "Molluscs", "Mustard", "Tree nuts", "Peanuts", "Sesame", "Soya", "Sulphites"]


def allergy(compact=False):
    chips = "".join(f'<li>{a}</li>' for a in ALLERGENS)
    return f"""<section class="allergy{' compact' if compact else ''}" aria-labelledby="al-h{'-c' if compact else ''}">
  <div class="wrap"><div class="al-box">
    <div class="al-head">
      <span class="al-icon" aria-hidden="true">!</span>
      <div><h2 id="al-h{'-c' if compact else ''}">Allergies? Speak to our staff before you order.</h2>
      <p>Our kitchen handles all 14 major allergens, so we can't promise any dish is completely free of them. Tell us about any allergy or intolerance before you order and we'll talk you through what's safe.</p></div>
    </div>
    <ul class="al-list" aria-label="The 14 major allergens">{chips}</ul>
    <div class="al-cta"><a class="btn btn-fire btn-sm" href="{PHONE_HREF}">Call {PHONE}</a><a class="btn btn-ghost btn-sm" href="{WA}" {EXT}>Ask on WhatsApp</a><a class="al-addr" href="{MAPS}" {EXT}>{ICONS['pin']}<span>284 Brixton Road, London SW9 6AG</span></a></div>
  </div></div>
</section>"""


DRAWER = """<div class="drawer-scrim" data-close-basket></div>
<aside class="drawer" aria-label="Your order">
  <div class="drawer-head"><h2 class="display">Your order</h2><button class="x-btn" data-close-basket aria-label="Close your order">×</button></div>
  <div class="drawer-body"></div>
  <div class="drawer-foot">
    <div class="total-row"><span class="eyebrow">Total</span><span class="price" data-total></span></div>
    <a class="btn btn-fire" href="order.html">Checkout for collection <span class="arr">→</span></a>
    <p class="note">You pay when you pick it up. No app fees.</p>
  </div>
</aside>"""


def cta(title_html, lead):
    return f"""<section class="cta-band" aria-labelledby="cta-h">
  <canvas data-embers="0.7" aria-hidden="true"></canvas>
  <div class="wrap">
    <p class="eyebrow">284 Brixton Road</p>
    <h2 class="display" id="cta-h" data-split="lines">{title_html}</h2>
    <p class="lead">{lead}</p>
    <div class="cta-row"><a class="btn btn-fire" href="order.html">Order for collection <span class="arr">→</span></a><a class="btn btn-ghost" href="{PHONE_HREF}">Call {PHONE}</a></div>
  </div>
</section>"""


FOOT = f"""<footer class="foot">
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <h4>Visit</h4>
        <p style="margin:0"><a href="{MAPS}" {EXT}>284 Brixton Road<br>London SW9 6AG</a></p>
        <p style="margin:12px 0 0"><a href="{PHONE_HREF}">{PHONE}</a></p>
        <p style="margin:6px 0 0"><a href="{WA}" {EXT}>Message us on WhatsApp</a></p>
        <p style="margin:6px 0 0;color:var(--smoke)">Open daily from 2pm until late</p>
      </div>
      <div>
        <h4>Explore</h4>
        <ul>{''.join(f'<li><a href="{h}">{t}</a></li>' for h, t in NAV_ITEMS)}</ul>
      </div>
      <div>
        <h4>Delivery</h4>
        <ul><li><a href="{UBER}" {EXT}>Uber Eats</a></li><li><a href="{JUSTEAT}" {EXT}>Just Eat</a></li></ul>
      </div>
      <div>
        <h4>Follow</h4>
        <ul><li><a href="{TIKTOK}" {EXT}>TikTok</a></li><li><a href="{INSTA}" {EXT}>Instagram</a></li></ul>
      </div>
    </div>
    <p class="foot-word" aria-hidden="true"><span>Fusion</span> Fast</p>
    <div class="foot-base">
      <span>© 2026 Fusion Fast. Halal Lebanese grill on Brixton Road, London SW9.</span>
      <span><span class="demo-flag">Demo</span> Concept site by SAL Digital. Some photos are placeholders until the shoot.</span>
    </div>
  </div>
</footer>"""


def scripts(*page):
    base = ["assets/vendor/gsap.min.js", "assets/vendor/ScrollTrigger.min.js", "assets/vendor/lenis.min.js", "assets/js/menu-data.js", "assets/js/site.js"]
    return "\n".join(f'<script src="{s}" defer></script>' for s in base + [f"assets/js/{p}.js" for p in page])


def page(file, title, desc, active, body, js=(), ld=None, preload=None):
    html = head(title, desc, "" if file == "index.html" else file, ld, preload) + "<body>\n" + nav(active) + '<main id="main">\n' + body + ("" if file in ("order.html", "404.html") else allergy(True)) + "\n</main>\n" + FOOT + "\n" + mbar(active) + "\n" + DRAWER + "\n" + scripts(*js) + "\n</body>\n</html>\n"
    assert "\u2014" not in html and "\u2013" not in html, f"em dash found in {file}"
    with open(os.path.join(ROOT, file), "w") as f:
        f.write(html)
    print("built", file, len(html) // 1024, "KB")


def img(name, alt, sizes="100vw", cls="", lazy=True, single=False):
    srcset = "" if single else f' srcset="assets/img/{name}-m.webp 900w, assets/img/{name}.webp 1600w" sizes="{sizes}"'
    return f'<img src="assets/img/{name}.webp"{srcset} alt="{alt}"{" loading=\"lazy\"" if lazy else ""} decoding="async"{f" class=\"{cls}\"" if cls else ""}>'


# =====================================================================
# HOME
# =====================================================================
FAQS = [
    ("Is Fusion Fast halal?", "Yes, our food is halal. If you have a question about a particular dish, just ask us when you order and we will talk you through it."),
    ("Where is Fusion Fast?", "We are at 284 Brixton Road, London SW9 6AG, on the main road through Brixton. Stockwell, Kennington and Camberwell are all a short ride away."),
    ("What time are you open?", "We open at 2pm every day and stay open late into the night. If you are coming after midnight, give us a quick call on 020 8075 1647 first."),
    ("Can I order for collection?", "Yes. Build your order on our Order page and send it to us on WhatsApp, or call 020 8075 1647. You pay when you pick it up, with no app fees on top."),
    ("Do you deliver?", "Yes, you can get us delivered through Uber Eats and Just Eat. If you live nearby, collecting direct from us saves you the app charges."),
    ("Do you serve alcohol?", "No. We only serve soft drinks, so it is a relaxed spot for everyone."),
    ("What should I order on my first visit?", "Go for the Mix Grill if you are hungry, the Fusion Naga Doner if you like heat, or the Fusion Fast Box if you cannot decide. It has a bit of everything."),
    ("Do you have vegetarian options?", "Yes. Falafel, grilled halloumi, hummus and our falafel and halloumi wraps are all meat free. Let us know about any allergies when you order."),
]
faq_ld = {"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in FAQS]}

REVIEWS = [
    ("Had a great experience at Fusion Fast. The food was delicious, fresh and made really well. Big shout-out to Shah, the cook.", "Omar J."),
    ("Saw Fusion Fast on TikTok and stopped by on my way home. Both items were absolutely incredible, so full of flavour.", "Leonardo"),
    ("I always come here and the food and service is always excellent. Highly recommend the mix grill.", "Vincent"),
    ("Great Naga doner with good flavour and good pricing!", "Hassan"),
    ("Cooked fresh to order, extremely tasty.", "Ciara O."),
]
rv_html = '<div class="rv big"><span class="stars" aria-hidden="true">★★★★★</span><div><b data-count-to="4.9">4.9</b><p style="margin:10px 0 0;font-size:18px">out of 5 from 27 Google reviews</p></div><a class="btn btn-ghost btn-sm" style="border-color:rgba(244,234,216,.6)" href="' + MAPS + '" ' + EXT + '>Read them on Google</a></div>'
rv_html += "".join(f'<figure class="rv" style="margin:0"><span class="stars" aria-label="5 stars">★★★★★</span><blockquote style="margin:0"><q>{t}</q></blockquote><figcaption class="who">{w}, Google review</figcaption></figure>' for t, w in REVIEWS)

REAL = [("tt-shopfront", "The Fusion Fast shop front on Brixton Road", "The shop, 284 Brixton Road"),
        ("tt-mix-grill", "A Fusion Fast mix grill packed in a takeaway tray", "Mix grill, packed to go"),
        ("tt-charcoal-grill", "Marinated chicken cooking over charcoal", "Chicken on the coals"),
        ("tt-doner-spit", "The doner spit turning in the Fusion Fast kitchen", "The spit, mid turn"),
        ("tt-sea-bass", "Grilled sea bass plated on a Fusion Fast board", "Grilled sea bass"),
        ("tt-menu-board", "The menu boards above the Fusion Fast counter", "Our menu boards")]
real_html = "".join(f'<figure class="real-card" style="margin:0"><div class="ph">{img(n, a, single=True)}</div><figcaption>{c}</figcaption></figure>' for n, a, c in REAL)

faq_html = "".join(f'<details><summary>{q}<i aria-hidden="true"></i></summary><p class="ans">{a}</p></details>' for q, a in FAQS)

HOME = f"""
<section class="story" aria-label="The Fusion Fast story">
  <div class="stage">
    <div class="stage-glow" aria-hidden="true"></div>
    <div class="layer l-spit">{img('spit', 'A doner spit glowing in front of the grill', lazy=False)}</div>
    <div class="layer l-whole">{img('doner-whole', 'A chicken doner wrap packed with salad and garlic sauce')}</div>
    <div class="layer l-burst">{img('doner-burst', 'A doner wrap bursting apart with chicken, tomato, onion and salad')}</div>
    <div class="layer ing l" aria-hidden="true">{img('ingredients', '')}</div>
    <div class="layer ing r" aria-hidden="true">{img('ingredients', '')}</div>
    <div class="layer l-box">{img('box', 'The Fusion Fast Box with chicken, doner, lamb chop, wings and spicy rice')}</div>
    <div class="flash" aria-hidden="true"></div>
    <canvas aria-hidden="true"></canvas>

    <div class="stage-ui">
      <div class="ch-label"><b>01</b><i></i><span>of 04</span></div>
      <div class="halal"><span>✓</span>Halal · Open late</div>

      <div class="titles">
        <h1 class="ch-title"><span class="the">Fusion Fast <em>//</em> Brixton</span><span class="big">The Fire</span></h1>
        <p class="ch-title" aria-hidden="true"><span class="the">Chapter two <em>//</em></span><span class="big">The Doner</span></p>
        <p class="ch-title" aria-hidden="true"><span class="the">Chapter three <em>//</em></span><span class="big">The Burst</span></p>
        <p class="ch-title" aria-hidden="true"><span class="the">Chapter four <em>//</em></span><span class="big">The Box</span></p>
      </div>

      <div class="ch-copy">
        <div class="copy-set">
          <span class="meta">Lebanese grill × Asian spice</span>
          <p>Halal Lebanese grill on Brixton Road. Every skewer, wing and kofta goes over real charcoal, and you'll smell it before you see the sign.</p>
          <div class="row"><a class="btn btn-fire btn-sm" href="order.html">Order for collection</a><a class="btn btn-ghost btn-sm" href="menu.html">See the menu</a></div>
        </div>
        <div class="copy-set">
          <span class="meta">Fusion Naga Doner · £8.50</span>
          <p>Stacked, marinated and turned slowly until the edges catch. The naga version has a proper kick, and it's the one our reviewers keep naming.</p>
          <div class="row"><button class="btn btn-fire btn-sm" data-add="naga-doner">Add to order</button></div>
        </div>
        <div class="copy-set">
          <span class="meta">Why we're called Fusion</span>
          <p>Lebanese grill first, then Asian spice. Naga for heat, shatkora for a sharp citrus lift. Same fresh salad and garlic sauce, a lot more going on.</p>
          <div class="row"><a class="btn btn-ghost btn-sm" href="story.html">Our story</a></div>
        </div>
        <div class="copy-set">
          <span class="meta">Fusion Fast Box · £19</span>
          <p>Boneless chicken, doner, a lamb chop, three honey wings and spicy rice in one box. Perfect for one very hungry person, or two who share.</p>
          <div class="row"><button class="btn btn-fire btn-sm" data-add="fusion-box">Add the box</button><a class="btn btn-ghost btn-sm" href="order.html">Build your own</a></div>
        </div>
      </div>

      <div class="scroll-hint" aria-hidden="true">Scroll<i></i></div>
      <div class="scrub" aria-hidden="true"><div class="on">The Fire<i></i></div><div>The Doner<i></i></div><div>The Burst<i></i></div><div>The Box<i></i></div></div>
    </div>
  </div>
</section>

<section class="statement" aria-label="About Fusion Fast">
  <div class="wrap">
    <p data-hot="charcoal,spice,late">Brixton has plenty of food. We wanted to give it something louder. Lebanese grill over real charcoal, finished with Asian spice. Halal, made to order and open late.</p>
    <div class="statement-foot">
      <div class="stat"><b data-count-to="4.9">4.9</b><span>Google rating from 27 reviews and counting</span></div>
      <div class="stat"><b>2pm</b><span>Doors open every day, and we stay open late</span></div>
      <a class="btn btn-ghost" href="story.html">How we cook <span class="arr">→</span></a>
    </div>
  </div>
</section>

<div class="marquee" aria-hidden="true"><div class="marquee-track"><span>Charcoal grilled</span><span class="o">Halal</span><span>Made to order</span><span class="o">Open late</span><span>284 Brixton Road</span><span>Charcoal grilled</span><span class="o">Halal</span><span>Made to order</span><span class="o">Open late</span><span>284 Brixton Road</span></div></div>

<section class="pad" aria-labelledby="sig-h">
  <div class="wrap">
    <div class="sec-head">
      <div><p class="eyebrow">Signature plates</p><h2 class="display h-l" id="sig-h" data-split="lines">Start<br>with these</h2></div>
      <p class="lead">Five dishes that tell you what we're about. Tap one to have a look, then add it straight to your order.</p>
    </div>
    <div class="picker">
      <ul class="picker-list" role="tablist" aria-label="Signature dishes"></ul>
      <div class="picker-view" role="tabpanel" aria-live="polite">
        <div class="shade"></div>
        <div class="price-tag" aria-hidden="true"></div>
        <div class="picker-card">
          <div><h3 class="display h-s"></h3><p></p></div>
          <button class="btn btn-fire btn-sm" data-add="mix-grill">Add <span class="arr">+</span></button>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="real pad" style="padding-top:0" aria-labelledby="real-h">
  <div class="wrap sec-head">
    <div><p class="eyebrow">Real, from Brixton Road</p><h2 class="display h-m" id="real-h" data-split="lines">Straight from<br>our kitchen</h2></div>
    <a class="badge-tt" href="{TIKTOK}" {EXT}>Follow us on TikTok →</a>
  </div>
  <div class="real-row">{real_html}</div>
</section>

<section class="pad" style="padding-top:0" aria-labelledby="rv-h">
  <div class="wrap">
    <div class="sec-head"><div><p class="eyebrow">What people say</p><h2 class="display h-l" id="rv-h" data-split="lines">Brixton<br>approved</h2></div><p class="lead">Every quote here is a real Google review. We'd love yours next.</p></div>
    <div class="reviews-grid">{rv_html}</div>
  </div>
</section>

<section class="pad" style="padding-top:0" aria-labelledby="direct-h">
  <div class="wrap">
    <div class="sec-head"><div><p class="eyebrow">Order direct</p><h2 class="display h-l" id="direct-h" data-split="lines">Skip the apps.<br><span class="red">Collect it hot.</span></h2></div><a class="btn btn-fire" href="order.html">Start your order <span class="arr">→</span></a></div>
    <div class="steps">
      <div class="step"><h3>Build your order</h3><p>Pick from the full menu or build a meal in three taps. Prices are right there, no surprises.</p></div>
      <div class="step"><h3>Send it on WhatsApp</h3><p>Your order comes straight to us as a WhatsApp message, so nothing gets lost and we can reply if we have a question.</p></div>
      <div class="step"><h3>Pick it up</h3><p>Come to 284 Brixton Road and pay when you collect. No app fees and no service charge on top.</p></div>
    </div>
  </div>
</section>

<section class="pad" style="padding-top:0" aria-labelledby="faq-h">
  <div class="wrap">
    <div class="sec-head"><div><p class="eyebrow">Good to know</p><h2 class="display h-l" id="faq-h" data-split="lines">Questions,<br>answered</h2></div></div>
    <div class="faq">{faq_html}</div>
  </div>
</section>

{cta('Hungry<br><span class="red">yet?</span>', 'Order now and collect from Brixton Road, or give us a ring and we will get it on the grill.')}
"""

page("index.html", "Fusion Fast | Halal Lebanese Charcoal Grill on Brixton Road, SW9",
     "Halal Lebanese grill with Asian spice at 284 Brixton Road, London SW9. Charcoal doner, shawarma, mix grill and wings. Order direct for collection, open late.",
     "index.html", HOME, js=("home",), ld=[faq_ld], preload="assets/img/spit-m.webp")

# =====================================================================
# MENU
# =====================================================================
import re
menu_src = open(os.path.join(ROOT, "assets/js/menu-data.js")).read()
items = re.findall(r'name: "([^"]+)", price: ([\d.]+), desc: "([^"]*)"', menu_src)
cats = re.findall(r'\{ id: "([a-z]+)", name: "([^"]+)", blurb', menu_src)
sections, cur = [], None
for line in menu_src.splitlines():
    m = re.search(r'\{ id: "[a-z]+", name: "([^"]+)", blurb', line)
    if m:
        cur = {"@type": "MenuSection", "name": m.group(1), "hasMenuItem": []}; sections.append(cur); continue
    m = re.search(r'name: "([^"]+)", price: ([\d.]+), desc: "([^"]*)"', line)
    if m and cur is not None:
        it = {"@type": "MenuItem", "name": m.group(1), "offers": {"@type": "Offer", "price": f"{float(m.group(2)):.2f}", "priceCurrency": "GBP"}}
        if m.group(3): it["description"] = m.group(3)
        cur["hasMenuItem"].append(it)
menu_ld = {"@type": "Menu", "@id": SITE + "/menu.html#menu", "name": "Fusion Fast menu", "inLanguage": "en-GB", "hasMenuSection": sections}

# static, crawlable menu fallback (replaced by the interactive version when JS runs)
noscript_menu = "".join(f"<h2>{s['name']}</h2><ul>" + "".join(f"<li>{i['name']} £{i['offers']['price']}</li>" for i in s["hasMenuItem"]) + "</ul>" for s in sections)


MELT = f"""
<section class="melt" aria-labelledby="melt-h">
  <div class="melt-stick">
    <div class="wrap melt-grid">
      <div class="melt-txt">
        <p class="eyebrow">As seen on your feed</p>
        <h2 class="display h-l" id="melt-h" data-split="lines">Say<br><span class="glow">cheese</span></h2>
        <p class="lead">Our Smashburger. Two crispy edged patties, a bun that can barely hold on and cheese that refuses to stay put. Keep scrolling and watch where it ends up.</p>
        <div class="melt-buy"><span class="price"><small>£</small>8.00</span><button class="btn btn-fire" data-add="smashburger">Add a Smashburger <span class="arr">+</span></button></div>
      </div>
      <div class="melt-scene">
        <svg viewBox="0 0 440 1000" role="img" aria-label="A smashburger post with melted cheese dripping down into the mouth of a hungry doodle character below">
          <defs><linearGradient id="chz" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f7b23b"/><stop offset=".55" stop-color="#f39a1c"/><stop offset="1" stop-color="#d97a0a"/></linearGradient>
          <clipPath id="imgclip"><rect x="0" y="56" width="440" height="440"/></clipPath></defs>
          <g class="post">
            <rect width="440" height="548" rx="22" fill="#efebe8"/>
            <circle cx="30" cy="28" r="15" fill="#e3261c"/><text x="30" y="33" text-anchor="middle" font-family="Fraunces,serif" font-style="italic" font-weight="700" font-size="15" fill="#f4ead8">F</text>
            <text x="54" y="25" font-family="Manrope,sans-serif" font-weight="700" font-size="14" fill="#1a1512">fusionfastofficial</text>
            <text x="54" y="42" font-family="Manrope,sans-serif" font-size="12" fill="#6f665d">284 Brixton Road, London</text>
            <text x="410" y="32" font-family="Manrope,sans-serif" font-weight="700" font-size="18" fill="#1a1512">···</text>
            <image href="assets/img/smashburger.webp" x="0" y="56" width="440" height="440" clip-path="url(#imgclip)" preserveAspectRatio="xMidYMid slice"/>
            <g fill="none" stroke="#1a1512" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path class="heart" d="M30 513c-5-6-14-2-12 5 2 6 12 12 12 12s10-6 12-12c2-7-7-11-12-5z"/>
              <path d="M70 512a10 10 0 1 1 4 17l-6 2 2-5a10 10 0 0 1 0-14z"/>
              <path d="M104 509l20 6-9 3-3 9z"/>
            </g>
            <text x="410" y="526" text-anchor="end" font-family="Manrope,sans-serif" font-weight="700" font-size="13" fill="#1a1512">Smashburger · £8</text>
          </g>
          <g class="post2">
            <rect y="588" width="440" height="412" rx="22" fill="#efebe8"/><clipPath id="p2clip"><rect y="588" width="440" height="412" rx="22"/></clipPath>
            <circle cx="30" cy="616" r="15" fill="#c9c1b8"/>
            <text x="54" y="613" font-family="Manrope,sans-serif" font-weight="700" font-size="14" fill="#1a1512">hungry.in.brixton</text>
            <text x="54" y="630" font-family="Manrope,sans-serif" font-size="12" fill="#6f665d">Waiting patiently</text>
            <g clip-path="url(#p2clip)"><g transform="translate(220 784) scale(1.12) translate(-220 -784)"><g class="doodle" fill="none" stroke="#2b3a8f" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M130 862 H 420" stroke-width="2" opacity=".45"/>
              <circle cx="220" cy="810" r="38"/>
              
              <path class="eye" d="M200 812q6 5 12 0M228 812q6 5 12 0"/>
              <ellipse class="mouth-open" cx="220" cy="784" rx="13" ry="10" fill="#2b3a8f"/>
              <path class="mouth-shut" d="M208 786q12 9 24 0" opacity="0"/>
              <path d="M256 822 C 290 830, 330 832, 360 830"/>
              <path d="M258 846 C 292 852, 330 852, 360 848"/>
              <path d="M360 830 C 372 800, 392 790, 402 812 L 410 846 M 360 848 L 404 850"/>
              <path d="M186 826 C 160 830, 148 812, 160 796 C 168 786, 182 790, 184 798"/>
              <path d="M270 834 C 282 846, 300 846, 310 838"/>
              
            </g>
            <g class="blush" opacity="0" fill="#ff8a8a"><ellipse cx="198" cy="822" rx="7" ry="4"/><ellipse cx="242" cy="822" rx="7" ry="4"/></g></g></g>
            <text class="nom" x="262" y="742" font-family="Fraunces,serif" font-style="italic" font-weight="700" font-size="30" fill="#e3261c" opacity="0">mmm.</text>
            <g class="hearts" fill="#e3261c" opacity="0"><path d="M150 760c-4-5-11-2-10 4 1 5 10 10 10 10s9-5 10-10c1-6-6-9-10-4z"/><path d="M300 720c-3-4-9-2-8 3 1 4 8 8 8 8s7-4 8-8c1-5-5-7-8-3z"/></g>
          </g>
          <path class="drip-base" d="M150 398 q14 -6 28 0 q-4 10 -14 12 q-10 -2 -14 -12z" fill="url(#chz)"/>
          <path class="drip" d="M164 404 C 165 470, 158 520, 168 575 C 178 640, 220 690, 220 772" fill="none" stroke="url(#chz)" stroke-width="13" stroke-linecap="round"/>
          <circle class="drip-tip" r="9" fill="#f39a1c"/>
        </svg>
      </div>
    </div>
  </div>
</section>
"""

MENU = f"""
<section class="phero" aria-labelledby="menu-h">
  <span class="num" aria-hidden="true">Menu</span>
  <div class="wrap">
    <p class="eyebrow">Halal · Charcoal grilled · Made to order</p>
    <h1 class="display h-xl" id="menu-h" data-split="chars" data-now>The Menu</h1>
    <p class="lead" data-reveal>Everything here is cooked fresh when you order. Add what you fancy and send it to us for collection, or ring us on {PHONE} and we'll take it over the phone.</p>
    <div class="menu-tools">
      <button class="chip" data-filter="all" aria-pressed="true">All</button>
      <button class="chip" data-filter="popular" aria-pressed="false">Popular</button>
      <button class="chip" data-filter="spicy" aria-pressed="false">Spicy</button>
      <button class="chip" data-filter="veg" aria-pressed="false">Veggie</button>
      <button class="chip" data-filter="share" aria-pressed="false">For sharing</button>
      <label class="search"><span class="sr">Search the menu</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg><input type="search" placeholder="Search doner, wings, chips..." maxlength="40" autocomplete="off"></label>
    </div>
  </div>
</section>
{MELT}
<section class="wrap" style="padding-bottom:clamp(80px,10vw,140px)" aria-label="Menu items">
  <div class="menu-layout">
    <ul class="cat-rail" aria-label="Menu sections"></ul>
    <div data-menu><noscript>{noscript_menu}</noscript></div>
  </div>
  <p class="menu-note">Prices match our current delivery menu and may change.</p>
</section>
{cta('Got your<br><span class="red">order?</span>', 'Head to checkout, pick a collection time and send it over. We will have it ready when you arrive.')}
"""
page("menu.html", "Menu | Fusion Fast Brixton: Doner, Shawarma, Mix Grill & Wings",
     "The full Fusion Fast menu with prices. Halal doner, chicken shawarma, mix grill, lamb chops, honey wings, wraps and burgers on Brixton Road, London SW9.",
     "menu.html", MENU, js=("menu",), ld=[menu_ld])

# =====================================================================
# ORDER
# =====================================================================
ORDER = f"""
<section class="phero" aria-labelledby="order-h">
  <span class="num" aria-hidden="true">Order</span>
  <div class="wrap">
    <p class="eyebrow">Collection from 284 Brixton Road</p>
    <h1 class="display h-l" id="order-h" data-split="lines" data-now>Order for<br><span class="red">collection</span></h1>
    <p class="lead" data-reveal>Build your meal, check your order and send it to us on WhatsApp. We'll confirm it and have it hot and ready when you walk in. You pay in the shop.</p>
  </div>
</section>
{allergy()}
<section class="wrap" style="padding-bottom:clamp(80px,10vw,140px)" aria-label="Build your order">
  <div class="order-grid">
    <div class="builder">
      <div class="b-steps" aria-hidden="true"><span><i></i></span><span><i></i></span><span><i></i></span></div>
      <div class="tray" aria-hidden="true"><div class="tray-box">YOUR BOX</div></div>
      <div class="b-panel" aria-live="polite"></div>
      <div class="b-total"><span class="eyebrow">Meal total</span><span class="price" data-meal-total></span></div>
      <div class="b-nav"><button class="btn btn-ghost btn-sm" data-back>← Back</button><button class="btn btn-fire" data-next>Next <span class="arr">→</span></button></div>
    </div>

    <aside class="checkout" aria-labelledby="co-h">
      <div class="co-head"><p class="eyebrow">Checkout</p><h2 class="display" id="co-h">Your order</h2></div>
      <div class="co-lines"></div>
      <form novalidate autocomplete="on">
        <div class="total-row" style="margin:10px 0 18px"><span class="eyebrow">Total</span><span class="price" data-co-total></span></div>
        <div class="field"><label for="co-name">Your name</label><input id="co-name" name="name" required maxlength="40" autocomplete="given-name"><span class="err">Please add your name so we know whose order it is.</span></div>
        <div class="two">
          <div class="field"><label for="co-phone">Mobile</label><input id="co-phone" name="phone" type="tel" inputmode="tel" required maxlength="20" autocomplete="tel" placeholder="07..."><span class="err">Please add a UK mobile number.</span></div>
          <div class="field"><label for="co-time">Collection time</label><select id="co-time" name="time"></select></div>
        </div>
        <div class="field"><label for="co-notes">Anything we should know?</label><textarea id="co-notes" name="notes" maxlength="200" placeholder="Allergies, extra sauce, no onions..."></textarea></div>
        <p class="co-al"><b>Allergy?</b> Please call us on {PHONE} before you send your order.</p>
        <button class="btn btn-fire co-btn" type="submit">Send order on WhatsApp <span class="arr">→</span></button>
        <p class="co-alt"><span>Prefer to talk?</span><a href="{PHONE_HREF}">Call {PHONE}</a></p>
        <p class="co-alt" style="margin-top:6px"><span>Want it delivered?</span><a href="{UBER}" {EXT}>Uber Eats</a><a href="{JUSTEAT}" {EXT}>Just Eat</a></p>
      </form>
      <div class="done-panel" role="status">
        <div class="ring" aria-hidden="true">🔥</div>
        <h2 class="display h-s">Order sent</h2>
        <p style="color:var(--smoke)">Your reference is <b data-ref style="color:var(--cream)"></b>. Hit send in WhatsApp if it has not gone yet, and we'll have it ready <span data-when></span>.</p>
        <p style="color:var(--smoke)">Pay when you collect at 284 Brixton Road.</p>
        <button class="btn btn-ghost btn-sm" data-reset type="button">Start a new order</button>
      </div>
    </aside>
  </div>
</section>
"""
page("order.html", "Order for Collection | Fusion Fast, 284 Brixton Road, SW9",
     "Order Fusion Fast direct for collection in Brixton. Build your meal, send it on WhatsApp and pay when you pick up. No app fees.",
     "order.html", ORDER, js=("order",))

# =====================================================================
# STORY
# =====================================================================
STEPS = [
    ("01", "Marinate", "Chicken, lamb and wings sit in our house marinade before they go anywhere near the heat. That's where the flavour starts, and it's the bit we never rush.", "stock-spices", "Bowls and spoons of whole and ground spices"),
    ("02", "Charcoal", "Real charcoal, real flame. Skewers, kofta and wings go over the coals so they come off charred on the outside and juicy in the middle.", "skewers", "Kofta and shish skewers cooking over hot charcoal"),
    ("03", "The spit", "Our doner and shawarma turn slowly on the spit and get carved when you order, so every wrap is fresh off the stack.", "stock-spit-carve", "A chef carving meat from a shawarma spit"),
    ("04", "The fusion", "This is where we go our own way. Naga for heat, shatkora for that sharp citrus kick, and a spicy rice that holds its own next to anything on the grill.", "stock-spoons", "Spoons of colourful ground spices on a dark table"),
    ("05", "The box", "Everything lands in a box, hot, and goes straight over the counter. Take it home, take it to a mate's, or eat it on the walk back.", "box", "A loaded Fusion Fast box of grilled meats and spicy rice"),
]
steps_html = "".join(f'<div class="p-step"><div class="ph p-img">{img(i, a, "(max-width:980px) 100vw, 45vw")}</div><div class="p-txt"><span class="num">{n}</span><h2 class="display" data-split="lines">{t}</h2><p>{d}</p></div></div>' for n, t, d, i, a in STEPS)

STORY = f"""
<section class="phero" aria-labelledby="story-h">
  <span class="num" aria-hidden="true">Story</span>
  <div class="wrap">
    <p class="eyebrow">Our story</p>
    <h1 class="display h-l" id="story-h" data-split="lines" data-now>Two worlds,<br><span class="red">one grill</span></h1>
    <p class="lead" data-reveal>Fusion Fast opened on Brixton Road in the summer of 2026 with one idea: take the Lebanese grill we love and push it somewhere new with Asian spice. Here's how a plate comes together.</p>
  </div>
</section>
<section class="wrap process" aria-label="How we cook">
  <svg class="flame-line" aria-hidden="true" preserveAspectRatio="none"></svg>
  {steps_html}
</section>
<section class="pad" aria-labelledby="duo-h">
  <div class="wrap">
    <div class="sec-head"><div><p class="eyebrow">Lebanon meets Asia</p><h2 class="display h-l" id="duo-h" data-split="lines">Drag to taste<br>the difference</h2></div><p class="lead">On one side, the charcoal grill. On the other, the spice cupboard. Every dish we make sits somewhere in the middle.</p></div>
    <div class="duo" role="slider" tabindex="0" aria-label="Compare Lebanese grill and Asian spice" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">
      {img('stock-skewers', 'Chicken and lamb skewers on a charcoal grill', '100vw')}
      <div class="right" style="position:absolute;inset:0">{img('stock-spices', 'A spread of chillies, turmeric, cardamom and other spices', '100vw')}</div>
      <div class="duo-shade"></div>
      <span class="lbl a"><small>The grill</small>Lebanese</span>
      <span class="lbl b"><small>The spice</small>Asian</span>
      <span class="bar" aria-hidden="true"></span><span class="knob" aria-hidden="true">DRAG</span>
    </div>
  </div>
</section>
<section class="pad" style="padding-top:0" aria-label="From our customers">
  <div class="wrap quote-xl">
    <blockquote style="margin:0" data-reveal><q>Big shout-out to Shah, the cook, for doing an excellent job.</q></blockquote>
    <span class="who">Omar J., Google review</span>
  </div>
</section>
{cta('Taste it<br><span class="red">yourself</span>', 'Reading about it only goes so far. Come down to Brixton Road or order ahead for collection.')}
"""
page("story.html", "Our Story | Lebanese Grill Meets Asian Spice in Brixton | Fusion Fast",
     "How Fusion Fast cooks: house marinade, real charcoal, doner carved to order and Asian spice like naga and shatkora. A halal Lebanese grill on Brixton Road, SW9.",
     "story.html", STORY, js=("story",))

# =====================================================================
# VISIT
# =====================================================================
VISIT = f"""
<section class="phero" style="padding-bottom:40px" aria-labelledby="visit-h">
  <div class="wrap"><p class="eyebrow">Find us</p><h1 class="sr" id="visit-h">Find Fusion Fast at 284 Brixton Road, London SW9 6AG</h1></div>
  <div class="kinetic" aria-hidden="true"><span class="row">284 Brixton <span class="red">✦</span> 284 Brixton</span><span class="row o">Road SW9 6AG · Road SW9 6AG</span><span class="row">Open late <span class="red">✦</span> Open late</span></div>
</section>
<section class="wrap" aria-label="Location and contact">
  <div class="visit-grid">
    <div class="map">
      <span class="pin" aria-hidden="true"></span>
      <div class="map-load"><div><p class="display h-s" style="margin:0">284 Brixton Road</p><p>The map loads from Google when you ask for it.</p><button class="btn btn-ghost btn-sm" data-load-map>Show the map</button></div></div>
    </div>
    <div class="info-stack">
      <div class="info"><h3>Address</h3><p class="big">284 Brixton Road<br>London SW9 6AG</p><p>On the main road through Brixton, with Stockwell, Kennington and Camberwell all close by.</p><div class="row"><a class="btn btn-fire btn-sm" href="{MAPS}" {EXT}>Get directions</a></div></div>
      <div class="info"><h3>Call us</h3><p class="big"><span class="ring-phone" aria-hidden="true">📞</span> <a href="{PHONE_HREF}">{PHONE}</a></p><p>Order over the phone or ask us anything about the menu.</p><div class="row"><a class="btn btn-fire btn-sm" href="{PHONE_HREF}">Call now</a><a class="btn btn-ghost btn-sm" href="{WA}" {EXT}>WhatsApp us</a></div></div>
      <div class="info"><h3>Follow us</h3><p class="big">@fusionfastofficial</p><p>New dishes, offers and what's on the grill today.</p><div class="row"><a class="btn btn-ghost btn-sm" href="{TIKTOK}" {EXT}>TikTok</a><a class="btn btn-ghost btn-sm" href="{INSTA}" {EXT}>Instagram</a></div></div>
      <div class="info"><h3>Opening hours</h3><p class="big">Daily from 2pm</p><p>We stay open late into the night. Coming after midnight? Give us a quick call first.</p></div>
    </div>
  </div>
</section>
<section class="wrap pad" style="padding-bottom:0" aria-labelledby="apps-h">
  <div class="sec-head"><div><p class="eyebrow">Can't make it?</p><h2 class="display h-m" id="apps-h" data-split="lines">We deliver<br>too</h2></div><p class="lead">Order for collection here and save the app fees, or get us delivered across south London on the apps.</p></div>
  <div class="apps-row">
    <a class="app-card" href="{UBER}" {EXT}><div><b>Uber Eats</b><span>Delivery to your door</span></div><span class="arr" aria-hidden="true">↗</span></a>
    <a class="app-card" href="{JUSTEAT}" {EXT}><div><b>Just Eat</b><span>Delivery to your door</span></div><span class="arr" aria-hidden="true">↗</span></a>
  </div>
</section>
<section class="wrap pad" aria-labelledby="local-h">
  <div style="max-width:780px">
    <p class="eyebrow">Halal food in Brixton</p>
    <h2 class="display h-s" id="local-h" style="margin-bottom:16px">Looking for a late night grill near you?</h2>
    <p class="lead">Fusion Fast is a halal Lebanese grill at 284 Brixton Road in SW9. We cook doner, chicken shawarma, mix grills, lamb chops and wings over charcoal, with Asian spice running through the menu. We're easy to reach from Stockwell, Kennington, Camberwell, Oval and Clapham, and we're open late every day.</p>
  </div>
</section>
{cta('See you<br><span class="red">soon</span>', 'Order ahead and skip the wait, or just turn up hungry.')}
"""
page("visit.html", "Find Us | Fusion Fast, 284 Brixton Road, London SW9 6AG",
     "Fusion Fast is at 284 Brixton Road, London SW9 6AG. Open daily from 2pm until late. Call 020 8075 1647, get directions or order for collection.",
     "visit.html", VISIT, js=("visit",))

# =====================================================================
# 404
# =====================================================================
NF = f"""
<section class="phero" style="min-height:80vh" aria-labelledby="nf-h">
  <span class="num" aria-hidden="true">404</span>
  <div class="wrap"><p class="eyebrow">Page not found</p><h1 class="display h-l" id="nf-h">This one fell<br><span class="red">off the grill</span></h1>
  <p class="lead">The page you're after isn't here. The food definitely is.</p>
  <div class="cta-row" style="justify-content:flex-start;margin-top:30px"><a class="btn btn-fire" href="menu.html">See the menu</a><a class="btn btn-ghost" href="index.html">Back home</a></div></div>
</section>"""
page("404.html", "Page not found | Fusion Fast Brixton", "That page could not be found. Head back to the Fusion Fast menu or home page.", "", NF)

# =====================================================================
# SEO files
# =====================================================================
urls = ["", "menu.html", "order.html", "story.html", "visit.html"]
with open(os.path.join(ROOT, "sitemap.xml"), "w") as f:
    f.write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "".join(f"  <url><loc>{SITE}/{u}</loc><lastmod>{TODAY}</lastmod></url>\n" for u in urls) + "</urlset>\n")
with open(os.path.join(ROOT, "robots.txt"), "w") as f:
    f.write(f"User-agent: *\nAllow: /\n\nSitemap: {SITE}/sitemap.xml\n")
menu_txt = "\n".join(f"### {s['name']}\n" + "\n".join(f"- {i['name']}: £{i['offers']['price']}" for i in s["hasMenuItem"]) for s in sections)
with open(os.path.join(ROOT, "llms.txt"), "w") as f:
    f.write(f"""# Fusion Fast

> Halal Lebanese charcoal grill with Asian spice at 284 Brixton Road, London SW9 6AG. Doner, shawarma, mix grill, lamb chops and wings, cooked to order. Open daily from 2pm until late. No alcohol served.

- Address: 284 Brixton Road, London SW9 6AG, United Kingdom
- Phone: {PHONE}
- Order for collection: {SITE}/order.html (sent by WhatsApp, pay on collection)
- Delivery: Uber Eats ({UBER}) and Just Eat ({JUSTEAT})
- Google rating: 4.9 from 27 reviews (October 2026)
- Areas nearby: Brixton, Stockwell, Kennington, Camberwell, Oval, Clapham

## Pages
- [Home]({SITE}/): what we cook and why
- [Menu]({SITE}/menu.html): full menu with prices
- [Order]({SITE}/order.html): order direct for collection
- [Our Story]({SITE}/story.html): how a plate comes together
- [Find Us]({SITE}/visit.html): address, hours and directions

## FAQ
""" + "\n".join(f"**{q}** {a}" for q, a in FAQS) + "\n\n## Menu\n" + menu_txt + "\n")
print("seo files written")
