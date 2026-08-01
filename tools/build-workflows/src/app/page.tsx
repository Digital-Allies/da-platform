import { redirect } from 'next/navigation'

export default function HomePage() {
  // This is the CMS backend, not a public-facing site.
  // Redirect to the actual public site URL from environment.
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (siteUrl) {
    redirect(siteUrl)
  }

  // Fallback: show message if no NEXT_PUBLIC_SITE_URL configured
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>CMS Backend</h1>
        <p>This is the content management system backend.</p>
        <p>Visit your public site or access the admin interface at <code>/admin</code>.</p>
      </div>
    </div>
  )
}
