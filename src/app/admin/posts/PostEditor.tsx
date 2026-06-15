'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Bold, Italic, List, ListOrdered, Heading2, Heading3, Quote, Undo, Redo } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { type Post } from '@/lib/types'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!

interface PostEditorProps {
  post?: Post
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
}

export default function PostEditor({ post }: PostEditorProps) {
  const router = useRouter()
  const isNew = !post

  const [title, setTitle] = useState(post?.title ?? '')
  const [slug, setSlug] = useState(post?.slug ?? '')
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? '')
  const [status, setStatus] = useState<'draft' | 'published'>(post?.status ?? 'draft')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  const editor = useEditor({
    extensions: [StarterKit],
    content: post?.content ?? '',
    editorProps: {
      attributes: {
        class: 'prose-da min-h-[320px] focus:outline-none px-4 py-4',
      },
    },
  })

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setTitle(val)
    if (isNew) setSlug(slugify(val))
  }, [isNew])

  async function save() {
    setSaving(true)
    setError('')
    const supabase = createClient()
    const content = editor?.getHTML() ?? ''

    const payload = {
      client_id: CLIENT_ID,
      title,
      slug,
      excerpt: excerpt || null,
      content,
      status,
      published_at: status === 'published' ? (post?.published_at ?? new Date().toISOString()) : null,
    }

    let err
    if (isNew) {
      const res = await supabase.from('posts').insert(payload)
      err = res.error
    } else {
      const res = await supabase.from('posts').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', post!.id)
      err = res.error
    }

    if (err) {
      setError(err.message)
      setSaving(false)
      return
    }

    router.push('/admin/posts')
    router.refresh()
  }

  async function deletePost() {
    if (!post || !confirm('Delete this post? This cannot be undone.')) return
    setDeleting(true)
    const supabase = createClient()
    await supabase.from('posts').delete().eq('id', post.id)
    router.push('/admin/posts')
    router.refresh()
  }

  const ToolbarBtn = ({ onClick, active, children, title }: {
    onClick: () => void; active?: boolean; children: React.ReactNode; title: string
  }) => (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`p-1.5 transition-colors ${active ? 'bg-charcoal text-white' : 'hover:bg-neutral-100'}`}
    >
      {children}
    </button>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <h1 className="font-headline font-bold text-xl">{isNew ? 'New Post' : 'Edit Post'}</h1>
        <div className="flex items-center gap-2">
          {!isNew && (
            <button
              type="button"
              onClick={deletePost}
              disabled={deleting}
              className="admin-btn-danger text-xs px-3 py-1.5"
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          )}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
            className="admin-input text-xs py-1.5 w-auto"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <button
            type="button"
            onClick={save}
            disabled={saving || !title.trim()}
            className="admin-btn-primary text-xs px-4 py-1.5"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {error && (
        <p className="mb-4 text-xs text-alert border border-alert px-3 py-2">{error}</p>
      )}

      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="admin-label" htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            className="admin-input text-base font-medium"
            placeholder="Post title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>

        {/* Slug */}
        <div>
          <label className="admin-label" htmlFor="slug">Slug</label>
          <input
            id="slug"
            type="text"
            className="admin-input text-xs font-mono"
            placeholder="post-url-slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="admin-label" htmlFor="excerpt">Excerpt <span className="lowercase normal-case text-neutral-400">(optional, shown in blog list)</span></label>
          <textarea
            id="excerpt"
            rows={2}
            className="admin-input resize-none"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </div>

        {/* Editor */}
        <div>
          <label className="admin-label">Content</label>
          <div className="border border-neutral-300 rounded-sm bg-white">
            {/* Toolbar */}
            {editor && (
              <div className="flex flex-wrap items-center gap-0.5 border-b border-neutral-200 px-2 py-1.5">
                <ToolbarBtn title="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
                  <Bold size={14} />
                </ToolbarBtn>
                <ToolbarBtn title="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
                  <Italic size={14} />
                </ToolbarBtn>
                <div className="w-px h-4 bg-neutral-200 mx-1" />
                <ToolbarBtn title="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                  <Heading2 size={14} />
                </ToolbarBtn>
                <ToolbarBtn title="Heading 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
                  <Heading3 size={14} />
                </ToolbarBtn>
                <div className="w-px h-4 bg-neutral-200 mx-1" />
                <ToolbarBtn title="Bullet List" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
                  <List size={14} />
                </ToolbarBtn>
                <ToolbarBtn title="Ordered List" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                  <ListOrdered size={14} />
                </ToolbarBtn>
                <ToolbarBtn title="Blockquote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
                  <Quote size={14} />
                </ToolbarBtn>
                <div className="w-px h-4 bg-neutral-200 mx-1" />
                <ToolbarBtn title="Undo" onClick={() => editor.chain().focus().undo().run()}>
                  <Undo size={14} />
                </ToolbarBtn>
                <ToolbarBtn title="Redo" onClick={() => editor.chain().focus().redo().run()}>
                  <Redo size={14} />
                </ToolbarBtn>
              </div>
            )}
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </div>
  )
}
