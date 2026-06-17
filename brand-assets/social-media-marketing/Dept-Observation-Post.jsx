/* global React, Slide, Eyebrow, BigDisplay, Body, VARS, Tag */
// ============================================================
// Carousel 7 — The Permanent Observation Post (Support)
// "I watch the servers. You watch the sunset."
// ============================================================

const POP_TAG = "Observation Post";
const POP_TOTAL = 6;

function PO1() {
  return (
    <Slide theme="dark" idx={1} total={POP_TOTAL} hashtag={POP_TAG} accent="blue">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow style={{ marginBottom: 36 }}>The Departments · 04 of 04</Eyebrow>
        <BigDisplay size={88} style={{ lineHeight: 1.0, marginBottom: 16 }}>
          The Permanent
        </BigDisplay>
        <BigDisplay size={88} style={{ lineHeight: 1.0, color: VARS.blue }}>
          Observation Post.
        </BigDisplay>
        <Body size={28} style={{ marginTop: 48, maxWidth: 820, opacity: 0.78 }}>
          Hosting, uptime monitoring, SSL, backups, security updates — running continuously in the background. This is the department that means you never have to think about your site going down.
        </Body>
      </div>
    </Slide>
  );
}

function PO2() {
  return (
    <Slide theme="light" idx={2} total={POP_TOTAL} hashtag={POP_TAG} accent="red">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow color={VARS.red} style={{ marginBottom: 40 }}>What&rsquo;s actually running</Eyebrow>
        <BigDisplay size={130} style={{ lineHeight: 0.9, color: VARS.char }}>
          24/7
        </BigDisplay>
        <BigDisplay size={56} style={{ color: VARS.red, marginTop: 12 }}>
          uptime monitoring.
        </BigDisplay>
        <Body size={26} style={{ marginTop: 48, maxWidth: 860, opacity: 0.72 }}>
          When something breaks at 2am — a plugin update that kills the site, an SSL certificate that lapses, a server that goes dark — it&rsquo;s my problem. Not yours. That&rsquo;s the whole premise.
        </Body>
      </div>
    </Slide>
  );
}

function PO3() {
  return (
    <Slide theme="dark" idx={3} total={POP_TOTAL} hashtag={POP_TAG} accent="blue">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow style={{ marginBottom: 40 }}>What the Observation Post covers</Eyebrow>
        {[
          ["Uptime monitoring", "24/7 — alerts fire before customers notice."],
          ["SSL certificate", "Renewed automatically. Never lapsed."],
          ["Weekly backups", "Restore to any checkpoint in 7 days."],
          ["Security updates", "Core, plugins, themes — maintained continuously."],
          ["Monthly summary", "A plain-English report of what ran, what changed."],
        ].map(([title, desc], i) => (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: 20,
            borderBottom: i < 4 ? "1px solid rgba(249,246,240,0.10)" : "none",
            paddingBottom: 16, marginBottom: 16,
          }}>
            <span style={{ color: VARS.blue, fontWeight: 700, fontSize: 18, minWidth: 20, marginTop: 2 }}>→</span>
            <div>
              <span style={{ fontFamily: "var(--font-headers)", fontWeight: 700, fontSize: 17, color: VARS.bone }}>{title}</span>
              <span style={{ fontFamily: "var(--font-details)", fontSize: 15, color: "rgba(249,246,240,0.55)", marginLeft: 10 }}>{desc}</span>
            </div>
          </div>
        ))}
      </div>
    </Slide>
  );
}

function PO4() {
  return (
    <Slide theme="light" idx={4} total={POP_TOTAL} hashtag={POP_TAG} accent="red">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow color={VARS.red} style={{ marginBottom: 36 }}>The actual cost of downtime</Eyebrow>
        <BigDisplay size={72} style={{ color: VARS.char, lineHeight: 1.15 }}>
          Your site is down. A potential customer lands on an error page.
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
          <Body size={26} style={{ color: VARS.char, lineHeight: 1.5 }}>
            They don&rsquo;t email you. They close the tab and call the next person on the list. You never know it happened.
          </Body>
        </div>
      </div>
    </Slide>
  );
}

function PO5() {
  return (
    <Slide theme="dark" idx={5} total={POP_TOTAL} hashtag={POP_TAG} accent="blue">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow style={{ marginBottom: 40 }}>The No-Ghosting Guarantee</Eyebrow>
        <BigDisplay size={80} style={{ lineHeight: 1.1 }}>
          I am historically easy to reach.
        </BigDisplay>
        <BigDisplay size={80} style={{ color: VARS.blue, lineHeight: 1.1, marginTop: 12 }}>
          I live in Kingman.
        </BigDisplay>
        <BigDisplay size={80} style={{ lineHeight: 1.1, marginTop: 12 }}>
          If you call, I answer.
        </BigDisplay>
        <Body size={24} style={{ marginTop: 48, maxWidth: 840, opacity: 0.65 }}>
          It is a very avant-garde concept called &ldquo;Doing My Job.&rdquo;
        </Body>
      </div>
    </Slide>
  );
}

function PO6() {
  return (
    <Slide theme="light" idx={6} total={POP_TOTAL} hashtag={POP_TAG} accent="red">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow color={VARS.red} style={{ marginBottom: 40 }}>The monitoring plans</Eyebrow>
        {[
          { name: "The Secure Line", price: "~$17/mo", desc: "Hosting, SSL, monitoring, weekly backups, updates." },
          { name: "The Vanguard Plan", price: "~$80/mo", desc: "Everything in Secure Line + 1hr dedicated support/mo." },
          { name: "Command Center Alliance", price: "~$145/mo", desc: "Premium hosting, priority support, 3hrs tactical/mo. No ticket queue." },
          { name: "Community Shield", price: "~$50/mo", desc: "Nonprofit hosting at roughly cost. WCAG infrastructure included." },
        ].map((plan, i) => (
          <div key={i} style={{
            display: "flex", justifyContent: "space-between", alignItems: "flex-start",
            borderBottom: i < 3 ? "1px dashed rgba(45,45,45,0.15)" : "none",
            paddingBottom: 16, marginBottom: 16, gap: 20,
          }}>
            <div>
              <div style={{ fontFamily: "var(--font-headers)", fontWeight: 700, fontSize: 17, color: VARS.char }}>{plan.name}</div>
              <div style={{ fontFamily: "var(--font-details)", fontSize: 14, color: "rgba(45,45,45,0.55)", marginTop: 4 }}>{plan.desc}</div>
            </div>
            <span style={{ fontFamily: "var(--font-details)", fontWeight: 700, fontSize: 17, color: VARS.red, whiteSpace: "nowrap" }}>{plan.price}</span>
          </div>
        ))}
        <Body size={18} style={{ marginTop: 24, opacity: 0.50 }}>
          digitalallies.net · Strategy is free. (928) 228-5769
        </Body>
      </div>
    </Slide>
  );
}

export default function DeptObservationPost() {
  return [<PO1/>, <PO2/>, <PO3/>, <PO4/>, <PO5/>, <PO6/>];
}
