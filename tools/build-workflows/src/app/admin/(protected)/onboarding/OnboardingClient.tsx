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
    title: 'Getting Started',
    content: <div />,
  },
  {
    id: 'dashboard-overview',
    title: 'Dashboard Overview',
    content: <div />,
  },
  {
    id: 'adding-products',
    title: 'Products & Showroom',
    content: <div />,
  },
  {
    id: 'collections',
    title: 'Collections & Categories',
    content: <div />,
  },
  {
    id: 'messages-contact',
    title: 'Messages & Communications',
    content: <div />,
  },
  {
    id: 'csv-uploader',
    title: 'Bulk Import (CSV)',
    content: <div />,
  },
  {
    id: 'personas',
    title: 'Brand Personas & Guides',
    content: <div />,
  },
  {
    id: 'content-publishing',
    title: 'Content & Publishing',
    content: <div />,
  },
  {
    id: 'projects-tracking',
    title: 'Projects & Workflow Tracking',
    content: <div />,
  },
  {
    id: 'seo-basics',
    title: 'SEO & Discovery',
    content: <div />,
  },
  {
    id: 'accessibility-wcag',
    title: 'Accessibility & Compliance',
    content: <div />,
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting & Support',
    content: <div />,
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
            background: 'var(--tok-primary, #F5C842)',
            color: '#1E1E1E',
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
                    div h4 { margin-top: 12px; margin-bottom: 6px; font-size: 14px; font-weight: 600; color: var(--tok-primary, #F5C842); }
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
          background: '#ffffff',
          border: '1px solid var(--tok-primary, #F5C842)',
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
              style={{ color: 'var(--tok-primary, #F5C842)', textDecoration: 'underline', fontWeight: 600 }}
            >
              The Workshop <ExternalLink size={12} style={{ display: 'inline', marginLeft: '4px' }} />
            </a>
          </li>
        </ul>
        <p>
          <strong>Questions?</strong> Email{' '}
          <a href="mailto:contact@digitalallies.net" style={{ color: 'var(--tok-primary, #F5C842)', textDecoration: 'underline', fontWeight: 600 }}>
            contact@digitalallies.net
          </a>
        </p>
      </div>
    </div>
  );
}
