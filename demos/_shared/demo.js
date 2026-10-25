/* SAL Digital concept demo: order basket and motion. No tracking, no network calls. */
(function () {
  var cfg = JSON.parse(document.getElementById("cfg").textContent);
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var money = function (n) { return "£" + n.toFixed(2); };

  /* ---------- order state ---------- */
  var items = {};
  $$(".item").forEach(function (li) {
    items[li.dataset.id] = { id: li.dataset.id, name: li.dataset.name, price: parseFloat(li.dataset.price) };
  });
  var qty = {};
  var KEY = "demo-order-" + cfg.name;
  try { qty = JSON.parse(sessionStorage.getItem(KEY) || "{}"); } catch (e) { qty = {}; }
  Object.keys(qty).forEach(function (k) { if (!items[k]) delete qty[k]; });

  function save() { try { sessionStorage.setItem(KEY, JSON.stringify(qty)); } catch (e) {} }
  function count() { return Object.keys(qty).reduce(function (n, k) { return n + qty[k]; }, 0); }
  function total() { return Object.keys(qty).reduce(function (n, k) { return n + qty[k] * items[k].price; }, 0); }

  function waLink() {
    var lines = Object.keys(qty).map(function (k) {
      return qty[k] + " x " + items[k].name + " (" + money(qty[k] * items[k].price) + ")";
    });
    var who = ($("#cust").value || "").trim();
    var msg = "Hi " + cfg.name + ", I'd like to order for collection:\n\n" + lines.join("\n") +
      "\n\nTotal: " + money(total()) + " (pay on collection)" + (who ? "\nName: " + who : "");
    return "https://wa.me/" + cfg.wa + "?text=" + encodeURIComponent(msg);
  }

  function render() {
    var n = count();
    $$("[data-count]").forEach(function (b) { b.textContent = n; });
    var ul = $("#lines");
    ul.innerHTML = "";
    Object.keys(qty).forEach(function (k) {
      var li = document.createElement("li");
      li.className = "line";
      li.innerHTML = '<div><div class="line-name"></div><div class="line-sub"></div></div>' +
        '<div class="qty"><button data-dec="' + k + '" aria-label="Remove one">−</button><span></span><button data-inc="' + k + '" aria-label="Add one">+</button></div>';
      $(".line-name", li).textContent = items[k].name;
      $(".line-sub", li).textContent = money(qty[k] * items[k].price);
      $("span", li).textContent = qty[k];
      ul.appendChild(li);
    });
    $("#empty").hidden = n > 0;
    $("#total").textContent = money(total());
    var send = $("#send");
    send.setAttribute("aria-disabled", n ? "false" : "true");
    send.href = n ? waLink() : "#";
    $(".bar").classList.toggle("on", n > 0);
    save();
  }

  function add(id, btn) {
    qty[id] = (qty[id] || 0) + 1;
    if (btn) { btn.classList.remove("pop"); void btn.offsetWidth; btn.classList.add("pop"); }
    render();
  }

  document.addEventListener("click", function (ev) {
    var t = ev.target.closest("button, a");
    if (!t) return;
    var li = t.closest(".item");
    if (t.classList.contains("add") && li) return add(li.dataset.id, t);
    if (t.dataset.add) { add(t.dataset.add); return openDrawer(); }
    if (t.dataset.inc) { qty[t.dataset.inc]++; return render(); }
    if (t.dataset.dec) { qty[t.dataset.dec]--; if (qty[t.dataset.dec] <= 0) delete qty[t.dataset.dec]; return render(); }
    if (t.hasAttribute("data-open")) return openDrawer();
    if (t.hasAttribute("data-close")) return closeDrawer();
  });
  $(".scrim").addEventListener("click", closeDrawer);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeDrawer(); });
  $("#cust").addEventListener("input", render);

  function openDrawer() { document.body.classList.add("open"); $("#drawer").setAttribute("aria-hidden", "false"); }
  function closeDrawer() { document.body.classList.remove("open"); $("#drawer").setAttribute("aria-hidden", "true"); }

  /* ---------- menu tabs ---------- */
  $$(".tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      $$(".tab").forEach(function (x) { x.setAttribute("aria-selected", x === tab ? "true" : "false"); });
      $$(".cat").forEach(function (c) { c.hidden = c.id !== "cat-" + tab.dataset.cat; });
    });
  });

  /* ---------- motion ---------- */
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!calm && window.gsap) {
    gsap.from(".hl span", { yPercent: 110, duration: 1.1, ease: "power4.out", stagger: 0.12, delay: 0.15 });
    gsap.from(".hero .eyebrow, .hero .sub, .cta-row", { y: 24, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.12, delay: 0.55 });
    var bg = $(".hero-bg img");
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = Math.min(window.scrollY, window.innerHeight);
        bg.style.transform = "scale(" + (1.12 + y / window.innerHeight * 0.12) + ") translateY(" + y * 0.12 + "px)";
        ticking = false;
      });
    }, { passive: true });
  }
  var targets = $$(".steps li, .feature-copy, .feature img, .item, .visit-grid > *, .menu .tabs");
  if (calm || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("in"); });
  } else {
    targets.forEach(function (el) { el.classList.add("rv"); });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    targets.forEach(function (el) { io.observe(el); });
  }

  render();
})();
