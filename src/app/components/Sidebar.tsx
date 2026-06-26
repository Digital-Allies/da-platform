import {
  Home, BookOpen, Award, Settings, Users, ShieldCheck, ClipboardCheck,
  FolderOpen, DollarSign, BarChart2, StickyNote, LifeBuoy, GraduationCap,
  ChevronDown, ChevronRight, Menu, X, FileText,
} from "lucide-react";
import { useState } from "react";
import { ROOMS, roomStatus, type Room } from "../data/rooms";

const ROOM_ICONS: Record<string, React.ElementType> = {
  cs: Users, hipaa: ShieldCheck, compliance: ClipboardCheck,
  records: FolderOpen, finance: DollarSign,
};

type View = "lobby" | "room" | "lesson" | "dashboard" | "certificates" | "notes" | "help" | "settings" | "discovery-form";

interface SidebarProps {
  view: View;
  activeRoom: Room | null;
  onNavigate: (view: View, room?: Room) => void;
  progress: Record<string, number>;
}

interface NavBtnProps {
  icon: React.ElementType; label: string; active?: boolean; color?: string;
  collapsed?: boolean; indent?: boolean; onClick: () => void;
}

function NavBtn({ icon: Icon, label, active, color, collapsed, indent = false, onClick }: NavBtnProps) {
  return (
    <button
      onClick={onClick}
      title={collapsed ? label : undefined}
      style={{
        width: "100%", display: "flex", alignItems: "center",
        gap: collapsed ? 0 : 10,
        justifyContent: collapsed ? "center" : "flex-start",
        padding: collapsed ? "10px 0" : indent ? "8px 12px 8px 30px" : "8px 12px",
        borderRadius: 8, border: "none", cursor: "pointer",
        background: active ? "rgba(255,255,255,.15)" : "transparent",
        borderLeft: !collapsed && active && color ? `3px solid ${color}` : "3px solid transparent",
        transition: "all .15s", textAlign: "left", marginBottom: 1,
      }}
    >
      <Icon size={16} style={{ color: active ? "#fff" : "rgba(255,255,255,.55)", flexShrink: 0 }} />
      {!collapsed && (
        <span style={{
          flex: 1, fontSize: 13, fontFamily: "Montserrat,sans-serif", fontWeight: 600,
          color: active ? "#fff" : "rgba(255,255,255,.65)",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>{label}</span>
      )}
    </button>
  );
}

function SectionLabel({ children, collapsed }: { children: React.ReactNode; collapsed: boolean }) {
  if (collapsed) return <div style={{ height: 1, background: "rgba(255,255,255,.1)", margin: "10px 8px" }} />;
  return (
    <div style={{
      padding: "14px 12px 5px", fontSize: 10, fontFamily: "Montserrat,sans-serif",
      fontWeight: 700, letterSpacing: "0.11em", color: "rgba(255,255,255,.35)",
    }}>{children}</div>
  );
}

export function Sidebar({ view, activeRoom, onNavigate, progress }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(true);

  const totalCourses = ROOMS.reduce((s, r) => s + r.courses.length, 0);
  const doneCourses  = ROOMS.reduce((s, r) =>
    s + r.courses.filter(c => (progress[`${r.id}::${c.t}`] ?? c.pct) >= 100).length, 0);
  const overallPct   = Math.round((doneCourses / totalCourses) * 100);
  const completedRooms = ROOMS.filter(r =>
    r.courses.every(c => (progress[`${r.id}::${c.t}`] ?? c.pct) >= 100)).length;

  const w = collapsed ? 62 : 248;

  return (
    <aside style={{
      width: w, flexShrink: 0, height: "100%", display: "flex", flexDirection: "column",
      background: "#1E3A6E", transition: "width .22s cubic-bezier(.4,0,.2,1)", overflow: "hidden",
    }}>
      {/* header */}
      <div style={{
        padding: collapsed ? "14px 0" : "16px 16px 14px",
        borderBottom: "1px solid rgba(255,255,255,.1)",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "space-between" }}>
          {/* logo mark — always visible */}
          <div style={{
            width: 36, height: 36, borderRadius: 9, flexShrink: 0,
            background: "#2B8FA9",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <GraduationCap size={18} color="#fff" />
          </div>

          {/* wordmark — hidden when collapsed */}
          {!collapsed && (
            <div style={{ flex: 1, minWidth: 0, marginLeft: 10 }}>
              <div style={{ color: "#fff", fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 13, lineHeight: 1 }}>Healthcare</div>
              <div style={{ color: "rgba(255,255,255,.5)", fontFamily: "Montserrat,sans-serif", fontWeight: 600, fontSize: 9, letterSpacing: "0.1em", marginTop: 2 }}>TRAINING CENTER</div>
            </div>
          )}

          {/* toggle button */}
          <button
            onClick={() => setCollapsed(c => !c)}
            title={collapsed ? "Expand menu" : "Collapse menu"}
            style={{
              width: 28, height: 28, borderRadius: 7, border: "none", cursor: "pointer",
              background: "rgba(255,255,255,.1)", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              marginLeft: collapsed ? 0 : 6,
            }}
          >
            {collapsed ? <Menu size={14} color="rgba(255,255,255,.7)" /> : <X size={14} color="rgba(255,255,255,.7)" />}
          </button>
        </div>

        {/* progress bar — hidden when collapsed */}
        {!collapsed && (
          <div style={{ marginTop: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ color: "rgba(255,255,255,.45)", fontSize: 9, fontFamily: "Montserrat,sans-serif", fontWeight: 700, letterSpacing: "0.08em" }}>MY PROGRESS</span>
              <span style={{ color: "#fff", fontSize: 11, fontWeight: 700, fontFamily: "Montserrat,sans-serif" }}>{overallPct}%</span>
            </div>
            <div style={{ height: 4, borderRadius: 99, background: "rgba(255,255,255,.15)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${overallPct}%`, background: "#2B8FA9", borderRadius: 99, transition: "width .5s" }} />
            </div>
            <div style={{ color: "rgba(255,255,255,.35)", fontSize: 10, marginTop: 4 }}>
              {doneCourses} courses · {completedRooms}/5 rooms complete
            </div>
          </div>
        )}

        {/* collapsed: mini progress ring */}
        {collapsed && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
            <svg width="32" height="32" viewBox="0 0 32 32" title={`${overallPct}% complete`}>
              <circle cx="16" cy="16" r="12" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="3.5" />
              <circle cx="16" cy="16" r="12" fill="none" stroke="#2B8FA9" strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 12}`}
                strokeDashoffset={`${2 * Math.PI * 12 * (1 - overallPct / 100)}`}
                transform="rotate(-90 16 16)"
                style={{ transition: "stroke-dashoffset .5s ease" }}
              />
            </svg>
          </div>
        )}
      </div>

      {/* nav */}
      <nav style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: collapsed ? "8px 6px" : "8px 10px" }}>
        <NavBtn icon={Home} label="Lobby" active={view === "lobby"} collapsed={collapsed} onClick={() => onNavigate("lobby")} />
        <NavBtn icon={BarChart2} label="My Dashboard" active={view === "dashboard"} collapsed={collapsed} onClick={() => onNavigate("dashboard")} />

        <SectionLabel collapsed={collapsed}>TRAINING ROOMS</SectionLabel>

        {/* rooms toggle — hidden when collapsed */}
        {!collapsed && (
          <button onClick={() => setRoomsOpen(o => !o)} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 10,
            padding: "8px 12px", borderRadius: 8, border: "none", cursor: "pointer",
            background: "transparent", marginBottom: 1,
          }}>
            <BookOpen size={15} style={{ color: "rgba(255,255,255,.45)" }} />
            <span style={{ flex: 1, fontSize: 13, fontFamily: "Montserrat,sans-serif", fontWeight: 600, color: "rgba(255,255,255,.6)", textAlign: "left" }}>All Rooms</span>
            {roomsOpen
              ? <ChevronDown size={13} style={{ color: "rgba(255,255,255,.3)" }} />
              : <ChevronRight size={13} style={{ color: "rgba(255,255,255,.3)" }} />}
          </button>
        )}

        {(collapsed || roomsOpen) && ROOMS.map(room => {
          const Icon = ROOM_ICONS[room.id];
          const isActive = (view === "room" || view === "lesson") && activeRoom?.id === room.id;
          const status   = roomStatus(room);
          const done = room.courses.filter(c => (progress[`${room.id}::${c.t}`] ?? c.pct) >= 100).length;
          const pct  = Math.round((done / room.courses.length) * 100);

          if (collapsed) {
            return (
              <button
                key={room.id}
                onClick={() => onNavigate("room", room)}
                title={room.name}
                style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
                  padding: "9px 0", borderRadius: 8, border: "none", cursor: "pointer",
                  background: isActive ? "rgba(255,255,255,.15)" : "transparent",
                  marginBottom: 1,
                }}
              >
                <Icon size={16} style={{ color: isActive ? room.color : "rgba(255,255,255,.45)" }} />
              </button>
            );
          }

          return (
            <button key={room.id} onClick={() => onNavigate("room", room)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 9,
              padding: "8px 12px 8px 28px", borderRadius: 8, border: "none", cursor: "pointer",
              background: isActive ? "rgba(255,255,255,.15)" : "transparent",
              borderLeft: isActive ? `3px solid ${room.color}` : "3px solid transparent",
              transition: "all .15s", marginBottom: 1, textAlign: "left",
            }}>
              <Icon size={14} style={{ color: isActive ? room.color : "rgba(255,255,255,.4)", flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 12, fontFamily: "Montserrat,sans-serif", fontWeight: 600,
                  color: isActive ? "#fff" : "rgba(255,255,255,.7)",
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>{room.name}</div>
                {status !== "not-started" && (
                  <div style={{ height: 2, borderRadius: 99, background: "rgba(255,255,255,.12)", marginTop: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: room.color, borderRadius: 99 }} />
                  </div>
                )}
              </div>
              {status === "complete" && <Award size={11} style={{ color: room.color, flexShrink: 0 }} />}
            </button>
          );
        })}

        <SectionLabel collapsed={collapsed}>RESOURCES</SectionLabel>
        <NavBtn icon={Award}      label="Certificate Center" active={view === "certificates"} collapsed={collapsed} onClick={() => onNavigate("certificates")} />
        <NavBtn icon={StickyNote} label="My Study Notes"     active={view === "notes"}        collapsed={collapsed} onClick={() => onNavigate("notes")} />
        <NavBtn icon={FileText}   label="Discovery Form"     active={view === "discovery-form"} collapsed={collapsed} onClick={() => onNavigate("discovery-form")} />
        <NavBtn icon={LifeBuoy}   label="Help & Support"     active={view === "help"}         collapsed={collapsed} onClick={() => onNavigate("help")} />
      </nav>

      {/* bottom */}
      <div style={{ padding: collapsed ? "10px 6px" : "10px", borderTop: "1px solid rgba(255,255,255,.1)", flexShrink: 0 }}>
        <NavBtn icon={Settings} label="Settings" active={view === "settings"} collapsed={collapsed} onClick={() => onNavigate("settings")} />

        {!collapsed && (
          <div style={{ marginTop: 8, padding: "10px 12px", borderRadius: 10, background: "rgba(255,255,255,.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                background: "#2B8FA9",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 800, color: "#fff", fontFamily: "Montserrat,sans-serif",
              }}>JD</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", fontFamily: "Montserrat,sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Jane Doe</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", marginTop: 1 }}>Healthcare Learner</div>
              </div>
            </div>
          </div>
        )}

        {collapsed && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "#2B8FA9",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 800, color: "#fff", fontFamily: "Montserrat,sans-serif",
              cursor: "pointer",
            }} title="Jane Doe">JD</div>
          </div>
        )}
      </div>
    </aside>
  );
}
