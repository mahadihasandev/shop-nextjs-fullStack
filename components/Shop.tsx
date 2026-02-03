'use client'
import { Brand, Category, Product } from '@/sanity.types'
import React, { useState } from 'react'
import Container from './Container';
import { Title } from './ui/text';
import CategoryList from './Shop/CategoryList';
import BrandList from './Shop/BrandList';
import PriceList from './Shop/PriceList';
import { useSearchParams } from 'next/navigation';

interface Props{
    categories:Category[];
    brands:Brand[];
}
const Shop = ({categories,brands}:Props) => {
  const [products,setProducts] = useState<Product[]>([]);
  const [loading,setLoading] = useState(false);
  const [selectedCategory,setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand,setSelectedBrand] = useState<string | null>(null);
  const [selectedPrice,setSelectedPrice] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const brandParams = searchParams.get("brand"); 
  return (
    <div className='border-t'>
    <Container>        
        <div className='sticky top-0 z-10 mb-5'>
           <div className='flex items-center justify-between my-1'>
            <Title className='text-base! text-shop_dark_blue/80 uppercase tracking-wide font-sans
         rounded-md px-3 py-3 shadow-md shadow-shop_light_blue/40'>
          Select any thing you want
          </Title>
        <button className='text-shop_dark_blue/80 text-sm 
        font-semibold border border-shop_light_blue/30 hover:scale-105 
        hover:text-red-600 shadow-md hoverEffect shadow-shop_light_blue/40 
        hover:shadow-red-600/40 hover:border-red-600/40 rounded-md px-10 py-3'>
          Reset Filter</button>
           </div>
        </div>
        <div className='flex flex-col md:flex-row border-t shadow gap-5'>
          <div className='md:sticky md:top-20 md:self-start 
          md:h-[calc(100vh-160px)] md:overflow-y-scroll scrollbar-hide md:min-w-64 pb-5 
          md:border-r shadow'>
            <CategoryList categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
            <BrandList brands={brands} selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand}/>
            <PriceList selectedPrice={selectedPrice} setSelectedPrice={setSelectedPrice}/>
          </div>
          <div>Products</div>
        </div>
    </Container>
    </div>
  )
}

export default Shop