/* global React, Container, Button */
const { useState: useFooterState } = React;

function Field({ label, type = "text", placeholder, multiline, value, onChange }) {
  const [focus, setFocus] = useFooterState(false);
  const common = {
    fontFamily: "var(--font-details)",
    fontSize: 13,
    padding: "12px 14px",
    border: focus ? "1px solid var(--accent)" : "1px solid var(--charcoal)",
    boxShadow: focus ? "0 0 0 2px rgba(58,123,213,0.15)" : "none",
    background: "var(--bg)",
    color: "var(--fg)",
    borderRadius: 2,
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    resize: multiline ? "vertical" : "none",
    minHeight: multiline ? 100 : "auto",
    transition: "border 0.15s, box-shadow 0.15s",
  };
  return (
    <label style={{ display: "block", marginBottom: 16 }}>
      <span style={{
        display: "block",
        fontFamily: "var(--font-details)",
        fontSize: 10,
        fontWeight: 700,
        color: "var(--fg)",
        textTransform: "uppercase",
        letterSpacing: "0.18em",
        marginBottom: 8,
      }}>{label}</span>
      {multiline
        ? <textarea placeholder={placeholder} value={value} onChange={(e)=>onChange(e.target.value)} onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)} style={common} />
        : <input type={type} placeholder={placeholder} value={value} onChange={(e)=>onChange(e.target.value)} onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)} style={common} />}
    </label>
  );
}

function Footer({ onSubmit }) {
  const [name, setName] = useFooterState("");
  const [email, setEmail] = useFooterState("");
  const [msg, setMsg] = useFooterState("");
  const [sent, setSent] = useFooterState(false);

  const submit = () => {
    setSent(true);
    if (onSubmit) onSubmit({ name, email, msg });
  };

  return (
    <footer id="contact" style={{ background: "var(--charcoal)", color: "var(--bone-white)", padding: "80px 0 40px" }}>
      <Container max={1280}>
        <div style={{ borderBottom: "1px solid rgba(249,246,240,0.18)", paddingBottom: 60 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
            <div>
              <span style={{
                fontFamily: "var(--font-details)",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--accent-soft)",
              }}>The Command Center</span>
              <h2 style={{
                fontFamily: "var(--font-headers)",
                fontWeight: 700,
                fontSize: 32,
                lineHeight: 1.15,
                margin: "12px 0 18px",
              }}>Tell me what you are trying to do.</h2>
              <p style={{
                margin: "0 0 26px",
                fontFamily: "var(--font-body)",
                fontSize: 13,
                lineHeight: 1.7,
                color: "rgba(249,246,240,0.7)",
                maxWidth: 360,
              }}>
                I will reply with next steps, a cost range, or a quick question. Usually all three.
              </p>
              <div style={{ fontFamily: "var(--font-details)", fontSize: 12, lineHeight: 2.2 }}>
                <div><span style={{ color: "var(--accent-soft)" }}>LOCATION ·</span> Kingman, Arizona</div>
                <div><span style={{ color: "var(--accent-soft)" }}>DIRECT LINE ·</span> (928) 228-5769</div>
                <div><span style={{ color: "var(--accent-soft)" }}>EMAIL ·</span> contact@digitalallies.net</div>
              </div>
            </div>
            <div style={{ background: "var(--bg)", color: "var(--fg)", border: "1px solid var(--bone-white)", padding: 32 }}>
              <h3 style={{ fontFamily: "var(--font-headers)", fontWeight: 700, fontSize: 16, margin: "0 0 22px" }}>
                Send a Transmission
              </h3>
              {sent ? (
                <div style={{ padding: "32px 0", textAlign: "center" }}>
                  <span style={{ fontFamily: "var(--font-details)", fontSize: 11, fontWeight: 700, color: "var(--signal)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Transmission received</span>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.7, margin: "12px 0 0" }}>
                    Thanks, {name || "friend"}. I'll get back to you with next steps — usually within a working day.
                  </p>
                </div>
              ) : (
                <>
                  <Field label="Name" value={name} onChange={setName} placeholder="Your name" />
                  <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="your@email.com" />
                  <Field label="What are you trying to do?" multiline value={msg} onChange={setMsg} placeholder="Give me the short version. We can fill in details later." />
                  <Button variant="primary" onClick={submit} style={{ width: "100%", marginTop: 4 }}>[ Submit Transmission ]</Button>
                  <p style={{ margin: "14px 0 0", fontFamily: "var(--font-details)", fontSize: 10, color: "var(--fg-soft)", lineHeight: 1.5 }}>
                    I do not share your details. I use your message to reply. That is it.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        <div style={{ paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--font-details)", fontSize: 11, color: "rgba(249,246,240,0.6)" }}>
          <span>© 2026 Digital Allies. Based in Kingman, AZ.</span>
          <span style={{ display: "flex", gap: 18 }}>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Privacy</a>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Terms</a>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Cookies</a>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Sitemap</a>
          </span>
        </div>
      </Container>
    </footer>
  );
}

Object.assign(window, { Footer });
