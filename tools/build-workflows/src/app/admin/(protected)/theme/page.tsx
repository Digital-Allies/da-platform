import { createClient } from '@/lib/supabase-server'
import { getCurrentClientId } from '@/lib/get-current-client'
import ThemeClient from './ThemeClient'

export const dynamic = 'force-dynamic'

export default async function ThemePage() {
  const supabase = await createClient()
  const CLIENT_ID = await getCurrentClientId()
  if (!CLIENT_ID) throw new Error('Client ID is required for theme management')

  // Fetch client theme tokens from design_tokens table
  const { data: tokenRow } = await supabase
    .from('design_tokens')
    .select('*')
    .eq('client_id', CLIENT_ID)
    .maybeSingle()

  return (
    <div className="ws-page">
      <ThemeClient
        initialTokens={{
          colors: tokenRow?.colors,
          fonts: tokenRow?.fonts,
          type_scale: tokenRow?.type_scale,
          spacing: tokenRow?.spacing,
          logo: tokenRow?.logo,
          favicon: tokenRow?.favicon,
          ui_extra: tokenRow?.ui_extra,
        }}
        rowId={tokenRow?.id || null}
      />
    </div>
  )
}
