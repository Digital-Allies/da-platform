import { useState } from "react";
import { StickyNote, Trash2, Search, BookOpen } from "lucide-react";
import { type StudyNote } from "../data/notes";
import { ROOMS } from "../data/rooms";

interface Props {
  notes: StudyNote[];
  onDelete: (id: string) => void;
}

export function NotesScreen({ notes, onDelete }: Props) {
  const [search, setSearch] = useState("");
  const [filterRoom, setFilterRoom] = useState("all");

  const filtered = notes.filter(n => {
    const matchRoom = filterRoom === "all" || n.roomId === filterRoom;
    const q = search.toLowerCase();
    const matchSearch = !q || n.text.toLowerCase().includes(q) ||
      n.courseTitle.toLowerCase().includes(q) || n.moduleTitle.toLowerCase().includes(q);
    return matchRoom && matchSearch;
  });

  /* group by room */
  const grouped = ROOMS.reduce<Record<string, StudyNote[]>>((acc, r) => {
    const roomNotes = filtered.filter(n => n.roomId === r.id);
    if (roomNotes.length > 0) acc[r.id] = roomNotes;
    return acc;
  }, {});

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#F4F6F9" }}>
      {/* header */}
      <div style={{ padding: "20px 32px 16px", background: "#fff", borderBottom: "1px solid #E5E7EB" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 20 }}>
              My Study Notes
            </h1>
            <p style={{ color: "#6B7280", fontSize: 13, marginTop: 2 }}>
              {notes.length} note{notes.length !== 1 ? "s" : ""} saved across your training
            </p>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            {/* search */}
            <div style={{ position: "relative" }}>
              <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search notes…"
                style={{
                  paddingLeft: 32, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
                  borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13,
                  background: "#F9FAFB", outline: "none", width: 200,
                }}
              />
            </div>
            {/* room filter */}
            <select
              value={filterRoom}
              onChange={e => setFilterRoom(e.target.value)}
              style={{
                padding: "8px 12px", borderRadius: 8, border: "1px solid #E5E7EB",
                fontSize: 13, background: "#F9FAFB", color: "#374151", cursor: "pointer",
              }}
            >
              <option value="all">All Rooms</option>
              {ROOMS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div style={{ padding: "24px 32px 40px" }}>
        {notes.length === 0 ? (
          <div style={{ textAlign: "center", paddingTop: 80 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 18, margin: "0 auto 16px",
              background: "#2BA89A12", border: "1px solid #2BA89A25",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <StickyNote size={28} color="#2BA89A" />
            </div>
            <h2 style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 18, marginBottom: 8 }}>No notes yet</h2>
            <p style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.7, maxWidth: 300, margin: "0 auto" }}>
              Use the <strong>+ Add Note</strong> button inside any lesson module to capture your thoughts.
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", paddingTop: 60, color: "#9CA3AF", fontSize: 14 }}>
            No notes match your search.
          </div>
        ) : (
          Object.entries(grouped).map(([roomId, roomNotes]) => {
            const room = ROOMS.find(r => r.id === roomId)!;
            return (
              <div key={roomId} style={{ marginBottom: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: room.color, flexShrink: 0 }} />
                  <h3 style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 14 }}>
                    {room.name}
                  </h3>
                  <span style={{ color: "#9CA3AF", fontSize: 12 }}>({roomNotes.length})</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {roomNotes.map(note => (
                    <div key={note.id} style={{
                      background: "#fff", borderRadius: 12,
                      borderLeft: `4px solid ${room.color}`,
                      boxShadow: "0 1px 4px rgba(0,0,0,.06)",
                      padding: "14px 16px",
                    }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                            <BookOpen size={11} style={{ color: room.color, flexShrink: 0 }} />
                            <span style={{ color: room.color, fontSize: 10, fontFamily: "Montserrat,sans-serif", fontWeight: 700, letterSpacing: "0.06em" }}>
                              {note.courseTitle} · {note.moduleTitle}
                            </span>
                          </div>
                          <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.65, whiteSpace: "pre-wrap" }}>{note.text}</p>
                          <div style={{ color: "#9CA3AF", fontSize: 11, marginTop: 8 }}>
                            {new Date(note.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                          </div>
                        </div>
                        <button
                          onClick={() => onDelete(note.id)}
                          style={{
                            flexShrink: 0, width: 28, height: 28, borderRadius: 8, border: "none",
                            background: "#FEF2F2", cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}
                          title="Delete note"
                        >
                          <Trash2 size={13} color="#EF4444" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
