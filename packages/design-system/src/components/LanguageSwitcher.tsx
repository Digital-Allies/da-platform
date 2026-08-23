'use client';

// Globe icon + language dropdown, required on every DA Platform site
// (NEW-SITE-SETUP-PROCESS.md §3.2 — "Multilingual: Language Switcher").
//
// English-only at launch is fine; what matters is that the infrastructure
// exists. This component ships with a single locale (`en`) but is entirely
// data-driven — adding a locale is a `SUPPORTED_LOCALES` edit (plus its
// translation dictionary elsewhere), never a rework of this component.
//
// Keyboard support (WCAG 2.1 AA):
// - Trigger opens the menu on click, Enter, Space, or ArrowDown.
// - Arrow Up/Down move focus between options (wrapping).
// - Escape closes the menu and returns focus to the trigger.
// - Tab closes the menu and lets focus continue naturally.
// - Focus is never hidden — see the .da-lang-option:focus-visible rule below;
//   nothing in this component sets `outline: none` without that replacement.
import React, { useEffect, useId, useRef, useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

export interface Locale {
  /** BCP-47-ish code, e.g. 'en', 'es'. */
  code: string;
  /** Label shown in the trigger + menu, in the switcher's own UI language. */
  label: string;
  /** Label in the locale's own language, if different from `label`. */
  nativeLabel?: string;
}

// Add a locale here (and wire its translation dictionary/routing elsewhere)
// to make it selectable. Nothing else in this component needs to change.
export const SUPPORTED_LOCALES: Locale[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
];

const STORAGE_KEY = 'da_locale';

interface LanguageSwitcherProps {
  locales?: Locale[];
  /** Controlled current locale code. Falls back to localStorage, then locales[0]. */
  currentLocale?: string;
  onLocaleChange?: (code: string) => void;
  className?: string;
}

export function LanguageSwitcher({
  locales = SUPPORTED_LOCALES,
  currentLocale,
  onLocaleChange,
  className = '',
}: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(currentLocale || locales[0]?.code);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (currentLocale) return;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && locales.some((l) => l.code === saved)) setActive(saved);
    } catch {
      // localStorage unavailable (private mode, disabled site data, etc.) —
      // fall back silently to the default locale.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onDocPointerDown = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocPointerDown);
    return () => document.removeEventListener('mousedown', onDocPointerDown);
  }, [open]);

  // Move focus into the menu (onto the active option, or the first one)
  // whenever it opens.
  useEffect(() => {
    if (!open) return;
    const options = menuRef.current?.querySelectorAll<HTMLElement>('[role="option"]');
    if (!options || options.length === 0) return;
    const activeOption = menuRef.current?.querySelector<HTMLElement>('[aria-selected="true"]');
    (activeOption || options[0]).focus();
  }, [open]);

  const selectLocale = (code: string) => {
    setActive(code);
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // Ignore write failures — the in-memory selection still applies.
    }
    onLocaleChange?.(code);
    triggerRef.current?.focus();
  };

  const onTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(true);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const onOptionKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const options = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role="option"]') || []);
    if (options.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        options[(index + 1) % options.length]?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        options[(index - 1 + options.length) % options.length]?.focus();
        break;
      case 'Home':
        e.preventDefault();
        options[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        options[options.length - 1]?.focus();
        break;
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        break;
      case 'Tab':
        setOpen(false);
        break;
      default:
        break;
    }
  };

  const activeLocale = locales.find((l) => l.code === active) || locales[0];
  if (!activeLocale) return null;

  return (
    <div ref={wrapperRef} className={`da-lang-switcher ${className}`} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={`Language: ${activeLocale.label}`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onTriggerKeyDown}
        className="da-lang-trigger"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          minHeight: '32px',
          padding: '6px 10px',
          fontSize: '12px',
          fontWeight: 600,
          borderRadius: 'var(--tok-radius, 6px)',
          // Inherits the ambient text color (`currentColor`) rather than
          // pinning to `--tok-text` — this switcher renders on both light
          // (nav) and dark (footer) surfaces within the same theme, and
          // `--tok-text` alone is only correct for one of them.
          border: '1px solid currentColor',
          borderColor: 'color-mix(in srgb, currentColor 35%, transparent)',
          background: 'transparent',
          color: 'currentColor',
          cursor: 'pointer',
        }}
      >
        <Globe size={14} aria-hidden="true" />
        <span>{activeLocale.label}</span>
        <ChevronDown
          size={12}
          aria-hidden="true"
          style={{ transform: open ? 'rotate(180deg)' : undefined, transition: 'transform 150ms ease' }}
        />
      </button>

      {open && (
        <ul
          id={menuId}
          ref={menuRef}
          role="listbox"
          aria-label="Select language"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            right: 0,
            minWidth: '140px',
            listStyle: 'none',
            margin: 0,
            padding: '4px',
            background: 'var(--tok-surface, #fff)',
            border: '1px solid var(--tok-border, #ccc)',
            borderRadius: 'var(--tok-radius, 6px)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.18)',
            zIndex: 50,
          }}
        >
          {locales.map((loc, i) => {
            const isActive = loc.code === active;
            return (
              <li key={loc.code} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  tabIndex={-1}
                  onClick={() => selectLocale(loc.code)}
                  onKeyDown={(e) => onOptionKeyDown(e, i)}
                  className="da-lang-option"
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    minHeight: '32px',
                    padding: '6px 10px',
                    fontSize: '12px',
                    fontWeight: isActive ? 700 : 500,
                    background: isActive ? 'var(--tok-primary, #1a6b8a)' : 'transparent',
                    color: isActive ? '#fff' : 'var(--tok-text, currentColor)',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  {loc.nativeLabel || loc.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {/* Visible focus ring on every interactive element here — never
          `outline: none` without a replacement (WCAG 2.1 AA). */}
      <style>{`
        .da-lang-trigger:focus-visible,
        .da-lang-option:focus-visible {
          outline: 2px solid var(--tok-primary, currentColor);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}

export default LanguageSwitcher;
