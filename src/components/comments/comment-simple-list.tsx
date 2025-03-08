import { CommentWithAuthor } from '@/db/queries/comments'

interface CommentSimpleListProps {
  fetchData: () => Promise<CommentWithAuthor[]>
}

export default async function CommentSimpleList({
  fetchData,
}: CommentSimpleListProps) {
  const comments = await fetchData()

  const renderedPosts = (await comments).map((comment) => {
    const { id, userId } = comment

    return (
      <div key={id} className='border rounded p-2'>
        <h3 className='text-lg font-bold'>{comment.content}</h3>
        <div className='flex flex-row gap-8'>
          <p className='text-xs text-gray-400'>By {comment.userId}</p>
        </div>
      </div>
    )
  })

  return <div className='space-y-2'>{renderedPosts}</div>
}
