260706-site-audit

\---

## Digital Allies CMS — Full Site Audit

\---

### 🏠 `admin` — Dashboard

\*\*Issues found:\*\*  
\- \*\*Greeting is hardcoded\*\* — says "Good Morning, Admin" regardless of time of day or actual user name. Should dynamically reflect the correct time of day and the logged-in user's name.  
\- \*\*All stat cards show fake/static numbers\*\* — Active Projects (12), Content Pieces (45), Research Notes (8), Dev Tasks (23) are all hardcoded. None are pulled from real data.  
\- \*\*Recent Activity is hardcoded\*\* — "Digital Transformation Guide was published" and "Design homepage mockup completed" are placeholder entries. No real activity feed exists.  
\- \*\*Upcoming Deadlines are hardcoded\*\* — Oct 15 and Oct 18 deadlines are static placeholder data.  
\- \*\*All 4 quick-action buttons are non-functional\*\* — "+ New Content", "+ New Project", "+ New Note", and "+ New Task" do nothing when clicked. They should route to the relevant creation form or open a modal.  
\- \*\*Stat cards are not clickable\*\* — clicking any card (e.g. Active Projects) doesn't navigate to the relevant section.

\---

\#\#\# 📄 \`/admin/pages\` — Pages

\*\*Issues found:\*\*  
\- \*\*No pages exist / not wired to DB\*\* — shows "No pages found." The list is empty with no live data.  
\- \*\*No page editor\*\* — the page builder needs live preview \+ actual component options (sections, cards, etc.) as already noted in comments. Currently just a search bar with nothing behind it.  
\- \*\*Status filter has no data to filter\*\* — dropdown exists but is useless without content.

\---

\#\#\# 📰 \`/admin/content\` — The Press Office

\*\*Issues found:\*\*  
\- \*\*Content Library is empty\*\* — no entries, not connected to real data.  
\- \*\*Create Content form is very basic\*\* — only has Title, Content Type, Status, Tags, and a plain text Content field. Missing: Author field, featured image/media upload, slug/URL, scheduled publish date, SEO fields (meta title/description), rich text/WYSIWYG editor (currently just a plain textarea).  
\- \*\*Content Calendar tab is incomplete\*\* — shows only the title "30-Day Marketing Content Calendar" with no actual calendar UI, grid, or entries.  
\- \*\*Templates tab has only 1 template\*\* — "Blog Post Structure" with a "Use Template" button, but no other templates (press releases, case studies, etc.) and no indication of what the template actually contains or does.  
\- \*\*"All Types" filter dropdown\*\* — no content to filter, and unclear what types are available.

\---

\#\#\# 📁 \`/admin/projects\` — Projects

\*\*Issues found:\*\*  
\- \*\*Kanban board is empty\*\* — all 4 columns (To Do, In Progress, Review, Done) show 0 items.  
\- \*\*"Loading projects..." dropdown is stuck\*\* — the project selector at the top shows "Loading projects..." and never resolves, suggesting the DB connection is broken.  
\- \*\*No project detail view\*\* — no way to click into a project for more info, tasks, or files.  
\- \*\*"+ New Project" button\*\* — needs a creation flow (form/modal) wired up.  
\- \*\*Marked as "Coming soon (requires DB migration)"\*\* — not functional yet.

\---

\#\#\# 🔬 \`/admin/research\` — Research

\*\*Issues found:\*\*  
\- \*\*Only 1 note exists\*\* — "Digital Allies Brand Positioning" appears to be a placeholder/seed entry.  
\- \*\*No note detail view\*\* — clicking the note card doesn't open the note content.  
\- \*\*Notebooks sidebar has only 2 categories\*\* — "Strategy" and "Discovery". More category types likely needed.  
\- \*\*"Export Notes" button\*\* — present but unclear if functional (likely not connected to anything yet).  
\- \*\*Marked as "Coming soon (requires DB migration)"\*\* — not functional yet.

\---

\#\#\# 🛠 \`/admin/development\` — The Workshop

