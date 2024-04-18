import { Outlet } from 'react-router-dom'
import Footer from 'src/components/footer'
import Header from 'src/components/header/header'
import MetaData from 'src/components/metadata'
import TailwindIndicator from 'src/components/tailwind-indicator'
import { ChatLayout } from '../chat/chat-layout'

function MainLayout() {
  const defaultLayout = undefined
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <MetaData title="LandingPage" />
      <Header />
      <Outlet />
      <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
      <TailwindIndicator />
      <Footer />
    </div>
  )
}

export default MainLayout
