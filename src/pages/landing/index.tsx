import CarouselDemo from 'src/components/landing/carousel'
import LandingLayout from '../layout/LandingLayout'
import Categories from 'src/components/landing/categories'
import TopBook from 'src/components/landing/top-product'
import DailyDiscover from 'src/components/landing/daily-discover'
import { ChatLayout } from '../chat/chat-layout'

function LandingPage() {
  const defaultLayout = undefined
  return (
    <LandingLayout>
      <>
        <div className=" bg-orange-100">
          <CarouselDemo />
          <Categories />
          <TopBook />
          <DailyDiscover />
          <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
        </div>
      </>
    </LandingLayout>
  )
}
export default LandingPage
