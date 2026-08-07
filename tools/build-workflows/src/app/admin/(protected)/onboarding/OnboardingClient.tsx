'use client';

import React, { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

const sections: Section[] = [
  {
    id: 'getting-started',
    title: 'Getting Started with Atomic Finds',
    content: (
      <div>
        <h3>Welcome to Your Atomic Finds Dashboard</h3>
        <p>This is your command center for managing your vintage collection, product catalog, and customer communications. From here, you control everything your customers see on atomicfindsatx.store.</p>
        <h4>Quick Start (5 minutes):</h4>
        <ol>
          <li><strong>Set Your Brand:</strong> Go to Brand Theme and set the Atomic Finds color palette (Celestial Yellow, Deep Charcoal)</li>
          <li><strong>Add Your First Product:</strong> Use Showroom to add a vintage piece with detailed photos and description</li>
          <li><strong>Organize with Collections:</strong> Collections help customers discover by category (Seating, Tables, Storage, etc.)</li>
          <li><strong>Meet The Curators:</strong> These four characters help guide customers—learn how they assign to products below</li>
          <li><strong>Review Messages:</strong> Customer inquiries appear in Messages—respond within 24 hours</li>
        </ol>
        <p><strong>Key insight:</strong> Your success depends on authentic product descriptions and high-quality photos. Vintage furniture sells on detail and story.</p>
      </div>
    ),
  },
  {
    id: 'dashboard-overview',
    title: 'Dashboard Overview',
    content: (
      <div>
        <h3>Understanding Your Dashboard</h3>
        <p><strong>Left Sidebar:</strong> Navigate between all major sections</p>
        <ul>
          <li><strong>Messages</strong> - Contact form submissions</li>
          <li><strong>Pages</strong> - Custom pages (About, Contact, Terms, Privacy, etc.)</li>
          <li><strong>Collections</strong> - Product categories</li>
          <li><strong>Showroom</strong> - Your products/inventory</li>
          <li><strong>The Press Office</strong> - Blog posts and content</li>
          <li><strong>Projects</strong> - Track your build checklist (The Workshop for dev only)</li>
          <li><strong>Brand Theme</strong> - Logo, colors, fonts</li>
          <li><strong>Settings</strong> - Business info, contact details, social links</li>
        </ul>
        <p><strong>Top Right:</strong> Your account menu (logout, settings)</p>
      </div>
    ),
  },
  {
    id: 'brand-setup',
    title: 'Setting Up the Atomic Finds Aesthetic',
    content: (
      <div>
        <h3>Make Your Site Match Your Brand</h3>
        <h4>Brand Theme Colors</h4>
        <p>Atomic Finds uses a celestial 1970s aesthetic with specific colors that drive brand recognition:</p>
        <ul>
          <li><strong>Primary (Celestial Yellow):</strong> #F5C842 — buttons, highlights, the cosmic energy</li>
          <li><strong>Dark Background (MCM Charcoal):</strong> #1E1E1E — elegant depth for product display</li>
          <li><strong>Accent (Warm Gold):</strong> Used for glows and orbital effects on product cards</li>
        </ul>
        <h4>Step 1: Set Your Brand Theme</h4>
        <ol>
          <li>Click "Brand Theme" in the left menu</li>
          <li>Upload the Atomic Finds logo (mark.svg)</li>
          <li>Set primary color to #F5C842 (Celestial Yellow)</li>
          <li>Set background to #1E1E1E (MCM Charcoal)</li>
          <li>Choose fonts: headings (Bagel Fat One), body (DM Sans)</li>
          <li>Save</li>
        </ol>
        <h4>Step 2: Contact Info & Social</h4>
        <ol>
          <li>Click "Settings"</li>
          <li>Business name: "Atomic Finds ATX"</li>
          <li>Hours: Pickup by appointment</li>
          <li>Phone: [Your number]</li>
          <li>Email: atomicfindsatx@gmail.com</li>
          <li>Link Instagram, Facebook (where customers see your new finds)</li>
          <li>Save</li>
        </ol>
        <p><strong>Why this matters:</strong> Consistent branding builds trust. Customers should feel the vintage, cosmic vibe across every touchpoint.</p>
      </div>
    ),
  },
  {
    id: 'adding-products',
    title: 'Adding Products to Your Collection',
    content: (
      <div>
        <h3>Publish Your Vintage Finds</h3>
        <p>Every product tells a story. Your descriptions are the difference between a browser and a buyer.</p>
        <h4>Add a Product One at a Time</h4>
        <ol>
          <li>Go to "Showroom" in the left menu</li>
          <li>Click "Add Product"</li>
          <li>Fill in the essentials:
            <ul style={{ marginTop: '8px' }}>
              <li><strong>Title:</strong> Era + Material + Item. Example: "1970s Rattan Coffee Table with Glass Top"</li>
              <li><strong>Description:</strong> Tell the story. Why is this piece special? What's the condition? Any restoration?</li>
              <li><strong>Price:</strong> Your asking price</li>
              <li><strong>Collection:</strong> Assign to Seating, Tables, Storage, etc.</li>
              <li><strong>Curator:</strong> Which character guides this? (Daisy for comfort, Milo for craftsmanship, Tatiana for drama, Malibu for gatherings)</li>
            </ul>
          </li>
          <li>Upload photos (minimum 3–4 angles, high resolution)</li>
          <li>Click "Publish"</li>
        </ol>
        <h4>Product Description Formula</h4>
        <p>Use this template: [Era] [Material] [Style] | [Unique Feature] | [Condition/Restoration] | [Who It's For]</p>
        <p><strong>Example:</strong> "1970s rattan coffee table with natural woven base and glass top. Brings warmth and texture without feeling precious. Cleaned and reinforced. Perfect for any living room that needs character."</p>
        <h4>Bulk Import (CSV)</h4>
        <ol>
          <li>Go to "Collections" in the left menu</li>
          <li>Select a collection (e.g., "Seating")</li>
          <li>Click "Import CSV"</li>
          <li>Upload a spreadsheet with columns: name, price, description, collection, curator, image_url</li>
          <li>Review the preview and confirm</li>
        </ol>
        <p><strong>Pro tip:</strong> Authentic, detailed descriptions convert. Don't skip condition notes or measurements. Collectors want to know exactly what they're buying.</p>
      </div>
    ),
  },
  {
    id: 'managing-pages',
    title: 'Creating & Editing Pages',
    content: (
      <div>
        <h3>Build Your Story with Custom Pages</h3>
        <h4>Key Atomic Finds Pages</h4>
        <p>These pages are essential to your brand. Write them in your voice, with specific details:</p>
        <ul>
          <li><strong>About Jennyfer:</strong> Your sourcing story. Why vintage? What drives you? Builds trust and connection.</li>
          <li><strong>The Curators:</strong> Introduce Daisy, Milo, Tatiana, Malibu. Let customers pick their guide.</li>
          <li><strong>How It Works:</strong> From browse to pickup. Clear expectations = happy customers.</li>
          <li><strong>Contact:</strong> Make it easy to reach you. Questions about condition, pickup, delivery—answer them proactively.</li>
          <li><strong>Journal / Blog:</strong> Restoration stories, care tips, Austin vintage guides. Builds SEO + authority.</li>
        </ul>
        <h4>How to Create a Page</h4>
        <ol>
          <li>Go to "Pages" in the left menu</li>
          <li>Click "New Page"</li>
          <li>Title (e.g., "About Jennyfer")</li>
          <li>Write your content. Use the block editor to add text, images, sections</li>
          <li>Add a featured image (shows on collections pages, social shares)</li>
          <li>Set the slug (URL path, e.g., /about-jennyfer)</li>
          <li>Publish</li>
        </ol>
        <h4>Required Pages (Auto-Generated)</h4>
        <ul>
          <li>Privacy Policy, Terms of Service, Cookie Policy</li>
          <li>Accessibility Statement, AI Disclosure</li>
          <li>These are legal + compliance—we provide templates. Customize minimally.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'collections',
    title: 'Organizing with Collections',
    content: (
      <div>
        <h3>Help Customers Find What They Love</h3>
        <h4>Atomic Finds Collection Structure</h4>
        <p>Collections are how customers browse. Use these primary categories:</p>
        <ul>
          <li><strong>Seating:</strong> Lounge chairs, barrel chairs, dining chairs, statement seats</li>
          <li><strong>Tables:</strong> Coffee tables, side tables, dining tables, glass-topped finds</li>
          <li><strong>Storage & Shelving:</strong> Étagères, cabinets, credenzas, shelving units</li>
          <li><strong>Dining & Entertaining:</strong> Bar carts, dining sets, party-ready pieces</li>
          <li><strong>Bedroom:</strong> Dressers, nightstands, soft-textured finds</li>
          <li><strong>Plant & Decor:</strong> Plant stands, mirrors, lighting, character pieces</li>
          <li><strong>New Arrivals:</strong> Auto-tag recent finds so customers see what's fresh</li>
          <li><strong>Statement Pieces:</strong> Your showstoppers—dramatic silhouettes, conversation starters</li>
        </ul>
        <h4>Create a Collection</h4>
        <ol>
          <li>Go to "Collections" in the left menu</li>
          <li>Click "New Collection"</li>
          <li>Name: (e.g., "Seating")</li>
          <li>Description: Write what customers will see. Example: "Lounge-worthy seating, sculptural frames, and statement seats that make people linger."</li>
          <li>Save</li>
        </ol>
        <h4>Assign Products to Collections</h4>
        <p>When creating a product, select its primary collection. A rattan lounge chair goes in Seating. A bar cart goes in Dining & Entertaining. Collections help customers navigate and improve SEO.</p>
      </div>
    ),
  },
  {
    id: 'messages-contact',
    title: 'Handling Messages & Contact Submissions',
    content: (
      <div>
        <h3>Stay Connected with Customers</h3>
        <h4>Where Messages Appear</h4>
        <ol>
          <li>Go to "Messages" tab</li>
          <li>You'll see all contact form submissions here</li>
          <li>Each message shows: name, email, phone, message, date</li>
        </ol>
        <h4>Responding</h4>
        <ol>
          <li>Click on a message</li>
          <li>Read the full submission</li>
          <li>Reply via email (copy their email address from the message)</li>
          <li>Or mark as handled when done</li>
        </ol>
        <p><strong>💡 Tip:</strong> Respond promptly (within 24 hours). First impression matters!</p>
      </div>
    ),
  },
  {
    id: 'csv-uploader',
    title: 'CSV Bulk Imports (Advanced)',
    content: (
      <div>
        <h3>Import Multiple Products at Once</h3>
        <p>For larger inventories or updates, CSV import saves time. This guide covers the Atomic Finds-specific workflow.</p>
        <h4>CSV Format</h4>
        <p>Create a spreadsheet (Google Sheets or Excel) with these columns:</p>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          <li><code>name</code> — Product title (e.g., "1970s Rattan Coffee Table with Glass Top")</li>
          <li><code>price</code> — Asking price (numeric, no $ symbol)</li>
          <li><code>description</code> — Full description with era, materials, condition, restoration notes</li>
          <li><code>collection</code> — Primary category (Seating, Tables, Storage, etc.)</li>
          <li><code>curator</code> — Assigned character (Daisy, Milo, Tatiana, or Malibu)</li>
          <li><code>image_url</code> — URL to the product photo (must be publicly accessible)</li>
          <li><code>tags</code> — Comma-separated keywords (rattan, vintage, 1970s, boho, living-room)</li>
        </ul>
        <h4>How to Import</h4>
        <ol>
          <li>Prepare your CSV file with the columns above</li>
          <li>Go to "Collections" → select a collection</li>
          <li>Click "Import CSV"</li>
          <li>Upload your file</li>
          <li>Review the preview (check for errors)</li>
          <li>Click "Confirm"</li>
          <li>Wait for processing (usually 1–2 minutes)</li>
        </ol>
        <p><strong>Pro tip:</strong> Test with 3–5 products first. Once you're confident, do larger batches. Always review the preview before confirming.</p>
      </div>
    ),
  },
  {
    id: 'the-curators',
    title: 'The Curators System',
    content: (
      <div>
        <h3>Meet Your Four Guides</h3>
        <p>The Curators are playful characters who help customers discover products by feeling, function, and personality. Each has a specialty and voice. Assign one Curator to every product.</p>
        <h4>Daisy — The Laid-Back Tastemaker</h4>
        <ul>
          <li><strong>Specialty:</strong> Comfort. Lounge chairs, peacock chairs, any hero seating you sink into.</li>
          <li><strong>Voice:</strong> "If it makes you exhale, it's the one."</li>
          <li><strong>On Product Cards:</strong> "Trust me—this one just wants to be your favorite spot in the house."</li>
          <li><strong>Assign to:</strong> Lounge chairs, relaxed seating, comfort-first pieces</li>
        </ul>
        <h4>Milo — The Detail Nerd</h4>
        <ul>
          <li><strong>Specialty:</strong> Craftsmanship. He reads joinery like star charts. Rattan, bamboo, solid construction.</li>
          <li><strong>Voice:</strong> "The good stuff is in the construction."</li>
          <li><strong>On Product Cards:</strong> "Hand-woven rattan, restored joints, built to outlast us both. I checked."</li>
          <li><strong>Assign to:</strong> Woven pieces, craftsmanship-forward, restoration stories, high-quality materials</li>
        </ul>
        <h4>Tatiana — The Bold One</h4>
        <ul>
          <li><strong>Specialty:</strong> Drama and sculptural silhouettes. Bold, conversation-starting pieces.</li>
          <li><strong>Voice:</strong> "Play it safe? In this economy? No."</li>
          <li><strong>On Product Cards:</strong> "This is the piece people ask about at every party. Be the person with the answer."</li>
          <li><strong>Assign to:</strong> Statement pieces, unusual forms, arched shelves, showstoppers</li>
        </ul>
        <h4>Malibu — The Host With the Most</h4>
        <ul>
          <li><strong>Specialty:</strong> Entertaining and gathering. Bar carts, dining tables, social pieces.</li>
          <li><strong>Voice:</strong> "Make room for a good time."</li>
          <li><strong>On Product Cards:</strong> "Picture it: friends, this cart, golden hour. You're welcome."</li>
          <li><strong>Assign to:</strong> Bar carts, dining sets, entertaining furniture, social seating</li>
        </ul>
        <p><strong>Why Curators matter:</strong> They give your site personality. Customers feel guided, not just browsing. Each character is a lens for discovery.</p>
      </div>
    ),
  },
  {
    id: 'blog-press',
    title: 'Publishing in The Journal',
    content: (
      <div>
        <h3>Build Authority with Original Content</h3>
        <p>The Journal (Press Office) is where you share restoration stories, care tips, Austin vintage guides, and styling features. This content drives organic traffic and builds trust.</p>
        <h4>Types of Content That Work</h4>
        <ul>
          <li><strong>Restoration Stories:</strong> "How I Revived This 1970s Rattan Lounge Chair"</li>
          <li><strong>Care Guides:</strong> "How to Clean and Maintain Vintage Rattan"</li>
          <li><strong>Austin Vintage Culture:</strong> "Where to Find Vintage Furniture in South Austin"</li>
          <li><strong>Styling Features:</strong> "Rattan in Modern Homes: 5 Ways to Style Vintage Pieces"</li>
          <li><strong>Product Spotlights:</strong> "This 1970s Credenza Changed Everything" (with photos, story, why it's special)</li>
        </ul>
        <h4>How to Publish</h4>
        <ol>
          <li>Go to "The Press Office" in the left menu</li>
          <li>Click "New Post"</li>
          <li>Title (SEO-friendly: include era, material, or keyword)</li>
          <li>Write your content. Use the block editor to add text, images, sections</li>
          <li>Add a featured image (this shows on social, collections pages, and search results)</li>
          <li>Set publish date (can be future-dated to schedule)</li>
          <li>Add tags (restoration, rattan, 1970s, austin-vintage, etc.)</li>
          <li>Publish</li>
        </ol>
        <p><strong>Pro tip:</strong> Publish 2–4 posts per month. Blog posts rank for "vintage furniture Austin" + build customer loyalty. Every post is SEO gold.</p>
      </div>
    ),
  },
  {
    id: 'projects-tracking',
    title: 'Using Projects to Track Progress',
    content: (
      <div>
        <h3>Stay Organized with The Workshop</h3>
        <h4>What Are Projects?</h4>
        <p>Projects help you track your site build checklist. Each project has tasks that you move through stages: To Do → In Progress → Review → Done</p>
        <h4>Using Your Website Launch Checklist</h4>
        <ol>
          <li>Go to "Projects" (or "The Workshop" for admins)</li>
          <li>You'll see "Website Launch Checklist"</li>
          <li>It's organized into 6 phases: Technical, Brand, Pages, SEO, Performance, Admin Setup</li>
          <li>Drag tasks between columns as you progress</li>
          <li>The checklist helps you know exactly what's left to do</li>
        </ol>
        <p><strong>💡 Tip:</strong> Completing this checklist ensures your site is launch-ready!</p>
      </div>
    ),
  },
  {
    id: 'seo-basics',
    title: 'SEO Basics for Vintage Discovery',
    content: (
      <div>
        <h3>Get Found by Customers Searching for Vintage</h3>
        <p>Austin customers search for "vintage rattan furniture," "1970s bamboo," and "vintage furniture Austin." Your titles and descriptions should answer these searches naturally.</p>
        <h4>Title & Meta Descriptions</h4>
        <p>Every product needs both:</p>
        <ul>
          <li><strong>Product Title (50-60 chars):</strong> Era + Material + Item. Keyword-rich but natural. Example: "1970s Rattan Coffee Table with Glass Top"</li>
          <li><strong>Meta Description (150-160 chars):</strong> What makes this piece special? Who is it for? Example: "Authentic 1970s rattan coffee table. Hand-cleaned, reinforced joints, ready for a new home in Austin."</li>
        </ul>
        <h4>High-Impact Keywords for Atomic Finds</h4>
        <ul>
          <li>Vintage rattan furniture, vintage bamboo furniture, mid-century modern seating</li>
          <li>Vintage furniture Austin, rattan furniture Austin, 1970s vintage</li>
          <li>Sustainable vintage, authentic vintage, restored vintage</li>
          <li>Boho vintage, retro furniture, woven furniture</li>
        </ul>
        <h4>Where Keywords Go</h4>
        <ul>
          <li>Product titles (most important)</li>
          <li>Meta descriptions</li>
          <li>Product tags (rattan, 1970s, boho, austin-vintage)</li>
          <li>Blog posts and Journal content</li>
          <li>Image alt text (describe the piece, include materials)</li>
        </ul>
        <h4>What We Handle Automatically</h4>
        <ul>
          <li>XML Sitemap (Google knows every product, page, blog post)</li>
          <li>robots.txt (tells search engines what to crawl)</li>
          <li>Schema markup (Google understands product info: price, condition, images)</li>
          <li>Mobile-responsive design (no mobile penalty)</li>
          <li>Fast page speeds (we optimize automatically)</li>
        </ul>
        <p><strong>Pro tip:</strong> You don't need to stuff keywords. Write naturally for customers. "Vintage Rattan Coffee Table for Living Rooms" beats "rattan rattan rattan coffee table."</p>
      </div>
    ),
  },
  {
    id: 'accessibility-wcag',
    title: 'Accessibility & WCAG Compliance',
    content: (
      <div>
        <h3>Make Your Site Usable for Everyone</h3>
        <h4>What Is WCAG?</h4>
        <p>Web Content Accessibility Guidelines (WCAG 2.1 Level AA) ensure your site works for people with disabilities, including blind/low-vision, deaf/hard of hearing, and those with mobility challenges.</p>
        <h4>What's Included</h4>
        <ul>
          <li>High contrast text (readable for low-vision users)</li>
          <li>Alt text on all images (for screen readers)</li>
          <li>Keyboard navigation (no mouse required)</li>
          <li>Semantic HTML (proper heading hierarchy, landmarks)</li>
          <li>Color not alone for meaning (icons + text)</li>
          <li>Focus indicators (visible outline when tabbing)</li>
        </ul>
        <h4>What You Should Do</h4>
        <ol>
          <li>Write good alt text for every image (describe what's in it, not "image of product")</li>
          <li>Use descriptive link text ("Learn more about returns" vs "Click here")</li>
          <li>Keep color contrast high (light text on dark, or vice versa)</li>
          <li>Don't rely on color alone to convey information</li>
        </ol>
        <p><strong>💡 Tip:</strong> We audited your site to WCAG 2.1 AA and fixed what needed fixing. Check the /accessibility page for our statement.</p>
      </div>
    ),
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting & FAQ',
    content: (
      <div>
        <h3>Common Questions & Quick Fixes</h3>
        <h4>Products & Publishing</h4>
        <ul>
          <li><strong>"Changes aren't showing on the site"</strong> - Always click "Publish" when you're done editing. Drafts stay hidden. Wait 30 seconds for updates to appear live.</li>
          <li><strong>"Image won't upload"</strong> - Check file size (under 5MB). Use JPG or PNG. Ensure the image is not corrupted. Retry.</li>
          <li><strong>"Product won't appear on its collection page"</strong> - Make sure it's published (not draft) AND assigned to a collection. Both are required.</li>
          <li><strong>"Bulk CSV import failed"</strong> - Check your spreadsheet columns match the format (name, price, description, collection, curator, image_url, tags). Preview errors before confirming.</li>
        </ul>
        <h4>Account & Access</h4>
        <ul>
          <li><strong>"Can't log in"</strong> - Check your email for the magic login link. (Check spam folder!) If nothing arrives, wait a few minutes and try again.</li>
          <li><strong>"I forgot my password"</strong> - No password to forget! We use magic links. Just click the link in your email. If you didn't get it, request a new one.</li>
        </ul>
        <h4>Messages & Customer Contact</h4>
        <ul>
          <li><strong>"Customer messages aren't showing up"</strong> - Check the Messages tab. Make sure your contact form is published and linked on your site. Emails might go to spam—check there too.</li>
          <li><strong>"I want to respond to a message"</strong> - Click the message, copy the customer's email, and reply directly from your email. Or use our Reply feature if available.</li>
        </ul>
        <h4>Brand & Design</h4>
        <ul>
          <li><strong>"Logo is huge/tiny on the site"</strong> - Check Brand Theme. Logo size is set there. Resize and re-upload if needed.</li>
          <li><strong>"Colors look wrong"</strong> - Brand Theme controls all colors. Make sure you've set Primary (#F5C842 for Atomic Finds), Background (#1E1E1E), and Accent colors.</li>
          <li><strong>"Font isn't what I chose"</strong> - Fonts are set in Brand Theme. If changes don't show, clear your browser cache (Ctrl+Shift+Del or Cmd+Shift+Del) and refresh.</li>
        </ul>
        <h4>Performance & Issues</h4>
        <ul>
          <li><strong>"Site feels slow"</strong> - Large images slow everything down. Compress photos before uploading (1–2MB is ideal). We optimize automatically, but smaller is faster.</li>
          <li><strong>"Mobile site looks broken"</strong> - We auto-responsive, but check on your phone. Let us know what's off and send a screenshot.</li>
        </ul>
        <h4>Get Support</h4>
        <p>Email <strong>contact@digitalallies.net</strong> with:</p>
        <ul>
          <li>A clear description of what's happening</li>
          <li>A screenshot if possible</li>
          <li>The exact product or page affected</li>
        </ul>
        <p>We aim to respond within 24 hours.</p>
      </div>
    ),
  },
];

/**
 * TEMPLATE NOTES FOR REUSE IN CMS SITE TEMPLATE
 * ============================================
 *
 * STRUCTURE (generalizable across all clients):
 * - 11–13 collapsible sections with Expand/Collapse All buttons
 * - Each section has title, heading, body content, lists, code blocks
 * - Smooth transitions, mobile-responsive design
 * - Footer with support links and resource references
 * - Uses CSS variables for theming (--brand, --charcoal)
 *
 * ATOMIC FINDS SPECIFIC (replace for DA or other clients):
 * - Brand colors: #F5C842 (Celestial Yellow), #1E1E1E (MCM Charcoal)
 * - Sidebar items: Showroom, Collections, The Press Office, The Workshop
 * - Product taxonomy: Seating, Tables, Storage & Shelving, Dining & Entertaining, Bedroom, Plant & Decor
 * - Curator system: Daisy, Milo, Tatiana, Malibu (with specific voices and specialties)
 * - Copy tone: warm, cosmic, tactile, authentic vintage focus
 * - Links: /admin/projects (The Workshop), CSV guides, platform architecture, brand guide
 * - SEO focus: "vintage rattan," "Austin vintage," "1970s furniture" keywords
 * - Collection examples: "Seating," "Tables," "Storage & Shelving," "Dining & Entertaining"
 *
 * FOR DA CMS TEMPLATE:
 * - Keep the 11–13 section structure
 * - Replace #F5C842 with DA primary color (e.g., #2563EB for professional blue)
 * - Replace sidebar with DA modules (if different from AF)
 * - Remove Curator system (unless DA has equivalent brand personas)
 * - Update copy tone to DA voice (professional, client-focused)
 * - Replace collections with DA categories (if different)
 * - Update keywords/SEO examples to generic platform focus
 * - Update footer links to reference DA resources
 * - Change branding from "Atomic Finds" to "Digital Allies" or client name
 *
 * QUICK REPLICATION CHECKLIST:
 * [ ] Update title: "Atomic Finds Onboarding Guide" → "[Client Name] Onboarding Guide"
 * [ ] Replace all #F5C842 with --tok-primary (CSS variable for DA)
 * [ ] Replace Curator section with client's equivalent (or remove)
 * [ ] Update collection examples to match client's structure
 * [ ] Update sidebar references (Showroom → Products, The Press Office → Blog, etc.)
 * [ ] Update SEO examples (vintage → client's industry)
 * [ ] Update footer links to client's brand guide/resources
 * [ ] Update support email (contact@digitalallies.net → DA or client email)
 */

export default function OnboardingClient() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['getting-started']);

  const toggleSection = (id: string) => {
    setExpandedSections(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>Atomic Finds Onboarding Guide</h1>
        <p style={{ fontSize: '14px', color: 'var(--charcoal, #2D2D2D)', opacity: 0.7 }}>
          Your complete guide to managing products, collections, content, and customer interactions. Welcome to the Atomic Finds command center.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setExpandedSections(sections.map(s => s.id))}
          style={{
            padding: '8px 16px',
            fontSize: '12px',
            fontWeight: 600,
            background: 'var(--brand, #C5301A)',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Expand All
        </button>
        <button
          onClick={() => setExpandedSections([])}
          style={{
            padding: '8px 16px',
            fontSize: '12px',
            fontWeight: 600,
            background: 'transparent',
            color: 'var(--charcoal, #2D2D2D)',
            border: '1px solid var(--charcoal, #2D2D2D)',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Collapse All
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {sections.map((section) => {
          const isExpanded = expandedSections.includes(section.id);
          return (
            <div
              key={section.id}
              style={{
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '6px',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => toggleSection(section.id)}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: isExpanded ? 'rgba(0,0,0,0.03)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  textAlign: 'left',
                  color: 'var(--charcoal, #2D2D2D)',
                }}
              >
                <span>{section.title}</span>
                <ChevronDown
                  size={16}
                  style={{
                    transition: 'transform 200ms',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>
              {isExpanded && (
                <div
                  style={{
                    padding: '16px',
                    borderTop: '1px solid rgba(0,0,0,0.1)',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: 'var(--charcoal, #2D2D2D)',
                  }}
                >
                  {section.content}
                  <style>{`
                    div h3 { margin-top: 16px; margin-bottom: 8px; font-size: 16px; font-weight: 600; }
                    div h4 { margin-top: 12px; margin-bottom: 6px; font-size: 14px; font-weight: 600; color: var(--brand, #C5301A); }
                    div p { margin-bottom: 10px; }
                    div ol, div ul { margin-left: 20px; margin-bottom: 10px; }
                    div li { margin-bottom: 6px; }
                    div strong { font-weight: 600; }
                  `}</style>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: '32px',
          padding: '16px',
          background: 'linear-gradient(135deg, var(--brand, #F5C842) 0%, rgba(245, 200, 66, 0.1) 100%)',
          border: '1px solid var(--brand, #F5C842)',
          borderRadius: '6px',
          fontSize: '13px',
          color: 'var(--charcoal, #2D2D2D)',
        }}
      >
        <p style={{ marginBottom: '12px' }}>
          <strong>You're all set!</strong> This guide covers the essentials. For deep dives, training videos, and brand resources:
        </p>
        <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
          <li><strong>CSV Uploader Guide:</strong> Step-by-step for bulk imports in <code>/public/onboarding/references/csv-uploader-guide.md</code></li>
          <li><strong>Platform Architecture:</strong> How the CMS works under the hood at <code>/public/onboarding/references/platform-architecture.md</code></li>
          <li><strong>Atomic Finds Brand Guide:</strong> Voice, colors, fonts, product copy templates at <code>/public/onboarding/references/atomic-finds-brand.md</code></li>
          <li><strong>Website Launch Checklist:</strong> Track your progress in{' '}
            <a
              href="/admin/projects"
              style={{ color: 'var(--brand, #F5C842)', textDecoration: 'underline', fontWeight: 600 }}
            >
              The Workshop <ExternalLink size={12} style={{ display: 'inline', marginLeft: '4px' }} />
            </a>
          </li>
        </ul>
        <p>
          <strong>Questions?</strong> Email{' '}
          <a href="mailto:contact@digitalallies.net" style={{ color: 'var(--brand, #F5C842)', textDecoration: 'underline', fontWeight: 600 }}>
            contact@digitalallies.net
          </a>
        </p>
      </div>
    </div>
  );
}
