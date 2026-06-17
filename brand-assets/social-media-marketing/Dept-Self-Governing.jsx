/* global React, Slide, Eyebrow, BigDisplay, Body, VARS, Tag */
// ============================================================
// Carousel 6 — The Self-Governing Bureau (Automation)
// "Repetitive tasks are for machines. You've got better things to do."
// ============================================================

const SGB_TAG = "Self-Governing Bureau";
const SGB_TOTAL = 6;

function SG1() {
  return (
    <Slide theme="dark" idx={1} total={SGB_TOTAL} hashtag={SGB_TAG} accent="red">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow style={{ marginBottom: 36 }}>The Departments · 03 of 04</Eyebrow>
        <BigDisplay size={100} style={{ lineHeight: 1.0, marginBottom: 16 }}>
          The Self-Governing
        </BigDisplay>
        <BigDisplay size={100} style={{ lineHeight: 1.0, color: VARS.red }}>
          Bureau.
        </BigDisplay>
        <Body size={28} style={{ marginTop: 48, maxWidth: 820, opacity: 0.78 }}>
          Automation. The department that runs while you&rsquo;re not watching — handling the tasks that don&rsquo;t need a human, so you can focus on the ones that do.
        </Body>
      </div>
    </Slide>
  );
}

function SG2() {
  return (
    <Slide theme="light" idx={2} total={SGB_TOTAL} hashtag={SGB_TAG} accent="red">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow color={VARS.red} style={{ marginBottom: 40 }}>The test</Eyebrow>
        <BigDisplay size={72} style={{ color: VARS.char, lineHeight: 1.2 }}>
          Does this task require a human decision — or just a human doing it?
        </BigDisplay>
        <Body size={26} style={{ marginTop: 48, maxWidth: 860, opacity: 0.72 }}>
          If a task always happens the same way — same trigger, same action, same outcome — a machine should be doing it. Most businesses have more of those than they realize.
        </Body>
      </div>
    </Slide>
  );
}

function SG3() {
  return (
    <Slide theme="dark" idx={3} total={SGB_TOTAL} hashtag={SGB_TAG} accent="blue">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow style={{ marginBottom: 40 }}>Good automation candidates</Eyebrow>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {[
            "Appointment confirmation and reminder emails",
            "Invoice follow-up sequences (day 7, day 14, day 30)",
            "Review request emails after service completion",
            "Lead notifications when a form is submitted",
            "Social media scheduling",
            "Weekly reports — generated and delivered automatically",
            "New client onboarding sequences",
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 16,
              borderBottom: i < 6 ? "1px solid rgba(249,246,240,0.10)" : "none",
              paddingBottom: 14,
            }}>
              <span style={{ color: VARS.blue, fontWeight: 700, fontSize: 18, marginTop: 2 }}>→</span>
              <span style={{ fontFamily: "var(--font-details)", fontSize: 16, color: "rgba(249,246,240,0.82)", lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

function SG4() {
  return (
    <Slide theme="light" idx={4} total={SGB_TOTAL} hashtag={SGB_TAG} accent="red">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow color={VARS.red} style={{ marginBottom: 36 }}>The hours-back math</Eyebrow>
        <BigDisplay size={200} style={{ color: VARS.red, lineHeight: 0.85, letterSpacing: "-0.04em" }}>
          2 hrs
        </BigDisplay>
        <BigDisplay size={56} style={{ color: VARS.char, marginTop: 16 }}>
          per day on tasks automation handles.
        </BigDisplay>
        <Body size={26} style={{ marginTop: 40, maxWidth: 840, opacity: 0.72 }}>
          That&rsquo;s 500 hours a year — $20,000–$30,000 in owner time at any reasonable rate. The tools to automate it cost a fraction of that.
        </Body>
      </div>
    </Slide>
  );
}

function SG5() {
  return (
    <Slide theme="dark" idx={5} total={SGB_TOTAL} hashtag={SGB_TAG} accent="red">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow style={{ marginBottom: 40 }}>The reliability factor</Eyebrow>
        <BigDisplay size={100} style={{ lineHeight: 1.0 }}>
          Machines don&rsquo;t forget
        </BigDisplay>
        <BigDisplay size={100} style={{ color: VARS.red, lineHeight: 1.0, marginTop: 12 }}>
          to follow up.
        </BigDisplay>
        <Body size={26} style={{ marginTop: 48, maxWidth: 840, opacity: 0.78 }}>
          The follow-up email goes out at day 7. Every time. Whether you remembered or not. Whether it&rsquo;s a Tuesday or a holiday weekend. That consistency is the point.
        </Body>
        <Body size={22} style={{ marginTop: 28, opacity: 0.55 }}>
          An automated appointment reminder typically reduces no-shows by 30–40%.
        </Body>
      </div>
    </Slide>
  );
}

function SG6() {
  return (
    <Slide theme="light" idx={6} total={SGB_TOTAL} hashtag={SGB_TAG} accent="red">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow color={VARS.red} style={{ marginBottom: 40 }}>How to get started</Eyebrow>
        <BigDisplay size={68} style={{ color: VARS.char, lineHeight: 1.2 }}>
          It starts with a workflow audit. A list of everything you do repeatedly.
        </BigDisplay>
        <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            ["Workflow audit conversation", "Free"],
            ["Custom automation build — Tactical Sprint", "$625/week"],
            ["Ongoing automation — Command Center Alliance", "~$145/mo"],
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
          digitalallies.net/learn/self-governing-bureau · Strategy is free.
        </Body>
      </div>
    </Slide>
  );
}

export default function DeptSelfGoverning() {
  return [<SG1/>, <SG2/>, <SG3/>, <SG4/>, <SG5/>, <SG6/>];
}
