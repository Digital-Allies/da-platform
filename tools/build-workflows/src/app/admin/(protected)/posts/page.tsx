import Link from 'next/link'
import { Plus, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase-server'
import { type Post } from '@/lib/types'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!

async function getPosts(): Promise<Post[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('client_id', CLIENT_ID)
    .order('updated_at', { ascending: false })
  return data ?? []
}

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div className="apage">
      <div className="apage__head">
        <div>
          <h1 className="apage__title">Posts</h1>
          <p className="apage__sub">The Journal — long-form notes from the desk.</p>
        </div>
        <div className="apage__actions">
          <Link href="/admin/posts/new" className="abtn abtn--primary">
            <Plus size={14} /> New post
          </Link>
        </div>
      </div>

      <div className="alist">
        {posts.map((post) => (
          <Link key={post.id} href={`/admin/posts/${post.id}`} className="arow">
            <span className={`pill ${post.status === 'published' ? 'pill--live' : 'pill--draft'}`}>
              {post.status}
            </span>
            <span className="arow__main">
              <span className="arow__title">{post.title}</span>
              <span className="arow__meta">
                /{post.slug} · updated {fmtDate(post.updated_at ?? post.created_at)}
              </span>
            </span>
            <ArrowRight size={15} className="arow__go" />
          </Link>
        ))}
        {posts.length === 0 && (
          <p className="empty">No posts yet. Write the first one.</p>
        )}
      </div>
    </div>
  )
}
