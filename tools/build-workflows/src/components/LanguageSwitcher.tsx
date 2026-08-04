'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useLocaleSwitcher } from '@/components/IntlProvider';

interface LanguageSwitcherProps {
  /** Swaps in light-on-dark styling for dark navs (e.g. Atomic Finds) */
  variant?: 'light' | 'dark';
}

export function LanguageSwitcher({ variant = 'light' }: LanguageSwitcherProps) {
  const locale = useLocale();
  const { changeLocale } = useLocaleSwitcher();
  const t = useTranslations('nav');
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', label: t('english') },
    { code: 'es', label: t('spanish') },
  ];

  const handleLanguageChange = (newLocale: string) => {
    setIsOpen(false);
    if (newLocale === locale) return;
    changeLocale(newLocale);
  };

  const currentLanguage = languages.find(lang => lang.code === locale);
  const isDark = variant === 'dark';

  return (
    <div style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setIsOpen(v => !v)}
        aria-label={t('language')}
        aria-expanded={isOpen}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 10px',
          fontSize: '12px',
          fontWeight: 600,
          borderRadius: isDark ? '999px' : '6px',
          border: isDark ? '1px solid rgba(255,255,255,0.22)' : '1px solid var(--charcoal, #2D2D2D)',
          background: isDark ? 'rgba(255,255,255,0.06)' : 'transparent',
          color: isDark ? 'var(--bone-white, #F9F6F0)' : 'var(--charcoal, #2D2D2D)',
          cursor: 'pointer',
        }}
      >
        <span>{currentLanguage?.label || locale.toUpperCase()}</span>
        <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }} />
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            marginTop: '4px',
            width: '120px',
            background: isDark ? 'rgba(52,40,24,0.98)' : '#fff',
            border: isDark ? '1px solid rgba(245,200,66,0.22)' : '1px solid var(--charcoal, #2D2D2D)',
            borderRadius: '6px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
            zIndex: 50,
            overflow: 'hidden',
          }}
        >
          {languages.map(lang => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleLanguageChange(lang.code)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '8px 12px',
                fontSize: '12px',
                fontWeight: locale === lang.code ? 700 : 500,
                background: locale === lang.code ? (isDark ? 'rgba(245,200,66,0.16)' : 'var(--brand, #C5301A)') : 'transparent',
                color: locale === lang.code
                  ? (isDark ? 'var(--celestial-yellow, #F5C842)' : '#fff')
                  : (isDark ? 'var(--bone-white, #F9F6F0)' : 'var(--charcoal, #2D2D2D)'),
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
