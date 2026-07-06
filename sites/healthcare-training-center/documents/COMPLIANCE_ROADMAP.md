# Healthcare Training Center — Compliance & Security Roadmap

**Status:** For January 1, 2027 Launch + Post-Launch Certification

---

## OVERVIEW: What Your Mom Committed To

From the discovery form, you're building under these frameworks:

1. **HIPAA** — Health Insurance Portability and Accountability Act (primary)
2. **HITECH Act** — Health Information Technology for Economic and Clinical Health Act
3. **HITRUST CSF** — Health Information Trust Alliance Common Security Framework
4. **NIST CSF** — National Institute of Standards & Technology Cybersecurity Framework
5. **ISO/IEC 27001** — International standard for information security management

**Translation:** Your mom is building at enterprise-grade security level. This is not a "nice to have"—it's legally required if she's handling any healthcare data.

---

## PHASE 1: MVP LAUNCH (January 1, 2027) — HIPAA FOUNDATION

### What Ships: HIPAA-Compliant Architecture
By launch, your platform must have:

- ✅ Encryption (data at rest + in transit)
- ✅ Access controls (role-based, learner data isolation)
- ✅ Audit logs (every action recorded)
- ✅ Data retention policies
- ✅ Breach notification plan (documented, not tested)
- ✅ Business Associate Agreement (BAA) with Supabase
- ⚠️ Security documentation (privacy policy, terms of service, acceptable use policy)
- ⚠️ Incident response plan (who to call if breached)
- ⚠️ Employee training (if your mom hires staff)

### What Doesn't Ship Yet: External Certifications
These take 3-6+ months and are done POST-LAUNCH:
- ❌ HITRUST CSF certification (external audit required)
- ❌ ISO 27001 certification (external audit required)
- ❌ SOC 2 Type II (external audit required)

**Why post-launch?**
- Auditors need to see 6+ months of operational history
- Your platform's maturity affects audit timeline
- Certifications cost $10-30k + 100+ hours of documentation

---

## HIPAA REQUIREMENTS BREAKDOWN

### 1. Administrative Safeguards (Policies & People)

| Requirement | MVP (Phase 1) | Phase 2+ |
|-----------|---|---|
| Security Officer | You or hire one | Dedicated hire |
| Privacy Policy | Draft + review | Final legal review |
| Acceptable Use Policy | Document drafted | Implemented + signed |
| Risk Analysis | Preliminary | Full HIPAA risk assessment |
| Security Incident Procedures | Draft | Tested + refined |
| Employee Sanctions Policy | Written | Enforced |
| Training & Awareness | Self-training | Annual training program |
| Business Associate Agreement | ✅ Supabase signs | ✅ Maintained |

**Action for Mom:** Write a simple document: "If data is breached, I will (1) stop it, (2) notify users within 48 hours, (3) report to HHS."

---

### 2. Physical Safeguards (Data Center Security)

| Requirement | What It Means | How You're Compliant |
|-----------|---|---|
| Facility Access | Only authorized people in your data center | Supabase's data center has this. You don't run servers. ✅ |
| Workstation Security | Lock your laptop, don't leave it open | Your responsibility. Enforce with staff. |
| Device Control | Track who has access to admin credentials | Use Supabase's audit logs + your GitHub history. |
| Media Protection | Don't take database backups on USB drives | Supabase handles. Don't create manual backups to your laptop. |

**Action for Mom:** Don't work on your laptop in public. Use a password manager. Don't email database exports.

---

### 3. Technical Safeguards (Encryption & Access Control)

| Requirement | MVP Implementation | Ongoing |
|-----------|---|---|
| Access Control | Role-based (admin/learner) + RLS in database | Audit monthly |
| Encryption in Transit | TLS 1.3 (HTTPS everywhere) | ✅ Built-in to Vercel + Supabase |
| Encryption at Rest | PostgreSQL TDE via Supabase Enterprise | ✅ Enabled by default |
| Audit Controls | Log every action (login, quiz, admin change) | Query logs monthly |
| Integrity Controls | Digital signatures on certificates (Phase 2) | Not required for MVP |
| Transmission Security | API calls encrypted, no data sent over email | ✅ Enforced in code |

**Action for Mom:** When you get the tech stack running, have your developer show you the audit logs. You should be able to see "User X logged in at 3pm EST from IP Y."

---

### 4. Organizational Requirements (Contracts & Policies)

| Item | Deadline | Responsibility |
|------|----------|-----------------|
| Business Associate Agreement (BAA) | Before launch | Supabase (they provide it) |
| Data Processing Addendum (DPA) | Before launch | Your lawyer reviews Supabase's DPA |
| Employee Non-Disclosure Agreement | Before hiring anyone | You draft it |
| Breach Notification Letter (template) | Before launch | You draft it based on state law |
| Incident Response Plan | Before launch | You document it |
| Data Retention Schedule | Before launch | You decide (7 years is standard for healthcare) |

