'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  Bold, Italic, List, ListOrdered, Heading2, Heading3, Quote,
  Undo, Redo, Save, Trash2,
} from 'lucide-react'
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
        class: 'rte__area prose-da',
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
      const res = await supabase
        .from('posts')
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq('id', post!.id)
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

  return (
    <div className="apage apage--narrow">
      <div className="apage__head">
        <div>
          <h1 className="apage__title">{isNew ? 'New post' : 'Edit post'}</h1>
        </div>
        <div className="apage__actions">
          {!isNew && (
            <button
              type="button"
              onClick={deletePost}
              disabled={deleting}
              className="abtn abtn--danger"
            >
              <Trash2 size={13} /> {deleting ? 'Deleting…' : 'Delete'}
            </button>
          )}
          <button
            type="button"
            onClick={() => router.push('/admin/posts')}
            className="abtn abtn--ghost"
          >
            Cancel
          </button>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
            className="ainput ainput--select"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <button
            type="button"
            onClick={save}
            disabled={saving || !title.trim()}
            className="abtn abtn--primary"
          >
            <Save size={13} /> {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      {error && (
        <p style={{ marginBottom: 16, fontSize: 12, color: 'var(--signal)', border: '1px solid var(--signal)', padding: '8px 12px' }}>
          {error}
        </p>
      )}

      <div className="editor-stack">
        {/* Title */}
        <label className="afield">
          <span className="afield__label">Title</span>
          <input
            type="text"
            className="ainput ainput--lg"
            placeholder="Post title"
            value={title}
            onChange={handleTitleChange}
          />
        </label>

        {/* Slug */}
        <label className="afield">
          <span className="afield__label">Slug</span>
          <input
            type="text"
            className="ainput mono"
            placeholder="post-url-slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </label>

        {/* Excerpt */}
        <label className="afield">
          <span className="afield__label">
            Excerpt <em className="afield__hint">(shown in the blog list)</em>
          </span>
          <textarea
            rows={2}
            className="ainput"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </label>

        {/* Editor */}
        <div className="afield">
          <span className="afield__label">Content</span>
          <div className="rte">
            {editor && (
              <div className="rte__toolbar">
                <button type="button" title="Bold" className={`tb-btn${editor.isActive('bold') ? ' is-active' : ''}`}
                  onClick={() => editor.chain().focus().toggleBold().run()}>
                  <Bold size={14} />
                </button>
                <button type="button" title="Italic" className={`tb-btn${editor.isActive('italic') ? ' is-active' : ''}`}
                  onClick={() => editor.chain().focus().toggleItalic().run()}>
                  <Italic size={14} />
                </button>
                <span className="rte__sep" />
                <button type="button" title="Heading 2" className={`tb-btn${editor.isActive('heading', { level: 2 }) ? ' is-active' : ''}`}
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                  <Heading2 size={14} />
                </button>
                <button type="button" title="Heading 3" className={`tb-btn${editor.isActive('heading', { level: 3 }) ? ' is-active' : ''}`}
                  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
                  <Heading3 size={14} />
                </button>
                <span className="rte__sep" />
                <button type="button" title="Bullet List" className={`tb-btn${editor.isActive('bulletList') ? ' is-active' : ''}`}
                  onClick={() => editor.chain().focus().toggleBulletList().run()}>
                  <List size={14} />
                </button>
                <button type="button" title="Ordered List" className={`tb-btn${editor.isActive('orderedList') ? ' is-active' : ''}`}
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                  <ListOrdered size={14} />
                </button>
                <button type="button" title="Blockquote" className={`tb-btn${editor.isActive('blockquote') ? ' is-active' : ''}`}
                  onClick={() => editor.chain().focus().toggleBlockquote().run()}>
                  <Quote size={14} />
                </button>
                <span className="rte__sep" />
                <button type="button" title="Undo" className="tb-btn"
                  onClick={() => editor.chain().focus().undo().run()}>
                  <Undo size={14} />
                </button>
                <button type="button" title="Redo" className="tb-btn"
                  onClick={() => editor.chain().focus().redo().run()}>
                  <Redo size={14} />
                </button>
              </div>
            )}
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </div>
  )
}
