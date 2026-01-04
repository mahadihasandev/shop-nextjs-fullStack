import React from 'react'
import Container from './Container'
import Logo from './Logo'
import HeaderMenu from './HeaderMenu'

const Header = () => {
  return (
    <header className='bg-white py-5'>
            <Container className='flex justify-between items-center'>
            <Logo className=''/>
            <HeaderMenu/>
            <div>other</div>
            </Container>    
        </header>
  )
}

export default Header