import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import PostEditor from '../PostEditor'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (!post) notFound()

  return <PostEditor post={post} />
}
