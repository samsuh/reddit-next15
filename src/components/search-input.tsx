'use client'

import { Input } from '@heroui/react'
import { useSearchParams } from 'next/navigation'

export default function SearchInput() {
  const searchParams = useSearchParams()
  return <Input defaultValue={searchParams.get('term') || ''} />
}
