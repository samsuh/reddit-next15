'use client'

import { useSession } from 'next-auth/react'

export default function Profile() {
  const session = useSession()

  if (session.data?.user) {
    return <div>CLIENT: User logged in</div>
  }

  return <div>CLIENT: User NOT logged in</div>
}
