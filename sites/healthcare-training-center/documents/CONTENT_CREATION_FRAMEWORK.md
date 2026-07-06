# Content Creation Framework — Healthcare Training Center

**Status:** Strategy document for building courses from scratch  
**Timeline:** Content strategy (Week 1-2), Production (Weeks 3-26)

---

## OVERVIEW

Your mom has teaching experience but is building her first digital training platform. This framework outlines how to create courses that work for:

- ✅ Healthcare students (formal education)
- ✅ Healthcare employees (on-the-job training)
- ✅ Patient advocates (lay audience)
- ✅ Patients (minimal health literacy assumed)

**Tech comfort = 1/10.** Content must be clear, visual, and jargon-light.

---

## STEP 1: COURSE STRATEGY (Week 1-2)

### Define the Course List

Before writing a single script, answer these questions for EACH course:

#### Example: "Introduction to HIPAA"

| Question | Answer |
|----------|--------|
| **Who is this for?** | All healthcare staff + students |
| **What's the learning goal?** | Learner understands what PHI is + the risks of sharing it |
| **Why should they care?** | Breaches harm patients + cost the org money + they personally face legal consequences |
| **How long?** | 20-30 minutes total |
| **How many lessons?** | 3 modules (What is HIPAA? What is PHI? Common mistakes) |
| **What format?** | Voiceover slides + 1 short video (showing real office scenario) |
| **How do we test it?** | 5 questions quiz (3 scenario-based, 2 definitions) |
| **What's success?** | Learner passes 70% + can identify PHI in workplace |

### Action for Mom This Week
Create a table with 5-10 courses she wants to launch by January 2027. For each, fill in the questions above.

---

## STEP 2: CONTENT PRODUCTION WORKFLOW

### Lesson Structure (Template)

Every lesson follows this structure:

```
┌─────────────────────────────────────────────────────┐
│  LESSON: [Title]                    [5-10 min]      │
├─────────────────────────────────────────────────────┤
│                                                     │
│  📺 HOOK (30 sec)                                  │
│  → Why this matters. Patient story or real risk.   │
│                                                     │
│  📚 CONTENT (4-7 min)                              │
│  → 2-3 key points. Visuals. Examples.              │
│                                                     │
│  ⭐ KEY CALLOUT (30-60 sec)                        │
│  → The one thing to remember                       │
│                                                     │
│  🎯 SCENARIO / PRACTICE (30 sec)                   │
│  → Real-world application                          │
│                                                     │
│  ✅ RECAP (20 sec)                                 │
│  → Remind what they learned                        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Production Phases

#### Phase A: Scripting (Week per course)

**Deliverable:** Word doc or Google Doc

```markdown
# Lesson 1: What is HIPAA?

## HOOK (Read at 0:00-0:30)
"Every day, healthcare workers see private patient information. 
A diagnosis. A birth date. A phone number. Even ONE piece of this 
information can hurt a patient if it leaks. This is where HIPAA comes in."

## SLIDE 1: Title Slide
[Visual: Clock icon + "Protected Health Information" text]

## CONTENT SECTION 1: What Does HIPAA Do? (1:00-3:00)
[VOICEOVER]
"HIPAA protects patient privacy. It's a federal law that says:
- Patients own their health information
- Healthcare workers must keep it safe
- There are serious consequences for breaches"

[SLIDE 2: Three boxes]
- 🔒 Patients own their data
- 👥 Workers must protect it
- ⚠️ Breaches have consequences

[VOICEOVER continues]
"Since 1996, every hospital, doctor's office, and health worker 
has followed HIPAA rules. It's not optional."

## CONTENT SECTION 2: What is PHI? (3:00-5:30)
[SLIDE 3: Definition]
PHI = Protected Health Information
= Any health info + something that identifies a patient

[VOICEOVER]
"Let me give you examples of PHI..."

[SLIDE 4: Examples]
✅ YES, this is PHI:
- Patient name + diagnosis
- Patient date of birth + lab results
- Patient room number + medications

❌ NO, this is NOT PHI:
- Generic medical information (e.g., "Diabetes is common")
- Anonymous statistics ("50% of patients recover")

