# Healthcare Training Center — Technical Requirements Document

**Project:** Regulated Healthcare Credential Training Platform  
**Client:** Healthcare Training Center (Mom's Business)  
**Timeline:** MVP by January 1, 2027 (~7 months)  
**Access Model:** Paid Subscription / B2B  
**Target Audience:** Healthcare students, employees, patient advocates, patients (Tech comfort 1/10 = accessibility critical)

---

## 1. SYSTEM OVERVIEW

### What We're Building
A compliance-heavy, multi-user healthcare training platform where:
- Learners take courses → pass quizzes (≥70% to proceed) → earn certificates
- Admins manage courses, track progress, generate reports
- System encrypts sensitive health data, logs all access (HIPAA audit trail)
- Payments processed securely (Stripe B2B billing)
- Video content delivered via HIPAA-compliant streaming

### Not What We're Building
- Social features, gamification, leaderboards (compliance risk)
- Mobile apps initially (Phase 2)
- Real-time collaboration (Phase 2)
- AI tutoring systems (Phase 2)

---

## 2. TECHNICAL STACK RECOMMENDATION

### Frontend
- **React 18** + **Vite** (fast dev, easy to maintain)
- **TypeScript** (type safety for healthcare data handling)
- **Tailwind CSS** (brand design system already defined)
- **Motion.dev** (animations for transitions/hover)
- **React Router v6** (navigation)
- **TanStack Query** (data fetching/caching)
- **Zod** (runtime validation for form inputs)

### Backend
- **Option A (Recommended for your timeline): Supabase**
  - PostgreSQL database with row-level security (RLS)
  - Built-in auth (email, MFA support)
  - Real-time subscriptions
  - Vector search (for future content search)
  - HIPAA BAA available (Business Associate Agreement)
  - ~$500-2000/month for production tier

- **Option B (If you want more control): Node.js + Express + PostgreSQL**
  - More work but full ownership
  - Self-hosted or AWS RDS
  - Requires extra security configuration
  - Timeline impact: +2-3 months

**→ Recommend Supabase for your 7-month timeline.**

### Database
- **PostgreSQL** (Supabase-managed or self-hosted)
- Row-Level Security (RLS) for learner data isolation
- Encrypted sensitive columns (passwords, SSN if tracking)
- Audit trigger logs on all tables
- Full-text search indexes for content

### Video Hosting
- **Vimeo Enterprise** (HIPAA-compliant, streaming stats)
  - ~$75-300/month depending on storage/bandwidth
  - Embedded players with access controls
- **Alternative: AWS MediaConvert + S3** (more complex, full control)

### Payment Processing
- **Stripe** (PCI-DSS compliant, B2B billing, invoicing)
- Webhook handlers for subscription events
- Billing portal for customers

### Hosting
- **Vercel** for frontend (global CDN, fast deployments)
- **Supabase Cloud** for backend (managed PostgreSQL + auth)
- **Vimeo** for video (handled separately)
- **Stripe** for payments (handled separately)

### Certificate Generation
- **PDFKit** (Node.js) or **jsPDF** (browser-side)
- Digital signature support (optional, Phase 2)
- QR code for verification (optional, Phase 2)

---

## 3. DATABASE SCHEMA (Detailed)

### Users & Authentication
```sql
-- Supabase auth_users (managed by Supabase)
-- Extended user profile
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  role TEXT CHECK (role IN ('admin', 'learner', 'manager', 'auditor')),
  tech_comfort_level INT (1-10 from form),
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

-- Role-based access control
CREATE TABLE user_roles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  role TEXT,
  granted_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Courses & Content
```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content_status TEXT CHECK (content_status IN ('draft', 'published', 'archived')),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  is_published BOOLEAN DEFAULT FALSE
);

