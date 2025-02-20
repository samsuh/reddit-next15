import PostCreateForm from '@/components/posts/post-create-form'

interface TopicShowPageProps {
  params: Promise<{ slug: string }>
}

export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = await params

  return (
    <div>
      <div className='grid grid-cols-4 gap-4 p-4'>
        <div className='col-span-3'>
          <h1 className='text-2xl text-bold mb-2'>{slug}</h1>
        </div>
        <PostCreateForm slug={slug} />
      </div>
    </div>
  )
}
