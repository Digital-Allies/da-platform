'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '@/styles/admin-dashboard.css';

interface AdminShellProps {
  children: React.ReactNode;
  userEmail: string;
}

export default function AdminShell({ children, userEmail }: AdminShellProps) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg> },
    { label: 'Pages', path: '/admin/pages', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> },
    { label: 'The Press Office', path: '/admin/content', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> },
    { label: 'Projects', path: '/admin/projects', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg> },
    { label: 'Research', path: '/admin/research', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg> },
    { label: 'The Workshop', path: '/admin/development', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22v-5"></path><path d="M9 8V2"></path><path d="M15 8V2"></path><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"></path></svg> },
    { label: 'Settings', path: '/admin/settings', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 0l4.24-4.24M1 12h6m6 0h6m-1.78 7.78l-4.24-4.24m-5.08 0l-4.24 4.24"></path></svg> },
  ];

  return (
    <div className="custom-widget ws" style={{ height: '100vh', overflow: 'hidden' }}>
      {/* Top bar */}
      <div className="ws-top">
        <div className="ws-top__brand">
          <span className="da-pulse" style={{ borderColor: 'rgba(255,255,255,.4)' }}></span>
          <span className="ws-top__name">Digital Allies</span>
          <span className="ws-top__tag">CMS</span>
        </div>

        <div className="ws-client" id="da-client-switcher">
          <button className="ws-client__btn" id="da-client-btn">
            <span className="ws-avatar" style={{ background: '#3A7BD5' }}>DA</span>
            <span className="ws-client__meta">
              <span className="ws-client__name">Digital Allies</span>
              <span className="ws-client__dom">digitalallies.net</span>
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
        </div>

        <div className="ws-top__spacer"></div>
        
        <div className="search-container" style={{ marginRight: '16px' }}>
          <input type="text" className="form-control search-input" placeholder="Search across all content..." style={{ background: 'rgba(255,255,255,.06)', borderColor: 'rgba(255,255,255,.16)', color: '#fff', width: '300px', padding: '6px 10px' }} />
        </div>

        <button className="ws-cmd btn btn--outline" style={{ minWidth: 'auto', padding: '6px 12px', position: 'relative' }}>
          <span className="notification-badge">3</span>
          🔔
        </button>

        <span className="ws-sync ws-sync--on" style={{ marginLeft: '16px' }}>
          <span className="da-pulse"></span>Connected
        </span>
      </div>

      {/* Body */}
      <div className="ws-body">
        <nav className="ws-nav ws-nav--sidebar">
          <div className="ws-nav__group">Modules</div>
          
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/admin' && pathname?.startsWith(item.path));
            return (
              <Link 
                key={item.path} 
                href={item.path} 
                className={`ws-navitem ${isActive ? 'is-active' : ''}`}
                style={{ textDecoration: 'none' }}
              >
                {item.icon}
                <span className="ws-navitem__label">{item.label}</span>
              </Link>
            );
          })}

          <div className="ws-nav__foot">
            <a href="/" target="_blank" rel="noopener noreferrer" className="ws-nav__viewsite" style={{ textDecoration: 'none' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              <span>View live site</span>
            </a>
          </div>
        </nav>
        
        <div className="ws-main">
          {children}
        </div>
      </div>
    </div>
  );
}
