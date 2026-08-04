'use client';

import { ReactNode, createContext, useContext, useEffect, useState, useCallback } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { defaultLocale, locales, type Locale } from '@/i18n/config';
import enCommon from '../../messages/en/common.json';
import enPages from '../../messages/en/pages.json';
import enSeo from '../../messages/en/seo.json';

const DEFAULT_MESSAGES = { ...enCommon, pages: enPages, seo: enSeo };

function readLocaleCookie(): Locale {
  if (typeof document === 'undefined') return defaultLocale;
  const match = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]+)/);
  const value = match?.[1];
  return (locales as readonly string[]).includes(value || '') ? (value as Locale) : defaultLocale;
}

async function loadMessages(locale: Locale) {
  if (locale === defaultLocale) return DEFAULT_MESSAGES;
  const [common, pages, seo] = await Promise.all([
    import(`../../messages/${locale}/common.json`),
    import(`../../messages/${locale}/pages.json`),
    import(`../../messages/${locale}/seo.json`),
  ]);
  return { ...common.default, pages: pages.default, seo: seo.default };
}

const LocaleSwitcherContext = createContext<{ changeLocale: (locale: string) => void } | null>(null);

// The locale lives entirely in client state (cookie + this provider) — there
// is no server-rendered translated content yet, so switching never needs a
// router.refresh(); it just updates state directly, which re-renders
// anything below reading useTranslations()/useLocale() immediately.
export function useLocaleSwitcher() {
  const ctx = useContext(LocaleSwitcherContext);
  if (!ctx) throw new Error('useLocaleSwitcher must be used within IntlProvider');
  return ctx;
}

export function IntlProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [messages, setMessages] = useState<Record<string, any>>(DEFAULT_MESSAGES);

  useEffect(() => {
    const current = readLocaleCookie();
    if (current === defaultLocale) return;
    setLocale(current);
    loadMessages(current).then(setMessages);
  }, []);

  const changeLocale = useCallback((newLocale: string) => {
    const validLocale: Locale = (locales as readonly string[]).includes(newLocale)
      ? (newLocale as Locale)
      : defaultLocale;
    document.cookie = `NEXT_LOCALE=${validLocale}; path=/; max-age=31536000`;
    setLocale(validLocale);
    loadMessages(validLocale).then(setMessages);
  }, []);

  return (
    <LocaleSwitcherContext.Provider value={{ changeLocale }}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </LocaleSwitcherContext.Provider>
  );
}

export default IntlProvider;
