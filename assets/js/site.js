/* =========================================================
   FUSION FAST: shared engine
   transitions · smooth scroll · cursor · basket · reveals · embers
   ========================================================= */
(function () {
  const doc = document.documentElement;
  doc.classList.add("js");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
  const INFO = window.FF_INFO || {};
  const FF = (window.FF = window.FF || {});
  FF.reduce = reduce;

  /* ---------- safe storage ---------- */
  const store = {
    mem: {},
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return this.mem[k] || null; } },
    set(k, v) { this.mem[k] = v; try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };

  /* ---------- money ---------- */
  FF.money = (n) => "£" + (Math.round(n * 100) / 100).toFixed(2);

  /* ---------- menu lookup ---------- */
  FF.items = {};
  (window.FF_MENU || []).forEach((c) => c.items.forEach((i) => (FF.items[i.id] = Object.assign({ cat: c.name }, i))));

  /* =====================================================
     BASKET
     ===================================================== */
  const B = (FF.basket = {
    lines: store.get("ff-basket") || [],
    save() { store.set("ff-basket", this.lines); this.render(); },
    add(line) {
      const key = line.key || line.id;
      const found = this.lines.find((l) => l.key === key);
      if (found) found.qty += line.qty || 1;
      else this.lines.push({ key, id: line.id, name: line.name, price: line.price, qty: line.qty || 1, sub: line.sub || "" });
      this.save();
      bump();
      toast(line.name + " added");
    },
    inc(key, d) {
      const l = this.lines.find((x) => x.key === key);
      if (!l) return;
      l.qty += d;
      if (l.qty <= 0) this.lines = this.lines.filter((x) => x.key !== key);
      this.save();
    },
    clear() { this.lines = []; this.save(); },
    count() { return this.lines.reduce((a, l) => a + l.qty, 0); },
    total() { return this.lines.reduce((a, l) => a + l.qty * l.price, 0); },
    render() {
      document.querySelectorAll("[data-count]").forEach((el) => (el.textContent = this.count() || (el.dataset.count === "always" ? "0" : "")));
      const body = document.querySelector(".drawer-body");
      const tot = document.querySelector("[data-total]");
      if (tot) tot.innerHTML = priceHTML(this.total());
      document.dispatchEvent(new CustomEvent("ff:basket"));
      if (!body) return;
      if (!this.lines.length) {
        body.innerHTML = '<div class="drawer-empty"><p class="display">Nothing on<br>the grill yet</p><p>Pick something from the menu or build your own box.</p><p style="margin-top:22px"><a class="btn btn-ghost btn-sm" href="menu.html" data-link>Browse the menu</a></p></div>';
        return;
      }
      body.innerHTML = this.lines.map((l) => `
        <div class="line-item">
          <div class="nm">${esc(l.name)}</div>
          <div class="price" style="font-size:20px">${FF.money(l.price * l.qty)}</div>
          ${l.sub ? `<div class="sub">${esc(l.sub)}</div>` : ""}
          <div class="qty" aria-label="Quantity"><button data-q="${l.key}" data-d="-1" aria-label="Remove one">−</button><span>${l.qty}</span><button data-q="${l.key}" data-d="1" aria-label="Add one">+</button></div>
        </div>`).join("");
    }
  });
  function priceHTML(n) { const s = FF.money(n).slice(1); return '<small>£</small>' + s; }
  FF.priceHTML = priceHTML;
  function esc(s) { return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
  FF.esc = esc;
  function bump() { document.querySelectorAll(".basket-btn .count").forEach((c) => { c.classList.remove("bump"); void c.offsetWidth; c.classList.add("bump"); }); }

  let toastT;
  function toast(msg) {
    let t = document.querySelector(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.innerHTML = "<i></i>" + esc(msg);
    requestAnimationFrame(() => t.classList.add("show"));
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove("show"), 2200);
  }
  FF.toast = toast;

  /* drawer */
  FF.openBasket = () => doc.classList.add("basket-open");
  FF.closeBasket = () => doc.classList.remove("basket-open");
  document.addEventListener("click", (e) => {
    const q = e.target.closest("[data-q]");
    if (q) { B.inc(q.dataset.q, +q.dataset.d); return; }
    if (e.target.closest("[data-open-basket]")) { e.preventDefault(); FF.openBasket(); return; }
    if (e.target.closest("[data-close-basket]")) { FF.closeBasket(); return; }
    const add = e.target.closest("[data-add]");
    if (add) {
      const it = FF.items[add.dataset.add];
      if (it) B.add({ id: it.id, name: it.name, price: it.price });
      add.classList.add("added"); setTimeout(() => add.classList.remove("added"), 900);
    }
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { FF.closeBasket(); doc.classList.remove("menu-open"); } });

  /* =====================================================
     NAV
     ===================================================== */
  const nav = document.querySelector(".nav");
  let lastY = 0;
  function onScroll(y) {
    if (!nav) return;
    nav.classList.toggle("scrolled", y > 40);
    nav.classList.toggle("hide", y > lastY && y > 400 && !doc.classList.contains("menu-open"));
    lastY = y;
  }
  const burger = document.querySelector(".burger");
  if (burger) burger.addEventListener("click", () => {
    const open = doc.classList.toggle("menu-open");
    burger.setAttribute("aria-expanded", open);
  });

  /* =====================================================
     SMOOTH SCROLL (Lenis) + GSAP
     ===================================================== */
  let lenis = null;
  const hasGSAP = !!window.gsap;
  if (hasGSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    FF.lenis = lenis;
    lenis.on("scroll", (e) => { onScroll(e.scroll); if (window.ScrollTrigger) ScrollTrigger.update(); });
    if (hasGSAP) { gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); }
    else { const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf); }
  } else {
    window.addEventListener("scroll", () => onScroll(window.scrollY), { passive: true });
  }
  FF.scrollTo = (target) => { if (lenis) lenis.scrollTo(target, { offset: -90 }); else { const el = typeof target === "string" ? document.querySelector(target) : target; if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); } };

  /* =====================================================
     CURSOR
     ===================================================== */
  if (fine && !reduce) {
    const ring = document.createElement("div"); ring.className = "cursor";
    const dot = document.createElement("div"); dot.className = "cursor-dot";
    document.body.append(ring, dot);
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px)`; });
    (function loop() { rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16; ring.style.transform = `translate(${rx}px,${ry}px)`; requestAnimationFrame(loop); })();
    document.addEventListener("mouseover", (e) => {
      const t = e.target.closest("a,button,[data-cursor]");
      ring.classList.toggle("hover", !!t);
      ring.textContent = t && t.dataset.cursor ? t.dataset.cursor : "";
    });
  }

  /* =====================================================
     SPLIT TEXT
     ===================================================== */
  FF.split = function (el, mode) {
    if (el.dataset.splitDone) return el;
    el.dataset.splitDone = 1;
    if (mode === "chars") {
      const walk = (node) => {
        [...node.childNodes].forEach((n) => {
          if (n.nodeType === 3) {
            const frag = document.createDocumentFragment();
            n.textContent.split(/(\s+)/).forEach((word) => {
              if (!word) return;
              if (/^\s+$/.test(word)) { frag.append(document.createTextNode(" ")); return; }
              const w = document.createElement("span"); w.style.display = "inline-block"; w.style.whiteSpace = "nowrap";
              [...word].forEach((ch) => { const s = document.createElement("span"); s.className = "split-char"; s.textContent = ch; w.append(s); });
              frag.append(w);
            });
            n.replaceWith(frag);
          } else if (n.nodeType === 1 && n.tagName !== "BR") walk(n);
        });
      };
      walk(el);
    } else {
      /* lines: author marks lines with <br>; wrap each in a mask */
      const parts = el.innerHTML.split(/<br\s*\/?>/i);
      el.innerHTML = parts.map((p) => `<span class="split-line"><span>${p}</span></span>`).join("");
    }
    return el;
  };

  /* =====================================================
     REVEALS
     ===================================================== */
  function initReveals() {
    if (!hasGSAP || reduce) { document.querySelectorAll("[data-reveal]").forEach((el) => { el.style.opacity = 1; el.style.transform = "none"; el.style.clipPath = "none"; }); return; }
    document.querySelectorAll("[data-split]").forEach((el) => {
      FF.split(el, el.dataset.split);
      const targets = el.dataset.split === "chars" ? el.querySelectorAll(".split-char") : el.querySelectorAll(".split-line>span");
      gsap.set(targets, { yPercent: 110, rotate: el.dataset.split === "chars" ? 6 : 0 });
      gsap.to(targets, { yPercent: 0, rotate: 0, duration: 1.1, ease: "expo.out", stagger: el.dataset.split === "chars" ? 0.025 : 0.09,
        scrollTrigger: el.hasAttribute("data-now") ? null : { trigger: el, start: "top 88%" }, delay: el.hasAttribute("data-now") ? 0.35 : 0 });
    });
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      const kind = el.dataset.reveal;
      const st = { trigger: el, start: "top 90%" };
      const d = parseFloat(el.dataset.delay || 0);
      if (kind === "clip") gsap.to(el, { clipPath: "inset(0% 0 0 0)", duration: 1.4, ease: "expo.inOut", delay: d, scrollTrigger: st });
      else gsap.to(el, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", delay: d, scrollTrigger: st });
    });
    document.querySelectorAll("[data-parallax]").forEach((el) => {
      const amt = parseFloat(el.dataset.parallax) || 12;
      gsap.fromTo(el, { yPercent: -amt }, { yPercent: amt, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
    });
    document.querySelectorAll("[data-count-to]").forEach((el) => {
      const to = parseFloat(el.dataset.countTo), dec = (el.dataset.countTo.split(".")[1] || "").length;
      const o = { v: 0 };
      gsap.to(o, { v: to, duration: 2, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" }, onUpdate: () => (el.textContent = o.v.toFixed(dec)) });
    });
  }

  /* =====================================================
     EMBERS: the signature particle field
     ===================================================== */
  FF.Embers = function (canvas, opts) {
    opts = Object.assign({ density: 1, heat: 1, followMouse: true }, opts || {});
    const ctx = canvas.getContext("2d");
    let w, h, dpr, parts = [], mouse = { x: -999, y: -999 }, visible = true, heat = opts.heat;
    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect(); w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.round(Math.min(140, (w * h) / 9000) * opts.density);
      while (parts.length < target) parts.push(spawn(true));
      parts.length = target;
    }
    function spawn(anywhere) {
      return { x: Math.random() * w, y: anywhere ? Math.random() * h : h + 10, r: Math.random() * 2.2 + 0.4, vy: -(Math.random() * 0.9 + 0.35), vx: (Math.random() - 0.5) * 0.3, life: Math.random() * 0.6 + 0.4, ph: Math.random() * Math.PI * 2, hue: 18 + Math.random() * 22 };
    }
    function frame(t) {
      if (!visible) return requestAnimationFrame(frame);
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const p of parts) {
        p.ph += 0.02;
        p.x += p.vx + Math.sin(p.ph) * 0.35;
        p.y += p.vy * heat;
        if (opts.followMouse) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
          if (d2 < 16000) { const f = (1 - d2 / 16000) * 1.6; p.x += (dx / 90) * f; p.y += (dy / 90) * f - 0.4 * f; }
        }
        const fade = Math.min(1, (p.y / h) * 1.6) * p.life;
        if (p.y < -10 || fade <= 0.02) Object.assign(p, spawn(false));
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
        g.addColorStop(0, `hsla(${p.hue + 20},100%,75%,${fade})`);
        g.addColorStop(0.3, `hsla(${p.hue},100%,55%,${fade * 0.55})`);
        g.addColorStop(1, "hsla(10,100%,40%,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      requestAnimationFrame(frame);
    }
    if (reduce) { size(); return { setHeat() {} }; }
    size(); addEventListener("resize", size);
    if (opts.followMouse) canvas.parentElement.addEventListener("pointermove", (e) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    new IntersectionObserver((en) => (visible = en[0].isIntersecting)).observe(canvas);
    requestAnimationFrame(frame);
    return { setHeat(v) { heat = v; } };
  };

  /* =====================================================
     PAGE TRANSITIONS
     ===================================================== */
  const pt = document.querySelector(".pt");
  function enter() {
    if (!pt) return Promise.resolve();
    if (!hasGSAP || reduce) { pt.style.display = "none"; return Promise.resolve(); }
    const p1 = pt.querySelector(".pt-panel"), p2 = pt.querySelector(".p2"), mk = pt.querySelector(".pt-mark");
    const tl = gsap.timeline();
    tl.set([p1, p2], { yPercent: 0 })
      .fromTo(mk, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" })
      .to(mk, { opacity: 0, y: -30, duration: 0.35, ease: "power2.in" }, "+=.15")
      .to(p2, { yPercent: -100, duration: 0.8, ease: "expo.inOut" }, "-=.15")
      .to(p1, { yPercent: -100, duration: 0.8, ease: "expo.inOut" }, "-=.68")
      .set(pt, { display: "none" });
    return new Promise((r) => tl.eventCallback("onComplete", r));
  }
  function leave(href) {
    if (!pt || !hasGSAP || reduce) { location.href = href; return; }
    const p1 = pt.querySelector(".pt-panel"), p2 = pt.querySelector(".p2"), mk = pt.querySelector(".pt-mark");
    gsap.set(pt, { display: "grid" });
    gsap.set([p1, p2], { yPercent: 100 }); gsap.set(mk, { opacity: 0 });
    gsap.timeline({ onComplete: () => (location.href = href) })
      .to(p1, { yPercent: 0, duration: 0.65, ease: "expo.inOut" })
      .to(p2, { yPercent: 0, duration: 0.65, ease: "expo.inOut" }, "-=.5");
  }
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank") return;
    const href = a.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:") || /^https?:/.test(href)) return;
    e.preventDefault();
    doc.classList.remove("menu-open"); FF.closeBasket();
    leave(href);
  });
  window.addEventListener("pageshow", (e) => { if (e.persisted && pt) pt.style.display = "none"; });

  /* =====================================================
     BOOT
     ===================================================== */
  B.render();
  FF.ready = enter().then(() => {
    initReveals();
    document.dispatchEvent(new CustomEvent("ff:ready"));
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  });
  document.querySelectorAll("canvas[data-embers]").forEach((c) => FF.Embers(c, { density: parseFloat(c.dataset.embers) || 0.6 }));
})();
