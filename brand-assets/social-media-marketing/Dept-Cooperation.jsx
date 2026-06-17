/* global React, Slide, Eyebrow, BigDisplay, Body, VARS, Tag */
// ============================================================
// Carousel 5 — Dept. of Cooperation (Integrations)
// "Your apps talk to each other. You don't have to."
// ============================================================

const COOP_TAG = "Dept. of Cooperation";
const COOP_TOTAL = 6;

function C1() {
  return (
    <Slide theme="dark" idx={1} total={COOP_TOTAL} hashtag={COOP_TAG} accent="blue">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow style={{ marginBottom: 36 }}>The Departments · 02 of 04</Eyebrow>
        <BigDisplay size={110} style={{ lineHeight: 1.0, marginBottom: 16 }}>
          Dept. of
        </BigDisplay>
        <BigDisplay size={110} style={{ lineHeight: 1.0, color: VARS.blue }}>
          Cooperation.
        </BigDisplay>
        <Body size={28} style={{ marginTop: 48, maxWidth: 820, opacity: 0.78 }}>
          Your apps, finally on speaking terms. This department handles the connections between your tools so data moves automatically — no manual entry, no CSV exports, no copy-paste at 10pm.
        </Body>
      </div>
    </Slide>
  );
}

function C2() {
  return (
    <Slide theme="light" idx={2} total={COOP_TOTAL} hashtag={COOP_TAG} accent="red">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow color={VARS.red} style={{ marginBottom: 40 }}>The actual problem</Eyebrow>
        <BigDisplay size={80} style={{ color: VARS.char, lineHeight: 1.1 }}>
          You're using 5–10 apps every day.
        </BigDisplay>
        <BigDisplay size={80} style={{ color: VARS.red, lineHeight: 1.1, marginTop: 12 }}>
          Most share zero data with each other.
        </BigDisplay>
        <Body size={26} style={{ marginTop: 48, maxWidth: 860, opacity: 0.72 }}>
          The average small business spends roughly 40% of its working hours on manual data entry. That's not a staffing problem. That's a connection problem.
        </Body>
      </div>
    </Slide>
  );
}

function C3() {
  return (
    <Slide theme="dark" idx={3} total={COOP_TOTAL} hashtag={COOP_TAG} accent="blue">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow style={{ marginBottom: 40 }}>What it looks like</Eyebrow>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {[
            ["Customer books online", "Calendar updated", "Invoice created"],
            ["Order placed on site", "Inventory adjusted", "You get a text"],
            ["Form submitted", "CRM updated", "Welcome email sent"],
          ].map((flow, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              {flow.map((step, j) => (
                <React.Fragment key={j}>
                  <div style={{
                    border: "1px solid rgba(249,246,240,0.25)",
                    padding: "10px 20px",
                    fontFamily: "var(--font-details)",
                    fontSize: 16,
                    color: VARS.bone,
                    background: "rgba(249,246,240,0.08)",
                  }}>{step}</div>
                  {j < 2 && <span style={{ color: VARS.blue, fontWeight: 700, fontSize: 22 }}>→</span>}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
        <Body size={22} style={{ marginTop: 48, opacity: 0.65 }}>
          You get notified. You show up. The admin was already done.
        </Body>
      </div>
    </Slide>
  );
}

function C4() {
  return (
    <Slide theme="light" idx={4} total={COOP_TOTAL} hashtag={COOP_TAG} accent="red">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow color={VARS.red} style={{ marginBottom: 36 }}>The math</Eyebrow>
        <BigDisplay size={72} style={{ color: VARS.char, lineHeight: 1.15 }}>
          20 minutes a day moving data between systems.
        </BigDisplay>
        <div style={{
          marginTop: 48,
          padding: "36px 44px",
          background: VARS.bone,
          border: `1px solid ${VARS.char}`,
          borderLeft: `6px solid ${VARS.red}`,
          maxWidth: 820,
          position: "relative",
        }}>
          <span style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", width: 20, height: 20, background: VARS.red, border: `1.5px solid ${VARS.char}`, borderRadius: "50%", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }} />
          <Body size={28} style={{ color: VARS.char, lineHeight: 1.5 }}>
            That's <strong>80+ hours a year.</strong> At $50/hr, that's{" "}
            <strong style={{ color: VARS.red }}>$4,000 annually</strong> spent on a task a $30/month tool could eliminate.
          </Body>
        </div>
      </div>
    </Slide>
  );
}

function C5() {
  return (
    <Slide theme="dark" idx={5} total={COOP_TOTAL} hashtag={COOP_TAG} accent="blue">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow style={{ marginBottom: 40 }}>Common connections</Eyebrow>
        {[
          ["Booking / Website", "Google Calendar"],
          ["POS / Square", "QuickBooks"],
          ["Contact Form", "Mailchimp / HubSpot"],
          ["Google Forms", "Airtable / Notion"],
          ["Shopify", "Shipstation"],
        ].map(([a, b], i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 20,
            borderBottom: i < 4 ? "1px solid rgba(249,246,240,0.12)" : "none",
            paddingBottom: 16, marginBottom: 16,
          }}>
            <span style={{ fontFamily: "var(--font-headers)", fontWeight: 700, fontSize: 18, color: VARS.bone, minWidth: 240 }}>{a}</span>
            <span style={{ color: VARS.blue, fontWeight: 700, fontSize: 20 }}>→</span>
            <span style={{ fontFamily: "var(--font-details)", fontSize: 16, color: "rgba(249,246,240,0.65)" }}>{b}</span>
          </div>
        ))}
      </div>
    </Slide>
  );
}

function C6() {
  return (
    <Slide theme="light" idx={6} total={COOP_TOTAL} hashtag={COOP_TAG} accent="red">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow color={VARS.red} style={{ marginBottom: 40 }}>How it works with Digital Allies</Eyebrow>
        <BigDisplay size={72} style={{ color: VARS.char, lineHeight: 1.15 }}>
          I map what you have. Identify what's costing you time. Wire it together.
        </BigDisplay>
        <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            ["Strategy conversation", "Free"],
            ["Integration setup", "Included in Full Deployment tier"],
            ["Custom build — Tactical Sprint", "$625/week"],
          ].map(([label, price], i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              borderBottom: i < 2 ? "1px dashed rgba(45,45,45,0.15)" : "none",
              paddingBottom: 12,
            }}>
              <span style={{ fontFamily: "var(--font-details)", fontSize: 16, color: VARS.char }}>{label}</span>
              <span style={{ fontFamily: "var(--font-details)", fontWeight: 700, fontSize: 16, color: i === 0 ? VARS.blue : VARS.red }}>{price}</span>
            </div>
          ))}
        </div>
        <Body size={20} style={{ marginTop: 32, opacity: 0.55 }}>
          digitalallies.net/learn/dept-cooperation · Strategy is free.
        </Body>
      </div>
    </Slide>
  );
}

export default function DeptCooperation() {
  return [<C1/>, <C2/>, <C3/>, <C4/>, <C5/>, <C6/>];
}
