/* global React, Slide, Eyebrow, BigDisplay, Body, VARS, Tag */
// ============================================================
// Carousel 1 — One Year Of Real Kingman Web Traffic
// Source: GA4, May 22 2025 – May 21 2026 · single local client (anonymized)
// 17K active users · 12 months
// ============================================================

const KINGMAN_HASHTAG = "Real Kingman Data";
const SOURCE_LINE = "GA4 · 17K users · May ’25 → May ’26 · local Kingman client";

function K1() {
  // Hook
  return (
    <Slide theme="dark" idx={1} total={8} hashtag={KINGMAN_HASHTAG} accent="blue">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow style={{ marginBottom: 36 }}>One Year Of Real Data · 01</Eyebrow>
        <BigDisplay size={102}>
          I just spent 12 months watching
        </BigDisplay>
        <BigDisplay size={102} style={{ color: VARS.blue, marginTop: 6 }}>
          one Kingman website.
        </BigDisplay>
        <Body size={28} style={{ marginTop: 44, maxWidth: 820, opacity: 0.82 }}>
          One local client. Twelve months of Google Analytics. No guesses, no industry averages —
          just what actually happened on the screens of real Kingman visitors. Here's what surprised me.
        </Body>
        <div style={{
          marginTop: 64, fontFamily: "var(--font-details)", fontSize: 16,
          letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.55,
        }}>
          Source · GA4 · 17,000 active users · 12 months
        </div>
      </div>
    </Slide>
  );
}

function K2() {
  // The big number — 87.4% mobile
  return (
    <Slide theme="light" idx={2} total={8} hashtag={KINGMAN_HASHTAG} accent="red">
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Eyebrow color={VARS.red}>The Headline</Eyebrow>
        <div style={{ marginTop: 28 }}>
          <BigDisplay size={64} style={{ opacity: 0.85 }}>Visits that happened on a phone:</BigDisplay>
        </div>

        <div style={{
          marginTop: 32,
          fontFamily: "var(--font-headers)",
          fontSize: 360,
          lineHeight: 0.92,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          color: VARS.red,
        }}>
          87.4<span style={{ fontSize: 180, verticalAlign: "top" }}>%</span>
        </div>

        <div style={{
          marginTop: 28, display: "flex", gap: 0,
          border: `1px solid ${VARS.char}`, background: VARS.pinned,
        }}>
          <DeviceRow label="Mobile"  pct={87.4} accent={VARS.red} />
          <DeviceRow label="Desktop" pct={9.0}  accent={VARS.char} />
          <DeviceRow label="Tablet"  pct={3.6}  accent={VARS.char} />
        </div>

        <Body size={24} style={{ marginTop: 26, color: "rgba(45,45,45,0.75)", maxWidth: 880 }}>
          Not 60/40. Not 70/30. <b>Nine out of ten visits.</b> This is what "mobile-first"
          actually looks like in our market — and it's not an opinion, it's a measurement.
        </Body>

        <div style={{
          marginTop: "auto", fontFamily: "var(--font-details)", fontSize: 16,
          letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(45,45,45,0.5)",
        }}>
          {SOURCE_LINE}
        </div>
      </div>
    </Slide>
  );
}

function DeviceRow({ label, pct, accent }) {
  return (
    <div style={{
      flex: pct, padding: "18px 22px",
      borderRight: `1px solid ${VARS.char}`,
      display: "flex", flexDirection: "column", gap: 4,
      background: accent === VARS.red ? "rgba(197,48,26,0.06)" : "transparent",
    }}>
      <span style={{
        fontFamily: "var(--font-details)", fontSize: 14, fontWeight: 700,
        letterSpacing: "0.2em", textTransform: "uppercase", color: accent, opacity: 0.85,
      }}>{label}</span>
      <span style={{
        fontFamily: "var(--font-headers)", fontSize: 38, fontWeight: 700, color: VARS.char,
      }}>{pct}%</span>
    </div>
  );
}

