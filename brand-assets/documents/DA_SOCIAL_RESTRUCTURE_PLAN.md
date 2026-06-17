# Digital Allies Social Media — Restructure Plan & Lessons Learned

## What Happened (June 9, 2026 Session)

### The Problem
- Schedule had posts for Mon/Tue/Wed/Fri, but Meta should only post Mon/Wed/Fri and GBP on Tue/Sat
- Same campaign (Design) repeated for 3+ weeks — unclear strategy
- Posts scattered across different JSON files with conflicting timing (7 AM, 10 AM, 12 PM)
- Manual login required every time → no true automation possible
- File access restrictions prevented me from editing schedules directly
- **Result**: Post due at noon didn't go out. Had to be posted manually.

### Root Causes
1. **Disorganized folder structure** — mixing assets, schedules, and task files made access/permissions confusing
2. **Unclear content strategy** — no distinction between "month-long campaign" vs "one-time post"
3. **Complex platform logic** — different platforms on different days = more failure points
4. **Overcomplicated JSON structure** — trying to handle too many variations in one file
5. **No clear workflow** — when do you create campaigns? When do I schedule them? No rhythm.

---

## New Workflow Structure (Recommended)

### Phase 1: Monthly Campaign Planning (First Monday/Friday of month)
**You + Claude meet to:**
- Review what's working/not working
- Decide on next month's 1-2 campaigns
- Write campaign briefs (tone, audience, key points)
- Collect/organize assets

**Output**: Campaign folder with all assets ready

### Phase 2: Content Calendar Creation (Week before launch)
**You + Claude create:**
- Simple posting calendar (Tue/Fri for 2-4 weeks)
- One post per platform per day (same content)
- Final captions and image selections
- Save to `schedules/current-campaign.json`

**Output**: Ready-to-automate schedule

### Phase 3: Automation (Launch day onward)
**Cowork scheduled task runs every Tue/Fri at 11:55 AM:**
- Reads current campaign schedule
- Posts to Meta (FB+IG) + GBP at 12 PM
- Marks post as "posted" in schedule
- No manual intervention needed

---

## Recommended Directory Structure

```
/Users/cuus/Claude/projects/digital-allies/
│
├── 📁 social-media/
│   ├── 📋 README.md (overview + "DO NOT MOVE THIS FOLDER" in caps)
│   │
│   ├── 📁 campaigns/
│   │   ├── 📁 2026-06-design/
│   │   │   ├── brief.md (campaign goals, tone, dates)
│   │   │   ├── assets/
│   │   │   │   ├── 001.png
│   │   │   │   ├── 002.png
│   │   │   │   └── ...
│   │   │   └── posts.json (schedule for this campaign)
│   │   │
│   │   ├── 📁 2026-07-automation/
│   │   │   ├── brief.md
│   │   │   ├── assets/
│   │   │   └── posts.json
│   │   │
│   │   └── [future campaigns follow same structure]
│   │
│   ├── 📁 archive/
│   │   ├── 2026-05-integrations/ (old campaigns go here)
│   │   └── 2026-04-design/
│   │
│   ├── 📁 automations/
│   │   ├── scheduled-task-tue-fri.md (Cowork task instructions)
│   │   └── posting-log.json (record of what posted when)
│   │
│   └── 📁 templates/
│       ├── campaign-brief-template.md
│       ├── schedule-template.json
│       └── post-template.json
```

### Critical Rules
- **DO NOT MOVE** the `social-media/` folder
- **DO NOT RENAME** subfolders without telling Claude first
- Keep old campaigns in `archive/` — don't delete
- One campaign per folder, named with date (2026-06-design, 2026-07-automation)
- All assets in the campaign folder, nowhere else

---

## Simple Schedule Format (posts.json)

```json
{
  "campaign": "Design",
  "start_date": "2026-06-09",
  "end_date": "2026-06-27",
  "posts": [
    {
      "date": "2026-06-09",
      "day": "Tuesday",
      "platforms": ["meta", "gbp"],
      "image": "assets/001.png",
      "caption_meta": "Your website is...",
      "caption_gbp": "87.4% of customers use a phone...",
      "status": "pending"
    },
    {
      "date": "2026-06-12",
      "day": "Friday",
      "platforms": ["meta", "gbp"],
      "image": "assets/002.png",
      "caption_meta": "...",
      "caption_gbp": "...",
      "status": "pending"
    }
  ]
}
```

---

## Monthly Workflow Timeline

| When | What | Who |
|------|------|-----|
| 1st Friday of month | Campaign planning session | You + Claude |
| 1st Friday + 1 week | Create posting calendar & content | You + Claude |
| Campaign launch date | Automation runs every Tue/Fri | Claude (automatic) |
| End of campaign | Archive old campaign folder | You |
| Next 1st Friday | Plan next campaign | You + Claude |

---

## What I Need From You

1. **Access**: Make sure I can read/write to `social-media/` folder
2. **Organization**: Move old/test files OUT of this folder first
3. **Naming**: Use consistent date format (2026-06-design, not "design_june" or "june_2026_design")
4. **Clarity**: Tell me when something is an experiment vs. an active campaign
5. **Patience**: First month might need tweaks to the workflow — that's normal

---

## Questions Before Starting New Project

- What's your preferred cadence? (2 posts/week on Tue/Fri? Or something else?)
- Should I create sample campaigns first so you can see the structure?
- Do you want me to build the automation task once we set up the first campaign?
- Timeline: When do you want the first NEW campaign live?

---

**Status**: Ready to restructure. Waiting for you to clean up the old folder, then I'll organize the new one.
