# DA Platform Architecture — Non-Technical Overview

## Introduction

The DA Platform is a **multi-tenant Content Management System** built specifically for small businesses. "Multi-tenant" means one admin interface serves multiple independent businesses, all using the same underlying system while keeping their data completely separate and secure.

This guide explains how the platform works at a conceptual level — no coding knowledge required.

---

## Part 1: The Three Layers

The DA Platform has three main layers working together:

```
┌─────────────────────────────────────────┐
│  Your Public Website                    │
│  (what your customers see)              │
│  atomicfindsatx.store                   │
└─────────────────────────────────────────┘
           ↑ reads data from ↑
┌─────────────────────────────────────────┐
│  Admin Dashboard (CMS)                  │
│  (where you manage content)             │
│  cms.digitalallies.net/admin            │
└─────────────────────────────────────────┘
           ↑ writes to & reads from ↑
┌─────────────────────────────────────────┐
│  Database (Supabase)                    │
│  (stores all your data securely)        │
│  Hosted by Supabase (trusted provider)  │
└─────────────────────────────────────────┘
```

### Layer 1: Your Public Website
- **What it is:** The website your customers see and interact with
- **Where it lives:** Your custom domain (atomicfindsatx.store)
- **What it does:** Displays products, articles, about info, contact form
- **Technology:** Built with Next.js (a modern web framework)
- **Hosting:** Vercel (fast, reliable hosting)

### Layer 2: Admin Dashboard (CMS)
- **What it is:** A control panel where you manage content
- **Where it lives:** cms.digitalallies.net/admin (shared across all clients)
- **What you do:** Edit products, pages, articles, settings, brand colors
- **Technology:** Built with React (user interface framework)
- **Who uses it:** You (and Anthony for support/debugging)

### Layer 3: Database (Supabase)
- **What it is:** A secure database that stores all your data
- **Where it lives:** Supabase cloud (hosted in a secure data center)
- **What it stores:** Products, articles, reviews, settings, design tokens, pages, users
- **Technology:** PostgreSQL (battle-tested database system)
- **Security:** Uses Row-Level Security (RLS) to ensure your data is isolated

---

## Part 2: How Data Flows

### Scenario: You Edit a Product Price

1. **You login to the admin** at cms.digitalallies.net/admin
2. **You navigate to Showroom** and find "Vintage Rattan Chair"
3. **You change the price** from $250 to $225
4. **You click Save** → the admin sends the change to the database
5. **Database updates** the row for that product with the new price
6. **Your public site reads** the updated price from the database
7. **Within 10-30 seconds**, your website shows $225 instead of $250
8. **Your customers see the new price** without you doing anything else

### Scenario: You Publish a Blog Article

1. **You go to Press Office** in the admin
2. **You write a new article** titled "How to Restore Vintage Rattan"
3. **You click Publish**
4. **Database stores** the article as Published
5. **Your website's /learn page** automatically fetches and displays it
6. **Your customers can read** the article immediately

### Scenario: You Update Your Brand Colors