function K3() {
  // iOS vs Android
  return (
    <Slide theme="dark" idx={3} total={8} hashtag={KINGMAN_HASHTAG} accent="blue">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow style={{ marginBottom: 20 }}>Of Those Phones</Eyebrow>
        <BigDisplay size={78}>
          iPhone outweighed Android <span style={{ color: VARS.blue }}>nearly 3 to 1.</span>
        </BigDisplay>

        <div style={{ display: "flex", gap: 22, marginTop: 44 }}>
          <OSCard label="iOS"     count="11,000" share="71%" color={VARS.blue} dark />
          <OSCard label="Android" count="4,400"  share="29%" color={VARS.bone} dark muted />
        </div>

        <Body size={24} style={{ marginTop: 30, maxWidth: 880, opacity: 0.82 }}>
          Design for Safari first. If your site breaks on a 6.1-inch iPhone, you've lost
          the majority of your audience before they read a single sentence.
        </Body>

        <div style={{
          marginTop: 26, padding: "14px 22px",
          border: `1px solid rgba(249,246,240,0.25)`, maxWidth: 760,
          display: "flex", gap: 16, alignItems: "center",
        }}>
          <span style={{
            fontFamily: "var(--font-details)", fontWeight: 700, fontSize: 14,
            letterSpacing: "0.2em", textTransform: "uppercase", color: VARS.blue,
          }}>The phone they're holding</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span style={{ fontFamily: "var(--font-details)", fontSize: 18, opacity: 0.9 }}>
            390 × 844 px — standard iPhone 13/14/15 screen
          </span>
        </div>
      </div>
    </Slide>
  );
}

function OSCard({ label, count, share, color, dark = false, muted = false }) {
  return (
    <div style={{
      flex: 1, padding: "22px 26px 20px",
      border: `1px solid ${dark ? "rgba(249,246,240,0.25)" : VARS.char}`,
      background: muted ? "transparent" : (dark ? "rgba(58,123,213,0.10)" : VARS.pinned),
      display: "flex", flexDirection: "column", gap: 6,
    }}>
      <span style={{
        fontFamily: "var(--font-details)", fontWeight: 700, fontSize: 14,
        letterSpacing: "0.2em", textTransform: "uppercase", color,
      }}>{label}</span>
      <span style={{
        fontFamily: "var(--font-headers)", fontSize: 78, fontWeight: 700,
        lineHeight: 1, color: dark ? VARS.bone : VARS.char,
      }}>{share}</span>
      <span style={{
        fontFamily: "var(--font-details)", fontSize: 16, opacity: 0.7,
        color: dark ? VARS.bone : VARS.char,
      }}>{count} active users</span>
    </div>
  );
}

