/* global React, Slide, Eyebrow, BigDisplay, Body, VARS, Tag */
// ============================================================
// Carousel 2 — AEO vs SEO
// ============================================================

const AEO_TAG = "AEO vs SEO";
const AEO_TOTAL = 9;

function A1() {
  // Title slide — big VS
  return (
    <Slide theme="dark" idx={1} total={AEO_TOTAL} hashtag={AEO_TAG} accent="blue">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow style={{ marginBottom: 24 }}>For Kingman businesses · 2026</Eyebrow>
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <BigDisplay size={170} style={{ lineHeight: 0.95 }}>SEO</BigDisplay>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "var(--font-details)", fontSize: 24, fontWeight: 700, letterSpacing: "0.2em", color: VARS.red, textTransform: "uppercase" }}>vs</span>
          </div>
          <BigDisplay size={170} style={{ lineHeight: 0.95, color: VARS.blue }}>AEO</BigDisplay>
        </div>
        <Body size={26} style={{ marginTop: 48, maxWidth: 880, opacity: 0.78 }}>
          The difference matters for your business. Here's what changes when AI answers the question instead of a search bar.
        </Body>
      </div>
    </Slide>
  );
}

function A2() {
  return (
    <Slide theme="light" idx={2} total={AEO_TOTAL} hashtag={AEO_TAG} accent="blue">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <BigDisplay size={150} style={{ color: VARS.char }}>SEO</BigDisplay>
        <Eyebrow color={VARS.red} style={{ marginTop: 24 }}>Search Engine Optimization</Eyebrow>
        <div style={{
          marginTop: 60, padding: "40px 48px",
          background: VARS.bone, border: `1px solid ${VARS.char}`,
          borderLeft: `6px solid ${VARS.char}`,
          maxWidth: 820,
        }}>
          <BigDisplay size={52} style={{ color: VARS.char, lineHeight: 1.15 }}>
            Gets you ranked in Google search results.
          </BigDisplay>
        </div>
        <Body size={26} style={{ marginTop: 50, color: "rgba(45,45,45,0.65)", maxWidth: 800 }}>
          The job is the same as it's been for 20 years: be the link someone clicks first.
        </Body>
      </div>
    </Slide>
  );
}

function A3() {
  return (
    <Slide theme="dark" idx={3} total={AEO_TOTAL} hashtag={AEO_TAG} accent="blue">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <BigDisplay size={150} style={{ color: VARS.blue }}>AEO</BigDisplay>
        <Eyebrow style={{ marginTop: 24 }}>Answer Engine Optimization</Eyebrow>
        <div style={{
          marginTop: 60, padding: "40px 48px",
          background: "rgba(58,123,213,0.08)",
          border: `1.5px solid ${VARS.blue}`,
          maxWidth: 820,
        }}>
          <BigDisplay size={52} style={{ color: VARS.bone, lineHeight: 1.15 }}>
            Gets you featured when AI assistants answer questions.
          </BigDisplay>
        </div>
        <Body size={26} style={{ marginTop: 50, opacity: 0.7, maxWidth: 800 }}>
          The new job: be the answer ChatGPT, Siri, or Gemini gives — before anyone clicks a link at all.
        </Body>
      </div>
    </Slide>
  );
}

function A4() {
  // The Siri/AI answer example — search-result-styled card, branded
  return (
    <Slide theme="light" idx={4} total={AEO_TOTAL} hashtag={AEO_TAG} accent="blue">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow color={VARS.red}>The new search</Eyebrow>
        <BigDisplay size={60} style={{ marginTop: 18, color: VARS.char, maxWidth: 940 }}>
          When someone asks the question, your business should be the answer.
        </BigDisplay>

        {/* The "user question" — set like a spoken query */}
        <div style={{
          marginTop: 44,
          display: "flex",
          alignItems: "center",
          gap: 16,
          maxWidth: 820,
        }}>
          <span style={{
            fontFamily: "var(--font-details)", fontSize: 14, fontWeight: 700,
            letterSpacing: "0.22em", textTransform: "uppercase", color: VARS.red,
            border: `1px solid ${VARS.red}`, padding: "4px 10px",
          }}>Asked</span>
          <span style={{
            fontFamily: "var(--font-headers)", fontStyle: "italic",
            fontSize: 30, color: VARS.char, fontWeight: 500,
          }}>
            "Best Mexican restaurant near me?"
          </span>
        </div>

        {/* The branded "search result" answer card */}
        <SerpCard />
      </div>
    </Slide>
  );
}

