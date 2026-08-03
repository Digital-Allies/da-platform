export const locales = ['en', 'es'] as const;
export const defaultLocale = 'en' as const;

export async function getMessages(locale: string) {
  try {
    const common = (await import(`../messages/${locale}/common.json`)).default;
    const pages = (await import(`../messages/${locale}/pages.json`)).default;
    const seo = (await import(`../messages/${locale}/seo.json`)).default;
    return { ...common, pages, seo };
  } catch (error) {
    console.warn(`Failed to load messages for locale: ${locale}`, error);
    return {};
  }
}
