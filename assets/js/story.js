/* Story page: flame line, process reveals, two-worlds slider */
(function () {
  const FF = window.FF;
  const reduce = FF.reduce || !window.gsap;

  /* two worlds drag slider (works with or without GSAP) */
  const duo = document.querySelector(".duo");
  if (duo) {
    const right = duo.querySelector(".right"), bar = duo.querySelector(".bar"), knob = duo.querySelector(".knob");
    let dragging = false;
    function set(pct) {
      pct = Math.max(6, Math.min(94, pct));
      right.style.clipPath = `inset(0 0 0 ${pct}%)`; bar.style.left = pct + "%"; knob.style.left = pct + "%";
      duo.setAttribute("aria-valuenow", Math.round(pct));
    }
    const at = (e) => { const r = duo.getBoundingClientRect(); return ((e.clientX - r.left) / r.width) * 100; };
    duo.addEventListener("pointerdown", (e) => { dragging = true; duo.setPointerCapture(e.pointerId); set(at(e)); });
    duo.addEventListener("pointermove", (e) => { if (dragging) set(at(e)); });
    duo.addEventListener("pointerup", () => (dragging = false));
    duo.addEventListener("keydown", (e) => {
      const v = parseFloat(duo.getAttribute("aria-valuenow") || 50);
      if (e.key === "ArrowLeft") { set(v - 5); e.preventDefault(); }
      if (e.key === "ArrowRight") { set(v + 5); e.preventDefault(); }
    });
    set(50);
    if (!reduce) {
      document.addEventListener("ff:ready", () => {
        const o = { v: 50 };
        gsap.timeline({ scrollTrigger: { trigger: duo, start: "top 70%" } })
          .to(o, { v: 22, duration: 1.1, ease: "power3.inOut", onUpdate: () => !dragging && set(o.v) })
          .to(o, { v: 78, duration: 1.4, ease: "power3.inOut", onUpdate: () => !dragging && set(o.v) })
          .to(o, { v: 50, duration: 1, ease: "power3.inOut", onUpdate: () => !dragging && set(o.v) });
      });
    }
  }

  if (reduce) return;
  document.addEventListener("ff:ready", () => {
    /* flame line drawn by scroll */
    const proc = document.querySelector(".process");
    const svg = proc && proc.querySelector(".flame-line");
    if (svg) {
      const h = proc.offsetHeight, w = svg.clientWidth || 120, mid = w / 2;
      let d = `M ${mid} 0`;
      for (let y = 0; y < h; y += 260) d += ` C ${mid + 50} ${y + 70}, ${mid - 50} ${y + 190}, ${mid} ${y + 260}`;
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      svg.innerHTML = `<path class="bg" d="${d}"/><path class="fg" d="${d}"/>`;
      const fg = svg.querySelector(".fg"), len = fg.getTotalLength();
      fg.style.strokeDasharray = len; fg.style.strokeDashoffset = len;
      gsap.to(fg, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: proc, start: "top 60%", end: "bottom 60%", scrub: 0.5 } });
    }
    document.querySelectorAll(".p-step").forEach((s) => {
      const img = s.querySelector(".p-img"), pic = img && img.querySelector("img");
      if (img) gsap.fromTo(img, { clipPath: "inset(20% 20% 20% 20% round 24px)" }, { clipPath: "inset(0% 0% 0% 0% round 18px)", ease: "none", scrollTrigger: { trigger: s, start: "top 85%", end: "center 55%", scrub: 0.6 } });
      if (pic) gsap.to(pic, { scale: 1, ease: "none", scrollTrigger: { trigger: s, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from(s.querySelector(".num"), { xPercent: -30, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: s, start: "top 70%" } });
    });
  });
})();
