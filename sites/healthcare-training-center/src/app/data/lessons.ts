export type BlockType = 'p' | 'h' | 'key' | 'list' | 'voice';

export interface Block {
  type: BlockType;
  text?: string;
  items?: string[];
  cite?: string;
}

export interface Module {
  t: string;
  blocks: Block[];
}

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  explain: string;
}

export interface LessonContent {
  minutes: number;
  modules: Module[];
  quiz: QuizQuestion[];
}

export const LESSON_CONTENT: Record<string, LessonContent> = {
  cs: {
    minutes: 30,
    modules: [
      {
        t: 'Why Customer Service Is Clinical Care',
        blocks: [
          { type: 'p', text: 'Healthcare is one of the few industries where the customer is often frightened, in pain, or confused. Every interaction — a phone call, a check-in, a hallway moment — is a clinical touchpoint.' },
          { type: 'key', text: 'Patients who feel heard are 3× more likely to follow their care plan. Communication is medicine.' },
          { type: 'h', text: 'The AIDET Framework' },
          { type: 'list', items: ['Acknowledge the patient by name', 'Introduce yourself and your role', 'Duration — set expectations for wait times', 'Explain what will happen next', 'Thank them for their patience and trust'] },
          { type: 'voice', text: '"When the nurse came in and just said my name and sat down — I felt like a person, not a chart number."', cite: 'Patient, Regional Medical Center' },
        ],
      },
      {
        t: 'Phone, Email & In-Person Communication',
        blocks: [
          { type: 'p', text: 'Each channel carries different cues. Phone strips body language; email strips tone. You have to compensate deliberately.' },
          { type: 'h', text: 'Phone Essentials' },
          { type: 'list', items: ['Answer within 3 rings', 'Smile — callers can hear it', 'State your name and department on pickup', 'Never put on hold without asking first', 'Summarize action items before hanging up'] },
          { type: 'key', text: 'In-person: face the patient squarely, maintain eye contact 60–70% of the time, and match their energy level — not their anxiety.' },
        ],
      },
      {
        t: 'De-escalation & Service Recovery',
        blocks: [
          { type: 'p', text: 'Difficult moments are not exceptions — they are part of the job. A well-handled complaint can turn a dissatisfied patient into a loyal advocate.' },
          { type: 'h', text: 'The HEAT Model' },
          { type: 'list', items: ['Hear them out — do not interrupt', 'Empathize — name the emotion', 'Apologize for the experience', 'Take action — give a concrete next step'] },
          { type: 'voice', text: '"I was furious about the billing error. The rep said she would fix it right now. She did. I\'ve told ten people about that."', cite: 'Patient survey response' },
          { type: 'key', text: '95% of patients will return after a mistake if the resolution is quick and genuine.' },
        ],
      },
    ],
    quiz: [
      { q: 'What does the "D" in AIDET stand for?', options: ['Diagnosis', 'Duration', 'Document', 'Deliver'], answer: 1, explain: 'Duration means setting expectations for wait times so patients feel informed, not ignored.' },
      { q: 'When a patient is angry, the first step of the HEAT model is to:', options: ['Apologize immediately', 'Call a supervisor', 'Hear them out without interrupting', 'Offer a refund'], answer: 2, explain: 'Letting the patient speak without interruption signals respect and often reduces the emotional temperature.' },
      { q: 'Why does a smile matter on a phone call?', options: ['It is a legal requirement', 'Patients can hear warmth in your tone', 'It makes calls go faster', 'It is unrelated to phone calls'], answer: 1, explain: 'Smiling changes the shape of your mouth and vocal cords, creating a warmer tone that callers detect.' },
    ],
  },
  hipaa: {
    minutes: 30,
    modules: [
      {
        t: 'What Is HIPAA and Why It Exists',
        blocks: [
          { type: 'p', text: 'HIPAA — the Health Insurance Portability and Accountability Act — was signed in 1996. Its Privacy Rule and Security Rule are what most healthcare workers live by day-to-day.' },
          { type: 'key', text: 'HIPAA exists because health information is uniquely sensitive. A breach can affect insurance, employment, and personal safety for years.' },
          { type: 'h', text: 'Covered Entities and Business Associates' },
          { type: 'list', items: ['Covered Entities: healthcare providers, health plans, clearinghouses', 'Business Associates: vendors who handle PHI on your behalf', 'Both are legally liable under HIPAA'] },
        ],
      },
      {
        t: 'Protected Health Information (PHI)',
        blocks: [
          { type: 'p', text: 'PHI is any information that could identify a patient AND relates to their health condition, care, or payment for care.' },
          { type: 'h', text: 'Selected HIPAA Identifiers' },
          { type: 'list', items: ['Name', 'Geographic data (zip code, address)', 'Dates (birth, admission, discharge)', 'Phone numbers', 'Email addresses', 'Social Security Number', 'Medical Record Number'] },
          { type: 'key', text: "Even a patient's ZIP code + diagnosis can constitute PHI if the combination is unique enough to identify them." },
          { type: 'voice', text: '"I assumed telling a coworker in the break room was fine. It cost me my job and $10,000 in fines."', cite: 'Former registration staff member' },
        ],
      },
      {
        t: 'The Minimum Necessary Standard',
        blocks: [
          { type: 'p', text: 'You may only access, use, or disclose the minimum amount of PHI necessary for a given task. Curiosity is not a valid reason.' },
          { type: 'h', text: 'Practical Tests' },
          { type: 'list', items: ['Would my supervisor approve this access?', 'Is this patient currently under my care?', 'Does my role require this specific information?', 'Would I be comfortable if this access were audited?'] },
          { type: 'key', text: 'EHR systems log every record you open. Inappropriate access — even without sharing — is a HIPAA violation.' },
        ],
      },
    ],
    quiz: [
      { q: 'Which of the following is NOT one of the HIPAA identifiers?', options: ["Patient's blood type", "Patient's zip code", "Patient's email address", "Patient's medical record number"], answer: 0, explain: 'Blood type alone is not a HIPAA identifier because it cannot, by itself, identify a specific individual.' },
      { q: 'The Minimum Necessary Standard means:', options: ['You must encrypt all PHI', 'You only access PHI needed to do your specific job', 'You may only discuss PHI with physicians', 'PHI must be deleted after 30 days'], answer: 1, explain: 'Minimum Necessary limits access to what is required for a particular task — not what is convenient.' },
      { q: 'A Business Associate is:', options: ["A patient's family member", 'A vendor who handles PHI on behalf of a covered entity', 'Any employee of a hospital', 'A federal HIPAA auditor'], answer: 1, explain: 'Business Associates are also subject to HIPAA and must sign a Business Associate Agreement.' },
    ],
  },
  compliance: {
    minutes: 30,
    modules: [
      {
        t: 'What Healthcare Compliance Means',
        blocks: [
          { type: 'p', text: 'Compliance is the ongoing process of conforming to laws, regulations, professional standards, and ethical practices. It is proactive — not reactive.' },
          { type: 'key', text: 'The OIG publishes an annual Work Plan listing areas of healthcare they will audit. Knowing their priorities tells you where risks live.' },
          { type: 'list', items: ['Federal laws: Stark Law, Anti-Kickback Statute, False Claims Act', 'State regulations vary by licensure type', 'CMS Conditions of Participation', 'Accreditation standards (Joint Commission, NCQA)'] },
        ],
      },
      {
        t: 'Fraud, Waste & Abuse',
        blocks: [
          { type: 'p', text: 'FWA costs the healthcare system an estimated $100 billion per year. Every employee plays a role in prevention.' },
          { type: 'h', text: 'Definitions' },
          { type: 'list', items: ['Fraud: intentional deception for unauthorized benefit', 'Waste: overuse of resources without intent to deceive', 'Abuse: practices inconsistent with sound medical or fiscal practices'] },
          { type: 'voice', text: '"We thought upcoding by one level was no big deal. Then came the DOJ investigation."', cite: 'Compliance officer, after settlement' },
          { type: 'key', text: 'Upcoding, unbundling, billing for services not rendered, and kickbacks are the most common FWA violations.' },
        ],
      },
      {
        t: 'Reporting and Speaking Up',
        blocks: [
          { type: 'p', text: 'A compliance culture depends on people speaking up when something looks wrong. Retaliation against good-faith reporters is itself a federal violation.' },
          { type: 'h', text: 'How to Report' },
          { type: 'list', items: ['Compliance Hotline (anonymous, 24/7)', 'Direct report to your Compliance Officer', 'OIG Fraud Hotline: 1-800-HHS-TIPS', 'Qui Tam lawsuit under the False Claims Act'] },
          { type: 'key', text: 'Whistleblowers who file Qui Tam suits may receive 15–30% of recovered funds.' },
        ],
      },
    ],
    quiz: [
      { q: 'What is "upcoding"?', options: ['Switching to electronic records', 'Billing for a more complex service than was performed', 'Adding diagnostic codes to increase accuracy', 'Encrypting billing data'], answer: 1, explain: 'Upcoding is billing for a higher level of service than was actually delivered — a form of healthcare fraud.' },
      { q: 'Retaliation against a good-faith compliance reporter is:', options: ['Allowed if the report was wrong', 'A federal violation', 'Only prohibited for physicians', 'Left to state law'], answer: 1, explain: 'Federal law prohibits retaliation against employees who report suspected fraud in good faith.' },
      { q: 'Which agency publishes an annual Work Plan indicating audit priorities?', options: ['CMS', 'FDA', 'OIG', 'OSHA'], answer: 2, explain: 'The OIG Work Plan lists areas of healthcare the Office of Inspector General intends to audit each year.' },
    ],
  },
  records: {
    minutes: 30,
    modules: [
      {
        t: 'Why Medical Records Matter',
        blocks: [
          { type: 'p', text: 'The medical record is the legal document of care. It is used to coordinate treatment, support billing, defend against malpractice, and tell the patient\'s clinical story.' },
          { type: 'key', text: "If it is not documented, legally it did not happen. Documentation is not bureaucracy — it is continuity of care." },
          { type: 'list', items: ['Legal proof of services rendered', 'Billing and reimbursement basis', 'Quality and safety measurement tool', 'Research and public health data source'] },
        ],
      },
      {
        t: 'Electronic Health Records (EHR)',
        blocks: [
          { type: 'p', text: 'EHRs replaced paper charts to improve legibility, accessibility, and coordination. But they carry their own risks: wrong patient selection, copy-paste errors, and alert fatigue.' },
          { type: 'h', text: 'EHR Best Practices' },
          { type: 'list', items: ['Always verify you have the correct patient open', 'Never copy-paste without reviewing for accuracy', 'Log out when stepping away', 'Never share your login credentials', 'Respond to alerts — do not dismiss without reading'] },
          { type: 'voice', text: '"I documented in the wrong record. It took two hours to correct and a formal incident report."', cite: 'Registered nurse, community hospital' },
        ],
      },
      {
        t: 'Retention, Release & Destruction',
        blocks: [
          { type: 'p', text: 'Records must be kept for defined periods — typically 7–10 years. Release requires patient authorization except for treatment, payment, and operations.' },
          { type: 'h', text: 'Release of Information (ROI) Essentials' },
          { type: 'list', items: ['Verify identity before releasing', 'Check for a valid HIPAA-compliant authorization', 'Log every release request', 'Minimum necessary applies to external requests'] },
          { type: 'key', text: 'Destroying records before retention periods expire is a federal violation. Use certified destruction vendors.' },
        ],
      },
    ],
    quiz: [
      { q: 'The medical record serves primarily as:', options: ['A billing shortcut', 'The legal document of care and coordination tool', 'An internal performance report', 'A patient satisfaction survey'], answer: 1, explain: 'Medical records are legal documents supporting care coordination, billing, quality measurement, and legal defense.' },
      { q: 'Copy-paste errors in EHRs are dangerous because:', options: ['They slow down the system', 'They propagate inaccurate information across the record', 'They violate HIPAA automatically', 'They require a supervisor signature'], answer: 1, explain: 'Copy-pasted notes carry forward outdated or inaccurate information other providers may rely on.' },
      { q: 'For a valid Release of Information, you must:', options: ['Get verbal consent only', 'Verify identity and check for a valid authorization', 'Release all records requested', 'Only release records to physicians'], answer: 1, explain: 'ROI requires identity verification and a valid authorization naming the requestor, purpose, and specific records.' },
    ],
  },
  finance: {
    minutes: 30,
    modules: [
      {
        t: 'The Revenue Cycle',
        blocks: [
          { type: 'p', text: 'The revenue cycle is the end-to-end process of collecting payment for healthcare services — from patient scheduling through final payment.' },
          { type: 'h', text: 'Key Stages' },
          { type: 'list', items: ['Patient access: eligibility, authorization, registration', 'Charge capture: services documented and coded', 'Claims submission: billed to payers', 'Remittance: payments and denials processed', 'Patient billing: balances collected'] },
          { type: 'key', text: 'Clean claim rate — claims paid on first submission — is the single most important revenue cycle metric. Best-in-class: 95%+.' },
        ],
      },
      {
        t: 'Coding Basics: CPT & ICD-10',
        blocks: [
          { type: 'p', text: 'Medical coding translates clinical documentation into standardized codes that payers use to adjudicate claims.' },
          { type: 'h', text: 'Two Code Systems' },
          { type: 'list', items: ['CPT: what was done — procedures and services', 'ICD-10-CM: why it was done — diagnoses and conditions', 'Both must support each other in the documentation'] },
          { type: 'voice', text: '"I coded a 99214 because we always do 99214. The audit showed we\'d been miscoding for two years."', cite: 'Coding specialist, physician practice' },
          { type: 'key', text: "Code what was documented. If it's not in the chart, you cannot code for it." },
        ],
      },
      {
        t: 'Denials, Appeals & Patient Collections',
        blocks: [
          { type: 'p', text: 'Denials are not final. Most are workable. But each denial costs $25–$50 to work — prevention is always cheaper.' },
          { type: 'h', text: 'Common Denial Reasons' },
          { type: 'list', items: ['Missing or invalid authorization', 'Incorrect patient demographics', 'Medical necessity not established', 'Duplicate claim', 'Timely filing exceeded'] },
          { type: 'key', text: 'Billing errors are not just a revenue problem. They erode trust. Transparent, accurate billing is a patient rights issue.' },
        ],
      },
    ],
    quiz: [
      { q: 'What does CPT stand for?', options: ['Clinical Payment Terms', 'Current Procedural Terminology', 'Certified Patient Treatment', 'Compliance Processing Toolkit'], answer: 1, explain: 'CPT codes describe the services and procedures performed — the "what was done" side of billing.' },
      { q: 'A "clean claim" is:', options: ['A claim for preventive services only', 'A claim paid on first submission without correction', 'A claim that passes internal audit', 'A claim under $500'], answer: 1, explain: 'Clean claim rate measures how often claims are paid on first submission — a key revenue cycle metric.' },
      { q: 'When a patient asks for an itemized statement, you should:', options: ['Refer them to the billing manager only', 'Always provide it — it is their right', 'Charge an administrative fee', 'Provide only a summary'], answer: 1, explain: 'Patients have the right to an itemized statement. Providing it promptly is both a legal obligation and trust-building.' },
    ],
  },
};

export function lessonFor(roomId: string): LessonContent {
  return LESSON_CONTENT[roomId] ?? LESSON_CONTENT.cs;
}
