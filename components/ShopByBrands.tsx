import React from 'react'
import { Title } from './ui/text'
import Link from 'next/link'
import { getAllBrands } from '@/sanity/lib';
import { Brand } from '@/sanity.types';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { FaTruck } from "react-icons/fa";
import { LuGitCompareArrows } from "react-icons/lu";
import { RiCustomerService2Line } from "react-icons/ri";
import { AiOutlineSafetyCertificate } from "react-icons/ai";


const extraBrands=[
    {
        title:"Free Delivery",
        description:"Free Shipping on orders over $100",
        icon:<FaTruck/>
    },
    {
      title:"Free Returns",
      description:"Free Returns over $100",
      icon:<LuGitCompareArrows/>
    },
    {
      title:"Customer Support",
      description:"24/7 Customer Support",
      icon:<RiCustomerService2Line/>
    },{
      title:"Safe Payment",
      description:"Safe Payment",
      icon:<AiOutlineSafetyCertificate/>
    }
]

const ShopByBrands =async () => {
 const brands:Brand[]=await getAllBrands();
  
  return (
    <div className='mb-10 lg:pb-10 bg-shop_light_bg p-5 lg:p-7'>
        <div className='flex items-center justify-between mb-10 gap-2.5'>
            <Title className='text-2xl'>Shop By Brands</Title>
            <Link className='text-sm font-semibold tracking-wide hover:text-blue-800 hover:scale-105 hoverEffect font-poppins' href={"/shop"}>
            View All
            </Link>
        </div>
        <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-5'>
          {brands?.map((brand)=>(
            <Link key={brand?._id} href={{pathname:"/shop",query:{brand:brand?.slug?.current}}} 
            className='bg-white w-32 h-24 flex items-center justify-center rounded-md overflow-hidden hover:shadow-md shadow-shop_light_blue/50 hoverEffect'
            >
              {brand?.image&&(<Image  src={urlFor(brand?.image).url()} alt='brandImage' width={250} height={250}
              className='w-32 h-20 object-contain scale-90 hover:scale-100 hoverEffect'
              />)}
            </Link>
          ))}
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 p-2 shadow-md hover:shadow-shop_light_blue/20 py-5'>
          {
            extraBrands?.map((brand,index)=>(
              <div className='flex border border-shop_dark_blue/10 hover:border-shop_dark_blue/30 rounded-md items-center px-5 md:px-0 md:justify-center py-5 gap-3 group text-lightColor hover:text-blue-800 hover:scale-105 hoverEffect font-poppins' key={index}>
                <span className='inline-flex scale-100 group-hover:scale-105 text-2xl text-shop_dark_blue
                hoverEffect'>
                  {brand?.icon}
                </span>
                <div className='text-sm'>
                  <p className='text-darkColor font-bold capitalize'>{brand?.title}</p>
                  <p className='text-lightColor'>{brand?.description}</p>
                </div>
              </div>
            ))
          }
        </div>
        </div>
  )
}

export default ShopByBrands