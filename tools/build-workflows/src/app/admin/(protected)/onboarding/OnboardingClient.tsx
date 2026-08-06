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
    title: '🚀 Getting Started',
    content: (
      <div>
        <h3>Welcome to the DA Platform</h3>
        <p>This dashboard is your command center for managing your website, products, and content.</p>
        <h4>Quick Start:</h4>
        <ol>
          <li><strong>Set Your Brand:</strong> Go to Brand Theme and upload your logo, set colors</li>
          <li><strong>Add Products:</strong> Use Showroom to create and publish products</li>
          <li><strong>Write Pages:</strong> Pages section for custom content (About, Contact, etc.)</li>
          <li><strong>Manage Collections:</strong> Organize products into categories</li>
          <li><strong>Monitor Messages:</strong> View contact form submissions in Messages</li>
        </ol>
      </div>
    ),
  },
  {
    id: 'dashboard-overview',
    title: '📊 Dashboard Overview',
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
    title: '🎨 Setting Up Your Brand',
    content: (
      <div>
        <h3>Make Your Site Look Like You</h3>
        <h4>Step 1: Brand Theme</h4>
        <ol>
          <li>Click "Brand Theme" in the left menu</li>
          <li>Upload your logo</li>
          <li>Set your brand colors (primary, accent, background)</li>
          <li>Choose your heading and body fonts</li>
          <li>Save changes</li>
        </ol>
        <h4>Step 2: Settings</h4>
        <ol>
          <li>Click "Settings" in the left menu</li>
          <li>Enter your business name, phone, email</li>
          <li>Add your address and hours</li>
          <li>Link your social media (Instagram, Facebook, Twitter, LinkedIn)</li>
          <li>Upload favicon if desired</li>
          <li>Save</li>
        </ol>
      </div>
    ),
  },
  {
    id: 'adding-products',
    title: '🛍️ Adding Products',
    content: (
      <div>
        <h3>Publish Your Products</h3>
        <h4>One at a Time</h4>
        <ol>
          <li>Go to "Showroom"</li>
          <li>Click "Add Product"</li>
          <li>Fill in: name, description, price, collection</li>
          <li>Upload photos (use high-quality images)</li>
          <li>Click "Publish"</li>
        </ol>
        <h4>Bulk Import (CSV)</h4>
        <ol>
          <li>Go to "Collections"</li>
          <li>Select a collection</li>
          <li>Click "Import CSV"</li>
          <li>Upload your spreadsheet (with columns: name, price, description, image_url)</li>
          <li>Wait for processing</li>
        </ol>
        <p><strong>💡 Tip:</strong> Write descriptions that tell a story. Include size, condition, color, unique features. Customers love details!</p>
      </div>
    ),
  },
  {
    id: 'managing-pages',
    title: '📄 Creating & Editing Pages',
    content: (
      <div>
        <h3>Build Custom Pages</h3>
        <h4>Required Pages (Auto-Generated)</h4>
        <ul>
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
          <li>Cookie Policy</li>
          <li>Accessibility Statement</li>
          <li>AI Disclosure</li>
        </ul>
        <h4>Add Your Own Pages</h4>
        <ol>
          <li>Go to "Pages"</li>
          <li>Click "New Page"</li>
          <li>Give it a title (e.g., "About Us", "Contact Us")</li>
          <li>Write your content in the editor</li>
          <li>Add featured image if needed</li>
          <li>Set slug (URL path, e.g., /about-us)</li>
          <li>Publish</li>
        </ol>
      </div>
    ),
  },
  {
    id: 'collections',
    title: '📂 Organizing with Collections',
    content: (
      <div>
        <h3>Group Related Products</h3>
        <h4>What Are Collections?</h4>
        <p>Collections are categories that group your products together. Example: Seating, Lighting, Decor</p>
        <h4>Create a Collection</h4>
        <ol>
          <li>Go to "Collections"</li>
          <li>Click "New Collection"</li>
          <li>Give it a name</li>
          <li>Write a description (displayed on the collection page)</li>
          <li>Save</li>
        </ol>
        <h4>Add Products to a Collection</h4>
        <p>When you create or edit a product, assign it to one or more collections. Products appear automatically on your collection pages.</p>
      </div>
    ),
  },
  {
    id: 'messages-contact',
    title: '💬 Handling Messages & Contact Submissions',
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
    id: 'blog-press',
    title: '📰 Publishing Blog Posts',
    content: (
      <div>
        <h3>Tell Your Story with Blog Posts</h3>
        <h4>Create a Post</h4>
        <ol>
          <li>Go to "The Press Office"</li>
          <li>Click "New Post"</li>
          <li>Title, content, featured image</li>
          <li>Set publish date (can be future-dated)</li>
          <li>Add tags/categories</li>
          <li>Publish</li>
        </ol>
        <h4>Great Blog Topics</h4>
        <ul>
          <li>Behind-the-scenes stories</li>
          <li>How-to guides for your products</li>
          <li>Industry trends</li>
          <li>New product announcements</li>
          <li>Customer spotlights</li>
        </ul>
        <p><strong>💡 Tip:</strong> Blog posts help with SEO and give customers reasons to visit!</p>
      </div>
    ),
  },
  {
    id: 'projects-tracking',
    title: '✅ Using Projects to Track Progress',
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
    title: '🔍 SEO Basics for Your Site',
    content: (
      <div>
        <h3>Get Found by Search Engines</h3>
        <h4>Title & Meta Descriptions</h4>
        <p>When you create a page or product, fill in:</p>
        <ul>
          <li><strong>Title:</strong> 50-60 characters, include keywords</li>
          <li><strong>Meta Description:</strong> 150-160 characters, describe what visitors will find</li>
        </ul>
        <h4>Example</h4>
        <ul>
          <li><strong>Title:</strong> "Vintage Mid-Century Seating | Authentic 1970s Furniture"</li>
          <li><strong>Description:</strong> "Shop authentic 1970s vintage seating. Handpicked mid-century furniture restored in Austin. Free shipping on orders over $500."</li>
        </ul>
        <h4>Keywords</h4>
        <p>Think about what customers search for. Include those words naturally in your titles, descriptions, and product names.</p>
        <h4>What We Handle Automatically</h4>
        <ul>
          <li>XML Sitemap (for Google)</li>
          <li>robots.txt (tells search engines what to index)</li>
          <li>JSON-LD structured data (helps Google understand your content)</li>
          <li>Mobile-friendly responsive design</li>
          <li>Fast page speeds</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'accessibility-wcag',
    title: '♿ Accessibility & WCAG Compliance',
    content: (
      <div>
        <h3>Make Your Site Usable for Everyone</h3>
        <h4>What Is WCAG?</h4>
        <p>Web Content Accessibility Guidelines (WCAG 2.1 Level AA) ensure your site works for people with disabilities, including blind/low-vision, deaf/hard of hearing, and those with mobility challenges.</p>
        <h4>What's Included</h4>
        <ul>
          <li>✅ High contrast text (readable for low-vision users)</li>
          <li>✅ Alt text on all images (for screen readers)</li>
          <li>✅ Keyboard navigation (no mouse required)</li>
          <li>✅ Semantic HTML (proper heading hierarchy, landmarks)</li>
          <li>✅ Color not alone for meaning (icons + text)</li>
          <li>✅ Focus indicators (visible outline when tabbing)</li>
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
    title: '🛠️ Troubleshooting & FAQ',
    content: (
      <div>
        <h3>Getting Help</h3>
        <h4>Common Issues</h4>
        <ul>
          <li><strong>"Changes aren't showing on the site"</strong> - Click "Publish". Drafts don't appear live. Wait 30 seconds for the page to refresh.</li>
          <li><strong>"Image won't upload"</strong> - Check file size (keep images under 5MB). Use JPG or PNG format.</li>
          <li><strong>"Can't log in"</strong> - Check your email. We send a magic link. Might be in spam!</li>
          <li><strong>"Collections page is empty"</strong> - Products must be assigned to a collection AND published to appear.</li>
          <li><strong>"Form submissions aren't coming through"</strong> - Check Messages tab. Emails might be going to your spam.</li>
        </ul>
        <h4>Get Support</h4>
        <p>Email <strong>support@digitalallies.net</strong> with a screenshot of the issue. We'll help!</p>
      </div>
    ),
  },
];

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
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>📚 Client Onboarding Guide</h1>
        <p style={{ fontSize: '14px', color: 'var(--charcoal, #2D2D2D)', opacity: 0.7 }}>
          Everything you need to know to manage your website, products, and content
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
          background: 'rgba(0,0,0,0.03)',
          borderRadius: '6px',
          fontSize: '13px',
          color: 'var(--charcoal, #2D2D2D)',
        }}
      >
        <p>
          <strong>Need more help?</strong> Email{' '}
          <a href="mailto:support@digitalallies.net" style={{ color: 'var(--brand, #C5301A)', textDecoration: 'none' }}>
            support@digitalallies.net
          </a>{' '}
          or visit{' '}
          <a
            href="/admin/projects"
            style={{ color: 'var(--brand, #C5301A)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            your Website Launch Checklist <ExternalLink size={12} />
          </a>
          {' '}to track your progress.
        </p>
      </div>
    </div>
  );
}
