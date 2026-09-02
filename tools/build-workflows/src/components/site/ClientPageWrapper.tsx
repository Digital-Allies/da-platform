import React from 'react';
import SiteTheme from './SiteTheme';
import Navigation from './Navigation';
import Footer from './Footer';
import AtomicNav from '@sites/atomic-finds/components/AtomicNav';
import Starfield from '@sites/atomic-finds/components/Starfield';
import { getSiteSettings, getPublishedPages } from '@/lib/data';
import { ATOMIC_FINDS_CLIENT_ID } from '@/lib/theme';
import { RESERVED_PAGE_SLUGS } from '@/lib/reserved-slugs';
import '@sites/atomic-finds/styles/atomic-finds.css';

interface ClientPageWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default async function ClientPageWrapper({
  children,
  title,
  subtitle,
}: ClientPageWrapperProps) {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const isAtomicFinds = clientId === ATOMIC_FINDS_CLIENT_ID;

  const [settings, publishedPages] = await Promise.all([
    getSiteSettings(),
    getPublishedPages(),
  ]);

  if (isAtomicFinds) {
    return (
      <SiteTheme clientId={clientId}>
        <div className="af-homepage" style={{ minHeight: '100vh' }}>
          <Starfield />
          <div className="af-weave-fixed" />
          <div className="af-page">
            <AtomicNav logoUrl={settings.logo_url || undefined} pages={publishedPages} />

            <main className="af-section py-16 px-6" style={{ background: 'rgba(0,0,0,0.4)', minHeight: '60vh' }}>
              <div className="af-section-inner max-w-4xl mx-auto" style={{ color: 'var(--bone-white, #FAF6EE)' }}>
                <h1 className="af-section-title text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--celestial-yellow, #F5C842)' }}>
                  {title}
                </h1>
                {subtitle && <p className="af-section-script text-sm mb-8" style={{ color: 'var(--ochre-tan, #D9A05B)' }}>{subtitle}</p>}
                <div style={{ color: 'var(--fg-body, #E5DECD)', lineHeight: 1.7, fontSize: '15px' }}>
                  {children}
                </div>
              </div>
            </main>

            <footer className="af-footer">
              <div className="af-footer-grid">
                <div>
                  <a href="/">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="af-footer-logo" src={settings.logo_url || "/atomic-finds/logos/logo-mark-new.png"} alt={settings.site_title} />
                  </a>
                  <p className="af-footer-script">where vintage meets digital</p>
                  <p className="af-footer-desc">{settings.site_description || 'Curated rattan & bamboo for the modern home.'}</p>
                </div>
                <div className="af-footer-col">
                  <h4>Navigation</h4>
                  <a className="af-footer-link" href="/">Home</a>
                  <a className="af-footer-link" href="/#shop">Shop Collection</a>
                  <a className="af-footer-link" href="/#contact">Contact</a>
                </div>
                <div className="af-footer-col">
                  <h4>Legal</h4>
                  <a className="af-footer-link" href="/privacy">Privacy Policy</a>
                  <a className="af-footer-link" href="/terms">Terms of Service</a>
                  <a className="af-footer-link" href="/cookies">Cookie Policy</a>
                  <a className="af-footer-link" href="/accessibility">Accessibility</a>
                  <a className="af-footer-link" href="/use-of-ai">Use of AI</a>
                </div>
              </div>
              <div className="af-footer-bottom">
                <div>© {new Date().getFullYear()} {settings.site_title}. All rights reserved.</div>
                <div className="af-footer-credit">
                  Website made with love by <a href="https://digitalallies.net" target="_blank" rel="noopener noreferrer">Digital Allies</a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </SiteTheme>
    );
  }

  const pageNavItems = publishedPages
    .filter((p: any) => !RESERVED_PAGE_SLUGS.includes(p.slug.toLowerCase().trim()))
    .map((p: any) => ({ label: p.title, href: `/${p.slug}` }));

  return (
    <SiteTheme clientId={clientId}>
      <Navigation
        logoUrl={settings.logo_url || undefined}
        siteTitle={settings.site_title}
        ctaText={settings.hero_cta_text || 'Get in Touch'}
        ctaHref={settings.hero_cta_link || '#contact'}
        navItems={pageNavItems.length > 0 ? pageNavItems : undefined}
      />

      <main
        style={{
          background: 'var(--tok-bg, var(--bg, #ffffff))',
          color: 'var(--tok-text, var(--fg-body, #1f2937))',
          fontFamily: 'var(--tok-font-body, sans-serif)',
          minHeight: '70vh',
          padding: '64px 24px',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1
            style={{
              fontFamily: 'var(--tok-font-heading, sans-serif)',
              fontSize: '32px',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: 'var(--tok-primary, inherit)',
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p style={{ fontSize: '14px', color: 'var(--text-soft, #6b7280)', marginBottom: '32px', fontFamily: 'monospace' }}>
              {subtitle}
            </p>
          )}
          <div style={{ lineHeight: 1.7, fontSize: '15px' }}>{children}</div>
        </div>
      </main>

      <Footer settings={settings} />
    </SiteTheme>
  );
}
