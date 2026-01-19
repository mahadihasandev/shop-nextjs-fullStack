import { cn } from '@/lib/utils';
import { Product } from '@/sanity.types'
import React from 'react'
import { FaHeartCirclePlus } from "react-icons/fa6";

const AddToWishListButton = ({product,className}:
    {
        product:Product,
        className:string
    }) => {
  return (
    <div className={cn("absolute top-1 right-2 z-10",className)}>
        <div className='p-2.5 rounded-full text-shop_dark_blue hover:bg-shop_light_blue hover:text-white hoverEffect bg-blue-100' >
            <FaHeartCirclePlus size={19}/>
        </div>
    </div>
  )
}

export default AddToWishListButton