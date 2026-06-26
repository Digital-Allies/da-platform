import { useState } from "react";
import {
  Home, BarChart2, StickyNote, LifeBuoy, Menu, X, GraduationCap,
  Award, Settings, Users, ShieldCheck, ClipboardCheck, FolderOpen,
  DollarSign, BookOpen, ChevronRight, FileText,
} from "lucide-react";
import { ROOMS, roomStatus, type Room } from "../data/rooms";

type View = "lobby" | "room" | "lesson" | "dashboard" | "certificates" | "notes" | "help" | "settings" | "discovery-form";

const ROOM_ICONS: Record<string, React.ElementType> = {
  cs: Users, hipaa: ShieldCheck, compliance: ClipboardCheck,
  records: FolderOpen, finance: DollarSign,
};

const BOTTOM_TABS: { id: View; label: string; Icon: React.ElementType }[] = [
  { id: "lobby",     label: "Lobby",     Icon: Home      },
  { id: "dashboard", label: "Dashboard", Icon: BarChart2  },
  { id: "notes",     label: "Notes",     Icon: StickyNote },
  { id: "help",      label: "Help",      Icon: LifeBuoy  },
];

interface Props {
  view: View;
  activeRoom: Room | null;
  onNavigate: (v: View, room?: Room) => void;
  progress: Record<string, number>;
}

