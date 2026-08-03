import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export const config = {
  matcher: [
    '/((?!_next|api|.*\\..*).*)' // Match all routes except Next.js internals, API routes, and static files
  ]
};