function SerpCard() {
  return (
    <div style={{
      marginTop: 28,
      background: VARS.bone,
      border: `1.5px solid ${VARS.char}`,
      maxWidth: 880,
      position: "relative",
    }}>
      {/* AI overview chip — pulse dot + label */}
      <div style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "14px 22px",
        borderBottom: `1px solid ${VARS.char}`,
        background: VARS.pinned,
      }}>
        <span style={{
          width: 10, height: 10, borderRadius: "50%",
          background: VARS.blue, border: `1.5px solid ${VARS.char}`,
        }} />
        <span style={{
          fontFamily: "var(--font-details)", fontSize: 14, fontWeight: 700,
          letterSpacing: "0.22em", textTransform: "uppercase", color: VARS.blue,
        }}>AI Overview · Top Answer</span>
        <span style={{ marginLeft: "auto", fontFamily: "var(--font-details)", fontSize: 13, opacity: 0.55, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          via AEO
        </span>
      </div>

      <div style={{ padding: "24px 28px 26px" }}>
        {/* URL breadcrumb */}
        <div style={{
          fontFamily: "var(--font-details)", fontSize: 14,
          color: "rgba(45,45,45,0.65)", letterSpacing: "0.02em",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{
            width: 18, height: 18, borderRadius: "50%",
            border: `1px solid ${VARS.char}`,
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 700, color: VARS.red,
          }}>EP</span>
          <span>elpalaciokingman.com</span>
          <span style={{ opacity: 0.4 }}>›</span>
          <span>menu</span>
        </div>

        {/* Title — the business name */}
        <div style={{
          fontFamily: "var(--font-headers)",
          fontWeight: 700,
          fontSize: 52,
          lineHeight: 1.05,
          color: VARS.blue,
          marginTop: 10,
          letterSpacing: "-0.015em",
        }}>
          El Palacio — Authentic Mexican in Kingman
        </div>

        {/* Snippet */}
        <div style={{
          fontFamily: "var(--font-body)",
          fontSize: 22,
          lineHeight: 1.45,
          color: VARS.char,
          marginTop: 14,
          maxWidth: 760,
        }}>
          Family-owned restaurant serving Sonoran-style Mexican on Stockton Hill Rd.
          Highly rated for street tacos, carne asada, and Saturday-night live music.
          Open until 9 PM tonight.
        </div>

        {/* Status row — rating · hours · category */}
        <div style={{
          display: "flex", alignItems: "center", gap: 18,
          marginTop: 20, paddingTop: 16,
          borderTop: `1px dashed ${VARS.char}`,
          fontFamily: "var(--font-details)", fontSize: 16, color: VARS.char,
        }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: VARS.red, fontSize: 18 }}>★</span>
            <b>4.8</b>
            <span style={{ opacity: 0.55 }}>(312 reviews)</span>
          </span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span><b style={{ color: VARS.red }}>Open</b> until 9 PM</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>Mexican · $$</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>Stockton Hill Rd</span>
        </div>
      </div>
    </div>
  );
}

