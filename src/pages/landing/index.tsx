import CarouselDemo from 'src/components/landing/carousel'
import LandingLayout from '../layout/LandingLayout'
import Categories from 'src/components/landing/categories'
import TopBook from 'src/components/landing/top-product'
import DailyDiscover from 'src/components/landing/daily-discover'

function LandingPage() {
  return (
    <LandingLayout>
      <>
        <div className=" bg-orange-100">
          <CarouselDemo />
          <Categories />
          <TopBook />
          <DailyDiscover />
        </div>
      </>
    </LandingLayout>
  )
}
export default LandingPage
