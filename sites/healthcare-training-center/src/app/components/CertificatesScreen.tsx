import { useState } from "react";
import { Award, Download, CheckCircle2, Lock, Users, ShieldCheck, ClipboardCheck, FolderOpen, DollarSign } from "lucide-react";
import { ROOMS, roomStatus } from "../data/rooms";

const ROOM_ICONS: Record<string, React.ElementType> = {
  cs: Users, hipaa: ShieldCheck, compliance: ClipboardCheck,
  records: FolderOpen, finance: DollarSign,
};

interface Props { progress: Record<string, number> }

function CertModal({ room, onClose }: { room: typeof ROOMS[0]; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(0,0,0,.45)", display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 18, width: 520, padding: "0",
          boxShadow: "0 24px 80px rgba(0,0,0,.25)", overflow: "hidden",
          animation: "cardSlideUp .28s cubic-bezier(.34,1.4,.64,1) both",
        }}
      >
        {/* certificate design */}
        <div style={{
          background: `linear-gradient(135deg, ${room.color}, ${room.color}cc)`,
          padding: "36px 40px 28px", textAlign: "center",
        }}>
          <Award size={48} color="#fff" style={{ opacity: 0.9 }} />
          <div style={{
            marginTop: 14, color: "#fff", fontFamily: "Playfair Display,serif",
            fontStyle: "italic", fontSize: 13, opacity: 0.8, letterSpacing: "0.05em",
          }}>Certificate of Completion</div>
          <div style={{
            color: "#fff", fontFamily: "Montserrat,sans-serif", fontWeight: 800,
            fontSize: 26, marginTop: 4, lineHeight: 1.2,
          }}>{room.name}</div>
          <div style={{
            marginTop: 18, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,.25)",
            color: "rgba(255,255,255,.85)", fontFamily: "Montserrat,sans-serif", fontSize: 13,
          }}>
            This certifies that <strong>Jane Doe</strong> has successfully completed<br />
            all required training modules and passed the knowledge assessment.
          </div>
          <div style={{ color: "rgba(255,255,255,.6)", fontSize: 11, marginTop: 12 }}>
            Issued {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </div>
        </div>
        <div style={{ padding: "20px 28px", display: "flex", gap: 10 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1, padding: "10px 0", borderRadius: 9,
              border: "1px solid #E5E7EB", background: "#fff",
              color: "#6B7280", fontFamily: "Montserrat,sans-serif", fontWeight: 600, fontSize: 14,
              cursor: "pointer",
            }}
          >Close</button>
          <button
            style={{
              flex: 1, padding: "10px 0", borderRadius: 9, border: "none",
              background: room.color, color: "#fff",
              fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 14,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}
            onClick={() => alert("In a live environment this would download a PDF certificate.")}
          >
            <Download size={15} /> Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export function CertificatesScreen({ progress }: Props) {
  const [previewRoom, setPreviewRoom] = useState<typeof ROOMS[0] | null>(null);

  const completed = ROOMS.filter(r => roomStatus({ ...r, courses: r.courses.map(c => ({ ...c, pct: progress[`${r.id}::${c.t}`] ?? c.pct })) }) === "complete");
  const incomplete = ROOMS.filter(r => roomStatus({ ...r, courses: r.courses.map(c => ({ ...c, pct: progress[`${r.id}::${c.t}`] ?? c.pct })) }) !== "complete");

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#F4F6F9" }}>
      {previewRoom && <CertModal room={previewRoom} onClose={() => setPreviewRoom(null)} />}

      {/* header */}
      <div style={{ padding: "20px 32px 16px", background: "#fff", borderBottom: "1px solid #E5E7EB" }}>
        <h1 style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 20 }}>Certificate Center</h1>
        <p style={{ color: "#6B7280", fontSize: 13, marginTop: 2 }}>
          {completed.length} of {ROOMS.length} certificates earned
        </p>
      </div>

      <div style={{ padding: "28px 32px 48px" }}>
        {completed.length > 0 && (
          <>
            <h2 style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 14 }}>
              Earned Certificates
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, marginBottom: 32 }}>
              {completed.map(room => {
                const Icon = ROOM_ICONS[room.id];
                return (
                  <div key={room.id} style={{
                    background: "#fff", borderRadius: 14, overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,.07)",
                    border: `1.5px solid ${room.color}40`,
                    animation: "cardSlideUp .3s ease both",
                  }}>
                    <div style={{ background: room.color, padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Icon size={20} color="#fff" />
                        <span style={{ color: "#fff", fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 15 }}>{room.name}</span>
                      </div>
                      <Award size={20} color="#fff" style={{ opacity: 0.85 }} />
                    </div>
                    <div style={{ padding: "16px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                        <CheckCircle2 size={14} color="#22C55E" />
                        <span style={{ color: "#22C55E", fontSize: 13, fontWeight: 600 }}>Completed</span>
                        <span style={{ color: "#9CA3AF", fontSize: 12, marginLeft: 4 }}>
                          · {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                      <p style={{ color: "#6B7280", fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>
                        All {room.courses.length} courses completed with a passing score.
                      </p>
                      <button
                        onClick={() => setPreviewRoom(room)}
                        style={{
                          width: "100%", padding: "9px 0", borderRadius: 8, border: "none",
                          background: room.color, color: "#fff", cursor: "pointer",
                          fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 13,
                          display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                        }}
                      >
                        <Award size={14} /> View Certificate
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <h2 style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 14 }}>
          {completed.length === 0 ? "All Certificates" : "In Progress"}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {incomplete.map(room => {
            const Icon = ROOM_ICONS[room.id];
            const done = room.courses.filter(c => (progress[`${room.id}::${c.t}`] ?? c.pct) >= 100).length;
            const pct  = Math.round((done / room.courses.length) * 100);
            return (
              <div key={room.id} style={{
                background: "#fff", borderRadius: 14, overflow: "hidden",
                boxShadow: "0 1px 4px rgba(0,0,0,.06)", border: "1.5px solid #E5E7EB",
              }}>
                <div style={{ background: "#F4F6F9", padding: "18px 20px", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: `${room.color}15`, border: `1.5px solid ${room.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={18} style={{ color: room.color }} />
                  </div>
                  <span style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 14 }}>{room.name}</span>
                  <Lock size={13} color="#9CA3AF" style={{ marginLeft: "auto" }} />
                </div>
                <div style={{ padding: "14px 20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ color: "#9CA3AF", fontSize: 12 }}>{done}/{room.courses.length} courses</span>
                    <span style={{ color: room.color, fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 13 }}>{pct}%</span>
                  </div>
                  <div style={{ height: 5, borderRadius: 99, background: "#E5E7EB", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: room.color, borderRadius: 99 }} />
                  </div>
                  <p style={{ color: "#9CA3AF", fontSize: 12, marginTop: 10 }}>Complete all courses to unlock your certificate.</p>
                </div>
              </div>
            );
          })}
        </div>

        {completed.length === ROOMS.length && (
          <div style={{
            marginTop: 32, padding: "28px 32px", borderRadius: 14,
            background: "linear-gradient(135deg, #1E3A6E, #2B8FA9)",
            textAlign: "center",
          }}>
            <Award size={40} color="#fff" style={{ opacity: 0.9, marginBottom: 12 }} />
            <div style={{ color: "#fff", fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 22, marginBottom: 8 }}>
              Training Complete!
            </div>
            <p style={{ color: "rgba(255,255,255,.8)", fontSize: 14, lineHeight: 1.7 }}>
              Congratulations! You've completed all 5 training rooms and earned every certificate.<br />
              Your dedication to healthcare excellence is commendable.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
