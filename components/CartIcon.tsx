import Link from 'next/link'
import React from 'react'
import { FaCartShopping } from "react-icons/fa6";

const CartIcon = () => {
  return (
    <Link href={"/cart"} className='group relative'>
      <FaCartShopping className='text-shop_dark_blue w-5 h-5 group-hover:text-shop_light_blue hoverEffect'/>
      <span className='absolute -top-1 -right-1 bg-shop_dark_blue text-white h-3.5 w-3.5 rounded-full text-sm font-semibold flex items-center justify-center scale-90 group-hover:scale-110 transition-transform duration-300'>0</span>
    </Link>
  )
}

export default CartIcon