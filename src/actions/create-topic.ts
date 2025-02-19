'use server'

import { db } from '@/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createTopic(formData: FormData) {
  const slug = formData.get('name') as string
  const description = formData.get('description') as string

  await db.topic.create({
    data: {
      slug,
      description,
    },
  })

  revalidatePath('/')
  redirect('/')
}