export function MobileTopBar({ view, activeRoom, onNavigate, progress }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const totalCourses = ROOMS.reduce((s, r) => s + r.courses.length, 0);
  const doneCourses  = ROOMS.reduce((s, r) =>
    s + r.courses.filter(c => (progress[`${r.id}::${c.t}`] ?? c.pct) >= 100).length, 0);
  const overallPct = Math.round((doneCourses / totalCourses) * 100);

  const title = view === "room" && activeRoom ? activeRoom.name
    : view === "lesson" && activeRoom ? activeRoom.name
    : view === "dashboard" ? "My Dashboard"
    : view === "certificates" ? "Certificates"
    : view === "notes" ? "Study Notes"
    : view === "help" ? "Help & Support"
    : view === "settings" ? "Settings"
    : view === "discovery-form" ? "Discovery Form"
    : "Training Center";

  return (
    <>
      {/* Top bar */}
      <div style={{
        height: 56, flexShrink: 0, background: "#1E3A6E",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 16px", position: "relative", zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, background: "#2B8FA9",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <GraduationCap size={16} color="#fff" />
          </div>
          <span style={{
            color: "#fff", fontFamily: "Montserrat,sans-serif",
            fontWeight: 700, fontSize: 14,
            maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>{title}</span>
        </div>

        <button
          onClick={() => setDrawerOpen(true)}
          style={{
            width: 36, height: 36, borderRadius: 8, border: "none",
            background: "rgba(255,255,255,.12)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <Menu size={20} color="#fff" />
        </button>
      </div>

      {/* Drawer overlay */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "rgba(0,0,0,.45)",
          }}
        />
      )}

      {/* Drawer panel */}
      <div style={{
        position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 210,
        width: 280, background: "#1E3A6E",
        transform: drawerOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform .28s cubic-bezier(.4,0,.2,1)",
        display: "flex", flexDirection: "column",
        overflowY: "auto",
      }}>
        {/* drawer header */}
        <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid rgba(255,255,255,.1)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, background: "#2B8FA9",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <GraduationCap size={18} color="#fff" />
              </div>
              <div>
                <div style={{ color: "#fff", fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 13 }}>Healthcare</div>
                <div style={{ color: "rgba(255,255,255,.5)", fontFamily: "Montserrat,sans-serif", fontWeight: 600, fontSize: 9, letterSpacing: "0.1em" }}>TRAINING CENTER</div>
              </div>
            </div>
            <button onClick={() => setDrawerOpen(false)} style={{
              width: 30, height: 30, borderRadius: 8, border: "none",
              background: "rgba(255,255,255,.1)", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <X size={16} color="rgba(255,255,255,.7)" />
            </button>
          </div>

          {/* progress bar */}
          <div style={{ marginTop: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ color: "rgba(255,255,255,.45)", fontSize: 9, fontFamily: "Montserrat,sans-serif", fontWeight: 700, letterSpacing: "0.08em" }}>MY PROGRESS</span>
              <span style={{ color: "#fff", fontSize: 11, fontWeight: 700, fontFamily: "Montserrat,sans-serif" }}>{overallPct}%</span>
            </div>
            <div style={{ height: 4, borderRadius: 99, background: "rgba(255,255,255,.15)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${overallPct}%`, background: "#2B8FA9", borderRadius: 99 }} />
            </div>
          </div>
        </div>

        {/* nav links */}
        <nav style={{ flex: 1, padding: "10px 10px" }}>
          {/* main */}
          {([
            { id: "lobby" as View, label: "Lobby", Icon: Home },
            { id: "dashboard" as View, label: "My Dashboard", Icon: BarChart2 },
          ]).map(({ id, label, Icon }) => (
            <DrawerBtn key={id} Icon={Icon} label={label} active={view === id}
              onClick={() => { onNavigate(id); setDrawerOpen(false); }} />
          ))}

          {/* rooms */}
          <DrawerSection label="TRAINING ROOMS" />
          {ROOMS.map(room => {
            const Icon    = ROOM_ICONS[room.id];
            const isActive = (view === "room" || view === "lesson") && activeRoom?.id === room.id;
            const done     = room.courses.filter(c => (progress[`${room.id}::${c.t}`] ?? c.pct) >= 100).length;
            const pct      = Math.round((done / room.courses.length) * 100);
            const status   = roomStatus(room);
            return (
              <button
                key={room.id}
                onClick={() => { onNavigate("room", room); setDrawerOpen(false); }}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 9,
                  padding: "8px 12px", borderRadius: 8, border: "none", cursor: "pointer",
                  background: isActive ? "rgba(255,255,255,.15)" : "transparent",
                  borderLeft: isActive ? `3px solid ${room.color}` : "3px solid transparent",
                  marginBottom: 1, textAlign: "left",
                }}
              >
                <Icon size={14} style={{ color: isActive ? room.color : "rgba(255,255,255,.4)", flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontFamily: "Montserrat,sans-serif", fontWeight: 600, color: isActive ? "#fff" : "rgba(255,255,255,.7)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {room.name}
                  </div>
                  {status !== "not-started" && (
                    <div style={{ height: 2, borderRadius: 99, background: "rgba(255,255,255,.12)", marginTop: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: room.color, borderRadius: 99 }} />
                    </div>
                  )}
                </div>
                {status === "complete" && <Award size={11} style={{ color: room.color, flexShrink: 0 }} />}
              </button>
            );
          })}

          {/* resources */}
          <DrawerSection label="RESOURCES" />
          {([
            { id: "certificates" as View, label: "Certificate Center", Icon: Award },
            { id: "notes" as View,        label: "My Study Notes",    Icon: StickyNote },
            { id: "discovery-form" as View, label: "Discovery Form",  Icon: FileText },
            { id: "help" as View,         label: "Help & Support",    Icon: LifeBuoy },
          ]).map(({ id, label, Icon }) => (
            <DrawerBtn key={id} Icon={Icon} label={label} active={view === id}
              onClick={() => { onNavigate(id); setDrawerOpen(false); }} />
          ))}
        </nav>

        {/* settings */}
        <div style={{ padding: "10px", borderTop: "1px solid rgba(255,255,255,.1)", flexShrink: 0 }}>
          <DrawerBtn Icon={Settings} label="Settings" active={view === "settings"}
            onClick={() => { onNavigate("settings"); setDrawerOpen(false); }} />
        </div>
      </div>
    </>
  );
}

function DrawerSection({ label }: { label: string }) {
  return (
    <div style={{ padding: "12px 12px 4px", fontSize: 9, fontFamily: "Montserrat,sans-serif", fontWeight: 700, letterSpacing: "0.11em", color: "rgba(255,255,255,.35)" }}>
      {label}
    </div>
  );
}

function DrawerBtn({ Icon, label, active, onClick }: { Icon: React.ElementType; label: string; active?: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      width: "100%", display: "flex", alignItems: "center", gap: 10,
      padding: "8px 12px", borderRadius: 8, border: "none", cursor: "pointer",
      background: active ? "rgba(255,255,255,.15)" : "transparent",
      borderLeft: active ? "3px solid #2B8FA9" : "3px solid transparent",
      marginBottom: 1, textAlign: "left",
    }}>
      <Icon size={15} style={{ color: active ? "#fff" : "rgba(255,255,255,.55)", flexShrink: 0 }} />
      <span style={{ fontSize: 13, fontFamily: "Montserrat,sans-serif", fontWeight: 600, color: active ? "#fff" : "rgba(255,255,255,.65)" }}>{label}</span>
    </button>
  );
}

export function MobileBottomNav({ view, onNavigate }: { view: View; onNavigate: (v: View) => void }) {
  return (
    <div style={{
      height: 62, flexShrink: 0, background: "#fff",
      borderTop: "1px solid #E5E7EB",
      display: "flex", alignItems: "stretch",
      paddingBottom: "env(safe-area-inset-bottom, 0px)",
    }}>
      {BOTTOM_TABS.map(({ id, label, Icon }) => {
        const active = view === id || (id === "lobby" && (view === "room" || view === "lesson"));
        return (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", gap: 3, border: "none", cursor: "pointer",
              background: "transparent",
              borderTop: active ? "2.5px solid #2B8FA9" : "2.5px solid transparent",
            }}
          >
            <Icon size={20} style={{ color: active ? "#2B8FA9" : "#9CA3AF" }} />
            <span style={{
              fontSize: 10, fontFamily: "Montserrat,sans-serif", fontWeight: 600,
              color: active ? "#2B8FA9" : "#9CA3AF",
            }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
