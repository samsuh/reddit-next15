import Link from 'next/link'
import { Navbar, NavbarBrand, NavbarContent, Input } from '@heroui/react'
import HeaderAuth from './header-auth'
import SearchInput from '@/components/search-input'
import { Suspense } from 'react'

export default async function Header() {
  return (
    <Navbar className='shadow mb-6'>
      <NavbarBrand>
        <Link href='/' className='font-bold'>
          Reddit
        </Link>
      </NavbarBrand>
      <NavbarContent justify='center'>
        <Suspense>
          <SearchInput />
        </Suspense>
      </NavbarContent>
      <NavbarContent justify='end'>
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  )
}