## KEY CALLOUT (5:30-6:00)
[SLIDE 5: Bold text on brand color]
"If you can identify the patient, it's PHI. When in doubt, treat it as PHI."

## SCENARIO / PRACTICE (6:00-6:30)
[VOICEOVER]
"Let's practice. You're at lunch and hear: 'The patient in Room 402 
has diabetes.' Is that PHI?"

[SLIDE 6: Question]
Is Room 402 + diabetes = PHI?
A) No, room numbers are public
B) Yes, this identifies the patient
C) Only if you say the patient's name

[VOICEOVER - after 5 sec pause]
"The answer is B. The room number is specific enough to identify 
someone at that facility. It's PHI."

## RECAP (6:30-7:00)
[SLIDE 7: Summary]
✓ HIPAA protects patient privacy
✓ PHI = health information + identifier
✓ When in doubt, protect it

[VOICEOVER]
"Remember: if you can figure out WHO the patient is, it's PHI. 
Next, we'll cover what happens when someone breaks these rules."
```

**Guidelines for Scripts:**
- Write as you SPEAK (casual, direct)
- Sentences short (10-15 words max)
- Avoid jargon; define if necessary
- Include [PAUSE] where you want silence
- Specify slide visual in [BRACKETS]

**Action:** Your mom writes script for Lesson 1 of Course 1. Share with me to review.

---

#### Phase B: Voiceover Recording (1-2 weeks)

**Option 1: Your Mom Records Herself (Free)**
- Use Audacity (free audio editor)
- USB microphone ($30-50, e.g., Blue Yeti)
- Record in a quiet room
- Re-record sections until it sounds natural
- Time investment: 2-3 hours per lesson

**Option 2: Professional Voiceover Artist ($100-300/lesson)**
- Use Voices.com, Fiverr, or local voice talent
- Provide script + reference audio (tone example)
- Takes 1 week turnaround
- Sounds polished, professional

**Option 3: AI Voiceover (Experimental, $0-50/lesson)**
- ElevenLabs (AI voices sound human)
- Google Text-to-Speech (free, basic)
- Descript (auto-subtitle + voice cloning)
- Fast but may feel robotic to some audiences

**Recommendation for Launch:** Start with Option 1 (Mom records herself). Learners care about CONTENT, not production quality. Upgrade to professional VO in Phase 2 if budget allows.

**Specs for Recording:**
- Format: MP3, 192kbps
- Sample rate: 44.1kHz
- Length: Matches slide show timing
- Include: Room tone at beginning/end (silence between segments)

---

#### Phase C: Slide Design (1 week per course)

**Tool:** Google Slides or PowerPoint (design system already provided in `colors_and_type.css`)

**Slide Template (Use as Starting Point):**
```
┌──────────────────────────────────────────┐
│  🏥 HIPAA BASICS                         │
│     Lesson 1: What is HIPAA?            │
├──────────────────────────────────────────┤
│                                          │
│  [Large visual: icons/photos]           │
│                                          │
│  Headline (Montserrat Bold, Navy)       │
│                                          │
│  • Bullet 1                             │
│  • Bullet 2                             │
│  • Bullet 3                             │
│                                          │
│        [Teal accent bar]                │
└──────────────────────────────────────────┘
```

**Design Rules:**
- Use the brand colors (Navy, Teal, Accent colors per room)
- Montserrat for headings, Inter for body
- Max 5 bullet points per slide
- One visual per slide (icons, not photos initially)
- Large text (24+ for titles, 18+ for body)
- Consistent layout across all slides in a course

**Where to Get Visuals:**
- Unsplash (free healthcare photos)
- Pexels (free stock photos)
- Icons: Phosphor icon set (already available)
- Custom: Illustrator or Midjourney (Phase 2)

---

#### Phase D: Video Integration (If Needed)

**Only for "Scenario" sections**, not every lesson.

**Example Scenario Video:**
- 30-60 seconds
- Real office/hospital setting
- Shows the wrong way + right way
- E.g., "Nurse A talks about patient in waiting room (WRONG). Nurse B uses private space (RIGHT)."

**How to Create:**
- Record on iPhone/Android (already high quality)
- Edit in iMovie or CapCut (both free)
- Upload to Vimeo Enterprise (HIPAA-compliant)
- Embed in lesson

---

#### Phase E: Quiz Design

**Question Types:**

1. **Scenario-Based (Best for healthcare)**
```
You overhear: "The patient in Bed 3 takes Metformin for diabetes."
Is this Protected Health Information (PHI)?

