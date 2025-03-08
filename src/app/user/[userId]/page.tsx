import CommentSimpleList from '@/components/comments/comment-simple-list'
import PostList from '@/components/posts/post-list'
import { fetchCommentsByUserId } from '@/db/queries/comments'
import { fetchPostByUserId } from '@/db/queries/posts'

interface UserPageProps {
  params: Promise<{ userId: string }>
}

const UserProfilePage = async ({ params }: UserPageProps) => {
  const { userId } = await params
  return (
    <>
      <div>
        <h2>Posts by User {userId}</h2>
        <PostList fetchData={() => fetchPostByUserId(userId)} />
      </div>
      <div>
        <h2>Comments by User {userId}</h2>
        <CommentSimpleList fetchData={() => fetchCommentsByUserId(userId)} />
      </div>
    </>
  )
}

export default UserProfilePage