**Cost:** $2-5k for a lawyer to review/create these (one-time)

---

## HITECH ACT ADDENDUM

HITECH tightens HIPAA penalties and adds requirements:

| HITECH Requirement | What It Means | Your MVP Status |
|---|---|---|
| Breach Notification | Must notify within 60 days | ✅ You'll document this |
| Tiered Penalties | Fines increase if you knew about vulnerabilities | ✅ Regular security audits prevent this |
| Genetic Information | Extra privacy for genetic data | N/A for training platform |
| Whistleblower Protections | Employees can report violations | ✅ Document this in employee handbook |

**Action:** Nothing extra—HITECH is covered by your HIPAA + incident response plan.

---

## HITRUST CSF ROADMAP (Post-Launch)

**What is HITRUST?** A framework that *combines* HIPAA, HITECH, NIST, and ISO 27001 into one certification.

### Timeline: Months 1-6 After Launch (July 2027 - December 2027)

#### Month 1-2: Gap Analysis
- Hire a HITRUST assessor ($3-5k)
- They review your systems vs. HITRUST standards
- Identify gaps (e.g., "You need multi-factor authentication for admins")
- Create remediation plan

#### Month 3-4: Remediation
- Your developer fixes gaps
- Add MFA, improve audit logging, document policies
- Re-test with assessor

#### Month 5-6: Certification
- Final audit by assessor
- HITRUST issues certificate (valid 3 years)
- You market it: "HITRUST Certified Platform"

**Cost:** $15-25k total (assessor fees + remediation work)

---

## NIST CYBERSECURITY FRAMEWORK (Ongoing)

NIST CSF has 5 functions:

| Function | MVP Checklist | Ongoing |
|----------|---|---|
| **Identify** | Inventory of systems, data, assets | ✅ Do this before launch |
| **Protect** | Encryption, access control, backups | ✅ Supabase covers most |
| **Detect** | Monitor for breaches, anomalies | 🟡 Set up Sentry alerts |
| **Respond** | Incident response plan documented | ✅ Draft before launch |
| **Recover** | Backup & disaster recovery plan | 🟡 Test quarterly |

**Action:** Before launch, write a 1-page document per function.

---

## ISO/IEC 27001 ROADMAP (Year 2)

ISO 27001 is the strictest. Requires certified auditor (months 6-12 of operational history).

### Timeline: Months 18-30 After Launch (January 2028 - January 2029)

1. **Months 18-24:** Build management system + documentation
2. **Months 24-28:** Pre-assessment audit
3. **Months 28-30:** Final certification audit

**Cost:** $20-40k

**Reality Check:** Most healthcare startups skip ISO 27001 initially. HITRUST is sufficient for 2027. Pursue ISO 27001 if you land a major enterprise customer who requires it.

---

## SECURITY AUDIT SCHEDULE

### Ongoing (Pre-Launch)
- **Code Review:** Before every production deployment (your developer)
- **Dependency Scanning:** Automated (GitHub security alerts)

### Monthly (Post-Launch)
- **Audit Log Review:** Look for suspicious logins/access
- **Backup Verification:** Confirm Supabase backups are working
- **User Access Review:** Verify admin users still need their roles

### Quarterly (Post-Launch)
- **Security Assessment:** Self-assessment using NIST checklist
- **Penetration Testing:** Start in Q2 2027 (hire external firm $5-10k)
- **Incident Review:** Any breaches/near-misses?

### Annually (Post-Launch)
- **Risk Assessment:** Full HIPAA risk analysis
- **Policy Review:** Update security policies as business evolves
- **Compliance Review:** Verify you're still meeting all requirements

---

## DATA RETENTION & DELETION POLICY

### What Your Mom Must Decide

| Data Type | Retention Period | Reason |
|-----------|---|---|
| Quiz Results | 7 years | Healthcare regulation |
| Certificates | 10 years | Credential proof |
| Audit Logs | 7 years | Compliance audits |
| Login History | 1 year | Security monitoring |
| Payment Records | 7 years | Tax + legal |
| Learner Progress | Until learner requests deletion | Privacy regulation |

**Action:** Before launch, document your retention policy. After retention period, Supabase automatically deletes (set this up).

---

## BREACH NOTIFICATION PLAN

### If Data is Breached (Unlikely but Possible)

**Immediate (Within 1 hour):**
1. Stop the breach (kill the affected account/process)
2. Notify Supabase + Stripe (they have security teams)
3. Document what happened

**Within 24 Hours:**
1. Determine scope (how many users affected?)
2. Determine sensitivity (was it just names, or passwords?)

**Within 48 Hours:**
1. Notify affected learners via email
2. Document the breach in your breach log
3. Begin investigation

**Within 60 Days:**
1. Finish investigation
2. Report to state attorney general (if >1000 residents affected)
3. Report to HHS (required by law)

