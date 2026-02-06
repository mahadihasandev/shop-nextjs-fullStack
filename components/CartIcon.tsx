"use client"
import Link from 'next/link'
import { FaCartShopping } from "react-icons/fa6";
import useStore from '@/store';

const CartIcon = () => {
  const {items}=useStore()
  return (
    <Link href={"/cart"} className='group relative'>
      <FaCartShopping className='text-shop_dark_blue w-5 h-5 group-hover:text-shop_light_blue 
      hoverEffect'/>
      <span className='absolute -top-1 -right-1 bg-red-600 text-white h-3.5 w-3.5 
      rounded-full text-xs font-semibold flex items-center justify-center scale-90 
      group-hover:scale-100 transition-transform duration-300'>
        {items?.length?items?.length:0}</span>
    </Link>
  )
}

export default CartIcon