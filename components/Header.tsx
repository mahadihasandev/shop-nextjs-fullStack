import React from 'react'
import Container from './Container'
import Logo from './Logo'
import HeaderMenu from './HeaderMenu'
import SearchBar from './SearchBar'
import CartIcon from './CartIcon'
import FavoriteButton from './FavoriteButton'
import SignIn from './SignIn'
import MobileMenu from './MobileMenu'
import { currentUser } from '@clerk/nextjs/server'
import { ClerkLoaded, SignedIn, UserButton } from '@clerk/nextjs'
import { getOrder } from '@/sanity/lib'
import OrderLogButton from './OrderLogButton'


const Header = async() => {
  const user=await currentUser();
  let order
  
  if(user?.id){
    order=await getOrder(user?.id as string);
  }
  return (
    <header className='bg-blue-50/70 py-5 sticky top-0 z-50 backdrop-blur-md shadow-md rounded-b-lg'>
            <Container className='flex justify-between items-center text-lightColor'>
            <div className='w-auto md:w-1/3 flex items-center justify-start gap-2.5 md:gap-0'>
              <MobileMenu/>
              <Logo className=''/>              
            </div>
            <div className='w-auto md:w-1/3'>
              <HeaderMenu/>
            </div>
            
            <div className='w-auto md:w-1/3 flex items-center justify-end gap-5'>
              <SearchBar/>
              <CartIcon/>
              <FavoriteButton />
              <ClerkLoaded>
                <SignedIn>
                 <OrderLogButton order={order}/>
                  <UserButton/>
                </SignedIn>
                {!user&&<SignIn/>}
                
              </ClerkLoaded>
            </div>
            </Container>    
        </header>
  )
}

export default Header