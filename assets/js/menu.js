/* Menu page: render, filters, search, scroll-spy rail, hover preview */
(function () {
  const FF = window.FF, MENU = window.FF_MENU || [];
  const reduce = FF.reduce || !window.gsap;
  const root = document.querySelector("[data-menu]");
  const rail = document.querySelector(".cat-rail");
  if (!root) return;

  const TAGS = { popular: "Popular", spicy: "Spicy", veg: "Veggie", share: "For sharing" };
  const cam = '<svg class="cam" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 8h3l2-2h6l2 2h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>';
  const plus = '<svg class="plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg><svg class="tick" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

  root.innerHTML = MENU.map((c) => `
    <section class="cat" id="${c.id}" aria-labelledby="h-${c.id}">
      <div class="cat-head"><h2 class="display" id="h-${c.id}">${FF.esc(c.name)}</h2><p>${FF.esc(c.blurb)}</p></div>
      ${c.items.map((i) => `
        <article class="item" data-tags="${i.tags.join(" ")}" data-name="${FF.esc((i.name + " " + i.desc).toLowerCase())}" ${i.img ? `data-img="${i.img}"` : ""}>
          <h3>${FF.esc(i.name)}${i.img ? cam : ""}</h3>
          ${i.desc ? `<p class="d">${FF.esc(i.desc)}</p>` : ""}
          ${i.tags.length ? `<div class="tags">${i.tags.map((t) => `<span class="tag ${t}">${TAGS[t]}</span>`).join("")}</div>` : ""}
          <div class="price">${FF.priceHTML(i.price)}</div>
          <button class="add" data-add="${i.id}" aria-label="Add ${FF.esc(i.name)} to your order">${plus}</button>
        </article>`).join("")}
    </section>`).join("") + '<p class="no-results">Nothing matches that. Try "doner", "wings" or "spicy".</p>';

  rail.innerHTML = '<span class="ind" aria-hidden="true"></span>' + MENU.map((c) => `<li><a href="#${c.id}">${FF.esc(c.name)}</a></li>`).join("");

  /* rail clicks smooth-scroll */
  rail.addEventListener("click", (e) => { const a = e.target.closest("a"); if (!a) return; e.preventDefault(); FF.scrollTo(a.getAttribute("href")); });

  /* scroll spy */
  const links = [...rail.querySelectorAll("a")], ind = rail.querySelector(".ind");
  function setOn(id) {
    links.forEach((a) => {
      const on = a.getAttribute("href") === "#" + id;
      a.classList.toggle("on", on);
      if (on) {
        ind.style.transform = `translateY(${a.parentElement.offsetTop}px)`; ind.style.height = a.offsetHeight + "px";
        if (getComputedStyle(rail).display === "flex") rail.scrollTo({ left: a.parentElement.offsetLeft - 20, behavior: "smooth" });
      }
    });
  }
  const io = new IntersectionObserver((en) => { en.forEach((x) => { if (x.isIntersecting) setOn(x.target.id); }); }, { rootMargin: "-35% 0px -60% 0px" });
  root.querySelectorAll(".cat").forEach((s) => io.observe(s));
  setOn(MENU[0].id);

  /* filters + search */
  let filter = "all", q = "";
  const chips = [...document.querySelectorAll(".chip[data-filter]")];
  const input = document.querySelector(".search input");
  function apply() {
    let shown = 0;
    root.querySelectorAll(".cat").forEach((cat) => {
      let n = 0;
      cat.querySelectorAll(".item").forEach((it) => {
        const ok = (filter === "all" || it.dataset.tags.split(" ").includes(filter)) && (!q || it.dataset.name.includes(q));
        it.classList.toggle("hide", !ok); if (ok) n++;
      });
      cat.style.display = n ? "" : "none"; shown += n;
    });
    root.querySelector(".no-results").style.display = shown ? "none" : "block";
    if (!reduce) gsap.fromTo(root.querySelectorAll(".item:not(.hide)"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.012, ease: "expo.out", overwrite: true });
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }
  chips.forEach((c) => c.addEventListener("click", () => { filter = c.dataset.filter; chips.forEach((x) => x.setAttribute("aria-pressed", x === c)); apply(); }));
  if (input) input.addEventListener("input", () => { q = input.value.trim().toLowerCase().slice(0, 40); apply(); });

  /* hover image preview (desktop) */
  if (matchMedia("(hover:hover) and (pointer:fine)").matches) {
    const hv = document.createElement("div"); hv.className = "hover-img"; hv.setAttribute("aria-hidden", "true"); hv.innerHTML = "<img alt=''>"; document.body.appendChild(hv);
    const hi = hv.querySelector("img");
    let x = 0, y = 0, cx = 0, cy = 0, active = false;
    root.addEventListener("mouseover", (e) => {
      const it = e.target.closest(".item[data-img]");
      if (it) { const src = `assets/img/${it.dataset.img}${it.dataset.img.startsWith("tt-") ? "" : "-m"}.webp`; if (!hi.src.endsWith(src)) hi.src = src; hv.classList.add("show"); active = true; }
      else { hv.classList.remove("show"); active = false; }
    });
    root.addEventListener("mouseleave", () => { hv.classList.remove("show"); active = false; });
    addEventListener("mousemove", (e) => { x = e.clientX + 30; y = e.clientY - 120; });
    (function loop() { cx += (x - cx) * 0.14; cy += (y - cy) * 0.14; if (active || hv.classList.contains("show")) hv.style.left = cx + "px", hv.style.top = cy + "px"; requestAnimationFrame(loop); })();
  }

  /* entrance */
  document.addEventListener("ff:ready", () => {
    if (reduce) return;
    root.querySelectorAll(".cat").forEach((cat) => {
      gsap.from(cat.querySelector(".cat-head h2"), { yPercent: 60, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: cat, start: "top 85%" } });
      gsap.from(cat.querySelectorAll(".item"), { y: 30, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.05, scrollTrigger: { trigger: cat, start: "top 80%" } });
    });
    gsap.from(".chip,.search", { y: 20, opacity: 0, duration: 0.8, stagger: 0.05, ease: "expo.out", delay: 0.3 });
  });
})();

