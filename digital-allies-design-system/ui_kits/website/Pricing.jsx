/* global React, Container, SectionHeading */

const FREE = [
  ["Tech Consulting", "Free"],
  ["AI Consulting", "Free"],
  ["Brand Discovery", "Free"],
  ["AEO & SEO Review", "Free"],
];
const PAID = [
  ["Website Design", "From $100"],
  ["Graphic Design", "From $75"],
  ["Building (Full Project)", "From $100"],
  ["Monthly Maintenance", "From $50"],
  ["Automation Setup", "Quoted"],
];

function PriceCol({ title, rows, foot, isFree }) {
  return (
    <div style={{ padding: "40px 36px" }}>
      <h3 style={{ fontFamily: "var(--font-headers)", fontWeight: 700, fontSize: 19, margin: "0 0 22px", textAlign: "center" }}>
        {title}
      </h3>
      {rows.map(([label, price], i) => (
        <div key={i} style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          padding: "12px 0",
          borderBottom: i === rows.length - 1 ? "none" : "1px dashed var(--grid-line-strong)",
          fontFamily: "var(--font-details)",
          fontSize: 13,
        }}>
          <span>{label}</span>
          <span style={{
            fontFamily: "var(--font-headers)",
            fontWeight: 700,
            color: isFree ? "var(--accent)" : "var(--fg)",
          }}>{price}</span>
        </div>
      ))}
      <p style={{
        margin: "22px 0 0",
        fontFamily: "var(--font-details)",
        fontStyle: "italic",
        fontSize: 11,
        color: "var(--fg-muted)",
        lineHeight: 1.6,
        paddingTop: 16,
        borderTop: "1px solid var(--hairline)",
      }}>
        {foot}
      </p>
    </div>
  );
}

function Pricing() {
  return (
    <section id="pricing" style={{ padding: "80px 0" }}>
      <Container max={1024}>
        <SectionHeading
          title="The Transparency Table"
          caption="Strategy is Free. Execution is Paid."
        />
        <div style={{ border: "1px solid var(--charcoal)", background: "var(--bg)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div style={{ borderRight: "1px solid var(--charcoal)" }}>
              <PriceCol
                title="The Reciprocity Loop"
                rows={FREE}
                foot="I do not charge for conversations or clarity. Call it a professional courtesy."
                isFree
              />
            </div>
            <PriceCol
              title="Tactical Deployments"
              rows={PAID}
              foot="All quotes are given before work begins. No surprises. No silent scope creep."
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

Object.assign(window, { Pricing });