A) No, it's just a diagnosis
B) Yes, Bed 3 identifies the patient
C) Only if you know the patient's name
D) No, room/bed numbers are public

Correct Answer: B
Explanation: "Specific location (Bed 3) + health info = PHI. 
This data could identify the patient to someone at your facility."
```

2. **Definition-Based (Simpler)**
```
Which of these is NOT Protected Health Information?

A) Patient name + appointment time
B) Patient age + room number
C) Generic fact: "Diabetes affects 37 million Americans"
D) Patient ID + lab results

Correct Answer: C
```

3. **Matching (For relationships)**
```
Match each law with its purpose:

1. HIPAA          → A. Fines for privacy violations
2. HITECH Act     → B. General privacy rules
3. HITRUST CSF    → C. Combined security standard
```

4. **True/False (Quickest)**
```
True or False: You can share a patient's name + diagnosis 
if they don't tell you it's secret.

Answer: False
Explanation: "Privacy is protected by law, not by asking. 
You can only share with people involved in their care."
```

**Quiz Guidelines:**
- 3-5 questions per lesson (or 1 quiz at end of course)
- At least 50% scenario-based (realistic)
- Passing score: 70% (as specified in form)
- Explanations for every answer (learners learn from feedback)
- Include both easy + hard questions (70% easy, 30% challenging)

**Action:** Draft 3 questions for Lesson 1. Share for review.

---

## STEP 3: CONTENT CALENDAR

### Year 1 (2026-2027): Build 5 Core Courses

| Course | Lessons | Hours Work | Target Date |
|--------|---------|-----------|------------|
| Introduction to Healthcare | 3 | 20 | Aug 15, 2026 |
| HIPAA Fundamentals | 4 | 25 | Sep 15, 2026 |
| Patient Safety & Communication | 3 | 20 | Oct 15, 2026 |
| Compliance Essentials | 4 | 25 | Nov 15, 2026 |
| [TBD by Mom] | 3-4 | 20-25 | Dec 15, 2026 |
| **Total** | **17-18 lessons** | **~110 hours** | **Ready for Jan 2027 launch** |

**Who Does This Work?**
- Mom writes scripts + designs slides + records VO
- You can help with editing/uploading
- Outsource to freelancers if needed ($10-30/lesson for design help)

---

## STEP 4: QUALITY ASSURANCE

### Before Uploading Each Course

- [ ] Script reviewed for clarity (no jargon, reads naturally)
- [ ] Voiceover matches script timing (no cuts/overlaps)
- [ ] Slides are on-brand (colors, fonts, spacing)
- [ ] Visuals are accessible (alt text, high contrast)
- [ ] Quiz questions have correct answers verified
- [ ] Quiz explanations are helpful + don't repeat question
- [ ] Proofreading complete (no typos)
- [ ] Captions/transcripts added (accessibility)
- [ ] Mobile layout tested (all slides readable on phone)
- [ ] Timing tested (full lesson <15 mins, match pacing)

### Beta Testing (Before Launch)

**Recruit 5-10 testers from your target audience:**
- Healthcare student
- Nurse or clinician
- Patient advocate
- Non-technical person
- Someone with hearing impairment (test captions)

**Ask them:**
1. Was this clear? (Rate 1-5)
2. Did you learn something? What?
3. Was the pace too fast/slow?
4. Any confusing parts?
5. Would you recommend this to a colleague?

**Fix high-priority feedback before launch.**

---

## STEP 5: ACCESSIBILITY CHECKLIST

### Every Lesson Must Have

- ✅ **Captions:** Either auto-generated (YouTube auto-captions) or manual transcription
- ✅ **Transcript:** Full text of voiceover (downloadable or on-page)
- ✅ **Alt Text:** Every visual described for screen readers
- ✅ **Color Contrast:** Text on background passes WCAG AA (your brand colors do ✅)
- ✅ **Font Size:** 18pt minimum for body text
- ✅ **Simple Language:** Grade 8-10 reading level (readability tools: Hemingway Editor, Grammarly)

### Example Accessible Lesson
```
[Video Player with Captions]
└─ Captions: ON ✅
└─ Full Transcript (below):
   "HIPAA protects patient privacy. It's a federal law..."

