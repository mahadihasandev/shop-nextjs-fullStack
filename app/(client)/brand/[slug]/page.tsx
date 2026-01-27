
import Container from '@/components/Container'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/sanity.types'
import { client } from '@/sanity/lib/client'


import React from 'react'

const Brands = async({params}: {params: {slug: string}}) => {
    const param=await params
    
    
    const quary=`*[_type == "product" && brand->slug.current == $slug]{
  ...
}`

const data=await client.fetch(quary,{slug:param.slug})
console.log(data);

    
  return (
    <Container>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-10'>
      {data.map((product:Product) => (
        <div  key={product._id}>
          <ProductCard product={product}/>
            
        </div>
      ))}
      </div>
    </Container>
  )
}

export default Brands