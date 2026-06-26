import { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw, ArrowRight } from "lucide-react";
import { type Room, type Course } from "../data/rooms";
import { type QuizQuestion } from "../data/lessons";

interface Props {
  room: Room; course: Course; quiz: QuizQuestion[];
  onPass: () => void; onReview: () => void;
}

export function QuizScreen({ room, course, quiz, onPass, onReview }: Props) {
  const [answers, setAnswers]   = useState<(number | null)[]>(Array(quiz.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = answers.every(a => a !== null);
  const score  = submitted ? Math.round((answers.filter((a, i) => a === quiz[i].answer).length / quiz.length) * 100) : 0;
  const passed = score >= 70;

  const reset = () => { setAnswers(Array(quiz.length).fill(null)); setSubmitted(false); };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "40px 32px" }}>
      <div style={{ marginBottom: 28 }}>
        <span style={{ color: room.color, fontSize: 11, fontFamily: "Montserrat,sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}>KNOWLEDGE CHECK</span>
        <h2 style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 20, marginTop: 4, lineHeight: 1.2 }}>{course.t}</h2>
        <p style={{ color: "#6B7280", fontSize: 13, marginTop: 5 }}>Answer all {quiz.length} questions · 70% required to pass</p>
      </div>

      {!submitted && quiz.map((q, qi) => (
        <div key={qi} style={{
          marginBottom: 20, padding: "18px 20px", borderRadius: 12,
          background: "#fff", border: "1px solid #E5E7EB",
        }}>
          <p style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 600, fontSize: 14, lineHeight: 1.5, marginBottom: 14 }}>
            <span style={{ color: room.color, marginRight: 6 }}>{qi + 1}.</span>{q.q}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {q.options.map((opt, oi) => {
              const selected = answers[qi] === oi;
              return (
                <label key={oi} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                  borderRadius: 8, cursor: "pointer",
                  background: selected ? `${room.color}0d` : "#F9FAFB",
                  border: `1px solid ${selected ? room.color + "40" : "#E5E7EB"}`,
                  transition: "all .15s",
                }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                    border: `2px solid ${selected ? room.color : "#D1D5DB"}`,
                    background: selected ? room.color : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {selected && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />}
                  </div>
                  <input type="radio" name={`q${qi}`} value={oi} checked={selected}
                    onChange={() => setAnswers(a => { const n = [...a]; n[qi] = oi; return n; })}
                    style={{ display: "none" }} />
                  <span style={{ color: "#374151", fontSize: 13 }}>{opt}</span>
                </label>
              );
            })}
          </div>
        </div>
      ))}

      {submitted && (
        <div>
          <div style={{ textAlign: "center", marginBottom: 28, padding: "24px", background: "#fff", borderRadius: 16, border: "1px solid #E5E7EB" }}>
            <svg width="100" height="100" viewBox="0 0 100 100" style={{ display: "block", margin: "0 auto 12px" }}>
              <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E7EB" strokeWidth="6" />
              <circle cx="50" cy="50" r="40" fill="none"
                stroke={passed ? "#2EAA6E" : "#DC3545"} strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - score / 100)}`}
                transform="rotate(-90 50 50)"
                style={{ transition: "stroke-dashoffset 1s ease" }}
              />
              <text x="50" y="50" textAnchor="middle" dominantBaseline="central" fill="#1E3A6E"
                style={{ fontSize: 20, fontFamily: "Montserrat,sans-serif", fontWeight: 800 }}>
                {score}%
              </text>
            </svg>
            <div style={{ color: passed ? "#2EAA6E" : "#DC3545", fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 15 }}>
              {passed ? "Passed! Great work." : "Not quite — try again"}
            </div>
          </div>

          {quiz.map((q, qi) => {
            const userAns = answers[qi];
            const correct = userAns === q.answer;
            return (
              <div key={qi} style={{
                marginBottom: 14, padding: "14px 16px", borderRadius: 10,
                background: correct ? "#F0FDF4" : "#FEF2F2",
                border: `1px solid ${correct ? "#BBF7D0" : "#FECACA"}`,
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  {correct
                    ? <CheckCircle2 size={15} style={{ color: "#2EAA6E", flexShrink: 0, marginTop: 2 }} />
                    : <XCircle size={15} style={{ color: "#DC3545", flexShrink: 0, marginTop: 2 }} />}
                  <div>
                    <p style={{ color: "#1E3A6E", fontSize: 13, fontWeight: 600, marginBottom: 4, fontFamily: "Montserrat,sans-serif" }}>{q.q}</p>
                    {!correct && (
                      <p style={{ color: "#6B7280", fontSize: 12, marginBottom: 3 }}>
                        Your answer: <span style={{ color: "#DC3545" }}>{q.options[userAns!]}</span>
                      </p>
                    )}
                    <p style={{ color: "#6B7280", fontSize: 12, lineHeight: 1.5 }}>
                      <span style={{ color: correct ? "#2EAA6E" : "#374151", fontWeight: 600 }}>Correct: {q.options[q.answer]}</span>
                      {" — "}{q.explain}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <button onClick={onReview} style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: "11px 0", borderRadius: 10, cursor: "pointer",
              background: "#fff", border: "1px solid #E5E7EB", color: "#6B7280",
              fontFamily: "Montserrat,sans-serif", fontWeight: 600, fontSize: 13,
            }}>
              <RotateCcw size={14} /> Review Modules
            </button>
            {passed
              ? <button onClick={onPass} style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "11px 0", borderRadius: 10, cursor: "pointer",
                  background: "#2EAA6E", border: "none", color: "#fff",
                  fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 13,
                }}>Mark Complete <ArrowRight size={14} /></button>
              : <button onClick={reset} style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "11px 0", borderRadius: 10, cursor: "pointer",
                  background: room.color, border: "none", color: "#fff",
                  fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 13,
                }}>Try Again <RotateCcw size={14} /></button>
            }
          </div>
        </div>
      )}

      {!submitted && (
        <button disabled={!allAnswered} onClick={() => setSubmitted(true)} style={{
          width: "100%", padding: "13px 0", borderRadius: 10, border: "none",
          cursor: allAnswered ? "pointer" : "not-allowed",
          background: allAnswered ? room.color : "#E5E7EB",
          color: allAnswered ? "#fff" : "#9CA3AF",
          fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 14, transition: "all .2s",
        }}>Submit Answers</button>
      )}
    </div>
  );
}
