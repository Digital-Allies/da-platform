import { useState } from "react";

export function DiscoveryFormScreen() {
  const [techLevel, setTechLevel] = useState(5);

  return (
    <div style={{
      flex: 1,
      overflowY: "auto",
      background: "#F4F6F9",
      padding: "16px",
    }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", paddingTop: "32px", paddingBottom: "40px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1 style={{
            fontFamily: "Montserrat,sans-serif",
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: 800,
            color: "#1E3A6E",
            marginBottom: "16px",
            lineHeight: 1.2,
          }}>
            Healthcare Training Center
          </h1>
          <p style={{
            fontFamily: "Montserrat,sans-serif",
            fontSize: "20px",
            color: "#2B8FA9",
            fontWeight: 600,
            marginBottom: "16px",
          }}>
            Project Discovery & Foundation
          </p>
          <p style={{
            fontSize: "15px",
            color: "rgba(30,58,110,0.7)",
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}>
            Please fill out this brief questionnaire to help us establish the foundation for your training platform.
            Your answers will guide the design, technical requirements, and content structure.
          </p>
        </div>

        {/* Form */}
        <form action="https://formsubmit.co/acinktown@gmail.com" method="POST" style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          <input type="hidden" name="_subject" value="New Discovery Form Submission!" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />

          {/* Section 1: Learner & Audience */}
          <FormSection
            title="Learner & Audience"
            color="#3B7DD8"
            icon={
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          >
            <FormField label="Who are the main learners?" sublabel="e.g., healthcare students, hospital staff, specific departments.">
              <input
                type="text"
                name="Main_Learners"
                required
                placeholder="Describe the target audience..."
                style={inputStyle}
              />
            </FormField>

            <FormField label="What's their average comfort level with technology?">
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "16px" }}>
                <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: 600, textTransform: "uppercase" }}>Beginner</span>
                <input
                  type="range"
                  name="Tech_Comfort_Level"
                  min="1"
                  max="10"
                  value={techLevel}
                  onChange={(e) => setTechLevel(Number(e.target.value))}
                  style={{ flex: 1, accentColor: "#2B8FA9" }}
                />
                <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: 600, textTransform: "uppercase" }}>Expert</span>
                <span style={{
                  minWidth: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: "rgba(59,125,216,0.1)",
                  color: "#3B7DD8",
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                }}>
                  {techLevel}
                </span>
              </div>
            </FormField>

            <FormField label="How will they access this platform?">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px" }}>
                {["Phones", "Tablets", "Desktops"].map(device => (
                  <CheckboxOption key={device} name="Devices[]" value={device} label={device} />
                ))}
              </div>
            </FormField>
          </FormSection>

          {/* Section 2: Content & Outcomes */}
          <FormSection
            title="Content & Outcomes"
            color="#2BA89A"
            icon={
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
          >
            <FormField label="What's the #1 thing learners must know by the end of each course?">
              <textarea
                name="Core_Outcome"
                rows={3}
                placeholder="Describe the primary learning objective..."
                style={{ ...inputStyle, resize: "vertical", minHeight: "80px" }}
              />
            </FormField>

            <FormField label="Content Status">
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <RadioOption name="Content_Status" value="Existing Content" label="We have existing content (videos, slide decks, documents) to port in." />
                <RadioOption name="Content_Status" value="Build from Scratch" label="We need to build the content from scratch." />
              </div>
            </FormField>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
              <FormField label="How long should a single lesson take?">
                <select name="Lesson_Duration" style={inputStyle}>
                  <option value="Microlearning (< 5 mins)">Microlearning (&lt; 5 mins)</option>
                  <option value="Short (5-15 mins)">Short (5-15 mins)</option>
                  <option value="Medium (15-30 mins)">Medium (15-30 mins)</option>
                  <option value="Long (45+ mins)">Long (45+ mins)</option>
                  <option value="Flexible">Flexible depending on topic</option>
                </select>
              </FormField>

              <FormField label="Are passing scores required to 'unlock' courses?">
                <select name="Gating_Logic" style={inputStyle}>
                  <option value="Yes, strict gating">Yes, strict gating (must pass to proceed)</option>
                  <option value="No, open navigation">No, flexible/open navigation</option>
                  <option value="Only for certain modules">Only for certification modules</option>
                </select>
              </FormField>
            </div>
          </FormSection>

          {/* Section 3: Compliance & Tracking */}
          <FormSection
            title="Compliance & Tracking"
            color="#2EAA6E"
            icon={
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            }
          >
            <FormField label="Which compliance frameworks apply?" sublabel="e.g., HIPAA, state-specific mandates, internal standards.">
              <input
                type="text"
                name="Compliance_Frameworks"
                placeholder="List any specific compliance rules..."
                style={inputStyle}
              />
            </FormField>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
              <FormField label="What data must be tracked?">
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <CheckboxOption name="Tracking[]" value="Completion" label="Course Completion" />
                  <CheckboxOption name="Tracking[]" value="Test Scores" label="Test/Quiz Scores" />
                  <CheckboxOption name="Tracking[]" value="Time Spent" label="Time Spent on Modules" />
                </div>
              </FormField>

              <FormField label="Who needs access to this data?">
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <CheckboxOption name="Data_Access[]" value="Admins Only" label="Admins Only" />
                  <CheckboxOption name="Data_Access[]" value="Managers" label="Department Managers" />
                  <CheckboxOption name="Data_Access[]" value="External Auditors" label="External Auditors" />
                </div>
              </FormField>
            </div>
          </FormSection>

          {/* Section 4: Virtual Teachers & Character */}
          <FormSection
            title="Virtual Teachers & Character"
            color="#D4A017"
            icon={
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          >
            <FormField label="Do you have a persona in mind for the teacher?" sublabel="e.g., Friendly mentor, Clinical expert, Approachable nurse.">
              <input
                type="text"
                name="Teacher_Persona"
                placeholder="Describe the ideal virtual teacher..."
                style={inputStyle}
              />
            </FormField>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
              <FormField label="Preferred Tone">
                <select name="Teacher_Tone" style={inputStyle}>
                  <option value="Professional & Clinical">Professional & Clinical</option>
                  <option value="Warm & Approachable">Warm & Approachable</option>
                  <option value="Motivational & Energetic">Motivational & Energetic</option>
                  <option value="Mix of above">Mix of above depending on module</option>
                </select>
              </FormField>

              <FormField label="Visual Format">
                <select name="Teacher_Format" style={inputStyle}>
                  <option value="Visual Avatar + Voice">Visual Avatar + Voice</option>
                  <option value="Voiceover Only (over slides)">Voiceover Only (over slides)</option>
                  <option value="Text Only (Chatbot style)">Text Only (Chatbot style)</option>
                </select>
              </FormField>
            </div>
          </FormSection>

          {/* Section 5: Business & Timeline */}
          <FormSection
            title="Business & Timeline"
            color="#7B5EA7"
            icon={
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
              <FormField label="Target Launch Date">
                <input
                  type="date"
                  name="Launch_Date"
                  style={inputStyle}
                />
              </FormField>

              <FormField label="Platform Access Model">
                <select name="Access_Model" style={inputStyle}>
                  <option value="Internal Requirement (Free for staff)">Internal Requirement (Free for staff)</option>
                  <option value="Paid Subscription / B2B">Paid Subscription / B2B</option>
                  <option value="One-off Course Sales (B2C)">One-off Course Sales (B2C)</option>
                </select>
              </FormField>
            </div>
          </FormSection>

          {/* Submit */}
          <div style={{ paddingTop: "24px" }}>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "16px 32px",
                background: "#2B8FA9",
                color: "#fff",
                fontFamily: "Montserrat,sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                boxShadow: "0 8px 24px rgba(30,58,110,0.08)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1E3A6E";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(30,58,110,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#2B8FA9";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(30,58,110,0.08)";
              }}
            >
              <span>Submit Discovery Form</span>
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <p style={{
              marginTop: "16px",
              fontSize: "13px",
              color: "rgba(30,58,110,0.5)",
              textAlign: "center",
            }}>
              By submitting this form, you help us map out the technical and design requirements for the platform.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: "12px",
  border: "1px solid rgba(30,58,110,0.2)",
  padding: "12px 16px",
  fontSize: "14px",
  color: "#1E3A6E",
  background: "rgba(244,246,249,0.5)",
  outline: "none",
  transition: "all 0.2s",
};