[Image: Three boxes with icons]
Alt text: "Three principles: 
1) Patients own their data (padlock icon), 
2) Workers protect it (shield icon), 
3) Breaches have consequences (warning icon)"

[Text] "When in doubt, protect it." (Navy, 24pt Montserrat Bold)
└─ Contrast ratio: 14:1 ✅ (WCAG AAA, exceeds AA requirement)
```

---

## STEP 6: PLATFORM INTEGRATION

### Once Courses Are Ready

1. **Create in CMS (Admin Dashboard)**
   - Mom logs in → "New Course"
   - Uploads title, description, target audience
   - Adds lessons one by one
   - Uploads voiceover MP3 + slide PDFs
   - Creates quiz questions

2. **Learner Experience**
   - Learner sees course in Lobby
   - Clicks "Enter Room" → sees course details
   - Clicks "Start Lesson" → sees slides + plays voiceover
   - At lesson end → "Next Lesson" button
   - After all lessons → "Take Quiz"
   - Passes → "Certificate Generated"

---

## STEP 7: ONGOING UPDATES

### Year 2 (2027-2028): Enhance Existing + Add New

**Enhancement Ideas:**
- Scenario videos (30-60 sec clips showing right/wrong behavior)
- Interactive drag-and-drop activities (HIPAA matching game)
- Guest expert interviews (real clinician talking about why this matters)
- Learner discussions (community Q&A, moderated)
- Progress milestones ("You've completed 50% of the course!")

**New Courses:**
- Advanced topics (Year 2: More specialized training)
- Specialization paths (e.g., "HIPAA for Nurses" vs. "HIPAA for Admin Staff")

---

## DELIVERABLES CHECKLIST

### Before Launch (January 2027)

For each of the 5 courses:

- [ ] **Scripts:** 3-4 lessons, 1000-1500 words each, reviewed
- [ ] **Voiceovers:** MP3 files, clean audio, timed to script
- [ ] **Slides:** Google Slides or PowerPoint, on-brand, accessible
- [ ] **Quiz:** 3-5 questions per lesson with explanations
- [ ] **Transcripts:** Full text for accessibility
- [ ] **Captions:** YouTube auto-captions or manual SRT files
- [ ] **Images/Visuals:** Licensed or original, with alt text
- [ ] **QA Sign-off:** All checked off above

---

## RESOURCES FOR MOM

### Script Writing
- **Hemingway Editor** (hemingwayapp.com) — Check readability
- **Grammarly** (grammarly.com) — Grammar + clarity
- **Readable.com** — Reading level checker

### Voiceover
- **Audacity** (free audio editor)
- **Descript** (auto-captions + voice cloning)
- **ElevenLabs** (AI voiceover, sounds natural)

### Slide Design
- **Google Slides** (free, collaborative)
- **Canva** (easy templates, $15/month pro)
- **Figma** (professional design tool, free tier available)

### Video
- **iMovie** or **CapCut** (free video editors)
- **Vimeo** (HIPAA-compliant hosting)

### Stock Photos/Icons
- **Unsplash** (free healthcare photos)
- **Pexels** (free stock photos)
- **Phosphor Icons** (you already have)

### Accessibility Tools
- **WAVE** (WebAIM accessibility checker)
- **Contrast Checker** (webaim.org/resources/contrastchecker)
- **VoiceOver** (built into Mac) — test screen reader

---

## NEXT STEPS

1. **This Week:** Mom decides on 5 initial courses (titles + learning goals)
2. **Next Week:** Mom writes script for first lesson (500-700 words)
3. **Weeks 2-4:** Record voiceover + design slides for first course
4. **Weeks 4-8:** Repeat for courses 2-5 in parallel
5. **Weeks 8-10:** Beta testing + revisions
6. **Weeks 10-12:** Final QA + upload to platform (once platform is built)

---

**Document Version:** 1.0  
**Status:** READY FOR CONTENT PLANNING
