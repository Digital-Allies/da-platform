/* @ds-bundle: {"format":3,"namespace":"AtomicFindsDesignSystem_af0620","components":["Button","Badge","Card","GalaxyCard","Testimonial","Field","Nav","Footer"]} */
/* ============================================================
   Atomic Finds — Component Bundle
   Hand-authored, loadable the same way as any DS bundle:

     <script src="…/atomic-finds-design-system/_ds_bundle.js"></script>

   then mount from a DC template:

     <x-import component-from-global-scope="AtomicFindsDesignSystem_af0620.Button"
               variant="primary" hint-size="auto,48px">Explore</x-import>

   Requires React on window (the DC runtime provides it) and the
   package's colors_and_type.css + styles.css for visual tokens.
   ============================================================ */
(() => {
  const ns = (window.AtomicFindsDesignSystem_af0620 =
    window.AtomicFindsDesignSystem_af0620 || {});
  const R = window.React;
  if (!R) {
    (ns.__errors = ns.__errors || []).push("React not found on window");
    return;
  }
  const h = R.createElement;
  const cx = (...c) => c.filter(Boolean).join(" ");

  /* -------------------------------------------------- Button */
  // props: variant 'primary'|'solid'|'amber', href, disabled, onClick, children
  ns.Button = function Button(props) {
    const { variant = "primary", href, disabled, onClick, children, className, ...rest } = props || {};
    const cls = cx("af-btn", "af-btn-" + variant, className);
    if (href && !disabled) {
      return h("a", { className: cls, href, onClick, ...rest }, children);
    }
    return h("button", { className: cls, disabled: !!disabled, "aria-disabled": disabled ? "true" : undefined, onClick, ...rest }, children);
  };

  /* -------------------------------------------------- Badge */
  // props: status 'instock'|'featured'|'out', children
  ns.Badge = function Badge(props) {
    const { status = "instock", children, className } = props || {};
    const label = children != null ? children : ({ instock: "In Stock", featured: "Featured", out: "Out of Stock" }[status] || "");
    return h("span", { className: cx("af-badge", "af-badge-" + status, className) }, label);
  };

  /* -------------------------------------------------- Card (product/feature) */
  // props: title, text, price, image, emoji, badge {status,label}, onClick
  ns.Card = function Card(props) {
    const { title, text, price, image, emoji, badge, onClick, children, className } = props || {};
    const media = image
      ? h("img", { src: image, alt: title || "", style: { width: "calc(100% + 48px)", height: "160px", objectFit: "cover", margin: "-24px -24px 16px -24px", borderBottom: "1px solid var(--rattan-tan)" } })
      : h("div", { style: { width: "calc(100% + 48px)", height: "160px", margin: "-24px -24px 16px -24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", color: "var(--celestial-yellow)", background: "linear-gradient(135deg, rgba(212,170,130,0.15) 0%, rgba(244,196,48,0.1) 100%)", borderBottom: "1px solid var(--rattan-tan)" } }, emoji || "\u25A3");
    return h("div", { className: cx("af-card", className), onClick },
      media,
      badge ? h("div", { style: { marginBottom: "10px" } }, h(ns.Badge, { status: badge.status }, badge.label)) : null,
      title ? h("h4", { className: "af-card-title" }, title) : null,
      text ? h("p", { className: "af-card-text" }, text) : null,
      price != null ? h("p", { className: "af-price", style: { marginTop: "12px" } }, price) : null,
      children
    );
  };

  /* -------------------------------------------------- GalaxyCard (signature) */
  // props: image, name (PRODUCT NAME), script ("vintage find" cursive),
  //        desc (description line), price, bg (nebula url), moon (bool), stars (count)
  // A glowing ORBITAL RING wraps ONE continuous rounded card: ring passes
  // behind the card at top, in front along the bottom. Card flows image →
  // info with no tag break. "subtitle"/"title" accepted as legacy aliases.
  ns.GalaxyCard = function GalaxyCard(props) {
    const p = props || {};
    const name = p.name || p.title;
    const desc = p.desc || p.subtitle;
    const { image, script, price, bg, moon = true, stars = 12, className, style } = p;
    const mediaRef = R.useRef(null);
    const rootRef = R.useRef(null);
    R.useEffect(() => {
      if (rootRef.current && bg) rootRef.current.style.setProperty("--af-nebula", "url('" + bg + "')");
    }, [bg]);
    R.useEffect(() => {
      const el = mediaRef.current;
      if (!el) return;
      const made = [];
      for (let i = 0; i < stars; i++) {
        const s = document.createElement("div");
        s.className = "af-galaxy__star";
        const sz = Math.random() * 1.8 + 0.8;
        s.style.width = sz + "px";
        s.style.height = sz + "px";
        s.style.top = Math.random() * 100 + "%";
        s.style.left = Math.random() * 100 + "%";
        s.style.opacity = (Math.random() * 0.6 + 0.25).toString();
        s.style.animationDelay = (Math.random() * 4).toFixed(2) + "s";
        el.appendChild(s);
        made.push(s);
      }
      return () => made.forEach((n) => n.remove());
    }, [stars]);
    return h("div", { ref: rootRef, className: cx("af-galaxy", className), style },
      h("div", { className: "af-galaxy__ring" }),
      moon ? h("div", { className: "af-galaxy__orbit" }, h("div", { className: "af-galaxy__moon" })) : null,
      h("div", { className: "af-galaxy__card" },
        h("div", { className: "af-galaxy__media", ref: mediaRef }, image ? h("img", { src: image, alt: name || "" }) : null),
        h("div", { className: "af-galaxy__info" },
          name ? h("h4", { className: "af-galaxy__name" }, name) : null,
          script ? h("p", { className: "af-galaxy__script" }, script) : null,
          desc ? h("p", { className: "af-galaxy__desc" }, desc) : null,
          price != null ? h("span", { className: "af-galaxy__price" }, "$", String(price).replace(/^\$/, "")) : null
        )
      ),
      h("div", { className: "af-galaxy__ring-front" })
    );
  };

  /* -------------------------------------------------- Testimonial */
  // props: quote, author
  ns.Testimonial = function Testimonial(props) {
    const { quote, author, children, className } = props || {};
    return h("div", { className: cx("af-testimonial", className) },
      h("p", { className: "af-testimonial-quote" }, quote || children),
      author ? h("p", { className: "af-testimonial-author" }, author) : null
    );
  };

  /* -------------------------------------------------- Field (label + input/select/textarea) */
  // props: label, type 'text'|'email'|'textarea'|'select', placeholder, options[], value, onChange, required
  ns.Field = function Field(props) {
    const { label, type = "text", placeholder, options, value, onChange, required, name, className } = props || {};
    let control;
    if (type === "textarea") {
      control = h("textarea", { className: "af-textarea", placeholder, value, onChange, name, rows: 4 });
    } else if (type === "select") {
      control = h("select", { className: "af-select", value, onChange, name },
        (options || []).map((o, i) => {
          const opt = typeof o === "string" ? { value: o, label: o } : o;
          return h("option", { key: i, value: opt.value }, opt.label);
        })
      );
    } else {
      control = h("input", { className: "af-input", type, placeholder, value, onChange, name });
    }
    return h("div", { className: cx("af-field", className) },
      label ? h("label", { className: "af-label" }, label, required ? " *" : "") : null,
      control
    );
  };

  /* -------------------------------------------------- Nav */
  // props: logo, links[{label,href}], cta {label,href}
  ns.Nav = function Nav(props) {
    const { logo = "Atomic Finds", links = [], cta, className } = props || {};
    return h("nav", { className: cx("af-nav", className) },
      h("a", { className: "af-nav-logo", href: "#" }, logo),
      h("div", { className: "af-nav-links" },
        links.map((l, i) => h("a", { key: i, className: "af-nav-link", href: l.href || "#" }, l.label)),
        cta ? h(ns.Button, { variant: "primary", href: cta.href, style: { padding: "10px 22px" } }, cta.label) : null
      )
    );
  };

  /* -------------------------------------------------- Footer */
  // props: columns[{heading, links[{label,href}]}], tagline, copyright
  ns.Footer = function Footer(props) {
    const { columns = [], tagline, copyright, className } = props || {};
    return h("footer", { className: cx("af-footer", className) },
      h("div", { className: "af-footer-grid" },
        tagline ? h("div", null,
          h("div", { className: "af-nav-logo", style: { fontSize: "24px", marginBottom: "12px" } }, "Atomic Finds"),
          h("p", { className: "af-card-text" }, tagline)
        ) : null,
        columns.map((col, i) => h("div", { key: i },
          h("h5", { className: "af-footer-h" }, col.heading),
          (col.links || []).map((l, j) => h("a", { key: j, className: "af-footer-link", href: l.href || "#" }, l.label))
        ))
      ),
      h("div", { className: "af-footer-bottom" }, copyright || "\u00A9 2026 Atomic Finds \u00B7 Curated by Fran & Mabel")
    );
  };

  ns.__ready = true;
})();
