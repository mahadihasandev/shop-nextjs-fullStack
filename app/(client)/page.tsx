import Container from '@/components/Container'
import HomeBanner from '@/components/HomeBanner'
import HomeCategories from '@/components/HomeCategories'
import LetestBlog from '@/components/LetestBlog'
import ProductGrid from '@/components/ProductGrid'
import ShopByBrands from '@/components/ShopByBrands'
import StaticHomeBanner from '@/components/StaticHomeBanner'
import { getCategories } from '@/sanity/lib'


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
     <ShopByBrands/>
     <LetestBlog/>
     
    </Container>
  )
}

export default page