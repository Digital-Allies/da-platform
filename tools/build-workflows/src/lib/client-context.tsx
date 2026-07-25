'use client'

// Makes the current admin user's resolved client_id available to every
// client component under AdminShell, without each one re-deriving it from
// process.env (which is baked at build time and can't vary per logged-in
// user on the shared cms.* admin — see get-current-client.ts).
import { createContext, useContext } from 'react'

const ClientIdContext = createContext<string | null>(null)

export function ClientIdProvider({ clientId, children }: { clientId: string; children: React.ReactNode }) {
  return <ClientIdContext.Provider value={clientId}>{children}</ClientIdContext.Provider>
}

export function useClientId(): string {
  const clientId = useContext(ClientIdContext)
  if (!clientId) throw new Error('useClientId() must be called within ClientIdProvider (i.e. inside AdminShell)')
  return clientId
}
