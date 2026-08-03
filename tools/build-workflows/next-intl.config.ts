import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async (params: any) => {
  const locale = params.locale || 'en';
  try {
    return {
      messages: (await import(`./messages/${locale}/common.json`)).default,
      locale,
    };
  } catch (error) {
    return {
      messages: {},
      locale,
    };
  }
});
