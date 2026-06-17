/* global React, Slide, Eyebrow, BigDisplay, Body, VARS, Tag */
// ============================================================
// Carousel 4 — The Design Bureau
// "Your brand's color isn't the problem. Where you put it is."
// ============================================================

const DB_TAG = "The Design Bureau";
const DB_TOTAL = 6;

function DB1() {
  return (
    <Slide theme="dark" idx={1} total={DB_TOTAL} hashtag={DB_TAG} accent="red">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow style={{ marginBottom: 36 }}>The Departments · 01 of 04</Eyebrow>
        <BigDisplay size={130} style={{ lineHeight: 1.0, marginBottom: 16 }}>
          The Design
        </BigDisplay>
        <BigDisplay size={130} style={{ lineHeight: 1.0, color: VARS.red }}>
          Bureau.
        </BigDisplay>
        <Body size={28} style={{ marginTop: 48, maxWidth: 820, opacity: 0.78 }}>
          The visual side of the operation. Website, brand identity, social graphics, document templates — built as a system, not a stack of one-offs.
        </Body>
      </div>
    </Slide>
  );
}

function DB2() {
  return (
    <Slide theme="light" idx={2} total={DB_TOTAL} hashtag={DB_TAG} accent="red">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow color={VARS.red} style={{ marginBottom: 40 }}>The rule</Eyebrow>
        <BigDisplay size={90} style={{ color: VARS.char, lineHeight: 1.1 }}>
          Color everywhere is
        </BigDisplay>
        <BigDisplay size={90} style={{ color: VARS.red, lineHeight: 1.1 }}>
          color nowhere.
        </BigDisplay>
        <Body size={26} style={{ marginTop: 48, maxWidth: 840, opacity: 0.72 }}>
          95% of every canvas stays neutral. The remaining 5% is where all the color lives — and because it's rare, it works. Restraint is not a limitation. It's the mechanism that makes the one accent land.
        </Body>
      </div>
    </Slide>
  );
}

function DB3() {
  return (
    <Slide theme="dark" idx={3} total={DB_TOTAL} hashtag={DB_TAG} accent="blue">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow style={{ marginBottom: 40 }}>Typography</Eyebrow>
        <BigDisplay size={80} style={{ lineHeight: 1.15 }}>
          Your font is talking
        </BigDisplay>
        <BigDisplay size={80} style={{ color: VARS.blue, lineHeight: 1.15 }}>
          before the first word is read.
        </BigDisplay>
        <Body size={26} style={{ marginTop: 48, maxWidth: 840, opacity: 0.78 }}>
          One typeface for headers. One for body. That's the whole system. Loading four font weights when you only use two is burning energy for nothing — and slowing down every page load.
        </Body>
      </div>
    </Slide>
  );
}

function DB4() {
  return (
    <Slide theme="light" idx={4} total={DB_TOTAL} hashtag={DB_TAG} accent="red">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow color={VARS.red} style={{ marginBottom: 36 }}>Performance = Sustainability</Eyebrow>
        <BigDisplay size={70} style={{ color: VARS.char, lineHeight: 1.15 }}>
          A fast site isn't just good for users.
        </BigDisplay>
        <BigDisplay size={70} style={{ color: VARS.red, lineHeight: 1.15, marginTop: 8 }}>
          It's good for the planet.
        </BigDisplay>
        <Body size={26} style={{ marginTop: 48, maxWidth: 860, opacity: 0.72 }}>
          Every unoptimized image, every unused font weight, every idle script burns energy in a data center somewhere. A 4MB photo optimized to 200KB WebP is ~95% less data — and that math runs on every page load, every visitor, every day.
        </Body>
      </div>
    </Slide>
  );
}

function DB5() {
  return (
    <Slide theme="dark" idx={5} total={DB_TOTAL} hashtag={DB_TAG} accent="red">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow style={{ marginBottom: 40 }}>Brand consistency</Eyebrow>
        <BigDisplay size={80} style={{ lineHeight: 1.1 }}>
          Your logo, site, and social posts should look like they
        </BigDisplay>
        <BigDisplay size={80} style={{ color: VARS.red, lineHeight: 1.1, marginTop: 8 }}>
          know each other.
        </BigDisplay>
        <Body size={26} style={{ marginTop: 48, maxWidth: 840, opacity: 0.78 }}>
          Three things consistent everywhere: your color, your typeface, your spacing. That's a brand system. Everything else follows from those three decisions.
        </Body>
      </div>
    </Slide>
  );
}

function DB6() {
  return (
    <Slide theme="light" idx={6} total={DB_TOTAL} hashtag={DB_TAG} accent="red">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 900 }}>
        <Eyebrow color={VARS.red} style={{ marginBottom: 40 }}>What The Design Bureau builds</Eyebrow>
        {[
          ["Website design", "Mobile-first, WCAG 2.1 AA, bilingual, fast."],
          ["Brand identity", "Logo system, color, type — one reference file that travels."],
          ["Social graphics", "Post templates, carousels, covers — consistent with the brand."],
          ["Performance audit", "Image optimization, font loading, third-party script review."],
        ].map(([title, desc], i) => (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: 24,
            borderBottom: i < 3 ? `1px solid rgba(45,45,45,0.12)` : "none",
            paddingBottom: 20, marginBottom: 20,
          }}>
            <span style={{ color: VARS.red, fontFamily: "var(--font-details)", fontSize: 14, fontWeight: 700, minWidth: 24, marginTop: 3 }}>→</span>
            <div>
              <span style={{ fontFamily: "var(--font-headers)", fontWeight: 700, fontSize: 18, color: VARS.char }}>{title}</span>
              <span style={{ fontFamily: "var(--font-details)", fontSize: 15, color: "rgba(45,45,45,0.6)", marginLeft: 12 }}>{desc}</span>
            </div>
          </div>
        ))}
        <Body size={22} style={{ marginTop: 24, opacity: 0.55 }}>
          digitalallies.net/learn/design-bureau · Strategy is free.
        </Body>
      </div>
    </Slide>
  );
}

export default function DeptDesignBureau() {
  return [<DB1/>, <DB2/>, <DB3/>, <DB4/>, <DB5/>, <DB6/>];
}