/* Viral cheese drip: scroll pulls the melt down into the doodle's mouth */
(function () {
  const sec = document.querySelector(".melt"); if (!sec) return;
  const path = sec.querySelector(".drip"), tip = sec.querySelector(".drip-tip");
  const len = path.getTotalLength();
  path.style.strokeDasharray = len;
  function set(p) {
    const d = Math.max(0.02, Math.min(1, p));
    path.style.strokeDashoffset = len * (1 - d);
    const pt = path.getPointAtLength(len * d);
    tip.setAttribute("cx", pt.x); tip.setAttribute("cy", pt.y + 3);
    tip.style.opacity = d >= 0.985 ? 0 : 1;
    sec.classList.toggle("ate", d >= 0.985);
  }
  if (window.FF.reduce || !window.gsap) { set(1); return; }
  set(0.02);
  document.addEventListener("ff:ready", () => {
    ScrollTrigger.create({ trigger: sec, start: "top top", end: "bottom bottom", scrub: 0.4,
      onUpdate: (s) => set(Math.min(1, Math.max(0, (s.progress - 0.08) / 0.78))) });
  });
})();

/* Touch devices: tap a dish with a photo to slide the photo open under it */
(function () {
  if (matchMedia("(hover:hover) and (pointer:fine)").matches) return;
  const root = document.querySelector("[data-menu]"); if (!root) return;
  const reduce = window.FF.reduce || !window.gsap;
  root.querySelectorAll(".item[data-img]").forEach((it) => {
    it.setAttribute("role", "button"); it.setAttribute("tabindex", "0"); it.setAttribute("aria-expanded", "false");
    const h = it.querySelector("h3"); if (h) it.setAttribute("aria-label", "Show photo of " + h.textContent.trim());
  });
  function toggle(it) {
    let ph = it.querySelector(".item-ph");
    const open = !it.classList.contains("open");
    root.querySelectorAll(".item.open").forEach((o) => { if (o !== it) close(o); });
    if (!open) return close(it);
    if (!ph) {
      const src = it.dataset.img;
      ph = document.createElement("div"); ph.className = "item-ph";
      const img = new Image(); img.alt = (it.querySelector("h3") || {}).textContent || ""; img.decoding = "async";
      img.src = `assets/img/${src}${src.startsWith("tt-") ? "" : "-m"}.webp`;
      ph.appendChild(img); it.appendChild(ph);
    }
    it.classList.add("open"); it.setAttribute("aria-expanded", "true");
    if (!reduce) gsap.fromTo(ph, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.6, ease: "expo.out", onComplete: () => window.ScrollTrigger && ScrollTrigger.refresh() });
  }
  function close(it) {
    const ph = it.querySelector(".item-ph"); it.classList.remove("open"); it.setAttribute("aria-expanded", "false");
    if (ph && !reduce) gsap.to(ph, { height: 0, opacity: 0, duration: 0.4, ease: "power2.inOut", onComplete: () => window.ScrollTrigger && ScrollTrigger.refresh() });
  }
  root.addEventListener("click", (e) => {
    if (e.target.closest(".add")) return;
    const it = e.target.closest(".item[data-img]"); if (it) toggle(it);
  });
  root.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && e.target.matches(".item[data-img]")) { e.preventDefault(); toggle(e.target); }
  });
})();
