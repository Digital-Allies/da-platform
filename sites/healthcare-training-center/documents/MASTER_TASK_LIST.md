# Healthcare Training Center — Master Task List

**Status:** Tracking document for January 2027 MVP launch  
**Timeline:** June 2026 - January 2027  
**Last Updated:** June 5, 2026

---

## HOW TO USE THIS LIST

1. **Copy this file** into your project management tool (Notion, Asana, Linear, etc.)
2. **Check off tasks** as you complete them
3. **Update timelines** based on actual progress
4. **Add blockers** (note if something is waiting on someone/something)
5. **Refer to documents** (Technical Requirements, Compliance Roadmap, Content Framework)

**Format:**
```
- [ ] TASK NAME (Owner: [WHO]) [DEADLINE]
      └─ Blockers: [IF ANY]
      └─ Reference: [WHICH DOCUMENT]
```

---

## PHASE 0: STRATEGY & PLANNING (June 2026)

**Duration:** Weeks 1-4 | **Owner:** Mostly Mom + You

### Week 1: Foundation

- [ ] **Confirm all discovery form answers with Mom** (Owner: You) [June 5]
- [ ] **Create GitHub repo** (Owner: You) [June 6]
      └─ Private, no sensitive data committed
      └─ Add README with project overview
- [ ] **Set up project management tool** (Owner: You) [June 6]
      └─ Notion, Asana, or Linear
      └─ Share access with anyone collaborating
- [ ] **Read & approve Technical Requirements doc** (Owner: Mom) [June 8]
      └─ Reference: TECHNICAL_REQUIREMENTS.md
- [ ] **Read & approve Compliance Roadmap** (Owner: Mom) [June 8]
      └─ Reference: COMPLIANCE_ROADMAP.md
- [ ] **Schedule 30-min alignment call** (Owner: You + Mom) [June 7]
      └─ Confirm: timeline, budget, team structure

### Week 2: Content Strategy

- [ ] **Mom creates list of 5 initial courses** (Owner: Mom) [June 14]
      └─ For each: title, learning goal, why it matters, audience, lesson count
      └─ Reference: CONTENT_CREATION_FRAMEWORK.md, Section 1
- [ ] **Mom drafts course outline for Course 1** (Owner: Mom) [June 14]
      └─ 3-4 lessons with titles + learning objectives
- [ ] **Create content calendar** (Owner: Mom + You) [June 15]
      └─ When each course script/recording/design starts + finishes
      └─ Reference: CONTENT_CREATION_FRAMEWORK.md, Section 3

### Week 3: Legal & Compliance Setup

- [ ] **Contact lawyer** (Owner: You or Mom) [June 17]
      └─ Cost estimate: $2-5k
      └─ Scope: Review BAA, draft privacy policy, draft ToS
      └─ Reference: COMPLIANCE_ROADMAP.md, "PHASE 1: MVP LAUNCH"
- [ ] **Create Supabase account** (Owner: You) [June 17]
      └─ Will be used in Phase 1
      └─ Don't set up database yet (wait for developer)
- [ ] **Create Stripe account (test)** (Owner: You) [June 17]
      └─ For payment flow testing
- [ ] **Create Vimeo account (test)** (Owner: You) [June 17]
      └─ For video hosting testing

### Week 4: Security & Infrastructure Planning

- [ ] **Draft incident response plan** (Owner: Mom) [June 24]
      └─ 1-2 pages: what to do if data is breached
      └─ Reference: COMPLIANCE_ROADMAP.md, "Breach Notification Plan"
- [ ] **Draft data retention policy** (Owner: Mom) [June 24]
      └─ How long to keep course completions, quiz scores, audit logs
      └─ Standard: 7 years for healthcare data
- [ ] **Create security checklist** (Owner: You) [June 24]
      └─ Reference: COMPLIANCE_ROADMAP.md, "Before Launch"

---

## PHASE 1: MVP BUILD (July - November 2026)

**Duration:** 20 weeks | **Owner:** You (developer) + support from Mom (content)

### Infrastructure Setup (Weeks 5-8)

- [ ] **Set up Supabase production project** (Owner: You - Developer) [July 1]
      └─ Enable HIPAA BAA
      └─ Choose US data center (for HIPAA)
      └─ Set up staging + production databases
      └─ Reference: TECHNICAL_REQUIREMENTS.md, Section 6
