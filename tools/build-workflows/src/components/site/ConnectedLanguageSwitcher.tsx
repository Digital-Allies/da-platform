'use client'

// Wires the design-system's LanguageSwitcher to this app's real i18n
// mechanism (IntlProvider's changeLocale — sets the NEXT_LOCALE cookie and
// reloads next-intl messages). Exists as its own client component so
// server components like Footer.tsx can use the switcher without becoming
// client components themselves — only this wrapper needs the hook.
import { LanguageSwitcher } from '@da-platform/design-system/components/LanguageSwitcher'
import { useLocaleSwitcher } from '@/components/IntlProvider'

export default function ConnectedLanguageSwitcher() {
  const { changeLocale } = useLocaleSwitcher()
  return <LanguageSwitcher onLocaleChange={changeLocale} />
}
