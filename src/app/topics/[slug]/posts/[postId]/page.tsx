import CommentCreateForm from '@/components/comments/comment-create-form'
import PostShow from '@/components/posts/post-show'
import CommentList from '@/components/comments/comment-list'
import paths from '@/paths'
import Link from 'next/link'
import { Suspense } from 'react'
import PostShowLoading from '@/components/posts/post-show-loading'
// import { fetchCommentsByPostId } from '@/db/queries/comments'

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
        <Suspense fallback={<PostShowLoading />}>
          <PostShow postId={postId} />
        </Suspense>

        <CommentCreateForm postId={postId} startOpen />
        {/* <CommentList fetchData={() => fetchCommentsByPostId(postId)} /> */}
        <CommentList postId={postId} />
      </div>
    </div>
  )
}