- [ ] **Create database schema** (Owner: You - Developer) [July 8]
      └─ Users, courses, lessons, quizzes, progress, certificates, audit logs
      └─ Enable row-level security (RLS) policies
      └─ Reference: TECHNICAL_REQUIREMENTS.md, Section 3
- [ ] **Set up GitHub CI/CD pipeline** (Owner: You - Developer) [July 8]
      └─ Automated tests on every push
      └─ Auto-deploy to staging
      └─ Reference: TECHNICAL_REQUIREMENTS.md, Section 7
- [ ] **Configure environment variables** (Owner: You - Developer) [July 10]
      └─ Supabase keys, Stripe keys, Vimeo keys
      └─ Store in .env (never commit to git)
- [ ] **Set up monitoring tools** (Owner: You - Developer) [July 10]
      └─ Sentry for error tracking
      └─ Supabase logging enabled
      └─ Reference: TECHNICAL_REQUIREMENTS.md, Section 6
- [ ] **Verify database backups** (Owner: You - Developer) [July 15]
      └─ Test restore process (restore backup to confirm it works)
      └─ Set automatic daily backups

### Frontend Foundation (Weeks 6-9)

- [ ] **Initialize React + Vite project** (Owner: You - Developer) [July 8]
      └─ Tailwind CSS configured
      └─ Design system tokens imported (colors, fonts, spacing)
      └─ Motion.dev animations set up
      └─ Reference: TECHNICAL_REQUIREMENTS.md, Section 2
- [ ] **Build design system components** (Owner: You - Developer) [July 22]
      └─ Buttons, cards, progress bars, badges, forms
      └─ Test on desktop + mobile + tablet
      └─ Reference: Design handoff files
- [ ] **Implement auth UI** (Owner: You - Developer) [July 29]
      └─ Sign up page (email + password)
      └─ Login page
      └─ Password reset flow
      └─ Connected to Supabase auth
- [ ] **Implement main navigation** (Owner: You - Developer) [Aug 5]
      └─ Top nav (logo, links, user menu)
      └─ Mobile bottom nav (≤720px)
      └─ Routing between lobby, rooms, lessons
- [ ] **Build learner lobby screen** (Owner: You - Developer) [Aug 12]
      └─ Isometric hero image + hotspots
      └─ Room cards with progress
      └─ Store view toggle (store vs. list)
      └─ Reference: Existing design in project/

### Authentication & Security (Weeks 7-10)

- [ ] **Connect Supabase Auth** (Owner: You - Developer) [July 22]
      └─ Email/password sign up
      └─ Email verification (confirmation email)
      └─ Login + session management
      └─ Logout
- [ ] **Implement role-based access** (Owner: You - Developer) [July 29]
      └─ Learner role (restricted access)
      └─ Admin role (full access)
      └─ Roles assigned in Supabase via admin dashboard
- [ ] **Add MFA for admins** (Owner: You - Developer) [Aug 5]
      └─ Email-based MFA (optional for Phase 1, required Phase 1.5)
      └─ TOTP app support (Google Authenticator, Authy)
      └─ Reference: TECHNICAL_REQUIREMENTS.md, Section 5
- [ ] **Implement session management** (Owner: You - Developer) [Aug 5]
      └─ Auto-logout after 30 min inactivity
      └─ Refresh token rotation
- [ ] **Enable audit logging** (Owner: You - Developer) [Aug 12]
      └─ Log all logins, course starts, quiz attempts, admin actions
      └─ Immutable audit table
      └─ Reference: TECHNICAL_REQUIREMENTS.md, Section 3 (audit_logs table)

### Content & Course System (Weeks 8-16)

- [ ] **Build course list & detail pages** (Owner: You - Developer) [Aug 19]
      └─ Display available courses
      └─ Show progress (if started)
      └─ "Enter Room" button
- [ ] **Build lesson player** (Owner: You - Developer) [Aug 26]
      └─ Voiceover playback
      └─ Slide display (from uploaded PDF/images)
      └─ Progress tracking (which lessons completed)
      └─ Navigation (previous/next lesson)
      └─ Notes panel (learner can jot down notes)