**Template Breach Letter:**
```
Subject: Important: Healthcare Training Center Data Security Notice

Dear [Learner Name],

On [DATE], we discovered unauthorized access to [TYPE] data.

What happened: [BRIEF DESCRIPTION]
What data was involved: [NAMES, EMAILS, etc.]
What we're doing about it: [ACTIONS TAKEN]
What you should do: [MONITOR CREDIT, CHANGE PASSWORDS, etc.]

We sincerely apologize. Contact us at [EMAIL] with questions.

[Your Mom]
Healthcare Training Center CEO
```

**Cost:** Legal review of breach letter: $500-1k

---

## SECURITY CHECKLIST: BEFORE LAUNCH

Complete this before January 1, 2027:

### Infrastructure
- [ ] Supabase project created with HIPAA BAA signed
- [ ] All data encrypted at rest (TDE enabled)
- [ ] All data encrypted in transit (TLS 1.3, HTTPS only)
- [ ] API keys rotated + never exposed in frontend
- [ ] Database backups tested (restored at least once)
- [ ] Disaster recovery plan documented

### Access Control
- [ ] Role-based access implemented (admin/learner)
- [ ] Row-level security (RLS) enabled in database
- [ ] Admin login requires password + email verification
- [ ] Admin MFA enabled (optional for MVP, required for Phase 1.5)
- [ ] No hardcoded credentials in code
- [ ] GitHub repo is private (no data exposed)

### Data Protection
- [ ] Audit logs enabled on all tables
- [ ] Sensitive fields encrypted (if needed)
- [ ] No PII logged in error messages
- [ ] Certificate generation secure (PDFs can't be forged)
- [ ] Video streaming doesn't log full URLs

### Documentation
- [ ] Privacy Policy drafted + reviewed by lawyer
- [ ] Terms of Service drafted + reviewed by lawyer
- [ ] Data Processing Addendum reviewed (Supabase's version)
- [ ] Incident Response Plan documented
- [ ] Data Retention Policy documented
- [ ] Employee handbook (if hiring staff) includes confidentiality clause

### Testing
- [ ] Tried to access other learner's data (should fail)
- [ ] Tried to use an expired auth token (should fail)
- [ ] Tried to upload malicious content (should fail)
- [ ] Audit log captures admin actions
- [ ] Certificate is unique + can't be duplicated

### Monitoring
- [ ] Error tracking enabled (Sentry)
- [ ] Alert set for failed login attempts (>5 in 10 min = investigate)
- [ ] Alert set for unusual data access (e.g., admin downloading all quiz results)
- [ ] Backup monitoring (Supabase sends alerts if backup fails)

### Compliance Documents
- [ ] Business Associate Agreement (Supabase) reviewed
- [ ] Signed (if needed) before launch
- [ ] Breach notification letter template prepared
- [ ] Risk assessment (preliminary) completed
- [ ] Security training completed (at least for you)

---

## COST SUMMARY: COMPLIANCE & SECURITY

### Pre-Launch (2026)
- Legal review of BAA/ToS/Privacy Policy: $2-5k
- Security architecture review: $1-2k (optional but recommended)
- **Total: $3-7k**

### Launch (January 2027)
- Supabase Enterprise (BAA included): ~$1k (1 month)
- Sentry monitoring: $29
- **Total: $1k**

### Year 1 (2027)
- Supabase: ~$6k ($500/month avg)
- Vimeo: ~$1.5k ($75-150/month)
- Stripe: 2.2% + $0.30 per transaction
- Security audit (Q1): $3-5k
- Penetration testing (Q2): $5-10k
- **Total: ~$16-25k**

### Year 2 (2028)
- HITRUST CSF certification: $15-25k (one-time)
- Ongoing compliance: ~$10-15k/year
- **Total: ~$25-40k**

---

## EXECUTIVE SUMMARY FOR YOUR MOM

**What you're committing to:**

✅ **You can launch January 1, 2027** with a HIPAA-compliant, audit-ready platform.

⚠️ **You need a lawyer** to review privacy policies + BAA ($2-5k).

⚠️ **You need a security person** (either you or hire someone) to oversee compliance.

✅ **Supabase does the hard part** (encryption, backups, secure infrastructure).

🟡 **Certifications (HITRUST, ISO 27001) are optional post-launch** but help market your platform to hospitals/health systems.

**Bottom line:** You're building enterprise-grade from day one. This gives you credibility with B2B customers and protects both you and your learners.

---

## NEXT STEPS

1. **Week 1:** Have a lawyer review Supabase BAA + draft privacy policy
2. **Week 2:** Document incident response + data retention policies
3. **Week 3-4:** Your developer sets up audit logging + RLS
4. **Week 5-6:** Internal security testing
5. **Week 7:** Penetration test (optional but recommended)
6. **Week 8-12:** Final compliance review before launch

---

**Document Version:** 1.0  
**Status:** READY FOR IMPLEMENTATION
