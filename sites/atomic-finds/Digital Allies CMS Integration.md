# Atomic Fines × Digital Allies CMS Integration Guide

## Overview

Atomic Fines uses the **Digital Allies CMS** as its content management backbone. This guide covers setup, data sync, authentication, and best practices for managing Atomic Fines content through the CMS.

---

## 1. Integration Architecture

```
┌─────────────────────────────────────────┐
│   Atomic Fines Website (Frontend)       │
│   - Next.js / Static Site Generator     │
└────────────────┬────────────────────────┘
                 │ (API calls)
                 ↓
┌─────────────────────────────────────────┐
│  Digital Allies CMS API                 │
│  https://cms.digitalallies.net/api      │
│  - REST endpoints                       │
│  - Webhook support                      │
│  - Real-time sync                       │
└────────────────┬────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────┐
│  Content Database                       │
│  - Products (inventory)                 │
│  - Pages (static content)               │
│  - Blog Posts                           │
│  - Settings & Config                    │
│  - Media library                        │
└─────────────────────────────────────────┘
```

---

## 2. API Endpoints

### Base URL
```
https://cms.digitalallies.net/api/v1/atomic-fines
```

### Authentication
All requests require an API key in the header:
```
Authorization: Bearer YOUR_API_KEY_HERE
```

### Core Endpoints

#### Products
```
GET    /products              # List all products
GET    /products/:id          # Get product details
POST   /products              # Create product (admin only)
PUT    /products/:id          # Update product (admin only)
DELETE /products/:id          # Delete product (admin only)
GET    /products?category=seating  # Filter by category
GET    /products?featured=true     # Get featured items only
```

#### Pages
```
GET    /pages                 # List all published pages
GET    /pages/:slug           # Get page by slug
POST   /pages                 # Create page (admin only)
PUT    /pages/:id             # Update page (admin only)
```

#### Blog Posts
```
GET    /blog                  # List all published posts
GET    /blog/:slug            # Get post by slug
GET    /blog?category=restoration  # Filter by category
POST   /blog                  # Create post (admin only)
```

#### Settings
```
GET    /settings              # Get site configuration
PUT    /settings              # Update settings (admin only)
GET    /settings/contact      # Get contact info
GET    /settings/business-hours  # Get operating hours
```

#### Testimonials
```
GET    /testimonials          # List all testimonials
GET    /testimonials/featured # Get featured testimonials only
POST   /testimonials          # Submit testimonial (public)
```

---

## 3. Data Schema

### Product Object
```json
{
  "id": "prod_1a2b3c",
  "name": "Peacock Chair - 1970s",
  "slug": "peacock-chair-1970s",
  "description": "Iconic fan-back rattan chair, excellent condition...",
  "category": "seating",
  "price": 1450.00,
  "originalPrice": null,
  "inStock": true,
  "quantity": 2,
  "era": "1970s",
  "condition": "excellent",
  "dimensions": {
    "width": 32,
    "height": 48,
    "depth": 28,
    "unit": "in"
  },
  "images": [
    "https://cdn.digitalallies.net/atomic-fines/peacock-chair-01.jpg",
    "https://cdn.digitalallies.net/atomic-fines/peacock-chair-02.jpg"
  ],
  "featured": true,
  "tags": ["1970s", "rattan", "iconic", "statement-seating"],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-06-20T14:22:00Z"
}
```

### Page Object
```json
{
  "id": "page_about",
  "slug": "about",
  "title": "About Atomic Fines",
  "content": "<h2>Our Story</h2><p>Fran & Mabel started Atomic Fines...</p>",
  "heroImage": "https://cdn.digitalallies.net/atomic-fines/about-hero.jpg",
  "metaDescription": "Learn about Fran & Mabel's rattan revival mission",
  "published": true,
  "publishedAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-06-15T09:30:00Z"
}
```

### Blog Post Object
```json
{
  "id": "post_restoration_guide",
  "slug": "how-to-restore-rattan",
  "title": "Restoring Rattan: A How-To Guide",
  "excerpt": "Learn the basics of caring for vintage rattan...",
  "content": "<p>Rattan furniture requires specific care...</p>",
  "author": "Fran & Mabel",
  "category": "restoration",
  "tags": ["rattan-care", "vintage", "diy"],
  "featuredImage": "https://cdn.digitalallies.net/atomic-fines/restoration-guide.jpg",
  "publishedAt": "2024-06-10T10:00:00Z",
  "seoTitle": "How to Restore Vintage Rattan Furniture",
  "seoDescription": "Step-by-step guide to cleaning and restoring rattan"
}
```

---

## 4. Webhook Events

The CMS sends webhooks to `https://atomic-fines.com/api/webhooks/cms` for real-time sync:

```json
{
  "event": "product.created",
  "timestamp": "2024-06-20T14:22:00Z",
  "data": { /* product object */ }
}
```

**Supported events:**
- `product.created`
- `product.updated`
- `product.deleted`
- `page.published`
- `page.unpublished`
- `blog.published`
- `settings.updated`

---

## 5. Authentication & Permissions

### User Roles

| Role | Permissions |
|------|------------|
| **Admin** | Full CRUD on all collections, user management, API key management |
| **Editor** | Create/edit/publish products, pages, blog posts; view analytics |
| **Contributor** | Create draft content; submit for review (publish requires admin approval) |
| **Viewer** | Read-only access to published content |

### API Key Management
1. Log into Digital Allies CMS
2. Navigate to **Settings → API Keys**
3. Click **Generate New Key**
4. Copy the key (only shown once)
5. Paste into your `.env` file:
   ```
   DA_CMS_API_KEY=sk_live_atomic_fines_xxxxx
   ```

