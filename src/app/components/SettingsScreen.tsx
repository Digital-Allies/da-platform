import { useState } from "react";
import { User, Bell, Monitor, Save, Check, GraduationCap } from "lucide-react";
import { PROFILE_KEY, DEFAULT_PROFILE, type UserProfile } from "../data/notes";

function initProfile(): UserProfile {
  try {
    const s = localStorage.getItem(PROFILE_KEY);
    if (s) return JSON.parse(s);
  } catch {}
  return DEFAULT_PROFILE;
}

type Tab = "profile" | "notifications" | "display";

const TABS: { id: Tab; label: string; Icon: React.ElementType }[] = [
  { id: "profile",       label: "Profile",        Icon: User    },
  { id: "notifications", label: "Notifications",   Icon: Bell    },
  { id: "display",       label: "Display",         Icon: Monitor },
];

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      style={{
        width: 42, height: 24, borderRadius: 99, border: "none", cursor: "pointer",
        background: on ? "#2BA89A" : "#D1D5DB",
        position: "relative", transition: "background .2s", flexShrink: 0,
      }}
    >
      <div style={{
        position: "absolute", top: 3, left: on ? 21 : 3,
        width: 18, height: 18, borderRadius: "50%", background: "#fff",
        transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,.2)",
      }} />
    </button>
  );
}

