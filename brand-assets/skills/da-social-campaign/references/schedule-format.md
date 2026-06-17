# Schedule JSON Format Reference

## posting-schedule.json (Meta — FB + IG)

Used by the `da-social-post-mwf` Cowork scheduled task (Mon/Wed/Fri at noon Arizona time).

### Full schema

```json
{
  "config": {
    "schedule": "Mon, Wed, Fri at noon Arizona time",
    "platforms": ["meta_business_suite"],
    "base_path": "/Users/cuus/Claude/projects/digital-allies/assets/Design System /social-media-marketing/services-marketing-content/",
    "site": "https://digitalallies.net"
  },
  "campaigns": [
    {
      "name": "CampaignName",
      "article_url": "https://digitalallies.net/learn/article-slug",
      "theme": "One-line description of the campaign angle"
    }
  ],
  "posts": [
    {
      "id": 23,
      "date": "2026-08-03",
      "day": "Monday",
      "campaign": "CampaignName",
      "image": "FolderName/image-filename.png",
      "caption_meta": "Caption text for Facebook and Instagram.\n\n→ digitalallies.net/learn/article-slug",
      "caption_gbp": "DEPRECATED — GBP captions now live in gbp-article-schedule.json",
      "status": "pending"
    }
  ],
  "upcoming_campaigns": [
    {
      "name": "Campaign Name",
      "type": "carousel|video_reel|visual_filler|standard",
      "source": "/full/path/to/image/folder/",
      "notes": "Free-form notes about this campaign",
      "status": "planned"
    }
  ]
}
```

### Post ID rules
- IDs are sequential integers
- Never reuse an ID — if a post is removed, leave a gap
- The current highest ID is 22

### Image paths
- Relative to `config.base_path`
- Example: `"Automation/001_In_a_graphic_design_style_bold_white_text_reads_Fe02YuIE.png"`
- Full path = base_path + image value
- Always verify the file exists before adding to the schedule

### Status values
- `"pending"` — not yet posted
- `"posted"` — posted, `posted_at` timestamp will be present
- `"skipped"` — intentionally skipped (e.g., holidays)

---

## gbp-article-schedule.json (Google Business Profile)

Used by the `da-gbp-article-posts` Cowork scheduled task (Tue/Sat at noon Arizona time).

### Full schema

```json
{
  "config": {
    "platform": "google_business_profile",
    "post_type": "whats_new",
    "schedule": "Tue + Sat at noon Arizona time",
    "note": "GBP runs on its own track — article-first, content-forward. Do not use Offer post type.",
    "base_path": "/Users/cuus/Claude/projects/digital-allies/assets/"
  },
  "posts": [
    {
      "id": 9,
      "date": "2026-07-08",
      "day": "Wednesday",
      "article": "article-slug",
      "article_url": "https://digitalallies.net/learn/article-slug",
      "image": "Design System /brand-images/SubFolder/image-filename.png",
      "caption": "2-3 sentence informational caption.\n\nRead it: digitalallies.net/learn/article-slug",
      "status": "pending"
    }
  ]
}
```

### Image paths
- Relative to `config.base_path` (`/Users/cuus/Claude/projects/digital-allies/assets/`)
- Example: `"Design System /brand-images/Abstract Brand Art — Social UI Kit/Abstract Brand Art./001_...png"`

### One post per article
There are 8 live article pages. Each has one GBP post. Don't add a second post for the same article unless Anthony explicitly requests it.

### Never use "Offer" post type
The GBP task always selects "What's new". Google rejects most small business offers and the approval process is opaque and slow.

---

## Timezone reference

Arizona time = MST = UTC-7, year-round (no daylight saving time).

| Arizona noon | UTC |
|---|---|
| 12:00 PM MST | 19:00 UTC |

Scheduled tasks use the local machine time — cron expressions are written for Arizona time directly.

---

## Helper scripts

Both scripts live at:
`/Users/cuus/Claude/projects/digital-allies/assets/Design System /social-media-marketing/`

| Script | Usage |
|---|---|
| `get-todays-post.sh` | Run on Meta posting days to print today's post details |
| `mark-posted.sh <post-id>` | Mark a Meta post as done after posting |

GBP task uses inline python3 to update status — no separate script needed.
