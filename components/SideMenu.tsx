import React, { FC } from 'react'
import Logo from './Logo'
interface SideMenuProps{
  isOpen:boolean,
  onClose:()=>void

}
const SideMenu:FC<SideMenuProps> = ({isOpen,onClose}) => {
  return (
    <div className={`fixed inset-y-0 h-screen left-0 z-50 w-full bg-shop_dark_blue/50 shadow-xl ${isOpen?'translate-x-0':'-translate-x-full'} hoverEffect`}>
      <div>
        <div className='min-w-72 max-w-96 bg-shop_dark_blue h-screen'>
        <Logo className='text-white'/>
        </div>
        <div>

        </div>
      </div>
    </div>
  )
}

export default SideMenu