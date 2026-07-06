import {
  Users, ShieldCheck, ClipboardCheck, FolderOpen, DollarSign,
  ArrowLeft, Award, Clock, CheckCircle2, Play, ChevronRight,
} from "lucide-react";
import { type Room, type Course, roomStatus } from "../data/rooms";

import csImg         from "../../imports/customer-service.png";
import hipaaImg      from "../../imports/hipaa.png";
import complianceImg from "../../imports/compliance.png";
import recordsImg    from "../../imports/medical-records.png";
import financeImg    from "../../imports/finance.png";

const ROOM_IMAGES: Record<string, string> = {
  cs: csImg, hipaa: hipaaImg, compliance: complianceImg, records: recordsImg, finance: financeImg,
};

const ROOM_ICONS: Record<string, React.ElementType> = {
  cs: Users, hipaa: ShieldCheck, compliance: ClipboardCheck, records: FolderOpen, finance: DollarSign,
};

const LVL_COLORS: Record<string, string> = {
  Beginner: "#2EAA6E", Core: "#3B7DD8", Advanced: "#7B5EA7",
};

function CourseRow({ course, room, pct, onStart }: {
  course: Course; room: Room; pct: number; onStart: () => void;
}) {
  const done    = pct >= 100;
  const started = pct > 0 && pct < 100;

  return (
    <button onClick={onStart} style={{
      width: "100%", textAlign: "left", display: "flex", alignItems: "flex-start", gap: 14,
      padding: "14px 16px", borderRadius: 10, border: "1px solid #E5E7EB", cursor: "pointer",
      background: done ? `${room.color}08` : "#fff",
      outline: done ? `1px solid ${room.color}20` : "none",
      transition: "box-shadow .15s", marginBottom: 8,
    }}
    onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,.08)")}
    onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
    >
      <div style={{
        width: 36, height: 36, borderRadius: 9, flexShrink: 0,
        background: done ? `${room.color}15` : "#F3F4F6",
        border: `1px solid ${done ? room.color + "30" : "#E5E7EB"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {done
          ? <CheckCircle2 size={17} style={{ color: room.color }} />
          : <Play size={14} style={{ color: started ? room.color : "#9CA3AF" }} />}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
          <h4 style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 600, fontSize: 13, lineHeight: 1.4, flex: 1 }}>
            {course.t}
          </h4>
          <ChevronRight size={13} style={{ color: room.color, flexShrink: 0, marginTop: 2, opacity: 0.5 }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 5 }}>
          <span style={{
            padding: "2px 8px", borderRadius: 99, fontSize: 10,
            background: `${LVL_COLORS[course.lvl]}12`, color: LVL_COLORS[course.lvl],
            fontFamily: "Montserrat,sans-serif", fontWeight: 700, letterSpacing: "0.04em",
          }}>{course.lvl}</span>
          <span style={{ color: "#9CA3AF", fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
            <Clock size={10} />{course.min} min
          </span>
          {started && <span style={{ color: room.color, fontSize: 11, fontWeight: 700 }}>{pct}%</span>}
        </div>
        {started && (
          <div style={{ height: 3, borderRadius: 99, background: "#E5E7EB", marginTop: 7, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: room.color, borderRadius: 99 }} />
          </div>
        )}
      </div>
    </button>
  );
}

interface Props {
  room: Room; progress: Record<string, number>;
  onBack: () => void; onStartLesson: (room: Room, course: Course) => void;
}

export function RoomScreen({ room, progress, onBack, onStartLesson }: Props) {
  const Icon    = ROOM_ICONS[room.id];
  const status  = roomStatus(room);
  const done    = room.courses.filter(c => (progress[`${room.id}::${c.t}`] ?? c.pct) >= 100).length;
  const roomPct = Math.round((done / room.courses.length) * 100);
  const totalMin = room.courses.reduce((s, c) => s + c.min, 0);

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#F4F6F9" }}>
      {/* banner */}
      <div style={{
        background: "#fff",
        borderBottom: `4px solid ${room.color}`,
        padding: "24px 32px 28px",
      }}>
        <button onClick={onBack} style={{
          display: "flex", alignItems: "center", gap: 7, marginBottom: 20,
          border: "none", background: "none", cursor: "pointer",
          color: "#6B7280", fontSize: 13, fontFamily: "Montserrat,sans-serif", fontWeight: 600,
        }}>
          <ArrowLeft size={14} /> Back to Lobby
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* room mini image */}
          <img
            src={ROOM_IMAGES[room.id]}
            alt={room.name}
            style={{ width: 110, height: 96, objectFit: "contain", flexShrink: 0 }}
          />

          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ color: room.color, fontSize: 10, fontFamily: "Montserrat,sans-serif", fontWeight: 700, letterSpacing: "0.12em" }}>ROOM 0{room.n}</span>
              {status === "complete" && <Award size={13} style={{ color: room.color }} />}
            </div>
            <h1 style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 24, lineHeight: 1.2, marginBottom: 6 }}>{room.name}</h1>
            <p style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.6, maxWidth: 500 }}>{room.desc}</p>

            <div style={{ display: "flex", gap: 24, marginTop: 16 }}>
              {[
                { label: "Courses", value: `${done} / ${room.courses.length}` },
                { label: "Total Time", value: `${Math.floor(totalMin / 60)}h ${totalMin % 60}m` },
                { label: "Status", value: { "not-started": "Not Started", "in-progress": "In Progress", complete: "✓ Complete" }[status] },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div style={{ color: "#9CA3AF", fontSize: 10, fontFamily: "Montserrat,sans-serif", fontWeight: 700, letterSpacing: "0.08em" }}>{label}</div>
                  <div style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 14, marginTop: 2 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ring */}
          <div style={{ flexShrink: 0, textAlign: "center" }}>
            <svg width="72" height="72" viewBox="0 0 72 72">
              <circle cx="36" cy="36" r="28" fill="none" stroke="#E5E7EB" strokeWidth="5" />
              <circle cx="36" cy="36" r="28" fill="none" stroke={room.color} strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - roomPct / 100)}`}
                transform="rotate(-90 36 36)"
                style={{ transition: "stroke-dashoffset 1s" }}
              />
              <text x="36" y="36" textAnchor="middle" dominantBaseline="central" fill="#1E3A6E"
                style={{ fontSize: 14, fontFamily: "Montserrat,sans-serif", fontWeight: 800 }}>
                {roomPct}%
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* body */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 288px", gap: 20, padding: "24px 32px 40px" }}>
        <div>
          <h2 style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 14 }}>Course Curriculum</h2>
          {room.courses.map(course => (
            <CourseRow
              key={course.t} course={course} room={room}
              pct={progress[`${room.id}::${course.t}`] ?? course.pct}
              onStart={() => onStartLesson(room, course)}
            />
          ))}
        </div>

        <div>
          <div style={{ borderRadius: 14, padding: "18px", marginBottom: 14, background: "#fff", border: `1px solid #E5E7EB`, borderLeft: `4px solid ${room.color}` }}>
            <h3 style={{ color: room.color, fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.08em", marginBottom: 10 }}>WHY THIS ROOM MATTERS</h3>
            <p style={{ color: "#374151", fontSize: 13, lineHeight: 1.8, fontStyle: "italic", fontFamily: "Playfair Display,serif" }}>
              "{room.why}"
            </p>
          </div>

          <div style={{ borderRadius: 14, padding: "18px", background: "#fff", border: "1px solid #E5E7EB" }}>
            <h3 style={{ color: "#6B7280", fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.08em", marginBottom: 12 }}>DIFFICULTY LEVELS</h3>
            {[
              { label: "Beginner", desc: "Foundational concepts", color: "#2EAA6E" },
              { label: "Core",     desc: "Essential practice skills", color: "#3B7DD8" },
              { label: "Advanced", desc: "In-depth application",     color: "#7B5EA7" },
            ].map(({ label, desc, color }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />
                <span style={{ color: "#374151", fontSize: 12, fontWeight: 600, fontFamily: "Montserrat,sans-serif" }}>{label}</span>
                <span style={{ color: "#9CA3AF", fontSize: 11 }}>· {desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