function FormSection({
  title,
  color,
  icon,
  children
}: {
  title: string;
  color: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: "16px",
      boxShadow: "0 8px 24px rgba(30,58,110,0.08)",
      border: "1px solid rgba(30,58,110,0.05)",
      overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        background: `${color}15`,
        borderBottom: `1px solid ${color}30`,
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}>
        <div style={{
          padding: "8px",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          color: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {icon}
        </div>
        <h2 style={{
          fontFamily: "Montserrat,sans-serif",
          fontSize: "20px",
          fontWeight: 700,
          color: "#1E3A6E",
          margin: 0,
        }}>
          {title}
        </h2>
      </div>

      {/* Content */}
      <div style={{ padding: "24px 32px", display: "flex", flexDirection: "column", gap: "24px" }}>
        {children}
      </div>
    </div>
  );
}

function FormField({
  label,
  sublabel,
  children
}: {
  label: string;
  sublabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#1E3A6E", marginBottom: "4px" }}>
        {label}
      </label>
      {sublabel && (
        <p style={{ fontSize: "12px", color: "rgba(30,58,110,0.6)", marginBottom: "12px" }}>
          {sublabel}
        </p>
      )}
      {children}
    </div>
  );
}

function CheckboxOption({ name, value, label }: { name: string; value: string; label: string }) {
  return (
    <label style={{
      display: "flex",
      alignItems: "center",
      padding: "12px 16px",
      border: "1px solid rgba(30,58,110,0.1)",
      borderRadius: "10px",
      cursor: "pointer",
      background: "#fff",
      transition: "all 0.15s",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = "#F4F6F9";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "#fff";
    }}
    >
      <input
        type="checkbox"
        name={name}
        value={value}
        style={{ width: "18px", height: "18px", accentColor: "#2B8FA9", cursor: "pointer" }}
      />
      <span style={{ marginLeft: "12px", fontSize: "14px", fontWeight: 500, color: "#1E3A6E" }}>
        {label}
      </span>
    </label>
  );
}

function RadioOption({ name, value, label }: { name: string; value: string; label: string }) {
  return (
    <label style={{
      display: "flex",
      alignItems: "center",
      padding: "14px 16px",
      border: "1px solid rgba(30,58,110,0.1)",
      borderRadius: "10px",
      cursor: "pointer",
      background: "#fff",
      transition: "all 0.15s",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = "#F4F6F9";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "#fff";
    }}
    >
      <input
        type="radio"
        name={name}
        value={value}
        style={{ width: "18px", height: "18px", accentColor: "#2B8FA9", cursor: "pointer" }}
      />
      <span style={{ marginLeft: "12px", fontSize: "14px", fontWeight: 500, color: "#1E3A6E" }}>
        {label}
      </span>
    </label>
  );
}
