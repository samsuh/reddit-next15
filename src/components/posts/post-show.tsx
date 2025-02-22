import { db } from '@/db'
import { notFound } from 'next/navigation'

interface PostShowProps {
  postId: string
}
export default async function PostShow({ postId }: PostShowProps) {
  const post = await db.post.findFirst({
    where: { id: postId },
  })

  if (!post) {
    notFound()
  }

  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  )
}
