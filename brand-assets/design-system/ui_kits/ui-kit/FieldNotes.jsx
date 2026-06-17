/* global React, Container, SectionHeading, PinnedNote */

const NOTES = [
  {
    quote: "Anthony has a rare natural ability to step into the world of his client and tune into what is important to them. His guidance is a safe pathway through.",
    who: "Sasha Esposito",
    where: "Marriage and Family Therapy, Inc.",
  },
  {
    quote: "Digital Allies has truly been a beacon of expertise and reliability. I wholeheartedly recommend them to any organization seeking a dependable tech partner.",
    who: "Victoria Buckholz",
    where: "Journey to the Center of Hope",
  },
  {
    quote: "Working with Digital Allies is not just about achieving results. It is about experiencing the clarity of real collaboration — where questions get answered and decisions get made.",
    who: "Tao Wei",
    where: "Tao Wei Designs",
  },
];

function FieldNotes() {
  return (
    <section id="field-notes" style={{ padding: "80px 0" }}>
      <Container max={1280}>
        <SectionHeading
          eyebrow="The Archive · Field Notes"
          title="Notes from real people."
          caption="I keep them pinned."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {NOTES.map((n, i) => (
            <PinnedNote key={i} leftBorder={false}>
              <p style={{
                margin: "0 0 18px",
                fontFamily: "var(--font-body)",
                fontStyle: "italic",
                fontSize: 13,
                lineHeight: 1.65,
                color: "var(--fg)",
              }}>"{n.quote}"</p>
              <div style={{ borderTop: "1px solid var(--hairline)", paddingTop: 12 }}>
                <div style={{ fontFamily: "var(--font-headers)", fontWeight: 700, fontSize: 13 }}>{n.who}</div>
                <div style={{ fontFamily: "var(--font-details)", fontSize: 11, color: "var(--fg-muted)" }}>{n.where}</div>
              </div>
            </PinnedNote>
          ))}
        </div>
      </Container>
    </section>
  );
}

Object.assign(window, { FieldNotes });