function K4() {
  // Channel mix — where they came from
  const channels = [
    { label: "Paid Social",    pct: 39.4, count: "9.1K",  color: VARS.red },
    { label: "Organic Social", pct: 22.1, count: "5.1K",  color: VARS.red },
    { label: "Direct",         pct: 19.0, count: "4.4K",  color: VARS.char },
    { label: "Organic Search", pct: 13.0, count: "3.0K",  color: VARS.blue },
    { label: "Referral",       pct: 5.6,  count: "1.3K",  color: VARS.char },
  ];

  return (
    <Slide theme="light" idx={4} total={8} hashtag={KINGMAN_HASHTAG} accent="red">
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Eyebrow color={VARS.red}>Where They Came From</Eyebrow>
        <BigDisplay size={72} style={{ marginTop: 18 }}>
          Social moved more traffic than Google. By a lot.
        </BigDisplay>

        <div style={{ marginTop: 44, display: "flex", flexDirection: "column", gap: 14 }}>
          {channels.map((c) => (
            <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 22 }}>
              <span style={{
                width: 240, fontFamily: "var(--font-details)", fontWeight: 700, fontSize: 18,
                letterSpacing: "0.12em", textTransform: "uppercase", color: VARS.char,
              }}>{c.label}</span>
              <div style={{ flex: 1, height: 36, background: VARS.pinned, border: `1px solid ${VARS.char}`, position: "relative" }}>
                <div style={{ width: `${(c.pct / 40) * 100}%`, height: "100%", background: c.color, opacity: c.color === VARS.char ? 0.85 : 1 }} />
              </div>
              <span style={{
                width: 100, fontFamily: "var(--font-headers)", fontWeight: 700, fontSize: 32,
                color: VARS.char, textAlign: "right",
              }}>{c.pct}%</span>
              <span style={{
                width: 70, fontFamily: "var(--font-details)", fontSize: 16,
                color: "rgba(45,45,45,0.6)", textAlign: "right",
              }}>{c.count}</span>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 36, padding: "20px 26px",
          background: VARS.char, color: VARS.bone,
          maxWidth: 880,
        }}>
          <span style={{
            fontFamily: "var(--font-details)", fontSize: 16, fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase", color: VARS.red,
          }}>The combined truth</span>
          <Body size={26} style={{ marginTop: 8 }}>
            <b>61% of all visits came from social.</b> Organic search drove just 13%.
            The story we tell about "SEO first" might be a smaller piece of the picture than we think.
          </Body>
        </div>

        <div style={{
          marginTop: "auto", fontFamily: "var(--font-details)", fontSize: 16,
          letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(45,45,45,0.5)",
        }}>
          {SOURCE_LINE}
        </div>
      </div>
    </Slide>
  );
}

