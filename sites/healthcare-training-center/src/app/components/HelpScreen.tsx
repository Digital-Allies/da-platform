import { useState, useRef, useEffect } from "react";
import { ChevronDown, Send, Bot, User, Phone, Mail, Clock, BookOpen } from "lucide-react";

/* ── FAQ data ── */
const FAQS = [
  {
    q: "How do I earn a certificate?",
    a: "Complete all modules in a training room and pass the knowledge check quiz with a perfect score. Your certificate will automatically appear in the Certificate Center.",
  },
  {
    q: "Can I retake a quiz?",
    a: "Yes — you can review the module content and retake the quiz as many times as you need. Your progress is saved automatically so you can pick up where you left off.",
  },
  {
    q: "How do I save notes during a lesson?",
    a: "Use the '+ Add Note' button at the bottom of any lesson module. Your notes sync instantly to the My Study Notes section in the sidebar.",
  },
  {
    q: "How long does each training room take?",
    a: "Each room takes approximately 2–4 hours to complete. Individual modules run 15–30 minutes. You can stop and resume anytime — progress is auto-saved.",
  },
  {
    q: "Is my training progress saved if I close the browser?",
    a: "Yes. Progress is stored locally in your browser. If you switch devices or clear your browser data, contact your administrator to sync your records.",
  },
  {
    q: "Who do I contact if I have a technical issue?",
    a: "Reach out to training support at training@healthcarecenter.org or call (800) 555-0100, Monday–Friday 8AM–6PM ET. You can also contact your facility IT help desk.",
  },
];

/* ── Chatbot responses ── */
interface BotRule { test: RegExp; reply: string }
const BOT_RULES: BotRule[] = [
  { test: /^(hi|hello|hey|howdy)/i, reply: "Hello! I'm Maya, your Training Center assistant. How can I help you today?" },
  { test: /certificate|certif/i, reply: "Certificates are awarded once you complete all modules and pass the quiz for a room. Visit the Certificate Center in the sidebar to download yours." },
  { test: /hipaa|privacy|phi/i, reply: "The HIPAA & Privacy room covers the Privacy Rule, Protected Health Information (PHI), patient rights, and best practices for keeping patient data safe." },
  { test: /compliance/i, reply: "The Compliance room covers workplace policies, regulatory requirements, and how to identify and report compliance concerns. Required annually for all staff." },
  { test: /customer.?service|cs room/i, reply: "The Customer Service room covers professional communication, patient interaction, and de-escalation techniques for healthcare settings." },
  { test: /medical.?record|records/i, reply: "The Medical Records room covers EHR documentation standards, record retention, and data accuracy requirements." },
  { test: /finance|billing/i, reply: "The Finance room covers medical billing, coding fundamentals, insurance claims, and financial compliance in healthcare settings." },
  { test: /quiz|test|exam|knowledge.?check/i, reply: "Each room ends with a knowledge check. You need a perfect score to earn your certificate, but you can retake it as many times as you need." },
  { test: /note|study/i, reply: "Use the '+ Add Note' button in any lesson module to save notes. They all sync to your Study Notes section in the sidebar." },
  { test: /progress|dashboard/i, reply: "Check My Dashboard in the sidebar for a full breakdown of your progress, completion percentages, and estimated time remaining." },
  { test: /reset|restart|start.?over/i, reply: "Progress resets must be done by your training administrator. Contact them with your employee ID and the room you'd like reset." },
  { test: /contact|admin|support|email|phone/i, reply: "Training support: training@healthcarecenter.org or (800) 555-0100, Mon–Fri 8AM–6PM ET. Your IT help desk can assist with technical issues." },
  { test: /how.?long|time|duration|hour/i, reply: "Each training room takes about 2–4 hours. Individual modules are 15–30 minutes. Progress saves automatically so you can stop and resume anytime." },
  { test: /thank|thanks|great|perfect|awesome/i, reply: "You're welcome! Anything else I can help with?" },
  { test: /bye|goodbye|that.?s.?all|done/i, reply: "Take care! Good luck with your training. You've got this! 🎓" },
  { test: /course|lesson|module/i, reply: "Each training room has multiple courses, and each course has 3 modules followed by a quiz. Navigate modules using the dots at the bottom of the lesson screen." },
  { test: /pass|fail|score/i, reply: "You need to answer all quiz questions correctly to pass. You can review material between attempts — there's no penalty for retrying." },
  { test: /certificate.?center|download/i, reply: "Go to Certificate Center in the sidebar to download completed certificates as PDFs. They include your name, room, and completion date." },
];
const DEFAULT_REPLY = "I'm not sure about that one! You can check the FAQ above or contact training support at training@healthcarecenter.org for detailed help.";

interface Message { from: "user" | "bot"; text: string; ts: number }

function getReply(input: string): string {
  for (const rule of BOT_RULES) {
    if (rule.test.test(input)) return rule.reply;
  }
  return DEFAULT_REPLY;
}

