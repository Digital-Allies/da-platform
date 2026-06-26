import { useState, useRef, useEffect } from "react";

function useWindowWidth() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}
import {
  Users, ShieldCheck, ClipboardCheck, FolderOpen, DollarSign,
  ArrowRight, Award, X,
} from "lucide-react";

const ROOM_ICONS: Record<string, React.ElementType> = {
  cs: Users, hipaa: ShieldCheck, compliance: ClipboardCheck,
  records: FolderOpen, finance: DollarSign,
};
import { ROOMS, roomStatus, type Room } from "../data/rooms";

/* ── room images ── */
import csImg         from "../../imports/customer-service.png";
import hipaaImg      from "../../imports/hipaa.png";
import complianceImg from "../../imports/compliance.png";
import recordsImg    from "../../imports/medical-records.png";
import financeImg    from "../../imports/finance.png";
import lobbyImg      from "../../imports/001_In_a_3D_isometric_style_this_scene_depicts_a_usoqucNV.png";

const ROOM_IMAGES: Record<string, string> = {
  cs: csImg, hipaa: hipaaImg, compliance: complianceImg,
  records: recordsImg, finance: financeImg,
};


/*
 * Hotspot positions as % of lobby image.
 * These align with the 5 storefront awnings.
 * popupX controls which side the popup opens toward.
 */
/* Zone-based hotspots — transparent clickable areas over each storefront.
   left/top/width/height are % of the lobby image. popupX is where the popup anchors. */
const HOTSPOTS = [
  { id: "cs",         left: "3%",  top: "28%", width: "18%", height: "55%", popupAlign: "left"   },
  { id: "hipaa",      left: "21%", top: "22%", width: "18%", height: "58%", popupAlign: "left"   },
  { id: "compliance", left: "39%", top: "18%", width: "20%", height: "60%", popupAlign: "center" },
  { id: "records",    left: "59%", top: "22%", width: "18%", height: "58%", popupAlign: "right"  },
  { id: "finance",    left: "77%", top: "28%", width: "20%", height: "55%", popupAlign: "right"  },
] as const;

