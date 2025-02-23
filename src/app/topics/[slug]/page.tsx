import PostCreateForm from '@/components/posts/post-create-form'
import PostList from '@/components/posts/post-list'
import { fetchPostByTopicSlug } from '@/db/queries/posts'

interface TopicShowPageProps {
  params: Promise<{ slug: string }>
}

export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = await params

  return (
    <div>
      <p>
        TopicShowPage where params is captured from the url into "params" and
        slug is pulled off of it
      </p>
      <p>
        the query "fetchPostbyTopicSlug" is passed as props to PostList
        component as a function that can be called clientside.
      </p>
      <div className='grid grid-cols-4 gap-4 p-4'>
        <div className='col-span-3'>
          <h1 className='text-2xl text-bold mb-2'>{slug}</h1>
          <PostList fetchData={() => fetchPostByTopicSlug(slug)} />
        </div>
        <PostCreateForm slug={slug} />
      </div>
    </div>
  )
}
