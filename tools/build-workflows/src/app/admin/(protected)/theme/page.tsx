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
          primary_color: tokenRow?.colors?.primary,
          accent_color: tokenRow?.colors?.secondary,
          bg_color: tokenRow?.colors?.bg,
          surface_color: tokenRow?.colors?.surface,
          fg_body_color: tokenRow?.colors?.text,
          font_header: tokenRow?.fonts?.heading,
          font_body: tokenRow?.fonts?.body,
        }}
        rowId={tokenRow?.id || null}
      />
    </div>
  )
}
