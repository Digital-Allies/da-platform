import { useState } from "react";
import { ArrowLeft, ArrowRight, Lightbulb, CheckCircle2, Quote, ChevronRight, StickyNote, Plus, X } from "lucide-react";
import { type Room, type Course } from "../data/rooms";
import { lessonFor, type Block } from "../data/lessons";
import { type StudyNote } from "../data/notes";
import { QuizScreen } from "./QuizScreen";

function BlockRenderer({ block, color }: { block: Block; color: string }) {
  switch (block.type) {
    case "p":
      return <p style={{ color: "#374151", fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>{block.text}</p>;
    case "h":
      return <h4 style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 14, marginTop: 24, marginBottom: 10 }}>{block.text}</h4>;
    case "key":
      return (
        <div style={{
          display: "flex", gap: 12,
          borderRadius: "0 10px 10px 0",
          borderLeft: `3px solid ${color}`,
          padding: "14px 16px", margin: "16px 0",
          background: `${color}0c`,
        }}>
          <Lightbulb size={15} style={{ color, flexShrink: 0, marginTop: 2 }} />
          <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.7 }}>{block.text}</p>
        </div>
      );
    case "list":
      return (
        <ul style={{ margin: "12px 0 16px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
          {(block.items ?? []).map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <CheckCircle2 size={14} style={{ color, flexShrink: 0, marginTop: 3 }} />
              <span style={{ color: "#374151", fontSize: 14, lineHeight: 1.6 }}>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "voice":
      return (
        <blockquote style={{
          margin: "20px 0", padding: "16px 18px",
          borderLeft: `3px solid ${color}`,
          borderRadius: "0 10px 10px 0",
          background: `${color}06`,
        }}>
          <Quote size={13} style={{ color, opacity: 0.5, marginBottom: 6 }} />
          <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.8, fontStyle: "italic", fontFamily: "Playfair Display,serif" }}>
            {block.text}
          </p>
          {block.cite && (
            <cite style={{ display: "block", marginTop: 8, color: "#9CA3AF", fontSize: 11, fontStyle: "normal", fontFamily: "Montserrat,sans-serif", fontWeight: 600 }}>
              — {block.cite}
            </cite>
          )}
        </blockquote>
      );
    default: return null;
  }
}

/* ── Note panel shown at bottom of each module ── */
function NotePanel({
  color, moduleNotes, onSave,
}: {
  color: string;
  moduleNotes: StudyNote[];
  onSave: (text: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const save = () => {
    if (!text.trim()) return;
    onSave(text.trim());
    setText("");
    setOpen(false);
  };

  return (
    <div style={{ marginTop: 28, borderTop: "1px solid #E5E7EB", paddingTop: 20 }}>
      {/* existing notes for this module */}
      {moduleNotes.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          {moduleNotes.map(n => (
            <div key={n.id} style={{
              background: `${color}08`, borderLeft: `3px solid ${color}`,
              borderRadius: "0 8px 8px 0",
              padding: "10px 14px", marginBottom: 8, fontSize: 13, color: "#374151", lineHeight: 1.6,
            }}>
              <span style={{ color, fontSize: 10, fontFamily: "Montserrat,sans-serif", fontWeight: 700, display: "block", marginBottom: 4 }}>MY NOTE</span>
              {n.text}
            </div>
          ))}
        </div>
      )}

      {open ? (
        <div style={{ background: "#F9FAFB", borderRadius: 10, border: "1px solid #E5E7EB", padding: 14 }}>
          <textarea
            autoFocus
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Type your note here…"
            style={{
              width: "100%", minHeight: 90, resize: "vertical", border: "none",
              background: "transparent", fontSize: 14, lineHeight: 1.65, outline: "none",
              fontFamily: "Inter,sans-serif", color: "#374151", boxSizing: "border-box",
            }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8 }}>
            <button onClick={() => { setOpen(false); setText(""); }} style={{
              padding: "7px 14px", borderRadius: 7, border: "1px solid #E5E7EB",
              background: "#fff", fontSize: 13, cursor: "pointer", color: "#6B7280",
              display: "flex", alignItems: "center", gap: 5,
            }}>
              <X size={13} /> Cancel
            </button>
            <button onClick={save} disabled={!text.trim()} style={{
              padding: "7px 14px", borderRadius: 7, border: "none",
              background: text.trim() ? color : "#E5E7EB",
              color: text.trim() ? "#fff" : "#9CA3AF",
              fontSize: 13, fontWeight: 600, cursor: text.trim() ? "pointer" : "default",
            }}>Save Note</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setOpen(true)} style={{
          display: "flex", alignItems: "center", gap: 7, padding: "8px 14px",
          borderRadius: 8, border: `1px dashed ${color}50`,
          background: `${color}06`, cursor: "pointer",
          color, fontSize: 13, fontFamily: "Montserrat,sans-serif", fontWeight: 600,
        }}>
          <Plus size={14} /> <StickyNote size={13} /> Add Note
        </button>
      )}
    </div>
  );
}

interface Props {
  room: Room; course: Course;
  onBack: () => void; onComplete: () => void;
  onSetProgress: (roomId: string, courseTitle: string, pct: number) => void;
  onAddNote: (note: StudyNote) => void;
  existingNotes: StudyNote[];
}

