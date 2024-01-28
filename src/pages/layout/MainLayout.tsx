import { Outlet } from 'react-router-dom'
import Footer from 'src/components/footer'
import Header from 'src/components/header/header'
import MetaData from 'src/components/metadata'
import TailwindIndicator from 'src/components/tailwind-indicator'

function MainLayout() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <MetaData title="LandingPage" />
      <Header />
      <Outlet />
      <TailwindIndicator />
      <Footer />
    </div>
  )
}

export default MainLayout
