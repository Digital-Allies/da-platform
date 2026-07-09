'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import '@/styles/admin-dashboard.css';
import { Search, Bell, LogOut, Check } from 'lucide-react';

interface AdminShellProps {
  children: React.ReactNode;
  userEmail: string;
  businessName: string;
  accentColor: string;
}

function initialsFor(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export default function AdminShell({ children, userEmail, businessName, accentColor }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const [notifications, setNotifications] = useState<any[]>([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch unread notifications
  useEffect(() => {
    async function loadNotifications() {
      const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
      if (!clientId) return;

      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('client_id', clientId)
        .eq('read_status', false)
        .order('created_at', { ascending: false });

      if (data) {
        setNotifications(data);
      }
    }
    loadNotifications();

    // Set up realtime subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        (payload) => {
          setNotifications(prev => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleMarkRead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const { error } = await supabase
      .from('notifications')
      .update({ read_status: true })
      .eq('id', id);

    if (!error) {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/admin/content?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg> },
    { label: 'Pages', path: '/admin/pages', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> },
    { label: 'The Press Office', path: '/admin/content', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> },
    { label: 'Projects', path: '/admin/projects', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg> },
    { label: 'Research', path: '/admin/research', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg> },
    { label: 'The Workshop', path: '/admin/development', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22v-5"></path><path d="M9 8V2"></path><path d="M15 8V2"></path><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"></path></svg> },
    { label: 'Settings', path: '/admin/settings', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 0l4.24-4.24M1 12h6m6 0h6m-1.78 7.78l-4.24-4.24m-5.08 0l-4.24 4.24"></path></svg> },
  ];

  const liveSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || '/';

  return (
    <div className="custom-widget ws" style={{ height: '100vh', overflow: 'hidden' }}>
      {/* Top bar */}
      <div className="ws-top">
        <div className="ws-top__brand">
          <span className="da-pulse" style={{ borderColor: 'rgba(255,255,255,.4)' }}></span>
          <span className="ws-top__name">{businessName}</span>
          <span className="ws-top__tag">CMS</span>
        </div>

        <div className="ws-client" id="da-client-switcher" ref={userMenuRef}>
          <button className="ws-client__btn" id="da-client-btn" onClick={() => setUserMenuOpen(!userMenuOpen)}>
            <span className="ws-avatar" style={{ background: accentColor }}>{initialsFor(businessName)}</span>
            <span className="ws-client__meta">
              <span className="ws-client__name">{businessName}</span>
              <span className="ws-client__dom">{userEmail}</span>
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>

          {userMenuOpen && (
            <div className="ws-client__menu" style={{ display: 'block', top: '100%', marginTop: '8px' }}>
              <div className="ws-client__head">
                <span>Account Settings</span>
              </div>
              <button className="ws-client__opt" onClick={handleLogout} style={{ color: 'var(--signal)', display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', cursor: 'pointer', width: '100%' }}>
                <LogOut size={14}/>
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>

        <div className="ws-top__spacer"></div>
        
        <div className="search-container" style={{ marginRight: '16px', display: 'flex', alignItems: 'center', position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', color: 'rgba(255,255,255,0.4)' }} />
          <input 
            type="text" 
            className="form-control search-input" 
            placeholder="Press Enter to search..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            style={{ background: 'rgba(255,255,255,.06)', borderColor: 'rgba(255,255,255,.16)', color: '#fff', width: '260px', padding: '6px 10px 6px 30px', fontSize: '12px' }} 
          />
        </div>

        <div style={{ position: 'relative' }} ref={notifRef}>
          <button 
            className="ws-cmd btn btn--outline" 
            onClick={() => setNotifOpen(!notifOpen)}
            style={{ minWidth: 'auto', padding: '6px 12px', position: 'relative', cursor: 'pointer' }}
          >
            {notifications.length > 0 && (
              <span className="notification-badge">{notifications.length}</span>
            )}
            <Bell size={14} style={{ color: 'rgba(255,255,255,0.8)' }} />
          </button>

          {notifOpen && (
            <div style={{ position: 'absolute', right: '0', top: '100%', marginTop: '8px', width: '320px', background: 'var(--bg)', border: 'var(--border-1)', boxShadow: 'var(--shadow-lg)', zIndex: '99999' }}>
              <div style={{ padding: '12px', borderBottom: 'var(--border-hairline)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-soft)', fontWeight: 'bold' }}>
                Unread Activity Notifications
              </div>
              <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div style={{ padding: '20px', textAlign: 'center', fontSize: '12px', color: 'var(--text-soft)' }}>
                    No new notifications.
                  </div>
                ) : (
                  notifications.map(notif => (
                    <div key={notif.id} style={{ padding: '12px', borderBottom: 'var(--border-hairline)', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <div style={{ flex: '1', minWidth: '0' }}>
                        <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{notif.title}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{notif.message}</div>
                      </div>
                      <button 
                        onClick={(e) => handleMarkRead(notif.id, e)}
                        style={{ border: 'none', background: 'rgba(45,45,45,0.05)', padding: '4px', cursor: 'pointer', display: 'flex', borderRadius: '2px' }}
                      >
                        <Check size={12} style={{ color: 'var(--accent)' }}/>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

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
            <a href={liveSiteUrl} target="_blank" rel="noopener noreferrer" className="ws-nav__viewsite" style={{ textDecoration: 'none' }}>
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
