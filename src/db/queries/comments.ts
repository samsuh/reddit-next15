import type { Comment } from '@prisma/client'
import { db } from '@/db'
import { cache } from 'react'

export type CommentWithAuthor = Comment & {
  user: { name: string | null; image: string | null }
}

//this is the function we want to memoize; we want to call it many times but only run the unique ones
export const fetchCommentsByPostId = cache(
  (postId: string): Promise<CommentWithAuthor[]> => {
    return db.comment.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    })
  }
)

export function fetchCommentsByUserId(
  userId: string
): Promise<CommentWithAuthor[]> {
  return db.comment.findMany({
    where: { userId },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  })
}