- [ ] **Build admin course upload system** (Owner: You - Developer) [Sep 2]
      └─ Admin can create new course
      └─ Add lessons (title, voiceover file, slide PDFs)
      └─ Publish/unpublish courses
      └─ Edit existing courses
      └─ (Content management system, MVP version)
- [ ] **Integrate video hosting** (Owner: You - Developer) [Sep 9]
      └─ Upload to Vimeo + get embed URLs
      └─ Serve videos securely (HIPAA-compliant)
      └─ Test playback on mobile/desktop
      └─ Reference: TECHNICAL_REQUIREMENTS.md, Section 2 (Video Hosting)

### Quiz & Assessment System (Weeks 10-15)

- [ ] **Build quiz UI** (Owner: You - Developer) [Sep 16]
      └─ Radio button multiple choice
      └─ Question numbering (Q1, Q2, etc.)
      └─ Progress indicator (3 of 5 answered)
      └─ Submit button (greyed out until all answered)
- [ ] **Implement quiz logic** (Owner: You - Developer) [Sep 23]
      └─ Store learner answers
      └─ Calculate score (e.g., 3 out of 5 correct = 60%)
      └─ Determine pass/fail (≥70% pass)
      └─ Reference: TECHNICAL_REQUIREMENTS.md, Section 3 (quizzes table)
- [ ] **Build results screen** (Owner: You - Developer) [Sep 23]
      └─ Show score (e.g., "75%")
      └─ Pass/fail message
      └─ Per-question feedback (why the answer was right/wrong)
      └─ "Mark Complete" button (if passed)
- [ ] **Create admin quiz builder** (Owner: You - Developer) [Sep 30]
      └─ Admin can add questions to a lesson
      └─ Upload multiple choice options + correct answer
      └─ Set passing score (default 70%)
      └─ Preview quiz before publishing

### Certificate System (Weeks 14-18)

- [ ] **Design certificate template** (Owner: Mom or You - Designer) [Oct 7]
      └─ Learner name, course title, date issued, verification code
      └─ Brand design (logos, colors)
      └─ Room-specific accents (CS course = blue cert, HIPAA = teal, etc.)
- [ ] **Build certificate generation** (Owner: You - Developer) [Oct 14]
      └─ Create PDF on quiz pass
      └─ Include: learner name, course, date, verification code
      └─ Store in database + Supabase storage
      └─ Make downloadable
      └─ Reference: TECHNICAL_REQUIREMENTS.md, Section 2 (Certificate Generation)
- [ ] **Create certificate verification endpoint** (Owner: You - Developer) [Oct 21]
      └─ Public page: verify/:verification_code
      └─ Shows: learner name, course, date issued
      └─ Prevents forgery (each cert has unique code)
- [ ] **Admin can revoke certificates** (Owner: You - Developer) [Oct 28]
      └─ Admin marks cert as revoked
      └─ Verification fails if revoked

### Progress Tracking (Weeks 12-17)

- [ ] **Build learner progress dashboard** (Owner: You - Developer) [Oct 5]
      └─ Show all courses
      └─ Progress bar per course (% complete)
      └─ Lessons completed (visual check marks)
      └─ Quiz scores
      └─ Certificates (download button)
- [ ] **Build admin progress dashboard** (Owner: You - Developer) [Oct 12]
      └─ List all learners
      └─ Click learner → see their courses + progress
      └─ Export progress report (CSV)
      └─ Filter by course/completion status
      └─ Reference: TECHNICAL_REQUIREMENTS.md, Section 4 (Admin Endpoints)
- [ ] **Implement progress API** (Owner: You - Developer) [Oct 19]
      └─ Track lesson start/completion
      └─ Track quiz attempts + scores
      └─ Update course progress % automatically
      └─ Persist to Supabase
- [ ] **Build analytics dashboard** (Owner: You - Developer) [Oct 26]
      └─ Course completion rate (%)
      └─ Average quiz score
      └─ Most popular course
      └─ Least popular course

### Payment Integration (Weeks 15-19)