\*\*Issues found:\*\*  
\- \*\*"Bugs" and "Milestones" tabs don't switch\*\* — clicking them does nothing, only "Features" works (or appears to load).  
\- \*\*Task cards are not clickable\*\* — clicking "CMS Backend Integration" does nothing; there's no detail/edit view.  
\- \*\*"+ New Task" button doesn't work\*\* — no modal or form appears.  
\- \*\*Only 1 task exists\*\* — nothing in Bugs or Milestones sections.  
\- \*\*Marked as "Coming soon (requires DB migration)"\*\* — not fully functional.

\---

\#\#\# ⚙️ \`/admin/settings\` — Site Settings

\*\*Issues found:\*\*  
\- \*\*Takes several seconds to load\*\* — stuck on "Loading..." before rendering. Needs a proper loading state or faster data fetch.  
\- \*\*Logo URL requires manual Supabase Storage upload \+ paste\*\* — there's no file upload button directly in the UI. Should have a direct upload input.  
\- \*\*No Twitter/X social field\*\* — only Instagram, Facebook, and LinkedIn are present.  
\- \*\*"Save Changes" button\*\* — unclear if it's connected and functional since the DB migration isn't complete.  
\- \*\*No confirmation feedback\*\* — after clicking Save, there's no success/error toast or message shown.

\---

\#\#\# 🔝 Global / Header / Navigation

\*\*Issues found:\*\*  
\- \*\*No login or logout button\*\* — confirmed by existing comment, but worth restating: there's no way to log in, log out, or switch accounts anywhere in the UI.  
\- \*\*Global search bar doesn't return results\*\* — typing in the search field accepts input but shows nothing (no dropdown, no results page).  
\- \*\*User/profile dropdown doesn't open\*\* — clicking the "Digital Allies / digitalallies.net" header dropdown does nothing.  
\- \*\*Notification bell opens a comment thread\*\* — instead of a proper notifications panel, clicking the bell opens the last comment inline. Needs a proper notifications centre with all recent activity.  
\- \*\*"View live site" link\*\* — should be verified it points to the correct live URL (digitalallies.net).  
\- \*\*No user role or permissions system\*\* — no admin vs. editor distinction visible anywhere.  
\- \*\*No dark mode toggle\*\* — minor, but worth noting for future UI polish.

Here are all the comments with their locations:

\---

\*\*Comment 1\*\*  
📍 Location: \`/admin/development\`  
\> doesn't work needs templates

\---

\*\*Comment 2\*\*  
📍 Location: \`/admin/research\`  
\> doesn't work needs templates

\---

\*\*Comment 3\*\*  
📍 Location: \`/admin/projects\`  
\> doesn't work and need to build actual project templates

\---

\*\*Comment 4\*\*  
📍 Location: \`/admin/content\`  
\> needs to include templates for all category tabs as well as connect to the primary site for posting in the same format as the digitalallies.net/learn/ page articles

\---

\*\*Comment 5\*\*  
📍 Location: \`/admin\`  
\> dashboard is not wired to real data

\---

\*\*Comment 6\*\*  
📍 Location: \`/admin\`  
\> fake numbers

\---

\*\*Comment 7\*\*  
📍 Location: \`/admin/pages\`  
\> this build isn't meant for production \- new pages should offer a code option with live preview and use actual components for elements, sections, cards, etc.

\---

\*\*Comment 8\*\*  
📍 Location: \`/admin/development\`  
\> cms needs to be connected to actual site \- digitalallies.net

\---

\*\*Comment 9\*\*  
📍 Location: \`/admin/development\`  
\> real notifications need to be

\---

\*\*Comment 10\*\*  
📍 Location: \`/admin/development\`  
\> there is no login or out button

\---

That's all 10 comments\! A few things worth noting:  
\- \*\*Comment 9\*\* ("real notifications need to be") appears to be an incomplete thought — the sentence cuts off.  
\- Several comments point to \`/admin/development\`, suggesting that page has multiple open issues.

