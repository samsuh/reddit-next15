//all query functions that are used by the PostList component from anywhere.

import type { Post } from '@prisma/client'
import { db } from '@/db'

export type PostWithAdditionalDataForListDisplay = Post & {
  topic: { slug: string }
  user: { name: string | null }
  _count: { comments: number }
}

export function fetchPostByTopicSlug(
  slug: string
): Promise<PostWithAdditionalDataForListDisplay[]> {
  return db.post.findMany({
    where: { topic: { slug } },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  })
}
