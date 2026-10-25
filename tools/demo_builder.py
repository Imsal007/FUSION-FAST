#!/usr/bin/env python3
"""Builds a SAL Digital concept demo page for a fictional restaurant.
Each demo lives in demos/<slug>/ with a config.json, img/ and fonts/.
Run:  python3 tools/demo_builder.py            (all demos)
      python3 tools/demo_builder.py cinder-and-bun
The shared look and behaviour live in demos/_shared/ so a new restaurant
is a new config, a palette, a font pair and photos."""
import json, os, sys, html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEMOS = os.path.join(ROOT, "demos")
LP = "https://saldigital.co/lp/restaurants/"
e = html.escape


def price(p):
    return f"£{p:.2f}"


def piece_img():
    return '<picture><source media="(max-width:760px)" srcset="img/subject-m.webp"><img src="img/subject.webp" alt="" loading="lazy"></picture>'


def breakdown(c, aspect):
    b = c.get("breakdown")
    if not b:
        return ""
    names = {it["id"]: it["name"] for m in c["menu"] for it in m["items"]}
    parts = ""
    if b["mode"] == "stack":
        n = len(b["pieces"])
        for i, (y0, y1, label) in enumerate(b["pieces"]):
            side = "r" if i % 2 == 0 else "l"
            parts += (f'<div class="pc" data-i="{i}" style="--y0:{y0};--y1:{y1};--yc:{(y0 + y1) / 2:.3f}">'
                      f'<div class="pc-img">{piece_img()}</div><p class="bd-lab {side}">{e(label)}</p></div>')
        caps = ""
    else:
        n = len(b["pieces"])
        caps = ""
        for i, label in enumerate(b["pieces"]):
            parts += f'<div class="pc wedge" data-i="{i}"><div class="pc-img">{piece_img()}</div></div>'
            caps += f'<p class="cap" data-i="{i}">{e(label)}</p>'
        caps = f'<div class="bd-caps" aria-hidden="true">{caps}</div>'
    floats = "".join(f'<img class="fl" data-i="{i}" src="img/{f}.webp" alt="" loading="lazy">' for i, f in enumerate(b.get("floaters", [])))
    spices = f'<p class="bd-spices">{e(b["spices"])}</p>' if b.get("spices") else ""
    labels_sr = "".join(f"<li>{e(p[2] if isinstance(p, list) else p)}</li>" for p in b["pieces"])
    radial = f' data-cx="{b.get("cx", 0.5)}" data-cy="{b.get("cy", 0.5)}"' if b["mode"] == "radial" else ""
    return f"""<section class="bd" id="inside" data-mode="{b["mode"]}" data-n="{n}"{radial} aria-labelledby="bd-h">
  <div class="bd-pin">
    <h2 id="bd-h" class="display h2 bd-title">{e(b["title"])}</h2>
    <ul class="sr">{labels_sr}</ul>
    <div class="bd-stage" style="aspect-ratio:{aspect}">{floats}{parts}</div>
    {caps}{spices}
    <div class="bd-out"><p class="display">{e(b["outro"])}</p><button class="btn btn-main" data-add="{b["item"]}">Add the {e(names.get(b["item"], "dish").removeprefix("The "))}</button></div>
  </div>
</section>"""