/* ── FAQ item ── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #E5E7EB" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 0", border: "none", background: "none", cursor: "pointer", textAlign: "left",
        }}
      >
        <span style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 600, fontSize: 14 }}>{q}</span>
        <ChevronDown size={16} color="#9CA3AF" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s", flexShrink: 0 }} />
      </button>
      {open && (
        <p style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.75, paddingBottom: 16, marginTop: -4 }}>{a}</p>
      )}
    </div>
  );
}

export function HelpScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hi! I'm Maya 👋 your Healthcare Training Center assistant. Ask me anything about courses, certificates, notes, or your progress.", ts: Date.now() },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { from: "user", text, ts: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      const reply = getReply(text);
      setMessages(prev => [...prev, { from: "bot", text: reply, ts: Date.now() }]);
    }, 600);
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#F4F6F9" }}>
      {/* header */}
      <div style={{ padding: "20px 32px 16px", background: "#fff", borderBottom: "1px solid #E5E7EB" }}>
        <h1 style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 20 }}>Help & Support</h1>
        <p style={{ color: "#6B7280", fontSize: 13, marginTop: 2 }}>Find answers, chat with our assistant, or reach the support team.</p>
      </div>

      <div style={{ padding: "28px 32px 48px", maxWidth: 960, margin: "0 auto" }}>

        {/* quick contact cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 36 }}>
          {[
            { Icon: Mail, label: "Email Support", value: "training@healthcarecenter.org", color: "#3B7DD8" },
            { Icon: Phone, label: "Phone Support", value: "(800) 555-0100", color: "#2BA89A" },
            { Icon: Clock, label: "Hours", value: "Mon–Fri · 8AM–6PM ET", color: "#7B5EA7" },
          ].map(({ Icon, label, value, color }) => (
            <div key={label} style={{
              background: "#fff", borderRadius: 12, padding: "16px 18px",
              boxShadow: "0 1px 4px rgba(0,0,0,.06)", display: "flex", alignItems: "center", gap: 14,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                background: `${color}12`, border: `1px solid ${color}25`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon size={18} style={{ color }} />
              </div>
              <div>
                <div style={{ color: "#9CA3AF", fontSize: 10, fontFamily: "Montserrat,sans-serif", fontWeight: 700, letterSpacing: "0.08em" }}>{label.toUpperCase()}</div>
                <div style={{ color: "#1E3A6E", fontSize: 13, fontWeight: 600, marginTop: 2 }}>{value}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
          {/* FAQ */}
          <div style={{ background: "#fff", borderRadius: 14, padding: "22px 24px", boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <BookOpen size={18} color="#1E3A6E" />
              <h2 style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 16 }}>Frequently Asked Questions</h2>
            </div>
            {FAQS.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
          </div>

          {/* Chatbot */}
          <div style={{
            background: "#fff", borderRadius: 14, boxShadow: "0 1px 4px rgba(0,0,0,.06)",
            display: "flex", flexDirection: "column", height: 520,
          }}>
            {/* chat header */}
            <div style={{
              padding: "16px 18px", borderBottom: "1px solid #E5E7EB",
              display: "flex", alignItems: "center", gap: 10, flexShrink: 0,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, background: "#2BA89A",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Bot size={18} color="#fff" />
              </div>
              <div>
                <div style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 14 }}>Maya</div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 1 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E" }} />
                  <span style={{ color: "#6B7280", fontSize: 11 }}>Training Assistant · Online</span>
                </div>
              </div>
            </div>

            {/* messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
              {messages.map((msg, i) => (
                <div key={i} style={{
                  display: "flex", gap: 8,
                  flexDirection: msg.from === "user" ? "row-reverse" : "row",
                  alignItems: "flex-end",
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                    background: msg.from === "bot" ? "#2BA89A" : "#1E3A6E",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {msg.from === "bot" ? <Bot size={14} color="#fff" /> : <User size={14} color="#fff" />}
                  </div>
                  <div style={{
                    maxWidth: "75%", padding: "10px 13px", borderRadius: 12,
                    background: msg.from === "bot" ? "#F3F4F6" : "#1E3A6E",
                    color: msg.from === "bot" ? "#374151" : "#fff",
                    fontSize: 13, lineHeight: 1.6,
                    borderBottomLeftRadius: msg.from === "bot" ? 4 : 12,
                    borderBottomRightRadius: msg.from === "user" ? 4 : 12,
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* input */}
            <div style={{
              padding: "12px 14px", borderTop: "1px solid #E5E7EB", flexShrink: 0,
              display: "flex", gap: 8, alignItems: "center",
            }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send()}
                placeholder="Ask Maya anything…"
                style={{
                  flex: 1, padding: "9px 12px", borderRadius: 8, border: "1px solid #E5E7EB",
                  fontSize: 13, outline: "none", background: "#F9FAFB",
                }}
              />
              <button
                onClick={send}
                disabled={!input.trim()}
                style={{
                  width: 36, height: 36, borderRadius: 8, border: "none", cursor: input.trim() ? "pointer" : "default",
                  background: input.trim() ? "#2BA89A" : "#E5E7EB",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background .15s",
                }}
              >
                <Send size={15} color={input.trim() ? "#fff" : "#9CA3AF"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
