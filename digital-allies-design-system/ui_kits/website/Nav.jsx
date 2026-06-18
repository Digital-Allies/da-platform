/* global React, PulseDot */
const { useState: useNavState } = React;

function Nav({ activeSection, lang, onLangChange, onNavClick }) {
  const links = [
    { id: "departments", en: "Services", es: "Servicios" },
    { id: "diagrams", en: "Diagrams", es: "Diagramas" },
    { id: "pricing", en: "Pricing", es: "Precios" },
    { id: "field-notes", en: "Reviews", es: "Reseñas" },
    { id: "faq", en: "FAQ", es: "FAQ" },
    { id: "contact", en: "Contact", es: "Contacto" },
  ];
  return (
    <nav
      style={{
        borderBottom: "1px solid var(--charcoal)",
        background: "var(--bg)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "var(--fg)" }}>
          <PulseDot size={20} />
          <span style={{ fontFamily: "var(--font-headers)", fontWeight: 700, fontSize: 19, letterSpacing: "0.01em" }}>
            Digital Allies
          </span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div style={{ display: "flex", gap: 22 }}>
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavClick && onNavClick(l.id);
                }}
                style={{
                  fontFamily: "var(--font-details)",
                  fontWeight: 700,
                  fontSize: 11,
                  color: activeSection === l.id ? "var(--accent)" : "var(--fg)",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  whiteSpace: "nowrap",
                }}
              >
                {lang === "es" ? l.es : l.en}
              </a>
            ))}
          </div>
          <div style={{ display: "flex", border: "1px solid var(--charcoal)" }}>
            {["en", "es"].map((code, i) => (
              <React.Fragment key={code}>
                {i === 1 && <div style={{ width: 1, background: "var(--charcoal)" }} />}
                <button
                  onClick={() => onLangChange(code)}
                  style={{
                    fontFamily: "var(--font-details)",
                    fontWeight: 700,
                    fontSize: 11,
                    padding: "6px 11px",
                    border: "none",
                    background: lang === code ? "var(--charcoal)" : "var(--bg)",
                    color: lang === code ? "var(--bone-white)" : "var(--fg)",
                    cursor: "pointer",
                    letterSpacing: "0.05em",
                  }}
                >
                  {code.toUpperCase()}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

Object.assign(window, { Nav });
