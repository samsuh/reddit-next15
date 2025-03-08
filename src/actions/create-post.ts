'use server'

import { auth } from '@/auth'
import { db } from '@/db'
import { Post } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import paths from '@/paths'
import { redirect } from 'next/navigation'

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
})

interface CreatePostFormState {
  errors: {
    title?: string[]
    content?: string[]
    _form?: string[]
  }
}

export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const result = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  })

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors }
  }

  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        _form: ['You must be signed in to do this'],
      },
    }
  }

  //access db to find the associated topicId from the slug we have
  const topic = await db.topic.findFirst({
    where: {
      slug,
    },
  })
  if (!topic) {
    return { errors: { _form: ['Topic could not be found'] } }
  }

  //actually create the post
  let post: Post
  try {
    {
      console.log('Session user id: ', session.user.id)
    }
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    })
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { errors: { _form: [err.message] } }
    } else {
      return {
        errors: { _form: ['Something went wrong. Failed to create post'] },
      }
    }
  }
  revalidatePath(paths.topicShow(slug))
  redirect(paths.postShow(slug, post.id))
}
