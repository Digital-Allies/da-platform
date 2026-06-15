import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Navigation, Footer } from '@/components/site'
import { getSiteSettings, getPostBySlug } from '@/lib/data'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      images: post.featured_image_url ? [post.featured_image_url] : [],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const [settings, post] = await Promise.all([
    getSiteSettings(),
    getPostBySlug(slug),
  ])

  if (!post) notFound()

  return (
    <>
      <Navigation
        logoUrl={settings.logo_url || undefined}
        siteTitle={settings.site_title}
      />

      <main className="section">
        <div className="section-inner max-w-compact">
          {/* Back link */}
          <Link
            href="/blog"
            className="text-sm text-neutral-500 hover:text-charcoal transition-colors mb-8 inline-block"
          >
            &larr; Back to Blog
          </Link>

          {/* Featured image */}
          {post.featured_image_url && (
            <div className="relative aspect-video mb-8 border border-charcoal overflow-hidden">
              <Image
                src={post.featured_image_url}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}

          {/* Meta */}
          <p className="text-xs text-neutral-400 mb-3">
            {post.published_at
              ? new Date(post.published_at).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })
              : ''}
          </p>

          <h1 className="font-headline font-bold text-2xl md:text-3xl mb-6">{post.title}</h1>

          {/* Content */}
          {post.content && (
            <div
              className="prose-da"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}
        </div>
      </main>

      <Footer settings={settings} />
    </>
  )
}
