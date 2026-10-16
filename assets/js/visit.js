/* Visit page: kinetic address, click-to-load map (keeps Google off the page until asked) */
(function () {
  const FF = window.FF;
  const reduce = FF.reduce || !window.gsap;

  const btn = document.querySelector("[data-load-map]");
  if (btn) btn.addEventListener("click", () => {
    const wrap = btn.closest(".map");
    const f = document.createElement("iframe");
    f.title = "Map showing Fusion Fast at 284 Brixton Road, London SW9 6AG";
    f.loading = "lazy"; f.referrerPolicy = "no-referrer-when-downgrade";
    f.src = "https://www.google.com/maps?q=" + encodeURIComponent("Fusion Fast, 284 Brixton Road, London SW9 6AG") + "&output=embed";
    wrap.appendChild(f);
    wrap.querySelector(".map-load").remove();
  });

  if (reduce) return;
  document.addEventListener("ff:ready", () => {
    document.querySelectorAll(".kinetic .row").forEach((r, i) => {
      gsap.fromTo(r, { xPercent: i % 2 ? -12 : 4 }, { xPercent: i % 2 ? 2 : -14, ease: "none", scrollTrigger: { trigger: r, start: "top bottom", end: "bottom top", scrub: true } });
    });
    gsap.from(".info", { y: 50, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.1, scrollTrigger: { trigger: ".visit-grid", start: "top 85%" } });
    gsap.from(".app-card", { y: 40, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.1, scrollTrigger: { trigger: ".apps-row", start: "top 90%" } });
  });
})();
