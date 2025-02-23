import CommentCreateForm from '@/components/comments/comment-create-form'
import PostShow from '@/components/posts/post-show'
import CommentList from '@/components/comments/comment-list'
import paths from '@/paths'
import Link from 'next/link'
import { fetchCommentsByPostId } from '@/db/queries/comments'

interface PostShowPageProps {
  params: Promise<{ slug: string; postId: string }>
}
export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = await params
  return (
    <div>
      <div>
        <Link href={paths.topicShow(slug)}>
          {'< '}Back to {'/'}
          {slug}
        </Link>
        <PostShow postId={postId} />
        <CommentCreateForm postId={postId} startOpen />
        <CommentList fetchData={() => fetchCommentsByPostId(postId)} />
      </div>
    </div>
  )
}