export function LessonScreen({ room, course, onBack, onComplete, onSetProgress, onAddNote, existingNotes }: Props) {
  const lesson = lessonFor(room.id);
  const [step, setStep] = useState(0);
  const isQuiz = step === lesson.modules.length;
  const mod    = lesson.modules[step];

  const goNext = () => {
    const next = step + 1;
    setStep(next);
    if (next < lesson.modules.length) {
      onSetProgress(room.id, course.t, Math.round((next / (lesson.modules.length + 1)) * 90));
    }
  };

  const handlePass = () => { onSetProgress(room.id, course.t, 100); onComplete(); };
  const barPct = isQuiz ? 90 : Math.round(((step + 1) / (lesson.modules.length + 1)) * 90);

  const moduleNotes = isQuiz ? [] : existingNotes.filter(
    n => n.roomId === room.id && n.courseTitle === course.t && n.moduleTitle === mod.t
  );

  const saveNote = (text: string) => {
    onAddNote({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      roomId: room.id,
      roomName: room.name,
      roomColor: room.color,
      courseTitle: course.t,
      moduleTitle: mod.t,
      text,
      createdAt: Date.now(),
    });
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F4F6F9", overflow: "hidden" }}>
      {/* sticky header */}
      <div style={{
        padding: "14px 32px", display: "flex", alignItems: "center", gap: 16, flexShrink: 0,
        background: "#fff", borderBottom: `3px solid ${room.color}`,
      }}>
        <button onClick={onBack} style={{
          display: "flex", alignItems: "center", gap: 8, border: "none", background: "none",
          cursor: "pointer", color: "#6B7280", fontSize: 13, fontFamily: "Montserrat,sans-serif", fontWeight: 600, flexShrink: 0,
        }}>
          <ArrowLeft size={14} /> Back to Room
        </button>
        <div style={{ flex: 1, height: 4, borderRadius: 99, background: "#E5E7EB", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${barPct}%`, background: room.color, borderRadius: 99, transition: "width .5s ease" }} />
        </div>
        <span style={{ color: room.color, fontSize: 12, fontFamily: "Montserrat,sans-serif", fontWeight: 700, flexShrink: 0 }}>
          {isQuiz ? "Knowledge Check" : `Module ${step + 1} / ${lesson.modules.length}`}
        </span>
      </div>

      {/* scrollable content */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {isQuiz
          ? <QuizScreen room={room} course={course} quiz={lesson.quiz} onPass={handlePass} onReview={() => setStep(0)} />
          : (
            <div style={{ maxWidth: 700, margin: "0 auto", padding: "36px 32px" }}>
              {/* breadcrumb */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 24, color: "#9CA3AF", fontSize: 12, fontFamily: "Montserrat,sans-serif" }}>
                <span>{room.name}</span>
                <ChevronRight size={11} />
                <span style={{ color: "#6B7280" }}>{course.t}</span>
                <ChevronRight size={11} />
                <span style={{ color: room.color }}>{mod.t}</span>
              </div>

              <div style={{ marginBottom: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: 6,
                    background: `${room.color}15`, border: `1px solid ${room.color}25`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 800, color: room.color, fontFamily: "Montserrat,sans-serif",
                  }}>{step + 1}</div>
                  <span style={{ color: room.color, fontSize: 11, fontFamily: "Montserrat,sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}>MODULE {step + 1}</span>
                </div>
                <h2 style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 22, lineHeight: 1.25 }}>{mod.t}</h2>
              </div>

              <div>{mod.blocks.map((b, i) => <BlockRenderer key={i} block={b} color={room.color} />)}</div>

              {/* note panel */}
              <NotePanel color={room.color} moduleNotes={moduleNotes} onSave={saveNote} />

              {/* nav */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                marginTop: 32, paddingTop: 24, borderTop: "1px solid #E5E7EB",
              }}>
                <button disabled={step === 0} onClick={() => setStep(s => s - 1)} style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "9px 18px", borderRadius: 9,
                  border: "1px solid #E5E7EB", background: "#fff",
                  color: "#6B7280", fontFamily: "Montserrat,sans-serif", fontWeight: 600, fontSize: 13,
                  cursor: step === 0 ? "not-allowed" : "pointer", opacity: step === 0 ? 0.4 : 1,
                }}><ArrowLeft size={14} /> Previous</button>

                {/* dots */}
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {lesson.modules.map((_, i) => (
                    <button key={i} onClick={() => setStep(i)} style={{
                      borderRadius: 99, border: "none", cursor: "pointer", padding: 0,
                      width: i === step ? 20 : 6, height: 6,
                      background: i === step ? room.color : i < step ? `${room.color}50` : "#D1D5DB",
                      transition: "all .2s",
                    }} />
                  ))}
                  <button onClick={() => setStep(lesson.modules.length)} style={{
                    borderRadius: 99, border: "none", cursor: "pointer", padding: 0,
                    width: isQuiz ? 20 : 6, height: 6,
                    background: isQuiz ? room.color : "#E5E7EB", transition: "all .2s", marginLeft: 2,
                  }} />
                </div>

                <button onClick={goNext} style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "9px 20px", borderRadius: 9,
                  border: "none", background: room.color, color: "#fff",
                  fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer",
                }}>
                  {step === lesson.modules.length - 1 ? "Take Quiz" : "Next Module"} <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
