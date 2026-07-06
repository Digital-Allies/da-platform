import { ROOMS } from "../data/rooms";
import { TrendingUp, Award, BookOpen, Clock, CheckCircle2, Circle } from "lucide-react";

export function DashboardScreen({ progress }: { progress: Record<string, number> }) {
  const totalCourses = ROOMS.reduce((s, r) => s + r.courses.length, 0);
  const doneCourses  = ROOMS.reduce((s, r) => s + r.courses.filter(c => (progress[`${r.id}::${c.t}`] ?? c.pct) >= 100).length, 0);
  const doneMin      = ROOMS.reduce((s, r) => s + r.courses.filter(c => (progress[`${r.id}::${c.t}`] ?? c.pct) >= 100).reduce((cs, c) => cs + c.min, 0), 0);
  const overallPct   = Math.round((doneCourses / totalCourses) * 100);

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#F4F6F9", padding: "32px 36px" }}>
      <h1 style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 22, marginBottom: 4 }}>My Dashboard</h1>
      <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 28 }}>A full view of your learning progress across all training rooms.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 28 }}>
        {[
          { Icon: TrendingUp, label: "Overall Progress", value: `${overallPct}%`, color: "#3B7DD8", sub: "across all rooms" },
          { Icon: BookOpen,   label: "Courses Complete", value: `${doneCourses}`,  color: "#2BA89A", sub: `of ${totalCourses} total` },
          { Icon: Clock,      label: "Training Hours",   value: `${Math.round(doneMin / 60)}h ${doneMin % 60}m`, color: "#D4A017", sub: "completed" },
          { Icon: Award,      label: "Rooms Mastered",   value: `${ROOMS.filter(r => r.courses.every(c => (progress[`${r.id}::${c.t}`] ?? c.pct) >= 100)).length}`, color: "#2EAA6E", sub: "of 5 rooms" },
        ].map(({ Icon, label, value, color, sub }) => (
          <div key={label} style={{ borderRadius: 14, padding: "18px 20px", background: "#fff", border: "1px solid #E5E7EB" }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: `${color}12`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
              <Icon size={16} style={{ color }} />
            </div>
            <div style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 22 }}>{value}</div>
            <div style={{ color: "#374151", fontSize: 12, fontFamily: "Montserrat,sans-serif", fontWeight: 600, marginTop: 2 }}>{label}</div>
            <div style={{ color: "#9CA3AF", fontSize: 11, marginTop: 1 }}>{sub}</div>
          </div>
        ))}
      </div>

      <h2 style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 14 }}>Room Breakdown</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {ROOMS.map(room => {
          const done = room.courses.filter(c => (progress[`${room.id}::${c.t}`] ?? c.pct) >= 100).length;
          const pct  = Math.round((done / room.courses.length) * 100);
          return (
            <div key={room.id} style={{ borderRadius: 12, padding: "16px 20px", background: "#fff", border: "1px solid #E5E7EB" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: room.color, flexShrink: 0 }} />
                <span style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 14, flex: 1 }}>{room.name}</span>
                <span style={{ color: room.color, fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 14 }}>{pct}%</span>
              </div>
              <div style={{ height: 5, borderRadius: 99, background: "#F3F4F6", overflow: "hidden", marginBottom: 10 }}>
                <div style={{ height: "100%", width: `${pct}%`, background: room.color, borderRadius: 99, transition: "width .6s" }} />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {room.courses.map(c => {
                  const cp = progress[`${room.id}::${c.t}`] ?? c.pct;
                  return (
                    <div key={c.t} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      {cp >= 100
                        ? <CheckCircle2 size={12} style={{ color: room.color }} />
                        : <Circle size={12} style={{ color: "#D1D5DB" }} />}
                      <span style={{ color: cp >= 100 ? "#374151" : "#9CA3AF", fontSize: 11 }}>{c.t}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
