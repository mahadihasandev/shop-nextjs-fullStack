import { SignInButton } from '@clerk/nextjs'
import { Users } from 'lucide-react'
import React from 'react'

const SignIn = () => {
  return (
    <SignInButton mode='modal'><Users className='scale-90 cursor-pointer text-shop_dark_blue hover:scale-100 hoverEffect hover:text-shop_light_blue' /></SignInButton>
  )
}

export default SignIn