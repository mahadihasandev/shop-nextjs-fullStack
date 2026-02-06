'use client'
import { cn } from '@/lib/utils'
import { Product } from '@/sanity.types'
import useStore from '@/store'
import { HeartPlus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const FavoriteButton = ({
  product,
  showProduct=true,
  className}:{
  product:Product
  showProduct:boolean;
  className?:string;
}) => {
  const {favoriteProduct}=useStore()
  return (
<>
{favoriteProduct?.length>0?(
        <Link href={"/wishlist"} className={cn(`group relative`,className)}>
      <HeartPlus className='text-shop_dark_blue w-5 h-5 
      group-hover:text-shop_light_blue hoverEffect'/>
      <span className='absolute -top-1 -right-1 bg-red-600 
      text-white h-3.5 w-3.5 rounded-full text-xs font-semibold 
      flex items-center justify-center scale-90 group-hover:scale-100 
      hoverEffect'>{favoriteProduct?.length?favoriteProduct?.length:0}</span>
    </Link>
):<button className='group relative hover:text-shop_light_blue hoverEffect 
 hover:border-shop_light_blue rounded-md'>
  <HeartPlus className='text-shop_dark_blue w-5 h-5
      group-hover:text-shop_light_blue hoverEffect'/>
</button>
}
</>
  )
}

export default FavoriteButton