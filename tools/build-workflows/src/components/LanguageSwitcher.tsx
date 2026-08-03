'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('nav');
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', label: t('english') },
    { code: 'es', label: t('spanish') },
  ];

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPathname = segments.join('/');
    router.push(newPathname);
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === locale);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium
                   rounded-md border border-charcoal
                   hover:bg-neutral-100 transition-colors"
        aria-label={t('language')}
      >
        <span>{currentLanguage?.label || locale.toUpperCase()}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-32 bg-white border border-charcoal
                        rounded-md shadow-lg z-50">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full px-4 py-2 text-sm text-left transition-colors
                          ${locale === lang.code
                            ? 'bg-brand text-white font-medium'
                            : 'hover:bg-neutral-100'
                          }
                          ${lang.code === languages[0].code ? 'rounded-t-md' : ''}
                          ${lang.code === languages[languages.length - 1].code ? 'rounded-b-md' : ''}
                          `}
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
