import Link from 'next/link'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Button,
  Avatar,
} from '@heroui/react'
import { auth } from '@/auth'
import * as actions from '@/actions'

export default async function Header() {
  const session = await auth()

  let authContent: React.ReactNode
  if (session?.user) {
    authContent = <Avatar src={session.user.image || ''} />
  } else {
    authContent = (
      <>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type='submit' color='secondary' variant='bordered'>
              Sign In
            </Button>
          </form>
        </NavbarItem>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type='submit' color='primary' variant='flat'>
              Sign Up
            </Button>
          </form>
        </NavbarItem>
      </>
    )
  }

  return (
    <Navbar className='shadow mb-6'>
      <NavbarBrand>
        <Link href='/' className='font-bold'>
          Reddit
        </Link>
      </NavbarBrand>
      <NavbarContent justify='center'>
        <Input />
      </NavbarContent>
      <NavbarContent justify='end'>{authContent}</NavbarContent>
    </Navbar>
  )
}