function K5() {
  // City split — Local vs Visitor (split-screen card)
  return (
    <Slide theme="light" idx={5} total={8} hashtag={KINGMAN_HASHTAG} accent="red">
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Eyebrow color={VARS.red}>Same Website · Two Audiences</Eyebrow>
        <BigDisplay size={62} style={{ marginTop: 18, lineHeight: 1.04 }}>
          Split the traffic by city, and the visitors split <span style={{ color: VARS.red }}>into two jobs.</span>
        </BigDisplay>

        <div style={{
          marginTop: 36, display: "flex", flex: 1,
          border: `1.5px solid ${VARS.char}`,
        }}>
          <CityPanel
            light
            num="01"
            label="The Local Planner"
            heading="Kingman"
            tag="Studies before they decide."
            stats={[
              ["24%", "return rate — the highest of any city"],
              ["Desktop", "the only city with serious desktop use (~741 sessions)"],
              ["Wed–Thu", "active mostly during business hours"],
              ["Homepage", "lands on the home + 'what's on' page to browse"],
            ]}
          />
          <CityPanel
            num="02"
            label="The Visitor"
            heading="Phoenix · Vegas · LA"
            tag="Decides in one scroll."
            stats={[
              ["~100%", "mobile — basically no desktop visits at all"],
              ["New users", "finding the business for the first time"],
              ["Thu–Fri 6–10 PM", "peak hour Fri 6 PM = 320 mobile sessions"],
              ["Event page", "lands straight on a specific show or product page"],
            ]}
          />
        </div>

        <div style={{
          marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{
            fontFamily: "var(--font-headers)", fontWeight: 700, fontSize: 22,
            color: VARS.char,
          }}>
            Same site. <span style={{ color: VARS.red }}>Two jobs.</span>
          </span>
          <span style={{
            fontFamily: "var(--font-details)", fontSize: 16,
            letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(45,45,45,0.5)",
          }}>{SOURCE_LINE}</span>
        </div>
      </div>
    </Slide>
  );
}

function CityPanel({ light = false, num, label, heading, tag, stats }) {
  const bg = light ? VARS.pinned : VARS.char;
  const fg = light ? VARS.char : VARS.bone;
  const accentColor = light ? VARS.blue : VARS.red;
  const subtle = light ? "rgba(45,45,45,0.65)" : "rgba(249,246,240,0.65)";
  const lineColor = light ? "rgba(45,45,45,0.2)" : "rgba(249,246,240,0.18)";

  return (
    <div style={{
      flex: 1, background: bg, color: fg, padding: "24px 28px 22px",
      display: "flex", flexDirection: "column",
      borderRight: light ? `1.5px solid ${VARS.char}` : "none",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{
          fontFamily: "var(--font-details)", fontWeight: 700, fontSize: 14,
          letterSpacing: "0.22em", color: accentColor,
        }}>{num}</span>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: accentColor }} />
        <span style={{
          fontFamily: "var(--font-details)", fontWeight: 700, fontSize: 14,
          letterSpacing: "0.22em", textTransform: "uppercase", color: fg, opacity: 0.85,
        }}>{label}</span>
      </div>
      <div style={{
        fontFamily: "var(--font-headers)", fontWeight: 700, fontSize: 48,
        lineHeight: 1.02, color: fg, marginTop: 12, letterSpacing: "-0.015em",
      }}>{heading}</div>
      <div style={{
        fontFamily: "var(--font-headers)", fontStyle: "italic", fontWeight: 500,
        fontSize: 20, color: accentColor, marginTop: 4,
      }}>{tag}</div>

      <div style={{ marginTop: 18, display: "flex", flexDirection: "column" }}>
        {stats.map(([k, v], i) => (
          <div key={i} style={{
            display: "flex", flexDirection: "column", gap: 2,
            paddingTop: 10, paddingBottom: 10,
            borderTop: `1px solid ${lineColor}`,
          }}>
            <span style={{
              fontFamily: "var(--font-headers)", fontWeight: 700, fontSize: 22,
              color: fg, letterSpacing: "-0.01em", lineHeight: 1.1,
            }}>{k}</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 15, color: subtle, lineHeight: 1.35 }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function K6() {
  // FB vs IG in Kingman
  return (
    <Slide theme="dark" idx={6} total={8} hashtag={KINGMAN_HASHTAG} accent="red">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow style={{ marginBottom: 20 }}>And On Social…</Eyebrow>
        <BigDisplay size={72}>
          Facebook still outweighed Instagram. <span style={{ color: VARS.red }}>About 3 to 1.</span>
        </BigDisplay>

        <div style={{ display: "flex", gap: 0, marginTop: 36, border: `1px solid rgba(249,246,240,0.25)` }}>
          <PlatformPanel
            label="Facebook"
            sub="(fb + facebook.com + m.facebook.com + l.facebook.com)"
            value="~10,000"
            unit="sessions"
            color={VARS.red}
            fill="rgba(197,48,26,0.18)"
            flex={10}
          />
          <PlatformPanel
            label="Instagram"
            sub="(ig)"
            value="3,100"
            unit="sessions"
            color={VARS.bone}
            fill="transparent"
            flex={3.1}
          />
        </div>

        <Body size={24} style={{ marginTop: 32, maxWidth: 880, opacity: 0.85 }}>
          In Kingman, Facebook is still the front door. Instagram is the window.
          Both matter — but where you spend your time should match where your audience actually is.
        </Body>

        <div style={{
          marginTop: 22, fontFamily: "var(--font-details)", fontSize: 14,
          letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.5,
        }}>
          {SOURCE_LINE}
        </div>
      </div>
    </Slide>
  );
}

function PlatformPanel({ label, sub, value, unit, color, fill, flex }) {
  return (
    <div style={{
      flex, padding: "22px 24px 20px",
      borderRight: `1px solid rgba(249,246,240,0.25)`,
      background: fill, display: "flex", flexDirection: "column", gap: 4,
    }}>
      <span style={{
        fontFamily: "var(--font-details)", fontWeight: 700, fontSize: 14,
        letterSpacing: "0.2em", textTransform: "uppercase", color,
      }}>{label}</span>
      <span style={{
        fontFamily: "var(--font-headers)", fontSize: 64, fontWeight: 700,
        lineHeight: 1, color: VARS.bone,
      }}>{value}</span>
      <span style={{ fontFamily: "var(--font-details)", fontSize: 14, opacity: 0.65, color: VARS.bone }}>
        {unit}
      </span>
      <span style={{
        marginTop: 6, fontFamily: "var(--font-details)", fontSize: 12,
        opacity: 0.5, color: VARS.bone, fontStyle: "italic",
      }}>{sub}</span>
    </div>
  );
}

function K7() {
  // Takeaway + CTA
  return (
    <Slide theme="light" idx={7} total={8} hashtag={KINGMAN_HASHTAG} accent="red">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
        <Eyebrow color={VARS.red}>The Takeaway</Eyebrow>
        <BigDisplay size={72} style={{ marginTop: 20, maxWidth: 920 }}>
          Build for the phone in their hand. The one that's <span style={{ color: VARS.red }}>open right now.</span>
        </BigDisplay>

        <div style={{
          marginTop: 32, display: "flex", flexDirection: "column", gap: 8,
          fontFamily: "var(--font-headers)", fontSize: 30, fontWeight: 600,
          color: VARS.char,
        }}>
          <Pillar n="01" text="Mobile-first." />
          <Pillar n="02" text="Safari-first." />
          <Pillar n="03" text="Social-driven." />
          <Pillar n="04" text="Local-fluent." />
        </div>

        <Body size={22} style={{ marginTop: 28, color: "rgba(45,45,45,0.75)", maxWidth: 820 }}>
          That's where Kingman actually lives in 2026 —
          not in best-practice articles, but in a real local GA dashboard.
        </Body>

        <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 10 }}>
          <Body size={20} style={{ color: VARS.char, fontWeight: 700 }}>
            What surprised you most? Tell me in the comments. ↓
          </Body>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Tag>#KingmanBusiness</Tag>
            <Tag>#MobileWeb</Tag>
            <Tag>#DigitalAllies</Tag>
          </div>
        </div>
      </div>
    </Slide>
  );
}

function Pillar({ n, text }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
      <span style={{
        fontFamily: "var(--font-details)", fontWeight: 700, fontSize: 18,
        letterSpacing: "0.2em", color: VARS.red,
      }}>{n}</span>
      <span>{text}</span>
    </div>
  );
}

function K8() {
  // Final CTA — the question card
  return (
    <Slide theme="dark" idx={8} total={8} hashtag={KINGMAN_HASHTAG} accent="red">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
        <Eyebrow style={{ marginBottom: 28 }}>Your Turn</Eyebrow>
        <BigDisplay size={96} style={{ maxWidth: 920 }}>
          What device are you <span style={{ color: VARS.red }}>using right now?</span>
        </BigDisplay>
        <Body size={26} style={{ marginTop: 36, opacity: 0.82, maxWidth: 760 }}>
          Tell me in the comments. I'm building for both —
          and the more I hear from real Kingman businesses, the sharper the next site gets.
        </Body>

        <div style={{ marginTop: 44, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Tag>#KingmanBusiness</Tag>
          <Tag>#MobileWeb</Tag>
          <Tag>#DigitalAllies</Tag>
        </div>
      </div>
    </Slide>
  );
}

function Tag({ children }) {
  return (
    <span style={{
      border: `1px solid ${VARS.char}`,
      background: VARS.pinned,
      padding: "8px 18px",
      fontSize: 22,
      letterSpacing: "0.02em",
      fontFamily: "var(--font-details)",
      fontWeight: 700,
    }}>{children}</span>
  );
}

const KINGMAN_SLIDES = [K1, K2, K3, K4, K5, K6, K7, K8];
Object.assign(window, { KINGMAN_SLIDES, Tag });
