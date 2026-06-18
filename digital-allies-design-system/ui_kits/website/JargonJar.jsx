/* global React, Container */
const { useState: useJarState } = React;

const JARGON = [
  { from: "\"Leverage synergies across touchpoints\"", to: "\"Make the parts work together.\"" },
  { from: "\"End-to-end digital transformation\"", to: "\"We fix what's broken and build what's missing.\"" },
  { from: "\"Scalable solutions for your growth journey\"", to: "\"It works now and won't fall apart later.\"" },
  { from: "\"SEO-optimized content ecosystems\"", to: "\"Your site shows up when people search. That's the goal.\"" },
  { from: "\"Robust backend infrastructure\"", to: "\"Quiet stuff running so nothing crashes.\"" },
  { from: "\"Holistic brand alignment\"", to: "\"Your logo, site, and words look like they know each other.\"" },
  { from: "\"Onboarding workflow optimization\"", to: "\"Getting started without the runaround.\"" },
];

function FlipCard({ front, back }) {
  const [flipped, setFlipped] = useJarState(false);
  return (
    <div
      onClick={() => setFlipped(!flipped)}
      style={{ perspective: 1000, cursor: "pointer", height: 168 }}
    >
      <div style={{
        position: "relative",
        width: "100%",
        height: "100%",
        textAlign: "center",
        transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        transformStyle: "preserve-3d",
        transform: flipped ? "rotateY(180deg)" : "none",
        border: "1px solid var(--charcoal)",
        boxShadow: "var(--shadow-sm)",
      }}>
        <CardFace side="front">
          <h4 style={{ fontFamily: "var(--font-headers)", fontWeight: 700, fontSize: 11, color: "var(--signal)", margin: "0 0 8px", letterSpacing: "0.05em" }}>Corporate Speak</h4>
          <p style={{ fontFamily: "var(--font-details)", fontSize: 11, lineHeight: 1.5, margin: 0, fontWeight: 700 }}>{front}</p>
        </CardFace>
        <CardFace side="back">
          <h4 style={{ fontFamily: "var(--font-headers)", fontWeight: 700, fontSize: 11, color: "var(--accent)", margin: "0 0 8px", letterSpacing: "0.05em" }}>DA Translation</h4>
          <p style={{ fontFamily: "var(--font-details)", fontSize: 11, lineHeight: 1.5, margin: 0, fontWeight: 700 }}>{back}</p>
        </CardFace>
      </div>
    </div>
  );
}

function CardFace({ side, children }) {
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      WebkitBackfaceVisibility: "hidden",
      backfaceVisibility: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 22,
      background: side === "back" ? "var(--bg-alt)" : "var(--bg)",
      transform: side === "back" ? "rotateY(180deg)" : "none",
    }}>
      {children}
    </div>
  );
}

function JargonJar() {
  return (
    <section style={{ padding: "80px 0" }}>
      <Container max={1024}>
        <div style={{ border: "1px solid var(--charcoal)", background: "var(--bg)", padding: "40px 44px" }}>
          <h2 style={{ fontFamily: "var(--font-headers)", fontWeight: 700, fontSize: 32, margin: "0 0 12px", borderBottom: "1px solid var(--hairline)", paddingBottom: 18 }}>
            The Jargon Jar 2.0
          </h2>
          <p style={{ fontFamily: "var(--font-details)", fontSize: 11, fontWeight: 700, color: "var(--signal)", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 24px" }}>
            Click any card to translate corporate posture into straight talk.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {JARGON.map((j, i) => <FlipCard key={i} front={j.from} back={j.to} />)}
            <div style={{
              position: "relative",
              background: "var(--bg-alt)",
              border: "1px solid var(--charcoal)",
              padding: "32px 16px 14px",
              textAlign: "center",
              boxShadow: "var(--shadow-sm)",
              height: 168,
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}>
              <span style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 14, height: 14, background: "var(--signal)", border: "1px solid var(--charcoal)", borderRadius: "50%", boxShadow: "var(--shadow-pin)" }} />
              <span style={{ fontFamily: "var(--font-details)", fontSize: 9, fontWeight: 700, color: "var(--fg-soft)", textTransform: "uppercase", letterSpacing: "0.18em" }}>Manual Registry</span>
              <p style={{ margin: 0, fontFamily: "var(--font-details)", fontSize: 10, fontStyle: "italic", color: "var(--fg-muted)", lineHeight: 1.5 }}>
                "If you need a glossary to read your website, you've already lost them."
              </p>
              <span style={{ fontFamily: "var(--font-details)", fontSize: 9, fontWeight: 700, textAlign: "right" }}>— Jargon Protocol</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

Object.assign(window, { JargonJar });
