import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'

interface Banner {
  _id: string;
  title?: string;
  image: string;
}
const HomeBanner = async() => {
     const data:Response = await fetch('https://e-commerce-backend-multivandor.vercel.app/api/v1/product/viewbanner')
    const posts= await data.json()
  
  return (
    <div>
    <Carousel 
        className="w-full pt-4"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          
          {posts.map((item:Banner, index: number) => (
            <CarouselItem key={item._id || index}>
              <div className="rounded-lg h-full overflow-hidden flex items-center justify-center">
                <Image 
                  className="w-full object-cover" 
                  width={1200} 
                  height={357} 
                  alt={item.title || 'banner image'} 
                  src={item.image}
                  priority={index === 0} 
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default HomeBanner