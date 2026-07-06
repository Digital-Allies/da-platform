# Client Site Template — Setup Guide

Time to launch a new client: **3–4 hours** (first time), **under 1 hour** (repeat).

---

## Prerequisites

- Node 20+
- GitHub account (repo already set up)
- Supabase account (one project shared across all clients)
- Vercel account (one deployment per client)
- Resend account (for contact form email)

---

## 1. First-time Supabase setup

Do this once. Skip if already done.

### 1a. Run the schema

1. Open your Supabase project → **SQL Editor**
2. Paste the contents of `supabase/schema.sql`
3. Click **Run**

This creates all 8 tables, the `get_my_client_id()` helper, RLS policies, and indexes.

### 1b. Enable email auth

Supabase Dashboard → **Authentication → Providers → Email** → make sure it is enabled.

### 1c. Configure Storage (for image uploads)

Dashboard → **Storage** → Create a bucket named `client-assets`
Set it to **Public** so images can be embedded in pages.

---

## 2. Add a new client

### 2a. Create the client's Supabase auth user

Dashboard → **Authentication → Users → Invite user**
Enter the client's email. They receive a set-password link.

### 2b. Insert the client record

Run in the SQL Editor (replace values):

```sql
insert into clients (auth_user_id, business_name)
values (
  '<paste the user UUID from Authentication → Users>',
  'Acme Roofing'
);
```

Copy the returned `id` — this is the **Client ID** you will use in Vercel.

### 2c. Seed default settings

```sql
insert into settings (client_id, key, value) values
  ('<CLIENT_ID>', 'site_title', 'Acme Roofing'),
  ('<CLIENT_ID>', 'brand_color', '#C5301A'),
  ('<CLIENT_ID>', 'hero_title', 'Roofing You Can Count On'),
  ('<CLIENT_ID>', 'hero_cta_text', 'Get a Free Quote'),
  ('<CLIENT_ID>', 'hero_cta_link', '#contact');
```

---

## 3. Deploy to Vercel

### 3a. Fork / import the repo

Vercel Dashboard → **Add New Project → Import Git Repository**
Select `client-site-template`.

### 3b. Set environment variables

In the Vercel project settings → **Environment Variables**, add:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | From Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | From Supabase → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | From Supabase → Project Settings → API (keep secret) |
| `NEXT_PUBLIC_CLIENT_ID` | The UUID from step 2b |
| `RESEND_API_KEY` | From resend.com → API Keys |
| `CONTACT_FORM_TO_EMAIL` | Client's email that receives contact form submissions |
| `NEXT_PUBLIC_SITE_URL` | `https://clientdomain.com` |

### 3c. Deploy

Click **Deploy**. Vercel builds and publishes.

### 3d. Custom domain

Vercel project → **Domains** → Add the client's domain.
Update DNS at their registrar to point to Vercel's nameservers.

---

## 4. Configure the site (admin panel)

The client (or you) logs in at `https://clientdomain.com/admin/login` with the email/password set in step 2a.

From the admin panel:
- **Settings** — fill in all business info, contact details, social links, brand color
- **Services** — add the services shown on the homepage
- **Testimonials** — add client reviews
- **Posts** — write blog content (Tiptap rich text editor)

---

## 5. Image uploads (logo, about photo, featured images)

1. Supabase Dashboard → **Storage → client-assets**
2. Upload the image
3. Click the image → **Get URL** → copy the public URL
4. Paste it into the relevant Settings field (Logo URL, About Image URL) or post Featured Image URL

---

## 6. Local development

```bash
# Clone
git clone https://github.com/your-org/client-site-template
cd client-site-template

# Install
npm install

# Create local env file (copy and fill in values)
cp .env.example .env.local

# Run dev server
npm run dev
```

Open `http://localhost:3000`.

To test admin locally: add a user in Supabase Auth and set `NEXT_PUBLIC_CLIENT_ID` in `.env.local`.

---

## File structure reference

```
src/
├── app/
│   ├── layout.tsx          ← root layout, injects --brand CSS variable
│   ├── page.tsx            ← public homepage
│   ├── blog/
│   │   ├── page.tsx        ← blog list
│   │   └── [slug]/page.tsx ← blog post
│   ├── admin/
│   │   ├── layout.tsx      ← admin auth guard
│   │   ├── AdminNav.tsx    ← admin navigation
│   │   ├── page.tsx        ← dashboard
│   │   ├── posts/          ← list + Tiptap editor
│   │   ├── services/       ← inline CRUD
│   │   ├── testimonials/   ← inline CRUD
│   │   ├── settings/       ← all site settings form
│   │   └── messages/       ← contact form inbox
│   └── api/
│       └── contact/route.ts ← saves to DB + sends Resend email
├── components/site/        ← all public-facing components
├── lib/
│   ├── data.ts             ← server-side data fetchers
│   ├── supabase.ts         ← browser client
│   ├── supabase-server.ts  ← server + service role clients
│   └── types.ts            ← TypeScript interfaces + parseSettings
├── middleware.ts            ← admin route protection
└── styles/globals.css      ← DA design system + Tailwind
supabase/
└── schema.sql              ← all tables, RLS, indexes
```

---

## Multi-client model

One GitHub repo. One Supabase project. One deployment per client on Vercel.

Each Vercel deployment gets a different `NEXT_PUBLIC_CLIENT_ID`.
All data is isolated by Row-Level Security — clients can only read/write their own rows.

To add client #2: repeat steps 2–4. No code changes needed.

---

## Troubleshooting

**Admin login fails:** Check that the user's `auth_user_id` in the `clients` table matches the UUID in Supabase Auth.

**Contact form not sending email:** Verify `RESEND_API_KEY` and `CONTACT_FORM_TO_EMAIL` are set in Vercel. The form still saves to DB even if Resend is not configured.

**Images not loading:** Check the Supabase Storage bucket is set to Public and the URL in settings starts with your Supabase project URL.

**Brand color not applying:** The `--brand` CSS variable is set on `<body>` from the `brand_color` setting. Check Settings → Brand Color is saved.

**Changes not live:** The site uses ISR (60-second revalidation). Changes appear within 1 minute of saving. Force a fresh deploy in Vercel to see changes instantly.
