/* global React, Container, SectionHeading */
const { useState: useDiagState } = React;

const DIAGRAMS = [
  {
    title: "AEO & SEO Architecture",
    body: "Getting found by search engines is a structural problem. I review your site's foundation and fix the parts that keep you invisible.",
    img: "../../assets/aeo-seo-overview.png",
  },
  {
    title: "The Four-Step Process",
    body: "Discover → Design → Build → Maintain. Each step has a clear entry point and a clear exit. No ambiguity. No surprise invoices.",
    img: "../../assets/process.png",
  },
  {
    title: "Language & Accessibility Architecture",
    body: "Bilingual and accessible by design, not as an afterthought. Every element keyboard-navigable. Every toggle screen-reader friendly.",
    img: "../../assets/language-overview.png",
  },
];

function Diagram({ d, open, onToggle }) {
  return (
    <div style={{ border: "1px solid var(--charcoal)", background: "var(--bg)", marginBottom: 12 }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          padding: "20px 28px",
          background: open ? "var(--accent-soft)" : "var(--bg)",
          border: "none",
          borderBottom: open ? "1px solid var(--hairline)" : "none",
          fontFamily: "var(--font-headers)",
          fontWeight: 700,
          fontSize: 18,
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "left",
          color: "var(--fg)",
          transition: "background 0.2s",
        }}
      >
        <span>{d.title}</span>
        <span style={{
          color: "var(--accent)",
          fontSize: 22,
          fontFamily: "var(--font-details)",
          transform: open ? "rotate(45deg)" : "none",
          transition: "transform 0.3s var(--ease-out)",
          display: "inline-block",
        }}>+</span>
      </button>
      {open && (
        <div style={{ padding: "24px 32px 32px" }}>
          <p style={{ margin: "0 0 18px", fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.7, color: "var(--fg-muted)", maxWidth: 640 }}>
            {d.body}
          </p>
          {d.img && (
            <div style={{ border: "1px solid var(--hairline)", background: "var(--bg-alt)", padding: 12, maxWidth: 720 }}>
              <img src={d.img} alt="" style={{ width: "100%", display: "block" }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Diagrams() {
  const [open, setOpen] = useDiagState(0);
  return (
    <section id="diagrams" style={{ padding: "80px 0" }}>
      <Container max={1280}>
        <SectionHeading
          title="The Diagrams"
          caption="Architecture explained without the alphabet soup."
        />
        {DIAGRAMS.map((d, i) => (
          <Diagram key={i} d={d} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
        ))}
      </Container>
    </section>
  );
}

Object.assign(window, { Diagrams });
