'use client'
import React, { useEffect, useState } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { Banner } from '@/sanity.types'
import { urlFor } from '@/sanity/lib/image'
import Autoplay from "embla-carousel-autoplay"
import Link from 'next/link'

const HomeBanner = () => {
  const [banner,setBanner]=useState<Banner[]>([])
  
  
    const quarry=`*[_type=="banner"]| order(name desc){
    ...,"productSlug":product[]->slug.current
}`
const plugin = React.useRef(
    Autoplay({ delay: 4500, stopOnInteraction: false })
  )
useEffect(()=>{
  const fetchData= async ()=>{
    
    try {
      const response=await client.fetch(quarry) 
      setBanner(response); 
    } catch (error) {
      console.log("fetchData",error);
      
    }finally{
      
    }
  }
  fetchData()
},[])
  
  return (
    
    <Carousel 
        className="w-full mt-2"
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[plugin.current]}
      >
        <CarouselContent>          
          {banner.map((item,index) => (
            <CarouselItem key={item._id || index}>
              <div className="rounded-lg h-full w-full overflow-hidden flex items-center justify-center">
                <Link href={`/product/${item?.productSlug?.[0]}`}>
                <Image 
                  className="w-full h-full object-cover" 
                  width={1300} 
                  height={357} 
                  alt={item.title || 'banner image'} 
                  src={item.image ? urlFor(item.image).url() : '/fallback-image.png'}
                  priority={index === 0} 
                />
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
   
  )
}

export default HomeBanner