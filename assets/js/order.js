/* Order page: build-a-meal flow + collection checkout via WhatsApp */
(function () {
  const FF = window.FF, INFO = window.FF_INFO || {};
  const reduce = FF.reduce || !window.gsap;
  const builder = document.querySelector(".builder");
  const checkout = document.querySelector(".checkout");
  if (!builder || !checkout) return;

  const STEPS = [
    { key: "main", title: "Pick your main", sub: "Everything here comes off the charcoal or the spit.", ids: ["mix-grill", "naga-doner", "fusion-box", "chicken-shish", "lamb-chops", "honey-wings", "chicken-shawarma", "honey-boneless", "whole-chicken"], required: true },
    { key: "side", title: "Add a side", sub: "Optional, but the cheesy chips are hard to skip.", ids: ["chips", "spicy-chips", "cheesy-chips", "hummus-bread", "falafel", "halloumi", "onion-rings"], required: false },
    { key: "drink", title: "Something cold", sub: "All soft drinks. We don't serve alcohol.", ids: ["coke", "diet-coke", "pepsi", "7up", "fanta", "mirinda-orange", "rubicon-mango", "water"], required: false }
  ];
  const pick = { main: null, side: null, drink: null };
  let step = 0;

  const panel = builder.querySelector(".b-panel");
  const bars = [...builder.querySelectorAll(".b-steps span")];
  const tray = builder.querySelector(".tray");
  const totalEl = builder.querySelector("[data-meal-total]");
  const back = builder.querySelector("[data-back]"), next = builder.querySelector("[data-next]");

  function mealTotal() { return ["main", "side", "drink"].reduce((a, k) => a + (pick[k] ? FF.items[pick[k]].price : 0), 0); }

  function renderStep(dir) {
    const s = STEPS[step];
    panel.innerHTML = `<p class="eyebrow">Step ${step + 1} of 3</p><h2 class="display">${s.title}</h2><p>${s.sub}</p>
      <div class="opts" role="group" aria-label="${s.title}">${s.ids.map((id) => {
        const it = FF.items[id];
        return `<button class="opt" data-id="${id}" aria-pressed="${pick[s.key] === id}"><span class="ck" aria-hidden="true">✓</span><span class="on">${FF.esc(it.name)}</span><span class="op">${FF.money(it.price)}</span></button>`;
      }).join("")}</div>`;
    bars.forEach((b, i) => b.classList.toggle("done", i <= step));
    back.style.visibility = step ? "visible" : "hidden";
    next.innerHTML = step < 2 ? 'Next <span class="arr">→</span>' : 'Add meal to order <span class="arr">→</span>';
    if (!reduce) gsap.fromTo(panel.children, { x: dir === -1 ? -40 : 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: "expo.out", stagger: 0.05 });
  }

  function renderTray() {
    tray.querySelectorAll(".chipfood").forEach((c) => c.remove());
    const chosen = ["main", "side", "drink"].filter((k) => pick[k]);
    chosen.forEach((k, i) => {
      const c = document.createElement("span"); c.className = "chipfood";
      c.textContent = FF.items[pick[k]].name;
      const n = chosen.length, spread = Math.min(280, innerWidth * 0.5);
      c.style.left = `calc(50% + ${(i - (n - 1) / 2) * (spread / Math.max(1, n - 1 || 1))}px)`;
      c.style.transform = "translateX(-50%)";
      tray.appendChild(c);
      if (!reduce && i === chosen.length - 1 && renderTray.last !== pick[k]) gsap.from(c, { y: -160, rotate: (Math.random() - 0.5) * 30, opacity: 0, duration: 0.9, ease: "bounce.out" });
    });
    renderTray.last = chosen.length ? pick[chosen[chosen.length - 1]] : null;
    const t = mealTotal();
    if (!reduce) { const o = { v: parseFloat(totalEl.dataset.v || 0) }; gsap.to(o, { v: t, duration: 0.6, ease: "power2.out", onUpdate: () => (totalEl.innerHTML = FF.priceHTML(o.v)) }); }
    else totalEl.innerHTML = FF.priceHTML(t);
    totalEl.dataset.v = t;
  }

  panel.addEventListener("click", (e) => {
    const b = e.target.closest(".opt"); if (!b) return;
    const k = STEPS[step].key;
    pick[k] = pick[k] === b.dataset.id ? null : b.dataset.id;
    panel.querySelectorAll(".opt").forEach((o) => o.setAttribute("aria-pressed", o.dataset.id === pick[k]));
    renderTray();
  });
  back.addEventListener("click", () => { if (step > 0) { step--; renderStep(-1); } });
  next.addEventListener("click", () => {
    if (STEPS[step].required && !pick[STEPS[step].key]) { FF.toast("Pick a main to carry on"); if (!reduce) gsap.fromTo(panel.querySelector(".opts"), { x: -8 }, { x: 0, duration: 0.5, ease: "elastic.out(1,.3)" }); return; }
    if (step < 2) { step++; renderStep(1); return; }
    const parts = ["main", "side", "drink"].filter((k) => pick[k]).map((k) => FF.items[pick[k]]);
    FF.basket.add({ key: "meal:" + parts.map((p) => p.id).join("+"), id: "meal", name: parts[0].name + (parts.length > 1 ? " meal" : ""), sub: parts.slice(1).map((p) => p.name).join(" + "), price: mealTotal() });
    pick.main = pick.side = pick.drink = null; step = 0; renderStep(-1); renderTray();
    if (!reduce) gsap.fromTo(checkout, { scale: 0.98 }, { scale: 1, duration: 0.8, ease: "elastic.out(1,.4)" });
  });
  renderStep(1); renderTray();

  /* ---------------- checkout ---------------- */
  const coLines = checkout.querySelector(".co-lines");
  function renderCheckout() {
    const L = FF.basket.lines;
    coLines.innerHTML = L.length ? L.map((l) => `
      <div class="line-item"><div class="nm">${FF.esc(l.name)}</div><div class="price" style="font-size:20px">${FF.money(l.price * l.qty)}</div>
      ${l.sub ? `<div class="sub">${FF.esc(l.sub)}</div>` : ""}
      <div class="qty"><button type="button" data-q="${FF.esc(l.key)}" data-d="-1" aria-label="Remove one">−</button><span>${l.qty}</span><button type="button" data-q="${FF.esc(l.key)}" data-d="1" aria-label="Add one">+</button></div></div>`).join("")
      : '<p style="color:var(--smoke);margin:0">Your order is empty. Build a meal or <a href="menu.html" style="text-decoration:underline">add from the menu</a>.</p>';
    checkout.querySelector("[data-co-total]").innerHTML = FF.priceHTML(FF.basket.total());
  }
  document.addEventListener("ff:basket", renderCheckout);
  renderCheckout();

  /* collection times: now + 20 min, then every 15 min for 3 hours */
  const sel = checkout.querySelector("#co-time");
  if (sel) {
    const opts = ['<option value="As soon as possible">As soon as possible (about 20 min)</option>'];
    const d = new Date(Date.now() + 35 * 60000); d.setMinutes(Math.ceil(d.getMinutes() / 15) * 15, 0, 0);
    for (let i = 0; i < 12; i++) { const t = new Date(d.getTime() + i * 15 * 60000); const s = t.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }); opts.push(`<option value="${s}">${s}</option>`); }
    sel.innerHTML = opts.join("");
  }

  const form = checkout.querySelector("form");
  const clean = (s, max) => String(s || "").replace(/[\u0000-\u001f\u007f<>]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = clean(form.name.value, 40), phone = clean(form.phone.value, 20), time = clean(form.time.value, 40), notes = clean(form.notes.value, 200);
    let ok = true;
    const fName = form.name.closest(".field"), fPhone = form.phone.closest(".field");
    fName.classList.toggle("bad", name.length < 2); if (name.length < 2) ok = false;
    const digits = phone.replace(/[^\d+]/g, "");
    const phoneOk = /^(\+44|0)\d{9,10}$/.test(digits);
    fPhone.classList.toggle("bad", !phoneOk); if (!phoneOk) ok = false;
    if (!FF.basket.lines.length) { FF.toast("Add something to your order first"); return; }
    if (!ok) return;

    const lines = FF.basket.lines.map((l) => `${l.qty} x ${l.name}${l.sub ? " (" + l.sub + ")" : ""}  ${FF.money(l.qty * l.price)}`);
    const msg = ["Hi Fusion Fast, I'd like to order for collection please.", "", ...lines, "", `Total: ${FF.money(FF.basket.total())} (pay on collection)`, `Name: ${name}`, `Phone: ${phone}`, `Collection: ${time}`, notes ? `Notes: ${notes}` : ""].filter((x, i, a) => x !== "" || a[i - 1] !== "").join("\n");
    const url = `https://wa.me/${encodeURIComponent(INFO.whatsapp)}?text=${encodeURIComponent(msg)}`;
    const a = document.createElement("a");
    a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer";
    document.body.appendChild(a); a.click(); a.remove();
    const ref = "FF-" + Math.floor(1000 + Math.random() * 9000);
    checkout.querySelector("[data-ref]").textContent = ref;
    checkout.querySelector("[data-when]").textContent = time === "As soon as possible" ? "in about 20 minutes" : "at " + time;
    checkout.classList.add("is-done");
    FF.basket.clear();
    if (!reduce) gsap.from(checkout.querySelector(".done-panel").children, { y: 30, opacity: 0, stagger: 0.08, duration: 0.9, ease: "expo.out" });
  });
  checkout.querySelector("[data-reset]").addEventListener("click", () => checkout.classList.remove("is-done"));

  document.addEventListener("ff:ready", () => {
    if (reduce) return;
    gsap.from([builder, checkout], { y: 60, opacity: 0, duration: 1.2, ease: "expo.out", stagger: 0.12 });
  });
})();
