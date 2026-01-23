import Container from '@/components/Container'
import HomeBanner from '@/components/HomeBanner'
import HomeCategories from '@/components/HomeCategories'
import ProductGrid from '@/components/ProductGrid'
import StaticHomeBanner from '@/components/StaticHomeBanner'
import { getCategories } from '@/sanity/lib'
import { number } from 'motion/react'

const page = async() => {
  const categories=await getCategories(6)
 
  
  
  return (
     <Container>
     <HomeBanner/>
     <StaticHomeBanner/>
     <div className='py-10'>
      <ProductGrid/>
     </div>
     <HomeCategories categories={categories}/>
     
    </Container>
  )
}

export default page