def build(slug):
    d = os.path.join(DEMOS, slug)
    c = json.load(open(os.path.join(d, "config.json"), encoding="utf-8"))
    t = c["theme"]
    h = c["hero"]
    lp_link = f"{LP}?utm_source=demo-site&utm_medium=cta&utm_campaign={slug}#demo"

    try:
        from PIL import Image
        with Image.open(os.path.join(d, "img", "subject.webp")) as im:
            aspect = round(im.width / im.height, 3)
    except Exception:
        aspect = 1.2
    faces = "".join(
        f'@font-face{{font-family:"{f["family"]}";src:url(fonts/{f["file"]}) format("woff2");font-weight:{f["weight"]};font-display:swap}}'
        for f in c["fonts"]
    )
    root_vars = (
        f':root{{--bg:{t["bg"]};--bg2:{t["bg2"]};--ink:{t["ink"]};--muted:{t["muted"]};'
        f'--accent:{t["accent"]};--accent-ink:{t["accent_ink"]};--glow:{t["glow"]};'
        f'--aspect:{aspect};--h1m:{h.get("h1", 16.5)};--w-display:{t.get("wdisplay", 400)};--case:{t.get("case", "uppercase")};--shadow:{t.get("shadow", "rgba(0,0,0,.55)")};'
        f'--f-display:"{t["display"]}",Impact,sans-serif;--f-body:"{t["body"]}",system-ui,sans-serif}}'
    )

    hero_lines = "".join(f'<span class="hl"><span>{e(l)}</span></span>' for l in h["lines"])
    strip = "".join(f"<span>{e(s)}</span>" for s in c["strip"]) * 2
    steps = "".join(
        f'<li><b>{i + 1}</b><div><h3>{e(s["t"])}</h3><p>{e(s["d"])}</p></div></li>'
        for i, s in enumerate(c["steps"])
    )
    tabs = "".join(
        f'<button class="tab" role="tab" data-cat="{m["id"]}" aria-selected="{"true" if i == 0 else "false"}">{e(m["name"])}</button>'
        for i, m in enumerate(c["menu"])
    )
    cats = ""
    for i, m in enumerate(c["menu"]):
        rows = ""
        for it in m["items"]:
            tag = f'<em class="tag">{e(it["tag"])}</em>' if it["tag"] else ""
            desc = f'<p>{e(it["desc"])}</p>' if it["desc"] else ""
            rows += (
                f'<li class="item" data-id="{it["id"]}" data-name="{e(it["name"])}" data-price="{it["price"]}">'
                f'<div class="item-main"><h3>{e(it["name"])}{tag}</h3>{desc}</div>'
                f'<div class="item-buy"><span class="price">{price(it["price"])}</span>'
                f'<button class="add" aria-label="Add {e(it["name"])}">+</button></div></li>'
            )
        cats += f'<ul class="cat" id="cat-{m["id"]}" role="tabpanel"{"" if i == 0 else " hidden"}>{rows}</ul>'

    bd_html = breakdown(c, aspect)
    f = c["feature"]
    v = c["visit"]
    hours = "".join(f"<tr><td>{e(a)}</td><td>{e(b)}</td></tr>" for a, b in v["hours"])
    menu_json = json.dumps({"wa": c["whatsapp"], "name": c["name"]}).replace("</", "<\\/")

    page = f"""<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{e(c["title"])}</title>
<meta name="description" content="{e(c["description"])}">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="{t["bg"]}">
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'">
<link rel="preload" as="image" href="img/subject-m.webp" type="image/webp" media="(max-width:760px)">
<link rel="preload" as="image" href="img/subject.webp" type="image/webp" media="(min-width:761px)">
<link rel="preload" as="font" href="fonts/{c["fonts"][0]["file"]}" type="font/woff2" crossorigin>
<style>{faces}{root_vars}</style>
<link rel="stylesheet" href="../_shared/demo.css">
</head>
<body>
<a class="sr" href="#menu">Skip to menu</a>
<header class="top">
  <a class="mark" href="#top" aria-label="{e(c["name"])} home"><span>{e(c["mark"][0])}</span> {e(c["mark"][1])}</a>
  <button class="basket-btn" data-open aria-label="Open your order"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg><span>Order</span><b data-count>0</b></button>
</header>

<main id="top">
<section class="hero" id="hero">
  <div class="hero-pin">
    <div class="layer plate" aria-hidden="true"><img src="img/plate.webp" alt=""></div>
    <div class="layer light" aria-hidden="true"></div>
    <div class="layer word" aria-hidden="true"><span>{e(h["word"])}</span></div>
    <div class="layer subject"><picture><source media="(max-width:760px)" srcset="img/subject-m.webp"><img src="img/subject.webp" alt="{e(h["subject_alt"])}" fetchpriority="high"></picture></div>
    <canvas class="layer fx" aria-hidden="true"></canvas>
    <div class="hero-copy">
      <div class="hero-top">
        <p class="eyebrow">{e(h["eyebrow"])}</p>
        <h1 class="display">{hero_lines}</h1>
      </div>
      <div class="hero-bottom">
        <p class="sub">{e(h["sub"])}</p>
        <p class="beat2 display" aria-hidden="true">{"<br>".join(e(x) for x in h["beat2"])}</p>
        <div class="cta-row">
          <button class="btn btn-main" data-open>Order on WhatsApp</button>
          <a class="btn btn-ghost" href="#menu">See the menu</a>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="strip" aria-hidden="true"><div class="strip-track">{strip}</div></div>

{bd_html}

<section class="steps wrap" aria-labelledby="steps-h">
  <h2 id="steps-h" class="display h2">How it <span class="acc">works</span></h2>
  <ol>{steps}</ol>
</section>

<section class="feature">
  <picture><source media="(max-width:760px)" srcset="img/{f["img"]}-m.webp"><img src="img/{f["img"]}.webp" alt="{e(f["title"])}" loading="lazy"></picture>
  <div class="feature-copy">
    <h2 class="display h2">{e(f["title"])}</h2>
    <p>{e(f["text"])}</p>
    <button class="btn btn-main" data-add="{f["item"]}">Add to my order</button>
  </div>
</section>

<section class="menu wrap" id="menu" aria-labelledby="menu-h">
  <h2 id="menu-h" class="display h2">The <span class="acc">menu</span></h2>
  <div class="tabs" role="tablist">{tabs}</div>
  {cats}
</section>

<section class="visit wrap" id="visit">
  <h2 class="display h2">Find <span class="acc">us</span></h2>
  <div class="visit-grid">
    <div><p class="big">{e(v["lines"][0])}</p><p class="muted">{e(v["note"])}</p></div>
    <table class="hours"><tbody>{hours}</tbody></table>
  </div>
</section>
</main>

<footer class="foot">
  <div class="demo-note"><span class="demo-flag">Concept</span> This is a demo website made by SAL Digital. {e(c["name"])} is a fictional restaurant.</div>
  <a class="btn btn-main foot-cta" href="{lp_link}" target="_blank" rel="noopener">Want a site like this for your restaurant? Get a free demo</a>
</footer>

<div class="bar"><button class="btn btn-main" data-open>View order <b data-count>0</b></button></div>

<aside class="drawer" id="drawer" aria-hidden="true" aria-label="Your order">
  <div class="drawer-head"><h2 class="display">Your order</h2><button class="close" data-close aria-label="Close">×</button></div>
  <ul class="lines" id="lines"></ul>
  <p class="empty" id="empty">Nothing yet. Tap + on a burger to start.</p>
  <div class="drawer-foot">
    <label class="field">Your name<input id="cust" type="text" autocomplete="given-name" placeholder="For the bag"></label>
    <div class="total"><span>Total, pay on collection</span><b id="total">£0.00</b></div>
    <a class="btn btn-wa" id="send" href="#" target="_blank" rel="noopener" aria-disabled="true">Send order on WhatsApp</a>
  </div>
</aside>
<div class="scrim" data-close></div>

<script type="application/json" id="cfg">{menu_json}</script>
<script src="../_shared/gsap.min.js"></script>
<script src="../_shared/ScrollTrigger.min.js"></script>
<script src="../_shared/lenis.min.js"></script>
<script src="../_shared/demo.js"></script>
</body>
</html>
"""
    out = os.path.join(d, "index.html")
    open(out, "w", encoding="utf-8").write(page)
    print("built", os.path.relpath(out, ROOT))


if __name__ == "__main__":
    slugs = sys.argv[1:] or [n for n in sorted(os.listdir(DEMOS)) if os.path.exists(os.path.join(DEMOS, n, "config.json"))]
    for s in slugs:
        build(s)
