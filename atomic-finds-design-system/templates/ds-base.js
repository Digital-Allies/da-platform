/* Atomic Finds — template base helper.
   Builds the signature GALAXY CARD (orbital ring + continuous card)
   from simple data-attributes so static templates stay DRY:

     <div class="af-galaxy"
          data-img="../../assets/alien-ruso.png"
          data-name="Peacock"
          data-script="vintage find"
          data-desc="1970s rattan peacock chair, restored cane back."
          data-price="1450"
          data-moon="true"></div>

   Pure vanilla JS, no build step. Loaded via <script src="../ds-base.js">. */
(function () {
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  function scatter(media, n) {
    for (var i = 0; i < n; i++) {
      var s = el("div", "af-galaxy__star");
      var sz = Math.random() * 1.8 + 0.8;
      s.style.width = sz + "px";
      s.style.height = sz + "px";
      s.style.top = Math.random() * 100 + "%";
      s.style.left = Math.random() * 100 + "%";
      s.style.opacity = (Math.random() * 0.6 + 0.25).toString();
      s.style.animationDelay = (Math.random() * 4).toFixed(2) + "s";
      media.appendChild(s);
    }
  }

  function build(root) {
    var d = root.dataset;
    root.innerHTML = "";

    if (d.bg) root.style.setProperty("--af-nebula", "url('" + d.bg + "')");

    root.appendChild(el("div", "af-galaxy__ring"));

    if (d.moon !== "false") {
      var orbit = el("div", "af-galaxy__orbit");
      orbit.appendChild(el("div", "af-galaxy__moon"));
      root.appendChild(orbit);
    }

    var card = el("div", "af-galaxy__card");
    var media = el("div", "af-galaxy__media");
    if (d.img) {
      var img = el("img");
      img.src = d.img;
      img.alt = d.name || "";
      media.appendChild(img);
    }
    scatter(media, parseInt(d.stars || "12", 10));
    card.appendChild(media);

    var info = el("div", "af-galaxy__info");
    if (d.name)   { var nm = el("h4", "af-galaxy__name");   nm.textContent = d.name;   info.appendChild(nm); }
    if (d.script) { var sc = el("p", "af-galaxy__script");  sc.textContent = d.script; info.appendChild(sc); }
    if (d.desc)   { var ds = el("p", "af-galaxy__desc");    ds.textContent = d.desc;   info.appendChild(ds); }
    if (d.price)  { var pr = el("span", "af-galaxy__price"); pr.textContent = "$" + String(d.price).replace(/^\$/, ""); info.appendChild(pr); }
    card.appendChild(info);
    root.appendChild(card);

    root.appendChild(el("div", "af-galaxy__ring-front"));
  }

  function init() {
    var cards = document.querySelectorAll(".af-galaxy[data-name], .af-galaxy[data-img]");
    cards.forEach(build);

    // scroll-triggered orbit: rings spin while the card is in view
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          e.target.classList.toggle("is-orbiting", e.isIntersecting && e.intersectionRatio > 0.55);
        });
      }, { threshold: [0, 0.55, 1] });
      document.querySelectorAll(".af-galaxy").forEach(function (c) { io.observe(c); });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
