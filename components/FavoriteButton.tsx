import { cn } from '@/lib/utils'
import { Product } from '@/sanity.types'
import { HeartPlus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const FavoriteButton = ({
  product,
  showProduct=false,
  className}:{
  product:Product|null|undefined;
  showProduct:boolean;
  className?:string;
}) => {
  return (
<>
{!showProduct?(
        <Link href={"/wishlist"} className={cn(`group relative`,className)}>
      <HeartPlus className='text-shop_dark_blue w-5 h-5 
      group-hover:text-shop_light_blue hoverEffect'/>
      <span className='absolute -top-1 -right-1 bg-shop_dark_blue 
      text-white h-3.5 w-3.5 rounded-full text-sm font-semibold 
      flex items-center justify-center scale-90 group-hover:scale-110 
      hoverEffect'>0</span>
    </Link>
):<button className='group relative hover:text-shop_light_blue hoverEffect 
border-2 border-shop_light_blue/40 hover:border-shop_light_blue p-1.5 rounded-md'>
  <HeartPlus className='text-shop_dark_blue w-5 h-5
      group-hover:text-shop_light_blue hoverEffect'/>
</button>
}
</>
  )
}

export default FavoriteButton