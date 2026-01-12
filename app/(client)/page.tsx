import Container from '@/components/Container'
import HomeBanner from '@/components/HomeBanner'
import StaticHomeBanner from '@/components/StaticHomeBanner'

const page = () => {
  return (
     <Container>
     <HomeBanner/>
     <StaticHomeBanner/>
    </Container>
  )
}

export default page