---

## 6. Frontend Integration (Next.js Example)

### Install SDK
```bash
npm install @digitalallies/cms-sdk
```

### Fetch Products
```javascript
import { DigitalAlliesCMS } from '@digitalallies/cms-sdk';

const cms = new DigitalAlliesCMS({
  apiKey: process.env.DA_CMS_API_KEY,
  workspace: 'atomic-fines'
});

// Fetch all products
export async function getProducts() {
  const products = await cms.products.list({
    limit: 50,
    sort: '-updatedAt'
  });
  return products;
}

// Fetch featured products
export async function getFeaturedProducts() {
  const featured = await cms.products.list({
    filter: { featured: true },
    limit: 6
  });
  return featured;
}

// Fetch product by slug
export async function getProductBySlug(slug) {
  const product = await cms.products.get(slug);
  return product;
}
```

### Fetch Pages
```javascript
// Fetch published page
export async function getPageBySlug(slug) {
  const page = await cms.pages.get(slug, {
    published: true
  });
  return page;
}
```

### Fetch Blog
```javascript
// Fetch published blog posts
export async function getBlogPosts(category = null) {
  const posts = await cms.blog.list({
    published: true,
    category: category,
    sort: '-publishedAt',
    limit: 12
  });
  return posts;
}
```

---

## 7. Content Scheduling & Publishing

### Publish a Product
```javascript
await cms.products.update('prod_1a2b3c', {
  featured: true,
  publishedAt: new Date().toISOString()
});
```

### Schedule Blog Post (publish later)
```javascript
await cms.blog.create({
  title: "New Article",
  content: "...",
  publishedAt: "2024-07-01T08:00:00Z"  // Future date
});
```

### Unpublish Content
```javascript
await cms.pages.update('page_id', {
  published: false
});
```

---

## 8. Real-Time Sync & Caching

### Static Generation with ISR (Incremental Static Regeneration)
```javascript
// pages/products/[slug].js
export async function getStaticProps({ params }) {
  const product = await getProductBySlug(params.slug);
  
  return {
    props: { product },
    revalidate: 3600  // Revalidate every hour
  };
}
```

### Webhook Handler (Next.js API Route)
```javascript
// pages/api/webhooks/cms.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { event, data } = req.body;
  
  // Trigger rebuild/cache invalidation
  if (event.startsWith('product.')) {
    await fetch(`${process.env.SITE_URL}/api/revalidate?secret=${process.env.ISR_SECRET}&path=/products/${data.slug}`);
  }
  
  res.status(200).json({ ok: true });
}
```

---

## 9. Image Management

### Upload Images via CMS
1. Log into Digital Allies CMS
2. Navigate to **Products → [Product Name]**
3. Click **Add Images** (or drag/drop)
4. CMS auto-optimizes and CDN-serves them
5. Image URLs appear in the product object

### Image URL Format
```
https://cdn.digitalallies.net/atomic-fines/{product-slug}/{image-name}.jpg
```

### Optimize Images in Frontend
```html
<!-- Use Next.js Image component for optimization -->
<Image
  src="https://cdn.digitalallies.net/atomic-fines/peacock-chair-01.jpg"
  alt="Peacock Chair"
  width={600}
  height={400}
  placeholder="blur"
/>
```

---

## 10. Content Moderation & Workflows

### Review Workflow
1. **Contributor** submits draft product/post
2. **Editor** reviews and leaves feedback
3. **Editor/Admin** approves
4. Content goes **live** (Webhook fires)
5. **Contributor** receives notification

### Workflow States
- `draft` — In progress, not visible
- `review` — Awaiting approval
- `published` — Live on site
- `archived` — Removed from public view

---

## 11. Monitoring & Analytics

### Track Content Performance
```javascript
// CMS Dashboard → Analytics
- Page views per product
- Blog engagement metrics
- Popular categories
- Visitor flow
```

### API Usage Limits
- **Free tier:** 10,000 requests/month
- **Pro tier:** 100,000 requests/month
- **Enterprise:** Unlimited

Check usage at **Settings → API → Usage**

---

## 12. Troubleshooting

### Products Not Showing
- **Check:** Is `published: true`?
- **Check:** API key has correct workspace
- **Check:** Webhook payload in CMS logs

### Images Not Loading
- **Check:** CDN URL is correct
- **Check:** Image was uploaded (not just linked)
- **Check:** Browser cache (hard refresh)

### API Rate Limit Error
- **Solution:** Implement caching (see ISR section)
- **Solution:** Increase plan tier
- **Contact:** support@digitalallies.net

---

## 13. Quick Reference

| Task | How To |
|------|--------|
| Add new product | CMS Admin → Products → + New |
| Publish blog post | CMS Admin → Blog → Create → Set publishedAt |
| Update site settings | CMS Admin → Settings → Edit → Save |
| Get API key | CMS Admin → Settings → API Keys → Generate |
| Fetch products in code | `cms.products.list()` |
| Invalidate cache | Webhook auto-triggers or manual ISR endpoint |
| View webhook logs | CMS Admin → Settings → Webhooks → Logs |

---

## Support & Documentation

- **CMS Docs:** https://docs.digitalallies.net/cms
- **API Reference:** https://api.digitalallies.net/docs
- **Support Email:** support@digitalallies.net
- **Slack Channel:** #atomic-fines-cms (Digital Allies workspace)

---

*Last updated: June 20, 2024*