/* ── Popup card — appears on click, stays until closed ── */
function RoomPopup({
  room, progress, onEnter, onClose,
}: {
  room: Room; progress: Record<string, number>;
  onEnter: (r: Room) => void; onClose: () => void;
}) {
  const Icon    = ROOM_ICONS[room.id];
  const img     = ROOM_IMAGES[room.id];
  const status  = roomStatus(room);
  const done    = room.courses.filter(c => (progress[`${room.id}::${c.t}`] ?? c.pct) >= 100).length;
  const pct     = Math.round((done / room.courses.length) * 100);
  const ctaLabel = status === "complete" ? "Review Room" : status === "in-progress" ? "Continue" : "Enter Room";

  return (
    <div
      style={{
        width: 220,
        background: "#fff",
        borderRadius: 14,
        boxShadow: "0 12px 40px rgba(30,58,110,.22), 0 4px 12px rgba(0,0,0,.1)",
        overflow: "hidden",
        animation: "cardSlideUp .28s cubic-bezier(.34,1.4,.64,1) both",
        border: `2px solid ${room.color}`,
        position: "relative",
      }}
      /* stop click from bubbling to the backdrop close handler */
      onClick={e => e.stopPropagation()}
    >
      {/* close button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: 10, right: 10, zIndex: 10,
          width: 26, height: 26, borderRadius: "50%", border: "none", cursor: "pointer",
          background: "rgba(0,0,0,.08)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <X size={13} color="#6B7280" />
      </button>

      {/* colored awning header */}
      <div style={{
        background: room.color,
        padding: "12px 16px 10px",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: "rgba(255,255,255,.25)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Icon size={15} color="#fff" />
        </div>
        <span style={{
          color: "#fff", fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 13,
          lineHeight: 1.2, paddingRight: 20,
        }}>{room.name}</span>
      </div>

      {/* spinning room image */}
      <div style={{
        background: "#F4F6F9",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "12px 12px 6px",
        overflow: "hidden",
      }}>
        <img
          src={img}
          alt={room.name}
          style={{
            width: 110, height: 95, objectFit: "contain",
            animation: "roomImgSpin .55s cubic-bezier(.34,1.2,.64,1) both, gentleFloat 3.5s ease-in-out .6s infinite",
          }}
        />
      </div>

      {/* info */}
      <div style={{ padding: "8px 12px 12px" }}>
        <p style={{
          color: "#6B7280", fontSize: 11, lineHeight: 1.5, marginBottom: 10,
        }}>{room.desc}</p>

        {/* stats row */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "#F4F6F9", borderRadius: 8, padding: "8px 12px", marginBottom: 10,
        }}>
          <span style={{ color: "#6B7280", fontSize: 12 }}>
            <strong style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif" }}>{done}/{room.courses.length}</strong> courses
          </span>
          <span style={{ color: room.color, fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 14 }}>
            {pct}<span style={{ fontSize: 11, fontWeight: 500 }}>%</span>
          </span>
        </div>

        {/* progress bar */}
        <div style={{ height: 4, borderRadius: 99, background: "#E5E7EB", overflow: "hidden", marginBottom: 10 }}>
          <div style={{ height: "100%", width: `${pct}%`, background: room.color, borderRadius: 99 }} />
        </div>

        {/* CTA */}
        <button
          onClick={() => onEnter(room)}
          style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
            gap: 6, padding: "8px 0", borderRadius: 8, border: "none", cursor: "pointer",
            background: room.color, color: "#fff",
            fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 12,
          }}
        >
          {ctaLabel} <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

/* ── Storefront card — bottom grid ── */
function StorefrontCard({ room, progress, onClick, index, isMobile }: {
  room: Room; progress: Record<string, number>; onClick: () => void; index: number; isMobile: boolean;
}) {
  const Icon   = ROOM_ICONS[room.id];
  const img    = ROOM_IMAGES[room.id];
  const status = roomStatus(room);
  const done   = room.courses.filter(c => (progress[`${room.id}::${c.t}`] ?? c.pct) >= 100).length;
  const pct    = Math.round((done / room.courses.length) * 100);

  return (
    <button
      onClick={onClick}
      style={{
        textAlign: "left", padding: 0, borderRadius: 14,
        background: "#fff",
        border: `1.5px solid #E5E7EB`,
        cursor: "pointer", overflow: "hidden",
        transition: "box-shadow .18s, transform .18s",
        display: "flex", flexDirection: "column",
        animation: `cardSlideUp .35s cubic-bezier(.34,1.2,.64,1) ${index * 0.07}s both`,
        ...(isMobile && { minWidth: 150, maxWidth: 150, scrollSnapAlign: "start", flexShrink: 0 }),
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 8px 28px ${room.color}22, 0 2px 8px rgba(0,0,0,.08)`;
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.border = `1.5px solid ${room.color}`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.border = "1.5px solid #E5E7EB";
      }}
    >
      {/* awning */}
      <div style={{
        background: room.color,
        padding: "8px 12px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <Icon size={14} color="#fff" />
          <span style={{
            color: "#fff", fontFamily: "Montserrat,sans-serif",
            fontWeight: 700, fontSize: 11, letterSpacing: "0.03em",
          }}>{room.name}</span>
        </div>
        {status === "complete" && <Award size={13} color="#fff" />}
      </div>

      {/* room image */}
      <div style={{
        background: "#F4F6F9",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "12px 8px 6px", flex: 1,
      }}>
        <img
          src={img}
          alt={room.name}
          style={{
            width: "100%", maxWidth: 130, height: 90, objectFit: "contain",
            animation: `gentleFloat 3.5s ease-in-out ${index * 0.6}s infinite`,
          }}
        />
      </div>

      {/* progress */}
      <div style={{ padding: "8px 12px 12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
          <span style={{ color: "#9CA3AF", fontSize: 10, fontFamily: "Montserrat,sans-serif", fontWeight: 600 }}>
            {done}/{room.courses.length} courses
          </span>
          <span style={{ color: room.color, fontSize: 11, fontFamily: "Montserrat,sans-serif", fontWeight: 800 }}>
            {pct}%
          </span>
        </div>
        <div style={{ height: 4, borderRadius: 99, background: "#E5E7EB", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: room.color, borderRadius: 99 }} />
        </div>
      </div>
    </button>
  );
}

/* ── Main lobby screen ── */
interface Props {
  progress: Record<string, number>;
  onEnterRoom: (room: Room) => void;
}

export function LobbyScreen({ progress, onEnterRoom }: Props) {
  const [openRoomId, setOpenRoomId] = useState<string | null>(null);
  const lobbyRef = useRef<HTMLDivElement>(null);

  const width = useWindowWidth();
  const isMobile = width < 768;

  const openRoom = ROOMS.find(r => r.id === openRoomId) ?? null;

  const totalCourses = ROOMS.reduce((s, r) => s + r.courses.length, 0);
  const doneCourses  = ROOMS.reduce((s, r) =>
    s + r.courses.filter(c => (progress[`${r.id}::${c.t}`] ?? c.pct) >= 100).length, 0);
  const overallPct   = Math.round((doneCourses / totalCourses) * 100);

  /* close popup when clicking outside the lobby image area */
  const handleBackdropClick = () => setOpenRoomId(null);

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#F4F6F9" }}>

      {/* ── header ── */}
      <div style={{
        padding: isMobile ? "14px 16px 12px" : "18px 32px 14px",
        background: "#fff",
        borderBottom: "1px solid #E5E7EB",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <h1 style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: isMobile ? 16 : 20 }}>
            {isMobile ? "Training Center" : "Healthcare Training Center"}
          </h1>
          {!isMobile && (
            <p style={{ color: "#6B7280", fontSize: 13, marginTop: 2 }}>
              Click a room to view details and begin your training.
            </p>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 14 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: isMobile ? 16 : 20 }}>{overallPct}%</div>
            <div style={{ color: "#9CA3AF", fontSize: 10 }}>progress</div>
          </div>
          <svg width={isMobile ? 38 : 48} height={isMobile ? 38 : 48} viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="19" fill="none" stroke="#E5E7EB" strokeWidth="5" />
            <circle cx="24" cy="24" r="19" fill="none" stroke="#2B8FA9" strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 19}`}
              strokeDashoffset={`${2 * Math.PI * 19 * (1 - overallPct / 100)}`}
              transform="rotate(-90 24 24)"
              style={{ transition: "stroke-dashoffset 1s ease" }}
            />
          </svg>
        </div>
      </div>

      {/* ── isometric lobby image + hotspot overlays ── */}
      <div
        ref={lobbyRef}
        onClick={handleBackdropClick}
        style={{ width: "100%", background: "#EEF2F5", overflow: "visible" }}
      >
        {/* inner wrapper: natural image proportions, hotspot % positions map exactly */}
        <div style={{ position: "relative", width: "100%", lineHeight: 0, overflow: "visible" }}>
          <img
            src={lobbyImg}
            alt="Healthcare Training Center Lobby"
            style={{
              width: "100%", height: "auto",
              display: "block",
              userSelect: "none", pointerEvents: "none",
            }}
          />

        {/* invisible zone hotspots — transparent clickable areas over each storefront */}
        {HOTSPOTS.map(spot => {
          const isOpen = openRoomId === spot.id;
          const room   = ROOMS.find(r => r.id === spot.id)!;

          return (
            <div
              key={spot.id}
              onClick={e => {
                e.stopPropagation();
                setOpenRoomId(prev => prev === spot.id ? null : spot.id);
              }}
              title={room.name}
              style={{
                position: "absolute",
                left: spot.left,
                top: spot.top,
                width: spot.width,
                height: spot.height,
                cursor: "pointer",
                zIndex: isOpen ? 30 : 10,
              }}
            >
              {/* popup anchored at bottom-center of zone */}
              {isOpen && openRoom && (
                <div
                  style={{
                    position: "absolute",
                    top: "55%",
                    ...(spot.popupAlign === "left"   && { left: 0 }),
                    ...(spot.popupAlign === "right"  && { right: 0 }),
                    ...(spot.popupAlign === "center" && { left: "50%", transform: "translateX(-50%)" }),
                    zIndex: 40,
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  <RoomPopup
                    room={openRoom}
                    progress={progress}
                    onEnter={r => { setOpenRoomId(null); onEnterRoom(r); }}
                    onClose={() => setOpenRoomId(null)}
                  />
                </div>
              )}
            </div>
          );
        })}
        </div>
      </div>


      {/* ── storefront cards grid ── */}
      <div style={{ padding: isMobile ? "16px 16px 28px" : "24px 32px 36px" }}>
        <div style={{ marginBottom: 14 }}>
          <h2 style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 16 }}>
            Training Rooms
          </h2>
          {!isMobile && (
            <p style={{ color: "#9CA3AF", fontSize: 13, marginTop: 2 }}>
              Click a storefront above or select a room below to begin.
            </p>
          )}
        </div>
        <div style={isMobile ? {
          display: "flex", overflowX: "auto", gap: 12, paddingBottom: 8,
          scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" as const,
        } : {
          display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(5,1fr)", gap: isMobile ? 12 : 16,
        }}>
          {ROOMS.map((room, i) => (
            <StorefrontCard
              key={room.id}
              room={room}
              progress={progress}
              onClick={() => onEnterRoom(room)}
              index={i}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
