// IG Square covers (1080×1080) — one per Department + IG Story composite

// Shared cover frame — bone-white + lace + corner marks
function CoverFrame({ children, bg = "#F9F6F0", style = {} }) {
  return (
    <div style={{
      width: 1080,
      height: 1080,
      background: bg,
      backgroundImage: laceBg(20, 0.06),
      position: "relative",
      overflow: "hidden",
      fontFamily: "var(--font-body, 'JetBrains Mono', monospace)",
      color: "#2D2D2D",
      ...style,
    }}>
      {/* Outer hairline rule */}
      <div style={{
        position: "absolute", inset: 40,
        border: "1px solid #2D2D2D",
        pointerEvents: "none",
      }} />
      {/* Corner ticks */}
      <CornerTicks />
      {children}
    </div>
  );
}

function CornerTicks() {
  const tick = { position: "absolute", width: 14, height: 14, borderColor: "#2D2D2D" };
  return (
    <>
      <div style={{ ...tick, top: 40, left: 40, borderTop: "1px solid", borderLeft: "1px solid", transform: "translate(-1px,-1px)", width: 28, height: 28 }} />
      <div style={{ ...tick, top: 40, right: 40, borderTop: "1px solid", borderRight: "1px solid", transform: "translate(1px,-1px)", width: 28, height: 28 }} />
      <div style={{ ...tick, bottom: 40, left: 40, borderBottom: "1px solid", borderLeft: "1px solid", transform: "translate(-1px,1px)", width: 28, height: 28 }} />
      <div style={{ ...tick, bottom: 40, right: 40, borderBottom: "1px solid", borderRight: "1px solid", transform: "translate(1px,1px)", width: 28, height: 28 }} />
    </>
  );
}

