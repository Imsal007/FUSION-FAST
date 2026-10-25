// Deterministic 1080x1920 capture of a demo page. Virtual clock drives GSAP, rAF and CSS animations.
// Usage: serve the repo (python3 -m http.server 8765 --bind 127.0.0.1), then
//   node tools/record-demo.js <frames_dir> <slug>
//   ffmpeg -framerate 30 -i <frames_dir>/%05d.jpg -c:v libx264 -crf 14 -pix_fmt yuv420p ads/reels/public/demos/<slug>.mp4
const { chromium } = require('playwright');
const fs = require('fs');
const [,, OUT, slug, onlyFrames] = process.argv;
const FPS = 30, DT = 1000 / FPS;
const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 405, height: 720 }, deviceScaleFactor: 8 / 3, isMobile: true, hasTouch: true });
  const p = await ctx.newPage();
  await p.clock.install({ time: 0 });
  await p.clock.pauseAt(1);
  await p.goto(`http://127.0.0.1:8765/demos/${slug}/index.html`, { waitUntil: 'load' });
  await p.evaluate(async () => {
    document.querySelectorAll('img[loading="lazy"]').forEach(i => { i.loading = 'eager'; });
    await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })));
    await document.fonts.ready;
    // keep the WhatsApp tap on the page
    document.querySelector('#send').addEventListener('click', e => e.preventDefault(), true);
    window.__vt = 0;
    window.__step = ms => {
      window.__vt += ms;
      for (const a of document.getAnimations()) {
        if (a.__t0 === undefined) { a.pause(); a.__t0 = window.__vt - (a.currentTime || 0); }
        a.currentTime = window.__vt - a.__t0;
      }
    };
    window.__tap = (x, y) => {
      const d = document.createElement('div');
      d.style.cssText = `position:fixed;left:${x - 28}px;top:${y - 28}px;width:56px;height:56px;border-radius:50%;background:rgba(255,255,255,.55);border:2px solid #fff;z-index:9999;pointer-events:none;box-shadow:0 4px 18px rgba(0,0,0,.35)`;
      document.body.appendChild(d);
      d.animate([{ transform: 'scale(.4)', opacity: 1 }, { transform: 'scale(1.5)', opacity: 0 }], { duration: 650, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' });
    };
  });
  const m = await p.evaluate(() => {
    const hero = document.querySelector('#hero'), bd = document.querySelector('#inside'), menu = document.querySelector('#menu');
    return { heroEnd: hero.offsetHeight - innerHeight, bdTop: bd.offsetTop, bdSpan: bd.offsetHeight - innerHeight, menuTop: menu.offsetTop - 70 };
  });
  // timeline in seconds: [start, end, fromY, toY]
  const B = m.bdTop, P = m.bdSpan;
  const scrolls = [[1.8, 5.0, 0, m.heroEnd], [5.0, 5.7, m.heroEnd, B], [5.7, 9.0, B, B + P * 0.56], [9.0, 10.9, B + P * 0.56, B + P * 0.69], [10.9, 12.7, B + P * 0.69, B + P], [13.4, 14.6, B + P, m.menuTop]];
  const yAt = t => { let y = 0; for (const [a, z, f, to] of scrolls) { if (t >= z) y = to; else if (t >= a) { y = f + (to - f) * ease((t - a) / (z - a)); break; } else break; } return Math.round(y); };
  const centre = async sel => p.evaluate(s => { const r = document.querySelector(s).getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; }, sel);
  const events = {
    [Math.round(15.0 * FPS)]: async () => { const [x, y] = await centre('.cat:not([hidden]) .item:nth-child(1) .add'); await p.evaluate(([x, y]) => __tap(x, y), [x, y]); await p.touchscreen.tap(x, y); },
    [Math.round(15.7 * FPS)]: async () => { const [x, y] = await centre('.cat:not([hidden]) .item:nth-child(2) .add'); await p.evaluate(([x, y]) => __tap(x, y), [x, y]); await p.touchscreen.tap(x, y); },
    [Math.round(16.3 * FPS)]: async () => { const [x, y] = await centre('.cat:not([hidden]) .item:nth-child(1) .add'); await p.evaluate(([x, y]) => __tap(x, y), [x, y]); await p.touchscreen.tap(x, y); },
    [Math.round(16.9 * FPS)]: async () => { const [x, y] = await centre('.basket-btn'); await p.evaluate(([x, y]) => __tap(x, y), [x, y]); await p.touchscreen.tap(x, y); },
    [Math.round(18.9 * FPS)]: async () => { const [x, y] = await centre('#send'); await p.evaluate(([x, y]) => __tap(x, y), [x, y]); await p.touchscreen.tap(x, y); },
  };
  const name = 'Sam';
  const total = Math.round(19.8 * FPS);
  fs.mkdirSync(OUT, { recursive: true });
  const t0 = Date.now();
  for (let f = 0; f < total; f++) {
    if (onlyFrames && !onlyFrames.split(',').map(Number).includes(f)) { await p.clock.runFor(DT); await p.evaluate(ms => __step(ms), DT); continue; }
    const t = f / FPS;
    if (t < 16.9) await p.evaluate(y => { window.scrollTo(0, y); window.dispatchEvent(new Event("scroll")); if (window.ScrollTrigger) ScrollTrigger.update(); }, yAt(t));
    if (events[f]) await events[f]();
    const k = Math.floor((t - 17.6) / 0.22) + 1;
    if (t >= 17.6 && k <= name.length) await p.evaluate(v => { const i = document.querySelector('#cust'); if (i.value !== v) { i.value = v; i.dispatchEvent(new Event('input')); } }, name.slice(0, k));
    await p.clock.runFor(DT);
    await p.evaluate(ms => __step(ms), DT);
    await p.screenshot({ path: `${OUT}/${String(f).padStart(5, '0')}.jpg`, type: 'jpeg', quality: 95 });
    if (f % 60 === 0) console.log(slug, 'frame', f, '/', total, Math.round((Date.now() - t0) / 1000) + 's');
  }
  await b.close();
})();
