// when user goes to /user/[userId]
//DONE pull userId from params, awaited
// query db to get all topics/posts/comments by the user where userId matches.
// render results mapped for display

import PostList from '@/components/posts/post-list'
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
    </>
  )
  // return <h1>{userId}</h1>
}

export default UserProfilePage
