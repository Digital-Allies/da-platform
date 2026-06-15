import Link from 'next/link'
import { Plus } from 'lucide-react'
import { createClient } from '@/lib/supabase-server'
import { type Post } from '@/lib/types'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!

async function getPosts(): Promise<Post[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('client_id', CLIENT_ID)
    .order('created_at', { ascending: false })
  return data ?? []
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headline font-bold text-xl">Blog Posts</h1>
        <Link href="/admin/posts/new" className="admin-btn-primary flex items-center gap-1.5 text-xs px-3 py-1.5">
          <Plus size={13} />
          New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="admin-card text-center py-12">
          <p className="text-sm text-neutral-500 mb-4">No posts yet.</p>
          <Link href="/admin/posts/new" className="admin-btn-primary text-xs px-4 py-2">
            Write your first post
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/admin/posts/${post.id}`}
              className="admin-card flex items-center justify-between gap-4 hover:border-charcoal transition-colors"
            >
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">{post.title}</p>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {post.published_at
                    ? new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                    : 'Not published'}
                </p>
              </div>
              <span className={post.status === 'published' ? 'badge-published' : 'badge-draft'}>
                {post.status}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
