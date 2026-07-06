export interface Course {
  t: string;
  min: number;
  lvl: 'Beginner' | 'Core' | 'Advanced';
  pct: number;
}

export interface Room {
  id: string;
  n: number;
  name: string;
  color: string;
  gradFrom: string;
  gradTo: string;
  desc: string;
  why: string;
  done: number;
  total: number;
  courses: Course[];
}

export const ROOMS: Room[] = [
  {
    id: 'cs', n: 1, name: 'Customer Service',
    color: '#3B7DD8', gradFrom: '#071830', gradTo: '#0e2f5e',
    desc: 'Communication, empathy, and de-escalation for every patient interaction.',
    why: 'Patients remember how they were treated long after they forget a diagnosis. The first voice they hear sets the tone for their entire experience of care.',
    done: 18, total: 24,
    courses: [
      { t: 'The Importance of Customer Service in Healthcare', min: 30, lvl: 'Beginner', pct: 100 },
      { t: 'Communication Skills: Phone, Email & In-Person', min: 45, lvl: 'Beginner', pct: 100 },
      { t: 'Active Listening & Empathy', min: 35, lvl: 'Core', pct: 80 },
      { t: 'Handling Difficult Situations', min: 40, lvl: 'Core', pct: 40 },
      { t: 'Cultural Competency', min: 30, lvl: 'Core', pct: 0 },
      { t: 'Service Recovery & Best Practices', min: 25, lvl: 'Advanced', pct: 0 },
    ],
  },
  {
    id: 'hipaa', n: 2, name: 'HIPAA & Privacy',
    color: '#2BA89A', gradFrom: '#041e1b', gradTo: '#0a3830',
    desc: 'PHI, the privacy rule, and the habits that keep patient data safe.',
    why: 'A single careless click can expose thousands of patients. Protecting privacy is not paperwork — it is the trust that makes honest care possible.',
    done: 6, total: 12,
    courses: [
      { t: 'Introduction to HIPAA', min: 30, lvl: 'Beginner', pct: 100 },
      { t: 'Protected Health Information (PHI)', min: 45, lvl: 'Beginner', pct: 100 },
      { t: 'The Privacy Rule & Patient Rights', min: 40, lvl: 'Core', pct: 60 },
      { t: 'Minimum Necessary Standard', min: 25, lvl: 'Core', pct: 0 },
      { t: 'Data Breach Prevention & Reporting', min: 35, lvl: 'Core', pct: 0 },
      { t: 'Consequences of HIPAA Violations', min: 30, lvl: 'Advanced', pct: 0 },
    ],
  },
  {
    id: 'compliance', n: 3, name: 'Compliance',
    color: '#2EAA6E', gradFrom: '#03180d', gradTo: '#082d18',
    desc: 'Laws, fraud/waste/abuse, and the ethics that keep care honest.',
    why: 'Compliance is how an organization proves — to patients and regulators alike — that it does the right thing even when no one is watching.',
    done: 12, total: 12,
    courses: [
      { t: 'Introduction to Healthcare Compliance', min: 30, lvl: 'Beginner', pct: 100 },
      { t: 'Laws & Regulations Overview', min: 45, lvl: 'Beginner', pct: 100 },
      { t: 'Fraud, Waste & Abuse (FWA)', min: 40, lvl: 'Core', pct: 100 },
      { t: 'The Anti-Kickback Statute & Stark Law', min: 50, lvl: 'Advanced', pct: 100 },
      { t: 'Reporting Concerns (Whistleblowing)', min: 30, lvl: 'Core', pct: 100 },
      { t: 'Internal Audits & Monitoring', min: 35, lvl: 'Advanced', pct: 100 },
    ],
  },
  {
    id: 'records', n: 4, name: 'Medical Records',
    color: '#7B5EA7', gradFrom: '#100920', gradTo: '#1e1040',
    desc: 'EHR, documentation standards, and reading a record with confidence.',
    why: "The record is the patient's story in clinical form. Accurate documentation is what lets the next caregiver pick up exactly where the last one left off.",
    done: 3, total: 14,
    courses: [
      { t: 'Introduction to Medical Records', min: 30, lvl: 'Beginner', pct: 100 },
      { t: 'Electronic Health Records (EHR)', min: 45, lvl: 'Beginner', pct: 60 },
      { t: 'Documenting Patient Information', min: 40, lvl: 'Core', pct: 0 },
      { t: 'How to Read a Medical Record', min: 35, lvl: 'Core', pct: 0 },
      { t: 'Retention & Destruction Policies', min: 30, lvl: 'Advanced', pct: 0 },
      { t: 'Release of Information (ROI)', min: 35, lvl: 'Advanced', pct: 0 },
    ],
  },
  {
    id: 'finance', n: 5, name: 'Finance',
    color: '#D4A017', gradFrom: '#1a1100', gradTo: '#302000',
    desc: 'Revenue cycle, billing, and collections done accurately and fairly.',
    why: 'Billing errors cost patients real money and erode their trust. Getting finance right is part of treating people with dignity.',
    done: 0, total: 13,
    courses: [
      { t: 'Introduction to Healthcare Finance', min: 30, lvl: 'Beginner', pct: 0 },
      { t: 'Revenue Cycle Overview', min: 45, lvl: 'Beginner', pct: 0 },
      { t: 'Coding & Charge Capture (CPT/ICD-10)', min: 50, lvl: 'Core', pct: 0 },
      { t: 'Claims Submission & Denials', min: 40, lvl: 'Core', pct: 0 },
      { t: 'Patient Statements & Collections', min: 35, lvl: 'Advanced', pct: 0 },
      { t: 'Fraud & Abuse in Billing', min: 30, lvl: 'Advanced', pct: 0 },
    ],
  },
];

export function roomStatus(r: Room): 'not-started' | 'in-progress' | 'complete' {
  if (r.done === 0) return 'not-started';
  if (r.done >= r.total) return 'complete';
  return 'in-progress';
}
