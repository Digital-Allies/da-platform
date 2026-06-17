/* global React, Container, Eyebrow, Button, PinnedNote */

function Hero({ lang }) {
  const t = lang === "es" ? {
    eyebrow: "Con base en Kingman, AZ · Al servicio de todo lo demás",
    title: "Soluciones Tecnológicas para Personas con Cosas Mejores que Hacer.",
    sub: "Yo construyo sistemas que no requieren una maestría para usarlos.",
    quote: "\"Ingeniería limpia, comunicación clara y un seguimiento que no requerirá seguimiento.\"",
    cta1: "[ Consultar Aquí ]",
    cta2: "[ Ver los Diagramas ]",
  } : {
    eyebrow: "Based in Kingman, AZ · Serving Everywhere Else",
    title: "Technological Solutions for People with Better Things to Do.",
    sub: "I build systems that don\u2019t require a master\u2019s degree to operate.",
    quote: "\u201CClean engineering, clear communication, and follow-through that won't require follow up.\u201D",
    cta1: "[ Inquire Within ]",
    cta2: "[ View the Diagrams ]",
  };
  return (
    <section style={{ padding: "96px 0 112px" }}>
      <Container max={920}>
        <div style={{ textAlign: "center" }}>
          <Eyebrow style={{ marginBottom: 24 }}>{t.eyebrow}</Eyebrow>
          <h1 style={{
            fontFamily: "var(--font-headers)",
            fontWeight: 700,
            fontSize: "clamp(40px, 5.5vw, 60px)",
            lineHeight: 1.08,
            letterSpacing: "-0.012em",
            margin: "0 0 32px",
            color: "var(--fg)",
            textWrap: "balance",
          }}>
            {t.title}
          </h1>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            lineHeight: 1.6,
            maxWidth: 540,
            margin: "0 auto 28px",
            color: "var(--fg)",
          }}>
            {t.sub}
          </p>
          <div style={{ maxWidth: 520, margin: "0 auto 48px" }}>
            <PinnedNote align="center">
              <p style={{
                margin: 0,
                fontFamily: "var(--font-body)",
                fontStyle: "italic",
                fontSize: 13,
                lineHeight: 1.6,
                color: "var(--fg)",
              }}>
                {t.quote}
              </p>
            </PinnedNote>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <Button variant="primary" href="#contact">{t.cta1}</Button>
            <Button variant="secondary" href="#diagrams">{t.cta2}</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

Object.assign(window, { Hero });
