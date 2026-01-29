import CategoryProduct from '@/components/CategoryProduct'
import Container from '@/components/Container'
import { Title } from '@/components/ui/text'

import { getCategories } from '@/sanity/lib'
import React from 'react'

const CategoryPage = async({params}:{params:Promise<{slug:string}>}) => {
    const categories=await getCategories()
    const {slug}=await params
    


  return (
    <div className='py-10'>
        <Container>
            <Title className='font-sans shadow-md shadow-shop_light_blue/20 rounded-md px-3 py-3'>Product by Categories:{' '}
              <span className='font-bold text-blue-600 tracking-wider capitalize'>{slug&&slug}</span>
            </Title>
            <CategoryProduct categories={categories} slugs={slug}/>
      
        </Container>
    </div>
  )
}

export default CategoryPage