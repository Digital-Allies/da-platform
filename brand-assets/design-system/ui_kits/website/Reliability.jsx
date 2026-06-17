/* global React, Container, SectionHeading */

const MOATS = [
  {
    eyebrow: "Local Roots",
    title: "I Am Local",
    body: "Based in Kingman, Arizona. Not offshore. Not a chatbot. A real person with a local area code who picks up the phone.",
    icon: "../../assets/icon-route66.png",
  },
  {
    eyebrow: "Written Commitment",
    title: "No-Ghosting Guarantee",
    body: "If I take your project, I finish it. If something changes, I tell you. Going quiet is not part of my service model.",
    icon: "../../assets/icon-topo.png",
  },
  {
    eyebrow: "Direct Contact",
    title: "Direct Line",
    body: "(928) 228-5769. Call or text. No call center. No ticket queue. Just a real number that goes to one real person.",
    icon: "../../assets/icon-phone.png",
  },
];

function MoatCard({ m }) {
  return (
    <div style={{
      background: "var(--bg)",
      border: "1px solid var(--charcoal)",
      padding: "32px 28px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12,
    }}>
      <img src={m.icon} alt="" style={{ width: 68, height: 68, objectFit: "contain", marginBottom: 6 }} />
      <span style={{
        fontFamily: "var(--font-details)",
        fontSize: 10,
        fontWeight: 700,
        color: "var(--signal)",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
      }}>{m.eyebrow}</span>
      <h3 style={{ fontFamily: "var(--font-headers)", fontWeight: 700, fontSize: 18, margin: 0 }}>{m.title}</h3>
      <p style={{
        margin: 0,
        fontFamily: "var(--font-body)",
        fontSize: 13,
        lineHeight: 1.65,
        color: "var(--fg)",
      }}>{m.body}</p>
    </div>
  );
}

function Reliability() {
  return (
    <section style={{ padding: "80px 0", background: "var(--bg-alt)", borderTop: "1px solid var(--charcoal)", borderBottom: "1px solid var(--charcoal)" }}>
      <Container max={1280}>
        <SectionHeading
          eyebrow="The Reliability Moat"
          title="The No-Ghosting Guarantee. In Writing."
          caption="Three commitments. Stamped before you sign."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {MOATS.map((m, i) => <MoatCard key={i} m={m} />)}
        </div>
        <p style={{
          margin: "40px auto 0",
          textAlign: "center",
          fontFamily: "var(--font-details)",
          fontStyle: "italic",
          fontSize: 12,
          color: "var(--fg-muted)",
          maxWidth: 640,
          lineHeight: 1.6,
        }}>
          "I am historically easy to reach. I live in Kingman. If you call, I answer. It is a very avant-garde concept called 'Doing My Job.'"
        </p>
      </Container>
    </section>
  );
}

Object.assign(window, { Reliability });
