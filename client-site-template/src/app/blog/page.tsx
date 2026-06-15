import Link from 'next/link'
import Image from 'next/image'
import { Navigation, Footer } from '@/components/site'
import { getSiteSettings, getPublishedPosts } from '@/lib/data'

export const revalidate = 60

export const metadata = { title: 'Blog' }

export default async function BlogPage() {
  const [settings, posts] = await Promise.all([getSiteSettings(), getPublishedPosts()])

  return (
    <>
      <Navigation
        logoUrl={settings.logo_url || undefined}
        siteTitle={settings.site_title}
      />

      <main className="section">
        <div className="section-inner">
          <h1 className="section-title mb-12">Blog</h1>

          {posts.length === 0 ? (
            <p className="text-neutral-500 text-sm">No posts yet. Check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="card group block"
                >
                  {post.featured_image_url && (
                    <div className="relative aspect-video mb-4 -mx-6 -mt-6 overflow-hidden">
                      <Image
                        src={post.featured_image_url}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <p className="text-xs text-neutral-400 mb-2">
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'long', day: 'numeric',
                        })
                      : ''}
                  </p>
                  <h2 className="font-headline font-bold text-lg mb-2 group-hover:opacity-70 transition-opacity">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm text-neutral-600 line-clamp-3">{post.excerpt}</p>
                  )}
                  <span
                    className="mt-4 inline-block text-sm font-medium"
                    style={{ color: 'var(--brand)' }}
                  >
                    Read more &rarr;
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer settings={settings} />
    </>
  )
}
