import Container from '@/components/Container'
import HomeBanner from '@/components/HomeBanner'
import ProductGrid from '@/components/ProductGrid'
import StaticHomeBanner from '@/components/StaticHomeBanner'

const page = () => {
  return (
     <Container>
     <HomeBanner/>
     <StaticHomeBanner/>
     <div className='py-10  '>
      <ProductGrid/>
     </div>
     
    </Container>
  )
}

export default page