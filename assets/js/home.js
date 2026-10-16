/* Home page: the doner story, statement highlight, dish picker, real strip */
(function () {
  const FF = window.FF;
  const reduce = FF.reduce || !window.gsap;
  if (reduce) document.documentElement.classList.add("reduce");

  /* ---------------- dish picker (works without GSAP too) ---------------- */
  const DISHES = [
    { id: "mix-grill", img: "mixgrill", note: "Kofta, chicken shish and lamb shish straight off the charcoal, on rice or chips." },
    { id: "naga-doner", img: "doner-whole", note: "Our doner with a proper naga kick. The one people mention in their reviews." },
    { id: "fusion-box", img: "box", note: "Boneless chicken, doner, a lamb chop, three honey wings and spicy rice. A bit of everything." },
    { id: "lamb-chops", img: "chops", note: "Lamb chops marinated in our sauce, charred on the grill and served on spicy rice." },
    { id: "honey-wings", img: "stock-wings-plate", note: "Grilled wings finished with a sticky honey glaze. Rice or chips on the side." }
  ];
  const list = document.querySelector(".picker-list");
  const view = document.querySelector(".picker-view");
  if (list && view) {
    list.innerHTML = DISHES.map((d, i) => {
      const it = FF.items[d.id];
      return `<li><button role="tab" aria-selected="${i === 0}" data-i="${i}" data-cursor="View"><span class="n">0${i + 1}</span><span class="t">${FF.esc(it.name)}</span><span class="p">${FF.money(it.price)}</span></button></li>`;
    }).join("");
    const nameEl = view.querySelector("h3"), noteEl = view.querySelector(".picker-card p"), tag = view.querySelector(".price-tag"), addBtn = view.querySelector("[data-add]");
    let cur = 0;
    function show(i) {
      if (i === cur && view.querySelector("img")) return;
      cur = i;
      const d = DISHES[i], it = FF.items[d.id];
      list.querySelectorAll("button").forEach((b) => b.setAttribute("aria-selected", +b.dataset.i === i));
      const img = new Image();
      img.src = `assets/img/${d.img}.webp`; img.alt = it.name; img.decoding = "async";
      img.srcset = `assets/img/${d.img}-m.webp 900w, assets/img/${d.img}.webp 1600w`; img.sizes = "(max-width:980px) 100vw, 60vw";
      view.insertBefore(img, view.querySelector(".shade"));
      const old = [...view.querySelectorAll("img")].slice(0, -1);
      nameEl.textContent = it.name; noteEl.textContent = d.note;
      tag.innerHTML = `<span><small>ONLY</small>${FF.money(it.price)}</span>`;
      addBtn.dataset.add = it.id;
      if (!reduce) {
        gsap.fromTo(img, { clipPath: "inset(0 0 0 100%)", scale: 1.15 }, { clipPath: "inset(0 0 0 0%)", scale: 1, duration: 1.1, ease: "expo.inOut", onComplete: () => old.forEach((o) => o.remove()) });
        gsap.fromTo(tag, { scale: 0, rotate: -40 }, { scale: 1, rotate: -10, duration: 0.8, ease: "back.out(2)", delay: 0.35 });
        gsap.fromTo([nameEl, noteEl], { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "expo.out", stagger: 0.06, delay: 0.25 });
      } else old.forEach((o) => o.remove());
    }
    list.addEventListener("click", (e) => { const b = e.target.closest("button[data-i]"); if (b) show(+b.dataset.i); });
    list.addEventListener("mouseover", (e) => { const b = e.target.closest("button[data-i]"); if (b && matchMedia("(hover:hover)").matches) show(+b.dataset.i); });
    cur = -1; show(0);
  }

  if (reduce) return;

  document.addEventListener("ff:ready", () => {
    /* ---------------- THE STORY ---------------- */
    const story = document.querySelector(".story");
    if (story) {
      const L = (s) => story.querySelector(s);
      const spit = L(".l-spit"), whole = L(".l-whole"), burst = L(".l-burst"), ingL = L(".ing.l"), ingR = L(".ing.r"), box = L(".l-box"), flash = L(".flash");
      const titles = [...story.querySelectorAll(".ch-title")];
      const copies = [...story.querySelectorAll(".copy-set")];
      const num = L(".ch-label b");
      const bars = [...story.querySelectorAll(".scrub div")];
      const embersCanvas = L("canvas");
      const embers = embersCanvas ? FF.Embers(embersCanvas, { density: 1.1 }) : null;

      gsap.set(story.querySelectorAll(".layer"), { xPercent: -50, yPercent: -50, x: 0, y: 0 });
      titles.forEach((t) => FF.split(t.querySelector(".big"), "chars"));
      const chars = titles.map((t) => t.querySelectorAll(".split-char"));

      /* intro: first title rises in */
      gsap.from(chars[0], { yPercent: 110, rotate: 8, duration: 1.2, ease: "expo.out", stagger: 0.03, delay: 0.1 });
      gsap.from(spit, { scale: 1.25, opacity: 0, duration: 1.8, ease: "expo.out" });
      gsap.from(copies[0], { y: 30, opacity: 0, duration: 1, ease: "expo.out", delay: 0.5 });

      const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: story, start: "top top", end: "bottom bottom", scrub: 0.8 } });

      function swap(from, to, at) {
        tl.to(chars[from], { yPercent: -110, rotate: -6, stagger: 0.012, duration: 2.2, ease: "power2.in" }, at)
          .set(titles[from], { visibility: "hidden" }, at + 3)
          .set(titles[to], { visibility: "visible" }, at + 2)
          .fromTo(chars[to], { yPercent: 110, rotate: 8 }, { yPercent: 0, rotate: 0, stagger: 0.012, duration: 2.6, ease: "power3.out", immediateRender: false }, at + 2.2)
          .to(copies[from], { autoAlpha: 0, y: -20, duration: 2 }, at)
          .fromTo(copies[to], { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 2.4, immediateRender: false }, at + 2.4);
      }

      tl.set({}, {}, 100);
      /* chapter 1: the fire */
      tl.to(spit, { scale: 1.12, y: "-2vh", duration: 22 }, 0);
      /* chapter 2: the doner */
      swap(0, 1, 21);
      tl.to(spit, { opacity: 0, scale: 0.85, duration: 6 }, 21)
        .fromTo(whole, { opacity: 0, y: "16vh", scale: 0.86 }, { opacity: 1, y: 0, scale: 1, duration: 10, ease: "power2.out" }, 23)
        .to(whole, { scale: 1.07, duration: 15 }, 33);
      /* chapter 3: the burst */
      swap(1, 2, 47);
      tl.to(flash, { opacity: 0.95, duration: 2.5, ease: "power2.in" }, 49)
        .to(flash, { opacity: 0, duration: 7, ease: "power2.out" }, 51.5)
        .to(whole, { opacity: 0, scale: 1.12, duration: 3 }, 50)
        .fromTo(burst, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1.03, duration: 9, ease: "power3.out" }, 50.5)
        .to(burst, { scale: 1.06, duration: 14 }, 60)
        .fromTo(ingL, { opacity: 0, xPercent: -32, scale: 0.45, rotate: 10 }, { opacity: 0.9, xPercent: -50, scale: 0.92, rotate: 0, duration: 13, ease: "power3.out" }, 50.5)
        .fromTo(ingR, { opacity: 0, xPercent: -68, scale: 0.45, rotate: -10 }, { opacity: 0.9, xPercent: -50, scale: 0.92, rotate: 0, duration: 13, ease: "power3.out" }, 50.5)
        .to(ingL, { xPercent: -54, scale: 1, rotate: -3, duration: 12 }, 63.5)
        .to(ingR, { xPercent: -46, scale: 1, rotate: 3, duration: 12 }, 63.5);
      /* chapter 4: the box */
      swap(2, 3, 75);
      tl.to(burst, { opacity: 0, scale: 1.25, duration: 7 }, 75)
        .to(ingL, { xPercent: -80, scale: 1.5, opacity: 0, duration: 9 }, 75)
        .to(ingR, { xPercent: -20, scale: 1.5, opacity: 0, duration: 9 }, 75)
        .fromTo(box, { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 0.92, duration: 10, ease: "power2.out" }, 78)
        .to(box, { scale: 0.96, duration: 12 }, 88);

      const marks = [0, 0.235, 0.49, 0.765, 1];
      let lastCh = -1;
      ScrollTrigger.create({
        trigger: story, start: "top top", end: "bottom bottom",
        onUpdate: (self) => {
          const p = self.progress;
          let ch = marks.findIndex((m, i) => p >= m && p < marks[i + 1]); if (ch < 0) ch = 3;
          bars.forEach((b, i) => {
            const local = Math.min(1, Math.max(0, (p - marks[i]) / (marks[i + 1] - marks[i])));
            b.querySelector("i").style.width = local * 100 + "%";
            b.classList.toggle("on", i === ch);
          });
          if (ch !== lastCh) { lastCh = ch; if (num) num.textContent = "0" + (ch + 1); }
          if (embers) embers.setHeat(1 + (p > 0.47 && p < 0.78 ? 1.6 : 0) + p * 0.6);
        }
      });
      const hint = L(".scroll-hint");
      if (hint) gsap.to(hint, { opacity: 0, scrollTrigger: { trigger: story, start: "top top", end: "+=200", scrub: true } });
    }

    /* ---------------- statement word light-up ---------------- */
    const st = document.querySelector(".statement p");
    if (st) {
      const hot = (st.dataset.hot || "").split(",");
      const walk = (node) => [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((w) => {
            if (!w) return;
            if (/^\s+$/.test(w)) return frag.append(" ");
            const s = document.createElement("span"); s.className = "w" + (hot.includes(w.replace(/[^\w]/g, "").toLowerCase()) ? " hot" : ""); s.textContent = w; frag.append(s);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
      walk(st);
      const ws = st.querySelectorAll(".w");
      ScrollTrigger.create({ trigger: st, start: "top 80%", end: "bottom 45%", scrub: true,
        onUpdate: (s) => { const k = Math.round(s.progress * ws.length); ws.forEach((w, i) => w.classList.toggle("lit", i < k)); } });
    }

    /* ---------------- real strip drift ---------------- */
    const row = document.querySelector(".real-row");
    if (row) {
      gsap.to(row, { x: () => -Math.max(0, row.scrollWidth - innerWidth), ease: "none",
        scrollTrigger: { trigger: ".real", start: "top bottom", end: "bottom top", scrub: 0.6, invalidateOnRefresh: true } });
    }

    /* ---------------- review cards stagger ---------------- */
    gsap.from(".rv", { y: 60, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: ".reviews-grid", start: "top 85%" } });
    gsap.from(".step", { y: 50, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.12, scrollTrigger: { trigger: ".steps", start: "top 85%" } });
  });
})();
