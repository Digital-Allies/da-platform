---
name: da-social-campaign
description: >
  Digital Allies social media campaign manager. Use this skill whenever Anthony
  wants to: set up a new campaign, add posts to the schedule, preview the content
  calendar, check what's queued, generate captions for new assets, update the
  posting workflow, or work with the Meta or GBP posting schedules. Also triggers
  on "show me the calendar", "what's scheduled", "new campaign", "add posts",
  "Kingman data story", "reels campaign", "brand visuals", or any request to
  plan or manage DA's social posting pipeline. Always use this skill — don't try
  to rebuild the workflow from scratch.
---

# Digital Allies — Social Campaign Manager

## What this skill does

You manage Digital Allies' social media posting pipeline. The two live channels are:
- **Meta** (Facebook + Instagram together via Meta Business Suite) — Mon/Wed/Fri at noon
- **Google Business Profile** — Tue/Sat at noon, article-first posts only

Cowork scheduled tasks handle the actual posting automatically. Your job is to:
1. Add new campaigns to the schedule
2. Generate on-brand captions
3. Render the visual calendar so Anthony can review what's queued
4. Diagnose issues with the workflow if something didn't post

---

## Key file locations

```
/Users/cuus/Claude/projects/digital-allies/assets/Design System /social-media-marketing/
├── posting-schedule.json          ← Meta (FB+IG) campaign posts
├── gbp-article-schedule.json      ← GBP article posts
├── get-todays-post.sh             ← helper: prints today's post details
├── mark-posted.sh                 ← helper: marks a post as done
└── services-marketing-content/    ← campaign image folders
    ├── Design/                    (7 images — web design)
    ├── Automation/                (8 images — AI automation)
    ├── Integrations/              (7 images — system integrations)
    ├── ES_Support/                (7 images — bilingual/Spanish)
    └── Field Notes Carousel — 4 Articles Summary/  (10 images)

/Users/cuus/Claude/projects/digital-allies/assets/Design System /brand-images/
├── Social Template Designs/SEO and AEO/SEO and AEO/   (4 images)
├── AEO and Web Design/                                 (4 images)
├── Abstract Brand Art — Social UI Kit/Abstract Brand Art./  (6+ images)
└── Static Logo System/

/Users/cuus/Claude/projects/digital-allies/assets/Brand Images/
└── (legacy copies of brand-images — prefer Design System versions)
```

Scheduled tasks live at:
- `/Users/cuus/Claude/Scheduled/da-social-post-mwf/SKILL.md` — Meta task
- `/Users/cuus/Claude/Scheduled/da-gbp-article-posts/SKILL.md` — GBP task

---

## Adding a new campaign

When Anthony wants to add a campaign, collect:
1. **Content folder** — path to the image folder (or let him point you at the Design System)
2. **Campaign theme** — what service or message this campaign is about
3. **Article URL** — the digitalallies.net/learn/... page to link (if applicable)
4. **Platform** — Meta, GBP, or both
5. **Start date** — when to begin (default: next available posting day)

Then:
- List the images in the folder and assign one per post date
- Write captions for each (see `references/caption-guidelines.md`)
- Append new post objects to the correct JSON file
- Render the calendar so Anthony can review before anything goes live

Keep the JSON structure consistent — see `references/schedule-format.md`.

---

## GBP-specific rules

GBP is not a social media platform. Posts here are SEO signals.
- Always use post type **"What's new"** — never "Offer" (Google rejects most small business offers)
- Captions should be **content-forward**: answer a real question, link to an article
- 2–3 sentences max, no promotional fluff
- Timing and visual polish matter less than on Meta — prioritize the article link
- Stick to one post per article page — GBP has 8 article posts already mapped

---

## Upcoming campaigns (queued, not yet scheduled)

These are in `posting-schedule.json` under `upcoming_campaigns`:

| Campaign | Type | Notes |
|---|---|---|
| Kingman Data Story | IG carousel (11 slides) | Single cover for GBP, full carousel for IG/FB |
| Website Demo Reels | Video reels | Animated HTML demos + custom music from Anthony |
| Brand Visuals | Filler posts | Abstract brand art, logo system — lower text, high visual |

When Anthony is ready to activate any of these, move them into the main `posts` array with real dates and captions.

---

## Visual calendar

After any schedule change — or whenever Anthony asks to see what's queued — always render the visual calendar. This is non-negotiable: he needs to see it before anything goes live.

Read the current state of both JSON files and build an interactive widget using `mcp__visualize__show_widget`. The calendar should:
- Show all pending posts grouped by week
- Color-code by campaign (Design = teal, Automation = purple, Integrations = coral, GBP = blue)
- Each row shows: date, day of week, platform badge (FB+IG or GBP), campaign name, image filename
- Rows expand on click to show the full caption
- Include a status bar showing total posts verified vs missing
- Include a warning if any scheduled task needs Chrome permissions approved ("Run now" in sidebar)

See `references/calendar-widget.md` for the exact widget pattern.

---

## Diagnosing a missed post

If Anthony says nothing posted:
1. Check the JSON — is the post still `"status": "pending"` for that date?
2. Check if the Chrome tools need pre-approving — the task fires but pauses on permissions if "Run now" was never clicked
3. Check that the Cowork app was open at the scheduled time — tasks only run while the app is open
4. Check the image path resolves — run `bash get-todays-post.sh` to verify

The most common cause is Chrome permissions not pre-approved. Fix: click "Run now" on both tasks in the Scheduled sidebar.

---

## Caption writing

Read `references/caption-guidelines.md` before writing any captions. The short version:
- Punchy, direct, no fluff
- Local angle where natural (Kingman, Mohave County, Arizona)
- Meta captions: 1–3 short lines + article URL on its own line with →
- GBP captions: 2–3 sentences, informational, article URL as "Read it: ..."
- Never use the Offer post type on GBP
- Don't add hashtags unless Anthony specifically requests them
