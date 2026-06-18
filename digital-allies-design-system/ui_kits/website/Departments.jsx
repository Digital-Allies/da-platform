/* global React, Container, SectionHeading */
const { useState: useDeptState } = React;

const DEPTS = [
  {
    icon: "../../assets/design-icon.png",
    name: "The Design Bureau",
    nameEs: "El Buró de Diseño",
    cat: "Design & Brand",
    catEs: "Diseño y Marca",
    body: "I design before I develop. Websites, graphic design, menus, signage, pitch decks — polished visuals that look like you meant it. Brand discovery included.",
    bodyEs: "Diseño antes de desarrollar. Sitios web, diseño gráfico, menús, señalización, presentaciones — visuales pulidos que parecen intencionales.",
    hover: "signal",
  },
  {
    icon: "../../assets/integrations-icon.png",
    name: "Dept. of Cooperation",
    nameEs: "Depto. de Cooperación",
    cat: "Integrations",
    catEs: "Integraciones",
    body: "Your apps talk to each other without arguing. Clean handoffs so you stop copying and pasting between platforms.",
    bodyEs: "Tus aplicaciones se comunican sin discutir. Entregas limpias para que dejes de copiar y pegar.",
    hover: "blue",
  },
  {
    icon: "../../assets/automation-icon.png",
    name: "The Self-Governing Bureau",
    nameEs: "El Buró de Autogobierno",
    cat: "Automation",
    catEs: "Automatización",
    body: "The boring, repetitive stuff runs automatically. You've got better things to do.",
    bodyEs: "Las cosas aburridas y repetitivas se ejecutan automáticamente. Tienes cosas mejores que hacer.",
    hover: "signal",
  },
  {
    icon: "../../assets/support-icon.png",
    name: "The Permanent Observation Post",
    nameEs: "El Puesto de Observación Permanente",
    cat: "Support",
    catEs: "Soporte",
    body: "Monitoring runs 24/7. If something breaks at 2am, that's my problem — not yours.",
    bodyEs: "El monitoreo funciona 24/7. Si algo se rompe a las 2 a.m., ese es mi problema, no el tuyo.",
    hover: "blue",
  },
];

function DeptCard({ dept, lang, isLast }) {
  const [hover, setHover] = useDeptState(false);
  const accent = dept.hover === "signal" ? "var(--signal)" : "var(--accent)";
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? "rgba(250,222,235,0.2)" : "var(--bg)",
        padding: "40px 22px",
        textAlign: "center",
        borderTop: `4px solid ${hover ? accent : "transparent"}`,
        borderRight: isLast ? "none" : "1px solid var(--charcoal)",
        transition: "all 0.4s var(--ease-out)",
        transform: hover ? "translateY(-4px)" : "none",
        boxShadow: hover ? "var(--shadow-lg)" : "none",
        position: "relative",
        zIndex: hover ? 2 : 1,
      }}
    >
      <img src={dept.icon} alt="" style={{ width: 92, height: 92, objectFit: "contain", marginBottom: 18 }} />
      <h3 style={{ fontFamily: "var(--font-headers)", fontWeight: 700, fontSize: 17, margin: "0 0 4px", letterSpacing: "-0.005em" }}>
        {lang === "es" ? dept.nameEs : dept.name}
      </h3>
      <span style={{ display: "block", fontFamily: "var(--font-details)", fontSize: 10, color: "var(--signal)", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 18 }}>
        {lang === "es" ? dept.catEs : dept.cat}
      </span>
      <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.6, color: "var(--fg)" }}>
        {lang === "es" ? dept.bodyEs : dept.body}
      </p>
    </div>
  );
}

function Departments({ lang }) {
  return (
    <section id="departments" style={{ padding: "80px 0" }}>
      <Container max={1280}>
        <SectionHeading
          title={lang === "es" ? "Los Departamentos" : "The Departments"}
          caption={lang === "es" ? "Cuatro operaciones distintas. Un punto de contacto." : "Four distinct operations. One point of contact."}
        />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          border: "1px solid var(--charcoal)",
          background: "var(--bg)",
        }}>
          {DEPTS.map((d, i) => (
            <DeptCard key={i} dept={d} lang={lang} isLast={i === DEPTS.length - 1} />
          ))}
        </div>
      </Container>
    </section>
  );
}

Object.assign(window, { Departments });