1. **You go to Brand Theme** in the admin
2. **You click the primary color** and pick a new shade (hex code #F5C842)
3. **You click Save**
4. **Database updates** the design_tokens row for your site
5. **Your website's CSS reloads** with the new color
6. **All buttons, headings, accents** across the entire site change color instantly
7. **No code changes needed** — it's all configuration

---

## Part 3: Multi-Tenant Isolation

### What Does "Multi-Tenant" Mean?

"Tenant" = a business using the platform (you).

The DA Platform serves **three tenants:**
- Digital Allies (the DA company itself)
- Atomic Finds ATX (your business)
- Healthcare Training Center (another client)

All three use the **same admin interface** and **same database**, but each sees **only their own data**.

### How Is Your Data Kept Separate?

Every record in the database has a `client_id` field — a unique identifier linking it to your business.

```
Example from the "products" table:

Row 1:  id=uuid-1, client_id=atomic-finds-id, title=Vintage Chair, price=250
Row 2:  id=uuid-2, client_id=atomic-finds-id, title=Rattan Dresser, price=285
Row 3:  id=uuid-3, client_id=healthcare-center-id, title=Training Module 1, ...
Row 4:  id=uuid-4, client_id=digital-allies-id, title=DA Brand Video, ...

When you log in:
→ The system checks your client_id
→ It shows only rows where client_id = atomic-finds-id
→ You see rows 1 & 2 (your products)
→ You never see rows 3 or 4 (other clients' data)
```

### Row-Level Security (RLS)

**What it is:** A security layer that enforces isolation at the database level.

**How it works:**
- Even if someone tries to hack the database directly, RLS prevents them from accessing data from other clients
- It's like a bouncer at a club — every query gets checked: "Is this request for your own client_id? No? You can't have it."

**Why this matters:**
- Your data is completely isolated from other clients' data
- Even Digital Allies can't accidentally see or modify your data
- Supabase handles RLS automatically; you don't need to think about it

---

## Part 4: Admin Dashboard Structure

The admin dashboard is organized into sections (tabs). Each section manages a specific part of your site:

### Sidebar Navigation

```
📊 Dashboard
   └─ Overview of your site activity

📄 Pages
   └─ Edit your website pages (home, about, contact, etc.)

📦 Showroom
   └─ Manage your product catalog

📚 The Press Office
   └─ Write and publish blog articles

🎯 Collections
   └─ Organize products into groups (Best Sellers, etc.)

🎨 Brand Theme
   └─ Change brand colors and fonts

⚙️ Settings
   └─ Business info, contact, hours, hero copy

🛠️ The Workshop
   └─ Internal project management (for you + Anthony)

📋 Research
   └─ Private notes and inspiration

🔐 Admin Settings
   └─ User accounts, permissions, advanced
```

Each section is independent — changes in one section don't break others.

---

## Part 5: Design Tokens & How They Work

### What Are Design Tokens?

Design tokens are **reusable design values** that control the look of your website:
- Colors (primary, secondary, backgrounds, text)
- Fonts (headings, body text)
- Spacing (padding, margins, gaps)
- Shadows, corner radius, line widths

### How Tokens Affect Your Site

Every element on your website uses tokens instead of hardcoded values.

```
Example: A button on your site

Hardcoded approach (BAD):
<button style="background-color: #F5C842; font-family: Bagel Fat One">
  Click Me
</button>
→ If you want to change the color, you have to find and edit every button

Token approach (GOOD):
<button style="background-color: var(--tok-primary); font-family: var(--tok-heading-font)">
  Click Me
</button>
→ Change the token value ONE time → all buttons update automatically
```

### Tokens in the Database

Your tokens are stored in the `design_tokens` table in Supabase:

```
client_id: atomic-finds-id
--tok-primary: #F5C842 (Celestial Yellow)
--tok-secondary: #D4822A (Amber Orange)
--tok-bg: #1E1E1E (Deep Charcoal)
--tok-text: #F0E8D8 (Bone White)
--tok-heading-font: Bagel Fat One
--tok-body-font: DM Sans
```

When your website loads, it reads these tokens and applies them everywhere.

### Editing Tokens in the Admin

**Brand Theme editor** (if enabled for your account):
1. Go to Admin > Brand Theme
2. Click a color swatch
3. Pick a new color or paste a hex code
4. Click Save
5. Your website updates within seconds

---

## Part 6: How Products & Collections Connect

### Products: The Source of Truth

Each product is a single record in the `products` table:

```
Product Record:
├─ id: uuid (unique identifier)
├─ client_id: atomic-finds-id
├─ title: "Vintage Rattan Chair"
├─ price: 250.00
├─ category: "Seating"
├─ description: "1970s swivel chair, excellent condition..."
├─ image_url: "https://cdn.example.com/chair.jpg"
├─ in_stock: true
├─ featured: false
└─ created_at: 2026-08-01T10:30:00Z
```

### Collections: Lists of Product IDs

A collection doesn't duplicate the product data — it just stores **which product IDs** belong to it:

```
Collection Record:
├─ id: uuid
├─ client_id: atomic-finds-id
├─ name: "Living Room Finds"
├─ featured: true
└─ item_ids: ["prod-uuid-1", "prod-uuid-2", "prod-uuid-5"]
             ↑ These are product IDs from the products table
```

### How This Saves Data & Prevents Errors

**Benefit 1: No Duplication**
- If you add the same product to 3 collections, you still have just 1 product record
- You're not storing "Vintage Chair" three times

**Benefit 2: Easy Updates**
- Change the price of "Vintage Chair" once → all 3 collections see the new price immediately
- Edit the description once → it's updated everywhere

**Benefit 3: Data Integrity**
- If you delete a product, it's automatically removed from all collections
- No orphaned references or broken links

---

## Part 7: The CMS to Website Flow

### When You Publish Content

```
1. You edit a product in the admin
   ↓
2. You click "Publish"
   ↓
3. Admin sends update to database (Supabase)
   ↓
4. Database confirms the update is stored
   ↓
5. Your website queries the database for new/updated products
   ↓
6. Website rebuilds the product grid with latest data
   ↓
7. Website serves updated HTML to your customers' browsers
   ↓
8. Customers see the new product (or updated price) on your site
   (Usually happens within 10-30 seconds)
```

### Caching & Performance

To make your website fast, the platform **caches** (temporarily stores) data:

- When someone visits your site, the website loads product data once
- For the next 30 seconds, it uses that cached data (no database queries)
- After 30 seconds, it checks for updates
- If you changed something in the admin, the cache is immediately flushed
- Next visitor sees the updated version

**In plain English:** Your website is fast because it doesn't query the database for every visitor. But changes still appear quickly because the cache is smart.

---

## Part 8: Authentication & Login

### How Login Works

```
1. You go to cms.digitalallies.net/admin
   ↓
2. You enter your email
   ↓
3. Supabase Auth sends a magic link to your email
   ↓
4. You click the link (or enter a code shown on screen)
   ↓
5. Supabase confirms you're really you
   ↓
6. The admin dashboard loads
   ↓
7. Your client_id is loaded into your session
   ↓
8. The admin shows only YOUR data (filtered by client_id)
   ↓
9. If you log out, your session ends
```

### Why Magic Links Instead of Passwords?

**Old way (passwords):**
- You have to remember a strong password
- If someone guesses it, they can access your account
- Passwords get reused across sites (risky)

**New way (magic links):**
- No password to remember
- Link only works once and expires after 10 minutes
- Only you can receive the link (at your email address)
- More secure, simpler experience

---

## Part 9: Hosting & Deployment

### Three Hosting Services Work Together

**Your Public Website:**
- **Service:** Vercel (a platform optimized for Next.js)
- **What it hosts:** Your website code and static files
- **How it updates:** When Anthony commits code to GitHub, Vercel automatically rebuilds and redeploys
- **Speed:** Vercel uses a global CDN (Content Delivery Network), so your site is fast everywhere

**Admin Dashboard:**
- **Service:** Also Vercel (same deployment, different URL)
- **What it hosts:** The admin interface code
- **URL:** cms.digitalallies.net

**Database & User Authentication:**
- **Service:** Supabase (PostgreSQL database + Auth)
- **What it stores:** All your product data, articles, reviews, users, settings
- **Security:** Encrypted in transit and at rest

### How It All Connects

```
Your Computer
  ↓
Internet
  ↓
Vercel (hosts website + admin)
  ↓
Supabase (stores & serves data)
```

When you load atomicfindsatx.store:
1. Vercel sends the website code to your browser
2. JavaScript in the browser says "fetch products from Supabase"
3. Supabase checks your client_id and returns only your products
4. Browser displays the products to the visitor

---

## Part 10: Scaling & Limits

### Current Capacity

As of 2026, the platform handles:
- ✅ Thousands of products per client
- ✅ Thousands of customers/reviews
- ✅ Hundreds of pages and articles
- ✅ Multiple collections and organizational schemes
- ✅ High-volume traffic (thanks to Vercel CDN)

### What Might Slow Down

- Uploading 10,000 products at once (takes a few minutes)
- Running complex searches across millions of records (rare)
- Very large images (over 5MB) being uploaded simultaneously

**In practice:** If you're a typical business (under 10,000 products), you'll never hit these limits.

---

## Part 11: Backups & Data Safety

### How Your Data Is Protected

**Supabase provides:**
- Daily automated backups (kept for 7 days)
- Point-in-time recovery (can restore to any day)
- Encryption at rest (data encrypted on disk)
- Encryption in transit (HTTPS everywhere)
- DDoS protection (prevents attacks that crash sites)

**Anthony monitors:**
- Database performance and uptime
- Security logs and RLS policies
- Deployment status (making sure new code doesn't break anything)

### Your Responsibility

- **Don't delete products you might need later** → Archive them instead (hidden but kept)
- **Proofread before publishing** → You can edit after publishing, but it's better to get it right
- **Test on mobile** → See how content looks on phones before publishing
- **Keep URLs stable** → If you change a product URL, old links break (consider redirects)

---

## Part 12: Glossary

| Term | Meaning |
|------|---------|
| **CMS** | Content Management System — a tool for editing website content without coding |
| **Admin** | The control panel where you manage your site |
| **Multi-tenant** | One system serving multiple independent businesses |
| **Client ID** | A unique identifier linking all your data together |
| **Row-Level Security (RLS)** | Database security that ensures your data is separate from other clients' |
| **Design Token** | A reusable design value (color, font, spacing) |
| **Cache** | Temporarily stored data that makes websites fast |
| **Magic Link** | An email link that logs you in without a password |
| **Vercel** | A hosting platform optimized for fast website delivery |
| **Supabase** | A secure cloud database and authentication service |
| **PostgreSQL** | A powerful, reliable database system |
| **UUID** | A unique identifier (looks like: `a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6`) |
| **CDN** | Content Delivery Network — a global system of servers that makes sites fast |
| **HTTPS** | Secure connection protocol (the padlock in your browser) |
| **Deployment** | The process of making code live on the internet |

---

## Quick Reference: How to Find Things

| I want to... | I go to... |
|--------------|-----------|
| Edit a product | Showroom → Find product → Edit |
| Add a blog post | Press Office → New Article → Write → Publish |
| Change brand colors | Brand Theme → Click color → Pick new shade → Save |
| Update my phone number | Settings → Contact → Phone → Save |
| Create a "Best Sellers" section | Collections → New → Add products → Toggle Featured |
| Invite Anthony to see a project | Workshop → New Project → Add people → Save |
| Reset my password | Login page → "Trouble logging in?" → Check email |
| See my live website | Visit atomicfindsatx.store |
| Access the admin | Visit cms.digitalallies.net/admin |
| Check if changes are live | Refresh your website (Cmd+R on Mac, Ctrl+R on Windows) |