// Top utility bar inside cover
function CoverHeader({ left, right }) {
  return (
    <div style={{
      position: "absolute", top: 72, left: 72, right: 72,
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <Eyebrow size={14}>{left}</Eyebrow>
      <Eyebrow size={14}>{right}</Eyebrow>
    </div>
  );
}

function CoverFooter({ children }) {
  return (
    <div style={{
      position: "absolute", bottom: 72, left: 72, right: 72,
      display: "flex", justifyContent: "space-between", alignItems: "flex-end",
      gap: 24,
    }}>{children}</div>
  );
}

// ── Cover 01 ─ The Design Bureau ────────────────────────────────────────
function CoverDesign() {
  return (
    <CoverFrame>
      <CoverHeader left="DEPT · 01 / 04" right="DIGITAL ALLIES · KINGMAN AZ" />

      {/* Giant "01" with overprinted compass */}
      <div style={{
        position: "absolute", left: 72, top: 180,
        right: 72, height: 600,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ position: "relative", width: 720, height: 600 }}>
          <div style={{
            fontFamily: "var(--font-headers, 'Lexend Deca', sans-serif)",
            fontSize: 600,
            fontWeight: 700,
            lineHeight: 0.85,
            letterSpacing: "-0.04em",
            color: "#2D2D2D",
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>01</div>
          {/* Compass overprint */}
          <img src="assets/icon-compass.png" alt="" style={{
            position: "absolute", width: 280, height: 280,
            top: 160, left: 220,
            mixBlendMode: "multiply",
            opacity: 0.92,
          }} />
          {/* Off-center signal dot — symmetry break */}
          <SignalDot size={22} style={{
            position: "absolute", top: 178, left: 358,
            boxShadow: "0 2px 6px rgba(197,48,26,0.4)",
          }} />
        </div>
      </div>

      <CoverFooter>
        <div>
          <Eyebrow size={11} color="#7a6f5e">FILED UNDER</Eyebrow>
          <div style={{
            fontFamily: "var(--font-headers, 'Lexend Deca', sans-serif)",
            fontSize: 44, fontWeight: 600, marginTop: 4, lineHeight: 1.05,
            letterSpacing: "-0.01em",
          }}>The Design<br/>Bureau</div>
          <div style={{
            fontFamily: "var(--font-body, 'JetBrains Mono', monospace)",
            fontSize: 16, marginTop: 16, color: "#5a5347",
            maxWidth: 480, lineHeight: 1.55,
          }}>Brand, web, identity — built so the parts know each other.</div>
        </div>
        <Bracket size={16}>Inquire Within</Bracket>
      </CoverFooter>
    </CoverFrame>
  );
}

// ── Cover 02 ─ Dept. of Cooperation ──────────────────────────────────────
function CoverCooperation() {
  return (
    <CoverFrame bg="#F9F6F0">
      <CoverHeader left="DEPT · 02 / 04" right="DIGITAL ALLIES · KINGMAN AZ" />

      {/* Two engines connected by hairlines — integration motif */}
      <div style={{
        position: "absolute", top: 200, left: 72, right: 72, height: 560,
      }}>
        {/* Connecting hairlines */}
        <svg width="100%" height="100%" viewBox="0 0 936 560" style={{ position: "absolute", inset: 0 }}>
          {/* horizontal rail through both engines */}
          <line x1="0" y1="280" x2="936" y2="280" stroke="#2D2D2D" strokeWidth="0.5" strokeDasharray="4 6" />
          {/* sine connector */}
          <path d="M 230 280 Q 350 130 468 280 T 706 280" fill="none" stroke="#2D2D2D" strokeWidth="1.5" />
          {/* tick marks along rail */}
          {Array.from({ length: 24 }, (_, i) => (
            <line key={i} x1={i * 40 + 8} y1="276" x2={i * 40 + 8} y2="284" stroke="#2D2D2D" strokeWidth="0.5" />
          ))}
          {/* node circles at engine centers */}
          <circle cx="230" cy="280" r="6" fill="#F9F6F0" stroke="#2D2D2D" strokeWidth="1.5" />
          <circle cx="706" cy="280" r="6" fill="#F9F6F0" stroke="#2D2D2D" strokeWidth="1.5" />
        </svg>

        {/* Engine A */}
        <img src="assets/icon-engine.png" alt="" style={{
          position: "absolute", width: 280, height: 280,
          top: 140, left: 90,
          mixBlendMode: "multiply",
        }} />
        {/* Engine B */}
        <img src="assets/icon-engine.png" alt="" style={{
          position: "absolute", width: 280, height: 280,
          top: 140, right: 90,
          mixBlendMode: "multiply",
          transform: "scaleX(-1)",
        }} />

        {/* Pulse blue dot — the "signal passes" */}
        <span style={{
          position: "absolute", left: 460, top: 195,
          width: 24, height: 24, borderRadius: "50%",
          background: "#3A7BD5",
          boxShadow: "0 0 0 6px rgba(58,123,213,0.18), 0 0 0 14px rgba(58,123,213,0.08)",
        }} />
      </div>

      <CoverFooter>
        <div>
          <Eyebrow size={11} color="#7a6f5e">FILED UNDER</Eyebrow>
          <div style={{
            fontFamily: "var(--font-headers, 'Lexend Deca', sans-serif)",
            fontSize: 44, fontWeight: 600, marginTop: 4, lineHeight: 1.05,
            letterSpacing: "-0.01em",
          }}>Dept. of<br/>Cooperation</div>
          <div style={{
            fontFamily: "var(--font-body, 'JetBrains Mono', monospace)",
            fontSize: 16, marginTop: 16, color: "#5a5347",
            maxWidth: 520, lineHeight: 1.55,
          }}>Your apps talk to each other. You don't have to.</div>
        </div>
        <Bracket size={16}>View Integrations</Bracket>
      </CoverFooter>
    </CoverFrame>
  );
}

// ── Cover 03 ─ The Self-Governing Bureau ─────────────────────────────────
function CoverAutomation() {
  // Repeating metronome rhythm — pure pattern
  return (
    <CoverFrame bg="#F9F6F0">
      <CoverHeader left="DEPT · 03 / 04" right="DIGITAL ALLIES · KINGMAN AZ" />

      <div style={{
        position: "absolute", top: 180, left: 72, right: 72, height: 600,
      }}>
        {/* Background metronome echo */}
        <img src="assets/icon-metronome.png" alt="" style={{
          position: "absolute", width: 540, height: 540,
          top: 10, left: 198,
          opacity: 0.10,
          mixBlendMode: "multiply",
        }} />

        {/* Repeating arc strokes — automation tempo */}
        <svg width="100%" height="100%" viewBox="0 0 936 600" style={{ position: "absolute", inset: 0 }}>
          {Array.from({ length: 9 }, (_, i) => {
            const angle = -56 + i * 14; // sweep
            const cx = 468, cy = 540;
            const len = 380;
            const x2 = cx + Math.sin(angle * Math.PI / 180) * len;
            const y2 = cy - Math.cos(angle * Math.PI / 180) * len;
            const isMid = i === 4;
            return (
              <g key={i}>
                <line x1={cx} y1={cy} x2={x2} y2={y2}
                  stroke={isMid ? "#C5301A" : "#2D2D2D"}
                  strokeWidth={isMid ? 2.5 : 1}
                  opacity={isMid ? 1 : (0.25 + Math.abs(i - 4) * 0.05)}
                />
                <circle cx={x2} cy={y2} r={isMid ? 9 : 4}
                  fill={isMid ? "#C5301A" : "#2D2D2D"}
                />
              </g>
            );
          })}
          {/* Base */}
          <line x1="280" y1="540" x2="656" y2="540" stroke="#2D2D2D" strokeWidth="1.5" />
          <line x1="320" y1="555" x2="616" y2="555" stroke="#2D2D2D" strokeWidth="0.5" />
          {/* Tempo ticks */}
          {Array.from({ length: 21 }, (_, i) => (
            <line key={i} x1={300 + i * 17} y1="575" x2={300 + i * 17} y2="585" stroke="#2D2D2D" strokeWidth="0.5" />
          ))}
        </svg>

        {/* Tempo label */}
        <div style={{
          position: "absolute", top: 20, left: 0,
          fontFamily: "var(--font-details, 'JetBrains Mono', monospace)",
          fontSize: 13, letterSpacing: "0.12em", color: "#2D2D2D",
        }}>TEMPO · 24/7</div>
        <div style={{
          position: "absolute", top: 20, right: 0,
          fontFamily: "var(--font-details, 'JetBrains Mono', monospace)",
          fontSize: 13, letterSpacing: "0.12em", color: "#2D2D2D",
        }}>NO SUPERVISION</div>
      </div>

      <CoverFooter>
        <div>
          <Eyebrow size={11} color="#7a6f5e">FILED UNDER</Eyebrow>
          <div style={{
            fontFamily: "var(--font-headers, 'Lexend Deca', sans-serif)",
            fontSize: 44, fontWeight: 600, marginTop: 4, lineHeight: 1.05,
            letterSpacing: "-0.01em",
          }}>The Self-Governing<br/>Bureau</div>
          <div style={{
            fontFamily: "var(--font-body, 'JetBrains Mono', monospace)",
            fontSize: 16, marginTop: 16, color: "#5a5347",
            maxWidth: 520, lineHeight: 1.55,
          }}>Repetitive tasks are for machines. Go take a real lunch break.</div>
        </div>
        <Bracket size={16}>Automate It</Bracket>
      </CoverFooter>
    </CoverFrame>
  );
}

// ── Cover 04 ─ The Permanent Observation Post ────────────────────────────
function CoverObservation() {
  return (
    <CoverFrame bg="#F9F6F0">
      <CoverHeader left="DEPT · 04 / 04" right="DIGITAL ALLIES · KINGMAN AZ" />

      <div style={{
        position: "absolute", top: 180, left: 72, right: 72, height: 620,
      }}>
        {/* Topo / contour map */}
        <img src="assets/icon-topo.png" alt="" style={{
          position: "absolute", width: 760, height: 540,
          top: 30, left: 88,
          mixBlendMode: "multiply",
          objectFit: "contain",
          opacity: 0.95,
        }} />

        {/* Red dot at peak — symmetry break */}
        <span style={{
          position: "absolute", top: 230, left: 462,
          width: 24, height: 24, borderRadius: "50%",
          background: "#C5301A",
          boxShadow: "0 0 0 6px rgba(197,48,26,0.18), 0 0 0 14px rgba(197,48,26,0.08), 0 2px 4px rgba(0,0,0,0.15)",
        }} />
        {/* Crosshair through dot */}
        <svg width="100%" height="100%" viewBox="0 0 936 620" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <line x1="0" y1="242" x2="936" y2="242" stroke="#C5301A" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.45" />
          <line x1="474" y1="0" x2="474" y2="620" stroke="#C5301A" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.45" />
        </svg>

        {/* Coords */}
        <div style={{
          position: "absolute", top: 25, left: 0,
          fontFamily: "var(--font-details, 'JetBrains Mono', monospace)",
          fontSize: 12, letterSpacing: "0.12em", color: "#2D2D2D",
        }}>UPTIME · 99.97%</div>
        <div style={{
          position: "absolute", top: 25, right: 0,
          fontFamily: "var(--font-details, 'JetBrains Mono', monospace)",
          fontSize: 12, letterSpacing: "0.12em", color: "#2D2D2D",
        }}>35.18° N / 114.05° W</div>
      </div>

      <CoverFooter>
        <div>
          <Eyebrow size={11} color="#7a6f5e">FILED UNDER</Eyebrow>
          <div style={{
            fontFamily: "var(--font-headers, 'Lexend Deca', sans-serif)",
            fontSize: 44, fontWeight: 600, marginTop: 4, lineHeight: 1.05,
            letterSpacing: "-0.01em",
          }}>The Permanent<br/>Observation Post</div>
          <div style={{
            fontFamily: "var(--font-body, 'JetBrains Mono', monospace)",
            fontSize: 16, marginTop: 16, color: "#5a5347",
            maxWidth: 540, lineHeight: 1.55,
          }}>Monitoring runs 24/7. If something breaks at 2am, that's my problem — not yours.</div>
        </div>
        <Bracket size={16}>Always Watching</Bracket>
      </CoverFooter>
    </CoverFrame>
  );
}

// ── IG Story 1080×1920 ─ The Departments composite ───────────────────────
function StoryDepartments() {
  return (
    <div style={{
      width: 1080, height: 1920,
      background: "#F9F6F0",
      backgroundImage: laceBg(24, 0.06),
      position: "relative",
      overflow: "hidden",
      fontFamily: "var(--font-body, 'JetBrains Mono', monospace)",
      color: "#2D2D2D",
    }}>
      {/* Inner frame */}
      <div style={{ position: "absolute", inset: 48, border: "1px solid #2D2D2D", pointerEvents: "none" }} />

      {/* Top tag */}
      <div style={{ position: "absolute", top: 110, left: 96, right: 96, display: "flex", justifyContent: "space-between" }}>
        <Eyebrow size={16}>DIGITAL ALLIES · DEPARTMENTS</Eyebrow>
        <Eyebrow size={16}>04 / 04</Eyebrow>
      </div>

      {/* Big headline */}
      <div style={{ position: "absolute", top: 200, left: 96, right: 96 }}>
        <div style={{
          fontFamily: "var(--font-headers, 'Lexend Deca', sans-serif)",
          fontSize: 96, fontWeight: 700, lineHeight: 0.95,
          letterSpacing: "-0.025em",
        }}>Four distinct<br/>operations.</div>
        <div style={{
          fontFamily: "var(--font-headers, 'Lexend Deca', sans-serif)",
          fontSize: 56, fontWeight: 500, lineHeight: 1.0,
          letterSpacing: "-0.015em",
          marginTop: 28, color: "#5a5347",
          display: "flex", alignItems: "center", gap: 18,
        }}>
          One point of contact.
          <SignalDot size={18} style={{ marginTop: 6 }} />
        </div>
      </div>

      {/* 2×2 grid of departments */}
      <div style={{
        position: "absolute", top: 700, left: 96, right: 96,
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0,
        border: "1px solid #2D2D2D",
        background: "#F9F6F0",
      }}>
        {DEPARTMENTS.map((d, i) => (
          <div key={d.code} style={{
            padding: "44px 40px",
            borderRight: i % 2 === 0 ? "1px solid #2D2D2D" : "none",
            borderBottom: i < 2 ? "1px solid #2D2D2D" : "none",
            minHeight: 320,
            position: "relative",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Eyebrow size={13}>{`DEPT · ${d.n}`}</Eyebrow>
              <img src={d.icon} alt="" style={{ width: 64, height: 64, mixBlendMode: "multiply" }} />
            </div>
            <div style={{
              fontFamily: "var(--font-headers, 'Lexend Deca', sans-serif)",
              fontSize: 30, fontWeight: 600, lineHeight: 1.1,
              marginTop: 28, letterSpacing: "-0.01em",
              minHeight: 80,
            }}>{d.name}</div>
            <div style={{
              fontFamily: "var(--font-body, 'JetBrains Mono', monospace)",
              fontSize: 14, lineHeight: 1.55,
              marginTop: 16, color: "#5a5347",
              textWrap: "pretty",
            }}>{d.blurb}</div>
          </div>
        ))}
      </div>

      {/* Bottom: signature + CTA */}
      <div style={{
        position: "absolute", bottom: 110, left: 96, right: 96,
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
      }}>
        <div>
          <Eyebrow size={12} color="#7a6f5e">EST. 2024 · KINGMAN AZ</Eyebrow>
          <div style={{
            fontFamily: "var(--font-headers, 'Lexend Deca', sans-serif)",
            fontSize: 32, fontWeight: 600, marginTop: 6,
          }}>digitalallies.net</div>
        </div>
        <Bracket size={20}>Inquire Within</Bracket>
      </div>
    </div>
  );
}

// ── IG Square teaser cover ─ "The Set" ───────────────────────────────────
function CoverSet() {
  return (
    <CoverFrame>
      <CoverHeader left="DEPARTMENTS · A SET" right="DIGITAL ALLIES" />

      <div style={{
        position: "absolute", top: 180, left: 72, right: 72, height: 620,
      }}>
        {/* 2x2 stacked artifact icons */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          width: "100%", height: "100%",
          border: "1px solid #2D2D2D",
          background: "#F9F6F0",
        }}>
          {DEPARTMENTS.map((d, i) => (
            <div key={d.code} style={{
              position: "relative",
              borderRight: i % 2 === 0 ? "1px solid #2D2D2D" : "none",
              borderBottom: i < 2 ? "1px solid #2D2D2D" : "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 24,
            }}>
              <img src={d.icon} alt="" style={{
                width: 200, height: 200,
                mixBlendMode: "multiply",
                objectFit: "contain",
              }} />
              <div style={{
                position: "absolute", top: 18, left: 22,
                fontFamily: "var(--font-details, 'JetBrains Mono', monospace)",
                fontSize: 12, letterSpacing: "0.16em", color: "#2D2D2D",
              }}>{d.code} · {d.n}</div>
            </div>
          ))}
        </div>
        {/* Symmetry break — red dot exactly between Cell 1 & 4 (diag offset) */}
        <SignalDot size={22} style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%) translate(8px, -6px)",
          boxShadow: "0 0 0 6px rgba(197,48,26,0.15), 0 2px 6px rgba(0,0,0,0.18)",
          zIndex: 3,
        }} />
      </div>

      <CoverFooter>
        <div>
          <div style={{
            fontFamily: "var(--font-headers, 'Lexend Deca', sans-serif)",
            fontSize: 52, fontWeight: 700, lineHeight: 1.0,
            letterSpacing: "-0.02em",
          }}>The Departments.</div>
          <div style={{
            fontFamily: "var(--font-body, 'JetBrains Mono', monospace)",
            fontSize: 16, marginTop: 14, color: "#5a5347",
            lineHeight: 1.5,
          }}>Four distinct operations. One point of contact.</div>
        </div>
        <Bracket size={16}>See the Departments</Bracket>
      </CoverFooter>
    </CoverFrame>
  );
}

Object.assign(window, {
  CoverDesign, CoverCooperation, CoverAutomation, CoverObservation,
  StoryDepartments, CoverSet,
});