function TipSlide({ idx, no, label, title, body, theme = "dark" }) {
  const isDark = theme === "dark";
  return (
    <Slide theme={theme} idx={idx} total={AEO_TOTAL} hashtag={AEO_TAG} accent={isDark ? "blue" : "red"}>
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 40 }}>
          <div style={{
            fontFamily: "var(--font-headers)",
            fontWeight: 700,
            fontSize: 200,
            lineHeight: 0.85,
            color: isDark ? VARS.blue : VARS.red,
            letterSpacing: "-0.025em",
            flexShrink: 0,
          }}>{no}</div>
          <div style={{ paddingTop: 30 }}>
            <Eyebrow color={isDark ? VARS.bone : VARS.char} style={{ opacity: 0.7 }}>Tip {no} of 04</Eyebrow>
            <div style={{
              fontFamily: "var(--font-details)",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: isDark ? VARS.blue : VARS.red,
              marginTop: 20,
            }}>{label}</div>
          </div>
        </div>
        <div style={{ marginTop: 56 }}>
          <BigDisplay size={66} style={{ lineHeight: 1.05 }}>{title}</BigDisplay>
        </div>
        <Body size={28} style={{
          marginTop: 36,
          maxWidth: 880,
          opacity: isDark ? 0.85 : 1,
          color: isDark ? "rgba(249,246,240,0.85)" : "rgba(45,45,45,0.75)",
        }}>{body}</Body>
      </div>
    </Slide>
  );
}

function A5() {
  return <TipSlide idx={5} no="01" theme="dark" label="Structured Data"
    title="Add schema markup to your site."
    body="Schema tells search engines and AI exactly what your business offers — your hours, your location, your menu, your prices. It's the difference between being read and being understood." />;
}
function A6() {
  return <TipSlide idx={6} no="02" theme="light" label="Clear Answer Formatting"
    title="Structure your content to answer questions directly."
    body="Not buried in paragraphs. Not vague. Direct answers an AI can parse and serve. If a sentence doesn't answer something a customer would ask, it doesn't belong on the page." />;
}
function A7() {
  return <TipSlide idx={7} no="03" theme="dark" label="Local Business Verification"
    title="Make your name, address, and hours match everywhere."
    body="Google Business Profile. Apple Maps. Yelp. The local directories you signed up for in 2019 and forgot about. Consistent info across platforms is what builds AI confidence in your data." />;
}
function A8() {
  return <TipSlide idx={8} no="04" theme="light" label="Real Case Studies"
    title="Post the real results you've delivered."
    body="Sharing real outcomes from real clients is the strongest signal you can send — to customers, search engines, and AI. Vague testimonials don't cut it anymore. Specifics do." />;
}

function A9() {
  // CTA
  return (
    <Slide theme="dark" idx={AEO_TOTAL} total={AEO_TOTAL} hashtag={AEO_TAG} accent="red">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow style={{ marginBottom: 32 }}>The Reciprocity Loop</Eyebrow>
        <BigDisplay size={94}>
          Want to know if your site is <span style={{ color: VARS.blue }}>AEO-ready?</span>
        </BigDisplay>
        <Body size={28} style={{ marginTop: 36, opacity: 0.85, maxWidth: 840 }}>
          Find out where you stand with a free discovery meeting.
          Strategy is free. Execution is paid. Always quoted before any work starts.
        </Body>

        <div style={{
          marginTop: 70,
          padding: "32px 40px",
          border: `1.5px solid ${VARS.red}`,
          background: "rgba(197,48,26,0.08)",
          display: "inline-flex",
          alignItems: "center",
          gap: 30,
          alignSelf: "flex-start",
        }}>
          <span style={{ width: 16, height: 16, background: VARS.red, borderRadius: "50%", border: `1px solid ${VARS.bone}` }} />
          <span style={{ fontFamily: "var(--font-headers)", fontWeight: 700, fontSize: 36 }}>
            [ Book a Free Discovery → ]
          </span>
        </div>
        <Body size={22} style={{ marginTop: 40, opacity: 0.6, fontFamily: "var(--font-details)" }}>
          digitalallies.net · (928) 228-5769 · contact@digitalallies.net
        </Body>
      </div>
    </Slide>
  );
}

const AEO_SLIDES = [A1, A2, A3, A4, A5, A6, A7, A8, A9];
Object.assign(window, { AEO_SLIDES });
