'use client';

import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

export type Language = 'en' | 'es';

interface LanguageSwitcherProps {
  currentLang?: Language;
  onLanguageChange?: (lang: Language) => void;
  className?: string;
}

export function LanguageSwitcher({
  currentLang = 'en',
  onLanguageChange,
  className = '',
}: LanguageSwitcherProps) {
  const [lang, setLang] = useState<Language>(currentLang);

  useEffect(() => {
    // Check saved preference in localStorage or cookie
    const saved = localStorage.getItem('da_lang') as Language;
    if (saved && (saved === 'en' || saved === 'es')) {
      setLang(saved);
      onLanguageChange?.(saved);
    }
  }, []);

  const handleSelect = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('da_lang', newLang);
    document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000`;
    onLanguageChange?.(newLang);
  };

  return (
    <div
      className={`da-language-switcher flex items-center gap-1.5 ${className}`}
      role="region"
      aria-label="Language options selector"
    >
      <Globe size={14} aria-hidden="true" className="text-current opacity-70" />
      <div className="inline-flex rounded-md p-0.5 border border-current/20 bg-black/10">
        <button
          type="button"
          onClick={() => handleSelect('en')}
          aria-pressed={lang === 'en'}
          aria-label="Switch language to English"
          className={`px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded transition-all focus:outline-none focus:ring-2 focus:ring-current ${
            lang === 'en'
              ? 'text-white shadow-sm'
              : 'text-current opacity-70 hover:opacity-100'
          }`}
          style={lang === 'en' ? { backgroundColor: 'var(--tok-primary)' } : undefined}
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => handleSelect('es')}
          aria-pressed={lang === 'es'}
          aria-label="Cambiar idioma a Español"
          className={`px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded transition-all focus:outline-none focus:ring-2 focus:ring-current ${
            lang === 'es'
              ? 'text-white shadow-sm'
              : 'text-current opacity-70 hover:opacity-100'
          }`}
          style={lang === 'es' ? { backgroundColor: 'var(--tok-primary)' } : undefined}
        >
          ES
        </button>
      </div>
    </div>
  );
}

export default LanguageSwitcher;
