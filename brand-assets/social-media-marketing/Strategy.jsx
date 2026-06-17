/* global React, Slide, Eyebrow, BigDisplay, Body, VARS, Tag */
// ============================================================
// Carousel 3 — Digital Strategy Without Jargon
// ============================================================

const STRAT_TAG = "Plain Talk";
const STRAT_TOTAL = 6;

function S1() {
  return (
    <Slide theme="dark" idx={1} total={STRAT_TOTAL} hashtag={STRAT_TAG} accent="red">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow style={{ marginBottom: 36 }}>Digital strategy · no jargon</Eyebrow>
        <BigDisplay size={140}>Stop guessing.</BigDisplay>
        <BigDisplay size={140} style={{ color: VARS.red, marginTop: 8 }}>
          Clarity is a choice.
        </BigDisplay>
        <Body size={28} style={{ marginTop: 48, maxWidth: 800, opacity: 0.78 }}>
          Most businesses struggle online and honestly don't know why.
          Spoiler: it's almost always simpler than they think.
        </Body>
      </div>
    </Slide>
  );
}

function S2() {
  // Pull quote — the anxiety of jargon proposals
  return (
    <Slide theme="light" idx={2} total={STRAT_TOTAL} hashtag={STRAT_TAG} accent="red">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow color={VARS.red} style={{ marginBottom: 30 }}>The feeling</Eyebrow>
        <BigDisplay size={64} style={{ color: VARS.char, lineHeight: 1.15 }}>
          You know that feeling when you look at a proposal full of words you don't actually use?
        </BigDisplay>

        <div style={{
          marginTop: 60,
          background: VARS.pinned,
          border: `1px solid ${VARS.char}`,
          borderLeft: `6px solid ${VARS.red}`,
          padding: "44px 48px",
          position: "relative",
          maxWidth: 880,
        }}>
          <span style={{
            position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)",
            width: 20, height: 20, background: VARS.red,
            border: `1.5px solid ${VARS.char}`, borderRadius: "50%",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }} />
          <Body size={30} style={{ color: VARS.char, fontStyle: "italic", lineHeight: 1.5 }}>
            That small knot of anxiety in your stomach.
            The one that says <b>"I hope this works"</b> instead of <b>"I know this will work."</b>
          </Body>
        </div>
      </div>
    </Slide>
  );
}

function S3() {
  return (
    <Slide theme="dark" idx={3} total={STRAT_TOTAL} hashtag={STRAT_TAG} accent="blue">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow style={{ marginBottom: 40 }}>Why I built this</Eyebrow>
        <BigDisplay size={108}>
          I built <span style={{ color: VARS.blue }}>Digital Allies</span> to fix exactly that.
        </BigDisplay>
        <Body size={28} style={{ marginTop: 50, maxWidth: 820, opacity: 0.82 }}>
          I translate what matters in your world into digital tools that actually serve it.
          No jargon. No fluff. Just the stuff that moves the needle for mission-driven folks.
        </Body>
      </div>
    </Slide>
  );
}

function S4() {
  // What you'll find here — 3 bullets
  const items = [
    { eb: "01", title: "Clear breakdowns of online strategy", body: "How websites, search, and AI actually fit together — explained without the buzzwords." },
    { eb: "02", title: "Swipeable tips you can use instantly", body: "Real, applicable changes you can make this week. No theory, no fluff." },
    { eb: "03", title: "Real examples from the trenches", body: "What worked for actual Kingman businesses. What didn't. Why." },
  ];
  return (
    <Slide theme="light" idx={4} total={STRAT_TOTAL} hashtag={STRAT_TAG} accent="red">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow color={VARS.red} style={{ marginBottom: 24 }}>On this account</Eyebrow>
        <BigDisplay size={72} style={{ color: VARS.char, marginBottom: 48 }}>
          What you'll find here.
        </BigDisplay>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {items.map((it, i) => (
            <div key={i} style={{
              display: "flex", gap: 28, alignItems: "flex-start",
              padding: "22px 28px",
              border: `1px solid ${VARS.char}`,
              background: VARS.bone,
            }}>
              <div style={{
                fontFamily: "var(--font-headers)", fontWeight: 700, fontSize: 54, lineHeight: 1,
                color: VARS.red, flexShrink: 0, minWidth: 80,
              }}>{it.eb}</div>
              <div>
                <div style={{ fontFamily: "var(--font-headers)", fontWeight: 700, fontSize: 30, color: VARS.char, lineHeight: 1.2 }}>{it.title}</div>
                <Body size={22} style={{ marginTop: 8, color: "rgba(45,45,45,0.65)" }}>{it.body}</Body>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

function S5() {
  // Follow CTA
  return (
    <Slide theme="dark" idx={5} total={STRAT_TOTAL} hashtag={STRAT_TAG} accent="red">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow style={{ marginBottom: 36 }}>If this sounds like you</Eyebrow>
        <BigDisplay size={86}>
          Hit follow if you're ready to <span style={{ color: VARS.blue }}>stop stressing</span> about your website
        </BigDisplay>
        <BigDisplay size={86} style={{ marginTop: 12 }}>
          and start <span style={{ color: VARS.red }}>using it.</span>
        </BigDisplay>

        <div style={{
          marginTop: 80,
          display: "flex", gap: 24, alignItems: "center",
          alignSelf: "flex-start",
        }}>
          <div style={{
            padding: "20px 36px",
            background: VARS.red,
            color: VARS.bone,
            fontFamily: "var(--font-headers)",
            fontWeight: 700,
            fontSize: 32,
            border: `1.5px solid ${VARS.bone}`,
          }}>+ Follow @digitalallies</div>
          <div style={{ fontFamily: "var(--font-details)", fontSize: 22, opacity: 0.6 }}>
            One ally. Real answers.
          </div>
        </div>
      </div>
    </Slide>
  );
}

function S6() {
  // Engagement prompt — pinned-note style
  return (
    <Slide theme="light" idx={6} total={STRAT_TOTAL} hashtag={STRAT_TAG} accent="red">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow color={VARS.red} style={{ marginBottom: 24 }}>Your turn</Eyebrow>
        <BigDisplay size={88} style={{ color: VARS.char }}>
          What tech word always confuses you?
        </BigDisplay>
        <Body size={28} style={{ marginTop: 32, color: "rgba(45,45,45,0.7)", maxWidth: 820 }}>
          Drop it in the comments. We'll add it to The Jargon Jar and translate it into plain English.
        </Body>

        <div style={{
          marginTop: 70,
          padding: "28px 32px",
          background: VARS.pinned,
          border: `1px solid ${VARS.char}`,
          maxWidth: 720,
          fontFamily: "var(--font-details)",
        }}>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: VARS.red, marginBottom: 14 }}>
            The Jargon Jar — Now Open ↓
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 22 }}>
            <span style={{ textDecoration: "line-through", opacity: 0.5 }}>"Synergy"</span>
            <span style={{ color: VARS.char, fontWeight: 600 }}>→ Working together.</span>
            <span style={{ textDecoration: "line-through", opacity: 0.5 }}>"Bandwidth"</span>
            <span style={{ color: VARS.char, fontWeight: 600 }}>→ Time. Just time.</span>
            <span style={{ textDecoration: "line-through", opacity: 0.5 }}>"Leverage"</span>
            <span style={{ color: VARS.char, fontWeight: 600 }}>→ To use.</span>
          </div>
        </div>
      </div>
    </Slide>
  );
}

const STRAT_SLIDES = [S1, S2, S3, S4, S5, S6];
Object.assign(window, { STRAT_SLIDES });