export function SettingsScreen() {
  const [tab, setTab] = useState<Tab>("profile");
  const [profile, setProfile] = useState<UserProfile>(initProfile);
  const [saved, setSaved] = useState(false);

  const [notifs, setNotifs] = useState({
    weeklyDigest: true,
    courseReminders: true,
    certificateAlerts: true,
    systemUpdates: false,
  });
  const [display, setDisplay] = useState({
    language: "en",
    timezone: "America/New_York",
    fontSize: "normal",
    autoplay: false,
  });

  const saveProfile = () => {
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify(profile)); } catch {}
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const initials = profile.name.split(" ").map(p => p[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#F4F6F9" }}>
      {/* header */}
      <div style={{ padding: "20px 32px 16px", background: "#fff", borderBottom: "1px solid #E5E7EB" }}>
        <h1 style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 20 }}>Settings</h1>
        <p style={{ color: "#6B7280", fontSize: 13, marginTop: 2 }}>Manage your profile, notifications, and display preferences.</p>
      </div>

      <div style={{ padding: "28px 32px 48px", maxWidth: 780, margin: "0 auto" }}>
        {/* tabs */}
        <div style={{ display: "flex", gap: 4, background: "#fff", borderRadius: 12, padding: 4, marginBottom: 24, boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}>
          {TABS.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => setTab(id)} style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: "9px 16px", borderRadius: 8, border: "none", cursor: "pointer",
              background: tab === id ? "#1E3A6E" : "transparent",
              color: tab === id ? "#fff" : "#6B7280",
              fontFamily: "Montserrat,sans-serif", fontWeight: 600, fontSize: 13,
              transition: "all .15s",
            }}>
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>

        {/* profile tab */}
        {tab === "profile" && (
          <div style={{ background: "#fff", borderRadius: 14, padding: "24px", boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}>
            {/* avatar */}
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28, paddingBottom: 24, borderBottom: "1px solid #E5E7EB" }}>
              <div style={{
                width: 72, height: 72, borderRadius: 18, background: "#2B8FA9", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 26, fontWeight: 800, color: "#fff", fontFamily: "Montserrat,sans-serif",
              }}>{initials}</div>
              <div>
                <div style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 18 }}>{profile.name}</div>
                <div style={{ color: "#6B7280", fontSize: 13, marginTop: 2 }}>{profile.title} · {profile.department}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
                  <GraduationCap size={13} color="#2BA89A" />
                  <span style={{ color: "#2BA89A", fontSize: 12, fontWeight: 600 }}>Healthcare Learner</span>
                </div>
              </div>
            </div>

            {/* form fields */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              {([
                { label: "Full Name", key: "name" as const, placeholder: "Your full name" },
                { label: "Job Title", key: "title" as const, placeholder: "e.g. Registered Nurse" },
                { label: "Department", key: "department" as const, placeholder: "e.g. General Medicine" },
                { label: "Email Address", key: "email" as const, placeholder: "your@email.com" },
              ] as { label: string; key: keyof UserProfile; placeholder: string }[]).map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label style={{ display: "block", color: "#374151", fontSize: 12, fontFamily: "Montserrat,sans-serif", fontWeight: 600, marginBottom: 6 }}>{label}</label>
                  <input
                    value={profile[key]}
                    onChange={e => setProfile(p => ({ ...p, [key]: e.target.value }))}
                    placeholder={placeholder}
                    style={{
                      width: "100%", padding: "10px 12px", borderRadius: 8,
                      border: "1px solid #E5E7EB", fontSize: 14, outline: "none",
                      background: "#F9FAFB", boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}
            </div>

            <button onClick={saveProfile} style={{
              display: "flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 9,
              border: "none", cursor: "pointer",
              background: saved ? "#22C55E" : "#1E3A6E", color: "#fff",
              fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 14,
              transition: "background .2s",
            }}>
              {saved ? <><Check size={15} /> Saved!</> : <><Save size={15} /> Save Changes</>}
            </button>
          </div>
        )}

        {/* notifications tab */}
        {tab === "notifications" && (
          <div style={{ background: "#fff", borderRadius: 14, padding: "24px", boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}>
            <h3 style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 20 }}>Notification Preferences</h3>
            {([
              { key: "weeklyDigest" as const, label: "Weekly Progress Digest", desc: "Receive a weekly summary of your training progress via email." },
              { key: "courseReminders" as const, label: "Course Reminders", desc: "Get reminded when you have incomplete courses or approaching deadlines." },
              { key: "certificateAlerts" as const, label: "Certificate Alerts", desc: "Be notified when you earn a new certificate or one is about to expire." },
              { key: "systemUpdates" as const, label: "System Updates", desc: "Receive notifications about new courses, platform updates, and announcements." },
            ]).map(({ key, label, desc }) => (
              <div key={key} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "16px 0", borderBottom: "1px solid #F3F4F6", gap: 20,
              }}>
                <div>
                  <div style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 600, fontSize: 14 }}>{label}</div>
                  <div style={{ color: "#6B7280", fontSize: 13, marginTop: 3 }}>{desc}</div>
                </div>
                <Toggle on={notifs[key]} onChange={v => setNotifs(p => ({ ...p, [key]: v }))} />
              </div>
            ))}
          </div>
        )}

        {/* display tab */}
        {tab === "display" && (
          <div style={{ background: "#fff", borderRadius: 14, padding: "24px", boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}>
            <h3 style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 20 }}>Display Preferences</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
              {([
                { label: "Language", key: "language" as const, options: [{ v: "en", l: "English" }, { v: "es", l: "Español" }, { v: "fr", l: "Français" }, { v: "zh", l: "中文" }] },
                { label: "Timezone", key: "timezone" as const, options: [
                  { v: "America/New_York", l: "Eastern (ET)" },
                  { v: "America/Chicago", l: "Central (CT)" },
                  { v: "America/Denver", l: "Mountain (MT)" },
                  { v: "America/Los_Angeles", l: "Pacific (PT)" },
                ]},
                { label: "Font Size", key: "fontSize" as const, options: [{ v: "small", l: "Small" }, { v: "normal", l: "Normal" }, { v: "large", l: "Large" }] },
              ] as { label: string; key: "language" | "timezone" | "fontSize"; options: { v: string; l: string }[] }[]).map(({ label, key, options }) => (
                <div key={key}>
                  <label style={{ display: "block", color: "#374151", fontSize: 12, fontFamily: "Montserrat,sans-serif", fontWeight: 600, marginBottom: 6 }}>{label}</label>
                  <select
                    value={display[key]}
                    onChange={e => setDisplay(p => ({ ...p, [key]: e.target.value }))}
                    style={{
                      width: "100%", padding: "10px 12px", borderRadius: 8,
                      border: "1px solid #E5E7EB", fontSize: 14, background: "#F9FAFB", cursor: "pointer",
                    }}
                  >
                    {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", borderTop: "1px solid #F3F4F6" }}>
              <div>
                <div style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 600, fontSize: 14 }}>Auto-play Next Module</div>
                <div style={{ color: "#6B7280", fontSize: 13, marginTop: 3 }}>Automatically advance to the next module after completing one.</div>
              </div>
              <Toggle on={display.autoplay} onChange={v => setDisplay(p => ({ ...p, autoplay: v }))} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