CREATE TABLE lessons (
  id UUID PRIMARY KEY,
  course_id UUID REFERENCES courses(id),
  title TEXT NOT NULL,
  lesson_order INT,
  video_url TEXT, -- Vimeo embed or AWS S3 signed URL
  transcript TEXT, -- For accessibility
  duration_minutes INT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE content_blocks (
  id UUID PRIMARY KEY,
  lesson_id UUID REFERENCES lessons(id),
  block_type TEXT CHECK (block_type IN ('text', 'image', 'callout', 'quote', 'list')),
  content TEXT,
  block_order INT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Quizzes & Assessments
```sql
CREATE TABLE quizzes (
  id UUID PRIMARY KEY,
  lesson_id UUID REFERENCES lessons(id),
  passing_score INT DEFAULT 70,
  attempts_allowed INT DEFAULT 3,
  time_limit_minutes INT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE quiz_questions (
  id UUID PRIMARY KEY,
  quiz_id UUID REFERENCES quizzes(id),
  question_text TEXT NOT NULL,
  question_type TEXT CHECK (question_type IN ('multiple_choice', 'true_false', 'short_answer')),
  question_order INT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE quiz_options (
  id UUID PRIMARY KEY,
  question_id UUID REFERENCES quiz_questions(id),
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT FALSE,
  option_order INT
);

CREATE TABLE quiz_responses (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  quiz_id UUID REFERENCES quizzes(id),
  attempted_at TIMESTAMP DEFAULT NOW(),
  score INT,
  passed BOOLEAN,
  time_spent_minutes INT
);

CREATE TABLE question_responses (
  id UUID PRIMARY KEY,
  quiz_response_id UUID REFERENCES quiz_responses(id),
  question_id UUID REFERENCES quiz_questions(id),
  user_answer TEXT,
  is_correct BOOLEAN
);
```

### Progress & Certificates
```sql
CREATE TABLE course_progress (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  course_id UUID REFERENCES courses(id),
  started_at TIMESTAMP DEFAULT NOW(),
  last_accessed_at TIMESTAMP,
  completion_percentage INT DEFAULT 0,
  completed_at TIMESTAMP,
  UNIQUE(user_id, course_id)
);

CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  lesson_id UUID REFERENCES lessons(id),
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  UNIQUE(user_id, lesson_id)
);

CREATE TABLE certificates (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  course_id UUID REFERENCES courses(id),
  issued_at TIMESTAMP DEFAULT NOW(),
  pdf_url TEXT,
  verification_code TEXT UNIQUE, -- For verification endpoint
  is_revoked BOOLEAN DEFAULT FALSE,
  revoked_at TIMESTAMP
);
```

### HIPAA Compliance & Auditing
```sql
-- Audit log: every action logged
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  action TEXT NOT NULL, -- 'CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'DOWNLOAD'
  table_name TEXT,
  record_id UUID,
  old_values JSONB, -- Previous state
  new_values JSONB, -- New state
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Data retention policy
CREATE TABLE data_retention_policies (
  id UUID PRIMARY KEY,
  data_type TEXT, -- 'course_completion', 'quiz_results', 'audit_logs'
  retention_years INT DEFAULT 7,
  deletion_schedule TEXT, -- 'automatic' or 'manual'
  created_at TIMESTAMP DEFAULT NOW()
);

-- Breach notification log
CREATE TABLE breach_incidents (
  id UUID PRIMARY KEY,
  detected_at TIMESTAMP,
  description TEXT,
  affected_users INT,
  notification_sent_at TIMESTAMP,
  investigation_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Billing & Subscriptions
```sql
CREATE TABLE subscription_plans (
  id UUID PRIMARY KEY,
  name TEXT, -- 'Individual', 'Organization', 'Enterprise'
  price_per_month_cents INT,
  max_learners INT,
  features JSONB, -- What's included
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY,
  customer_id UUID REFERENCES users(id),
  plan_id UUID REFERENCES subscription_plans(id),
  stripe_subscription_id TEXT,
  status TEXT CHECK (status IN ('active', 'paused', 'cancelled')),
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  renewal_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE invoices (
  id UUID PRIMARY KEY,
  subscription_id UUID REFERENCES subscriptions(id),
  stripe_invoice_id TEXT,
  amount_cents INT,
  status TEXT CHECK (status IN ('draft', 'sent', 'paid', 'failed')),
  issued_at TIMESTAMP,
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Row-Level Security (RLS) Policies
```sql
-- Learners can only see their own progress
CREATE POLICY learner_progress_isolation ON course_progress
  USING (user_id = auth.uid());

-- Admins can see all progress
CREATE POLICY admin_see_all ON course_progress
  USING (auth.jwt() ->> 'role' = 'admin');

-- Quiz responses only visible to learner + admins
CREATE POLICY quiz_response_isolation ON quiz_responses
  USING (user_id = auth.uid() OR auth.jwt() ->> 'role' = 'admin');
```

---

## 4. API ENDPOINTS (REST)

### Authentication
```
POST   /api/auth/signup           (email, password, role)
POST   /api/auth/login            (email, password)
POST   /api/auth/logout
POST   /api/auth/refresh-token
POST   /api/auth/mfa-enable       (admin only)
```

### Learner Endpoints
```
GET    /api/learner/courses       (list available courses)
GET    /api/learner/courses/:id   (course details)
GET    /api/learner/progress      (my progress)
POST   /api/learner/lessons/:id/start
POST   /api/learner/quizzes/:id/attempt  (submit answers)
GET    /api/learner/certificates (my certificates)
```

### Admin Endpoints
```
POST   /api/admin/courses         (create course)
PUT    /api/admin/courses/:id     (update course)
POST   /api/admin/lessons         (add lesson to course)
POST   /api/admin/quizzes         (create quiz)
GET    /api/admin/learners        (all learners)
GET    /api/admin/learners/:id/progress
GET    /api/admin/reports/completion  (analytics)
GET    /api/admin/audit-logs      (compliance audit trail)
POST   /api/admin/certificates/:id/revoke
```

### Certificate Endpoints
```
GET    /api/certificates/:id/pdf  (download certificate)
GET    /api/certificates/verify/:code  (public verification)
```

### Payment Endpoints
```
POST   /api/billing/subscribe     (Stripe checkout)
POST   /api/billing/webhook       (Stripe event handler)
GET    /api/billing/invoices
POST   /api/billing/cancel-subscription
```

---

## 5. SECURITY REQUIREMENTS

### Encryption
- **In Transit:** TLS 1.3 (automatic with Vercel + Supabase)
- **At Rest:** PostgreSQL transparent data encryption (TDE) via Supabase Enterprise
- **Application-Level:** Sensitive fields encrypted with AES-256 (bcrypt for passwords)

### Authentication & Authorization
- Email + password (Supabase managed)
- Multi-factor authentication (MFA) for admins
- Session tokens with 24-hour expiry
- Automatic logout on inactivity (30 min for healthcare data)

### Access Control
- Role-based access control (RBAC): admin, learner, manager, auditor
- Row-level security (RLS) in database
- Admins can only delete/modify courses, not learner data
- Learners only see their own progress

### Data Protection
- No hardcoded credentials (use environment variables)
- API keys rotated quarterly
- Stripe API key never exposed to frontend
- CORS configured to accept only your domain

### Audit & Compliance
- Every action logged (login, quiz attempt, certificate issued, admin actions)
- Audit logs immutable (write-only, no deletes)
- Logs retained for 7 years (configurable per HIPAA requirements)
- Quarterly security audits (external)

### Incident Response
- Breach detection monitoring (e.g., unauthorized access attempts)
- Breach notification plan (notify affected users within 24-48 hours)
- Data retention deletion schedule (automatic after retention period)

---

## 6. HOSTING & INFRASTRUCTURE

### Development Environment
```
Frontend:     React + Vite (localhost:5173)
Backend:      Supabase local development
Database:     PostgreSQL (Supabase local emulator)
Video:        Test videos in project repo
```

### Staging Environment
- Supabase staging project (separate database)
- Vercel preview deployments (on every git push)
- Test data seeded from fixtures

### Production Environment
- **Frontend:** Vercel (edge functions for dynamic routes)
- **Backend:** Supabase PostgreSQL (Enterprise plan with HIPAA BAA)
- **Video:** Vimeo Enterprise (HIPAA-compliant)
- **Payment:** Stripe Live (PCI-DSS compliant)
- **Storage:** S3 (if needed for PDFs/assets)
- **Monitoring:** Sentry (error tracking)

### Infrastructure Cost Estimate (Monthly)
```
Supabase PostgreSQL (Enterprise):     $500-1000
Vimeo Enterprise (video hosting):     $75-300
Stripe (payment processing):           2.2% + $0.30 per transaction
Vercel (frontend hosting):             $20 (Pro) or included in Supabase
Sentry (error monitoring):             $29 (Team plan)
Monitoring/observability:              $0 (Supabase includes)
--------------------------------------------------
Total (conservative estimate):         ~$650-1400/month
```

---

## 7. DEVELOPMENT WORKFLOW

### Version Control
- GitHub (public repo, no secrets committed)
- Branch strategy: `main` (production) + `develop` + feature branches
- Commits: Conventional commits (`feat:`, `fix:`, `docs:`, etc.)

### Environment Variables
```
# Frontend (.env.local)
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxx
VITE_API_URL=https://api.yourdomain.com

# Backend (.env)
SUPABASE_URL=
SUPABASE_SERVICE_KEY=
STRIPE_SECRET_KEY=
VIMEO_API_TOKEN=
JWT_SECRET=
```

### Deployment Pipeline
```
1. Developer pushes to feature branch
2. GitHub Actions runs tests + linter
3. Merge to develop → Vercel preview deployment
4. Manual QA testing
5. Merge to main → Vercel production deployment
6. Database migrations run automatically
```

---

## 8. TESTING STRATEGY

### Unit Tests
- React components (Jest + React Testing Library)
- API endpoints (Supertest)
- Data validation (Zod schemas)
- Target: 70%+ coverage on critical paths

### Integration Tests
- Auth flow (sign up → login → access protected route)
- Quiz flow (start quiz → answer questions → submit → get certificate)
- Admin flow (upload course → publish → track learner)

### Security Tests
- Row-level security (verify learners can't see others' data)
- Auth bypass attempts (invalid tokens, expired sessions)
- SQL injection tests
- CORS misconfiguration tests

### E2E Tests
- Cypress or Playwright
- User journey: sign up → enroll in course → complete lessons → pass quiz → download certificate

---

## 9. PERFORMANCE REQUIREMENTS

### Frontend Performance
- First Contentful Paint (FCP): <1.5s
- Largest Contentful Paint (LCP): <2.5s
- Cumulative Layout Shift (CLS): <0.1
- Time to Interactive (TTI): <3.5s
- Target Lighthouse score: 85+

### Backend Performance
- API response time: <200ms (p95)
- Database query time: <50ms (p95)
- Certificate generation: <5 seconds
- Concurrent user limit: Supabase Enterprise handles 1000+

### Video Performance
- Adaptive bitrate streaming (Vimeo handles)
- No buffering on 4G connections
- Captions available (accessibility)

---

## 10. ACCESSIBILITY REQUIREMENTS

**Why:** Tech comfort = 1/10, audience includes patients. Accessibility is not optional.

- **WCAG 2.1 Level AA** compliance
- Semantic HTML (proper heading hierarchy, button roles)
- Alt text for all images/videos
- Keyboard navigation throughout
- Screen reader friendly (ARIA labels)
- High contrast colors (navy/teal meets WCAG standards)
- Font sizes ≥16px for body text
- Captions on all videos (auto-generated + reviewed)
- Transcripts for audio content

---

## 11. GLOSSARY OF TERMS

| Term | Definition |
|------|-----------|
| **HIPAA** | Health Insurance Portability and Accountability Act — regulates healthcare data privacy |
| **BAA** | Business Associate Agreement — Supabase signs this, making them HIPAA-compliant |
| **RLS** | Row-Level Security — database feature that restricts data access by user |
| **MFA** | Multi-Factor Authentication — two-factor verification (email + code) |
| **PII** | Personally Identifiable Information — names, emails, SSN, etc. |
| **PHI** | Protected Health Information — medical records + PII combined |
| **CORS** | Cross-Origin Resource Sharing — controls which domains can call your API |
| **TLS** | Transport Layer Security — encrypts data in transit (HTTPS) |
| **Audit Log** | Immutable record of every action (who, what, when, why) |

---

## 12. DEVELOPER SETUP CHECKLIST

Before writing code, complete:

- [ ] GitHub repo created (private)
- [ ] Supabase project created (staging + production)
- [ ] Stripe test account created + keys configured
- [ ] Vimeo test account + API token
- [ ] Environment variables configured locally
- [ ] Database schema migration scripts written
- [ ] GitHub Actions CI/CD pipeline configured
- [ ] Sentry project created for error tracking
- [ ] Figma design system linked to Storybook (optional)
- [ ] Security checklist reviewed (secrets, CORS, RLS)

---

## 13. NEXT STEPS

1. **Week 1:** Approve this tech spec. Create Supabase staging project.
2. **Week 2:** Create GitHub repo. Set up CI/CD pipeline.
3. **Week 3:** Implement auth system (Supabase + MFA).
4. **Week 4:** Build database schema + RLS policies.
5. **Week 5:** Implement learner portal + course navigation.
6. **Week 6:** Implement quiz system + certificate generation.
7. **Week 7:** Implement admin dashboard + progress reporting.
8. **Week 8:** Payment integration (Stripe).
9. **Week 9-10:** Security audit + testing.
10. **Week 11-12:** Content integration + go-live prep.

---

**Document Version:** 1.0  
**Last Updated:** June 5, 2026  
**Status:** READY FOR APPROVAL