- [ ] **Set up Stripe account (production)** (Owner: You or Mom) [Oct 7]
      └─ Create subscription plans (Individual, Organization, Enterprise)
      └─ Set pricing ($10-100/month, Mom's decision)
      └─ Get live API keys
- [ ] **Build subscription plans table** (Owner: You - Developer) [Oct 14]
      └─ Supabase table with plan names, prices, features
      └─ Reference: TECHNICAL_REQUIREMENTS.md, Section 3 (subscription_plans table)
- [ ] **Build payment checkout flow** (Owner: You - Developer) [Oct 21]
      └─ Show available plans
      └─ Redirect to Stripe Checkout
      └─ Confirm subscription after payment
      └─ Create subscription record in database
- [ ] **Handle Stripe webhooks** (Owner: You - Developer) [Oct 28]
      └─ Listen for subscription.created, subscription.updated, invoice.paid, etc.
      └─ Update subscription status in database
      └─ Handle failed payments
- [ ] **Build billing dashboard** (Owner: You - Developer) [Nov 4]
      └─ Show active subscription
      └─ Invoice history
      └─ Cancel subscription button
      └─ Update payment method link

### Animations & UX (Weeks 16-20)

- [ ] **Implement Motion.dev animations** (Owner: You - Developer) [Nov 4]
      └─ Room entry fade/slide (150ms)
      └─ Course card hover effects
      └─ Quiz option selection (color change + checkmark)
      └─ Progress bar fill animation (spring ease)
      └─ Toast notification (slide up)
      └─ Reference: TECHNICAL_REQUIREMENTS.md, Section 2 (Motion.dev)
- [ ] **Test prefers-reduced-motion** (Owner: You - Developer) [Nov 11]
      └─ Disable animations if user has motion preference
      └─ Reference: Design requirements
- [ ] **Polish mobile experience** (Owner: You - Developer) [Nov 11]
      └─ Test on iPhone, Android, iPad
      └─ Bottom nav shows on mobile (≤720px)
      └─ Buttons large enough to tap (48px min)
      └─ Text readable (16px min)

### Content Upload (Weeks 17-20)

- [ ] **Mom writes scripts for Course 1 (3-4 lessons)** (Owner: Mom) [Aug 20]
      └─ Reference: CONTENT_CREATION_FRAMEWORK.md, Section 2
- [ ] **Mom records voiceover for Course 1** (Owner: Mom) [Sep 10]
- [ ] **Mom designs slides for Course 1** (Owner: Mom) [Sep 20]
- [ ] **Create quiz questions for Course 1** (Owner: Mom + You) [Sep 25]
- [ ] **Beta test Course 1** (Owner: Mom + 5 testers) [Oct 5]
      └─ Gather feedback on clarity, pacing, usefulness
      └─ Fix any issues
      └─ Reference: CONTENT_CREATION_FRAMEWORK.md, Section 4
- [ ] **Upload Course 1 to platform** (Owner: You - Developer) [Oct 15]
      └─ Add course to admin panel
      └─ Upload lessons + voiceovers + slides
      └─ Publish course (learners can now see)
- [ ] **Repeat Courses 2-5** (Owner: Mom + You) [Nov 30]
      └─ Same workflow as Course 1
      └─ Run in parallel to save time
      └─ Target: 5 courses live by Nov 30

---

## PHASE 2: TESTING & SECURITY (December 2026)

**Duration:** 4 weeks | **Owner:** You + external security consultant (optional)

### Quality Assurance (Weeks 21-24)

- [ ] **Full end-to-end testing** (Owner: You + Mom) [Dec 3]
      └─ Sign up → login → browse courses → start lesson → take quiz → get certificate
      └─ Try on desktop, tablet, mobile
      └─ Test with screen reader (accessibility)
      └─ Reference: TECHNICAL_REQUIREMENTS.md, Section 8
- [ ] **Test learner isolation** (Owner: You) [Dec 10]
      └─ Learner A logs in, can't see Learner B's progress
      └─ Admin can see all learners' progress
      └─ Reference: TECHNICAL_REQUIREMENTS.md, Section 5
- [ ] **Test authentication flows** (Owner: You) [Dec 10]
      └─ Sign up works
      └─ Email verification required
      └─ Login works
      └─ Password reset works
      └─ Logout clears session
- [ ] **Test payment flow** (Owner: You) [Dec 10]
      └─ Sign up → choose plan → Stripe checkout → confirm subscription → access courses
      └─ Cancel subscription → access removed
      └─ Try failed payment → error handled gracefully
- [ ] **Load testing** (Owner: You - Developer) [Dec 17]
      └─ Can 100 concurrent learners use the platform?
      └─ API response time <200ms?
      └─ Database handles queries efficiently?
- [ ] **Browser compatibility** (Owner: You) [Dec 17]
      └─ Chrome, Firefox, Safari, Edge
      └─ Mobile: iOS Safari, Android Chrome
      └─ Test all critical paths

### Security Review (Weeks 21-24)

- [ ] **Internal security audit** (Owner: You) [Dec 3]
      └─ Review all checklist items
      └─ Reference: COMPLIANCE_ROADMAP.md, "Before Launch"
- [ ] **Code security review** (Owner: You - Developer) [Dec 10]
      └─ No hardcoded secrets
      └─ API keys only in env variables
      └─ Stripe key never exposed to frontend
      └─ CORS restricted to your domain
      └─ No SQL injection vulnerabilities
- [ ] **Penetration testing** (Owner: External firm, optional) [Dec 17]
      └─ Cost: $5-10k
      └─ Try to break into system
      └─ Attempt to access other learners' data
      └─ Fix any critical issues found
- [ ] **Audit log verification** (Owner: You) [Dec 24]
      └─ Confirm all actions are logged
      └─ Logs are immutable (can't be deleted)
      └─ Run queries to verify data is captured
- [ ] **Backup & recovery test** (Owner: You - Developer) [Dec 24]
      └─ Restore from backup
      └─ Confirm all data intact
      └─ Document recovery process

### Legal & Compliance Final Review (Weeks 22-24)

- [ ] **Lawyer final review** (Owner: Mom + Lawyer) [Dec 10]
      └─ Privacy policy finalized
      └─ Terms of service finalized
      └─ Business Associate Agreement (Supabase) signed
      └─ Any other legal docs needed
- [ ] **Document security controls** (Owner: You) [Dec 17]
      └─ List all encryption, access controls, audit logging
      └─ Create "Security Posture" document for B2B customers
      └─ Reference: COMPLIANCE_ROADMAP.md, "Phase 1: MVP Launch"
- [ ] **Finalize incident response plan** (Owner: Mom) [Dec 17]
      └─ Who to contact if breached?
      └─ How to notify users?
      └─ Finalize breach notification letter template
- [ ] **Employee confidentiality agreements** (Owner: Mom) [Dec 24]
      └─ If hiring anyone, have them sign NDA

---

## PHASE 3: SOFT LAUNCH & GO-LIVE (January 2027)

**Duration:** 2 weeks | **Owner:** You + Mom

### Pre-Launch (Weeks 25-26)

- [ ] **Create marketing materials** (Owner: Mom or Marketing) [Jan 1]
      └─ Landing page
      └─ Course descriptions
      └─ Pricing page
      └─ Email for launch announcement
- [ ] **Set up customer support** (Owner: Mom) [Jan 1]
      └─ Help email address (helpdesk@yourcompany.com)
      └─ FAQ page
      └─ Support ticket system (Zendesk, Freshdesk, or email)
- [ ] **Soft launch to beta users** (Owner: You + Mom) [Jan 1]
      └─ Invite 10-20 test users (friends, colleagues)
      └─ Collect feedback
      └─ Monitor for crashes/errors
      └─ Fix any issues
- [ ] **Monitor system during soft launch** (Owner: You) [Jan 1-7]
      └─ Check Sentry for errors
      └─ Monitor database performance
      └─ Check Supabase logs
      └─ Monitor Stripe transactions
- [ ] **Fix critical issues** (Owner: You) [Jan 7]
      └─ Any bugs found during soft launch

### Public Launch (Week 27)

- [ ] **Go live** (Owner: You + Mom) [Jan 8]
      └─ Switch from soft launch to public
      └─ Announce to customers
      └─ Monitor closely for issues
- [ ] **Monitor first week of live usage** (Owner: You) [Jan 8-14]
      └─ Be on standby for critical issues
      └─ Check system health hourly
      └─ Respond to customer support emails quickly
- [ ] **Document launch report** (Owner: You) [Jan 15]
      └─ What went well
      └─ What needs improvement (for Phase 1.5)
      └─ Lessons learned

---

## PHASE 1.5: POST-LAUNCH QUICK WINS (January - March 2027)

**Duration:** 12 weeks | **Owner:** You + Mom (lower priority than Phase 1)

These are important but not blockers for launch:

### Quick Improvements (Weeks 27-39)

- [ ] **Add MFA requirement for admins** (Owner: You) [Jan 22]
      └─ Make MFA mandatory (was optional in MVP)
- [ ] **Improve admin dashboard** (Owner: You) [Feb 5]
      └─ Add more reporting features
      └─ Add course analytics (which lessons most watched?)
      └─ Add learner search/filter
- [ ] **Add password strength requirements** (Owner: You) [Feb 12]
      └─ Minimum 12 characters, uppercase, lowercase, number, symbol
- [ ] **Implement "forgot password" email** (Owner: You) [Feb 19]
      └─ Currently only works via Supabase auth UI
      └─ Make it prettier + branded
- [ ] **Add learner profile page** (Owner: You) [Feb 26]
      └─ Edit display name
      └─ Change password
      └─ Download all certificates
- [ ] **Create admin API keys** (Owner: You) [Mar 5]
      └─ Allow integrations with third-party systems
      └─ E.g., pull progress data into HR system
- [ ] **Add course search** (Owner: You) [Mar 12]
      └─ Learner can search by keyword
      └─ Based on course title + description
- [ ] **Create help desk chatbot** (Owner: You) [Mar 19]
      └─ Answer common questions (FAQ bot)
      └─ Route to human if needed
- [ ] **Add content recommendations** (Owner: You) [Mar 26]
      └─ "Based on your interests, try this course..."

---

## PHASE 2: POST-LAUNCH ENHANCEMENTS (April 2027+)

**Duration:** Ongoing | **Owner:** You + Mom (lower priority)

These are nice-to-have features that don't block launch:

### Content Enhancements

- [ ] **Add scenario videos** (Owner: Mom + Videographer) [Apr-May]
      └─ 30-60 sec clips showing right/wrong behavior
      └─ Professional production
- [ ] **Add interactive activities** (Owner: You) [May-Jun]
      └─ Drag-and-drop matching (e.g., term ↔ definition)
      └─ Fill-in-the-blank questions
      └─ Interactive simulations
- [ ] **Add guest expert interviews** (Owner: Mom) [Jun]
      └─ Real clinician/expert discussing topic
      └─ Q&A format
- [ ] **Expand course catalog** (Owner: Mom) [Ongoing]
      └─ Add 5+ new courses

### Platform Enhancements

- [ ] **Learner discussion forums** (Owner: You) [Apr-May]
      └─ Learners discuss course topics
      └─ Moderated by admins
      └─ Mom can answer questions
- [ ] **Certificates with signatures** (Owner: You) [May]
      └─ Digital signatures (prevents forgery)
      └─ QR code verification (scan to verify)
- [ ] **CEU/CPE/CME integration** (Owner: You + Mom) [Jun-Aug]
      └─ Partner with accreditation bodies
      └─ Learners can claim credits
- [ ] **Native mobile apps** (Owner: You) [Sep-Dec]
      └─ iOS + Android apps
      └─ Offline access to downloaded lessons
- [ ] **Advanced reporting** (Owner: You) [Sep]
      └─ Cohort analytics (group progress)
      └─ Skills gap analysis (which topics need improvement?)
      └─ Predictive analytics (which learners will churn?)

### Compliance & Security Enhancements

- [ ] **HITRUST CSF certification** (Owner: External auditor) [Jul-Dec]
      └─ External audit of security controls
      └─ Fix any gaps
      └─ Get certified
      └─ Reference: COMPLIANCE_ROADMAP.md, "HITRUST CSF Roadmap"
- [ ] **ISO 27001 certification** (Owner: External auditor) [Jan-Dec 2028]
      └─ Full information security management system
      └─ External audit
      └─ Get certified
- [ ] **SOC 2 Type II audit** (Owner: External auditor) [Jan-Dec 2028]
      └─ Report on security, availability, processing integrity
      └─ Reassures enterprise customers

---

## EXTERNAL DEPENDENCIES

### Services That Must Be Set Up (Before Development Starts)

| Service | Owner | Deadline | Cost | Reference |
|---------|-------|----------|------|-----------|
| Supabase Account | You | June 17 | $500-1000/mo | TECHNICAL_REQUIREMENTS.md, Section 6 |
| GitHub Repo | You | June 6 | Free | TECHNICAL_REQUIREMENTS.md, Section 7 |
| Stripe Account | You | June 17 | 2.2% + $0.30 per transaction | TECHNICAL_REQUIREMENTS.md, Section 2 |
| Vimeo Account | You | June 17 | $75-300/mo | TECHNICAL_REQUIREMENTS.md, Section 2 |
| Sentry Account | You | July 10 | $29/mo | TECHNICAL_REQUIREMENTS.md, Section 6 |
| Lawyer Consultation | Mom | June 17 | $2-5k (one-time) | COMPLIANCE_ROADMAP.md, "PHASE 1" |

### Key Dates (Immovable Deadlines)

| Milestone | Date | Why |
|-----------|------|-----|
| Content scripts ready for Course 1 | Aug 20 | Need time to record + design |
| Courses 1-5 fully uploaded | Nov 30 | Need to test before launch |
| Security audit complete | Dec 24 | Need to fix issues before launch |
| Soft launch to beta users | Jan 1 | Final checks before public launch |
| **Public launch** | **Jan 8, 2027** | **FIRM DEADLINE** |

---

## HOW TO TRACK PROGRESS

### Weekly Status Check

Every Friday, update:

1. **What's done this week?** (Check off tasks above)
2. **What's on track?** (% complete)
3. **What's blocked?** (waiting on what/who?)
4. **Risk for launch?** (anything that could delay?)

### Sample Status Update

```
Week of June 10, 2026:

✅ DONE:
- GitHub repo created
- Supabase account set up
- Discovery form reviewed

🟡 IN PROGRESS:
- Lawyer review (ETA: Jun 20)
- Mom drafting course list (50% done)

🔴 BLOCKED:
- Database schema awaiting developer confirmation on table design

⚠️ RISKS:
- Lawyer review might take longer if more docs needed
- No developer hired yet (CRITICAL)
```

---

## TEAM STRUCTURE

### Roles Needed

| Role | Responsibility | Who? | Hours/Week |
|------|---|---|---|
| **CEO/Product** | Strategy, content, business | Mom | 20-30 hrs/week |
| **Developer** | Code entire platform | You or hire | 40+ hrs/week |
| **Content Creator** | Write scripts, record VO, design slides | Mom | 15-20 hrs/week |
| **Designer** (optional) | Visual design for slides | Freelancer or Mom | 10-15 hrs/week |
| **QA/Tester** | Test before launch | You or hire | 10 hrs/week (Dec) |
| **Lawyer** | Legal review | External firm | As needed |
| **Security Consultant** (optional) | Penetration testing | External firm | As needed (Dec) |

---

## BUDGET TRACKING

### Estimated Costs (2026-2027)

| Category | Estimated | Deadline |
|----------|-----------|----------|
| **Development** | $20-40k (if outsourced) or your time | Ongoing |
| **Infrastructure** | $6k/year (Supabase, Vimeo, etc.) | June onwards |
| **Legal** | $2-5k (lawyer review) | June |
| **Security** | $5-10k (penetration test) | December |
| **Compliance** | $15-25k (HITRUST, Phase 2) | Phase 2 |
| **Content** | $2-5k (voiceover, design) | July-November |
| **Miscellaneous** | $2-3k (tools, licenses, etc.) | Ongoing |
| **TOTAL (Year 1)** | **~$50-90k** | |

---

## DOCUMENT REFERENCES

When working through this task list, refer to:

1. **TECHNICAL_REQUIREMENTS.md** — Detailed tech stack, database schema, API endpoints
2. **COMPLIANCE_ROADMAP.md** — Security requirements, compliance checklist, certifications
3. **CONTENT_CREATION_FRAMEWORK.md** — How to create courses, scripts, video production

---

## LAST UPDATED

- **June 5, 2026** — Initial creation

## NEXT REVIEW

- **June 12, 2026** — Week 1 checkpoint

---

**Ready to get started? Pick Week 1 tasks above and mark your first completion by June 12. Good luck! 🚀**
