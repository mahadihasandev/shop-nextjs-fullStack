"use client"
import React, { useEffect, useState } from 'react'
import HomeTabBar from './HomeTabBar'
import { productType } from '@/constant/data'
import { client } from '@/sanity/lib/client'
import { AnimatePresence, motion } from "motion/react"
import { TbLoader3 } from "react-icons/tb";
import NoProductAvailable from "./NoProductAvailable"
import ProductCard from './ProductCard'
import { Product } from '@/sanity.types'



const ProductGrid = () => {
  const [product,setProduct] =useState<Product[]>([])
  const [loading,setLoading]=useState(false)
  const [selectedTab,setSelectedTab]=useState(productType[0].title||"")
const params={variant:selectedTab.toLowerCase()}
  const quarry=`*[_type=="product" && variant==$variant]| order(name desc){
...,"categories":categories[]->title
}`



useEffect(()=>{
  const fetchData= async ()=>{
    setLoading(true)
    try {
      const response=await client.fetch(quarry,params)
      setProduct(response);
      
    } catch (error) {
      console.log("fetchData",error);
      
    }finally{
      setLoading(false)
    }
  }
  fetchData()
},[selectedTab])


  return (
    <div>
     
      <HomeTabBar selectedTab={selectedTab} onTabSelect={setSelectedTab}/>
      {loading?<div className='flex flex-col items-center justify-center py-10 min-h-80 gap-4 bg-gray-100 w-full mt-10'>
        <div className='space-x-2 flex items-center text-blue-600'>
          <TbLoader3 className='w-10 h-9 animate-spin text-shop_light_blue'/>
          <span>Product is Loading...</span>
        </div>
      </div>
      :(product?.length
        ?<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-10'>
          {product?.map((item)=>(
          <AnimatePresence key={item._id}>
            <motion.div layout initial={{opacity:0.2}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1}}>
              <div>
                <ProductCard product={item}/>
              </div>
            </motion.div>
          </AnimatePresence>
        ))}</div>
      :<><NoProductAvailable selectedTab={selectedTab} className=''/></>)}
    </div>
  )
}

export default ProductGrid