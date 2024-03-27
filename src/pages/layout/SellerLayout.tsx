import { Outlet } from 'react-router-dom'
import Header from 'src/components/header/header-dashboard'
import SidebarSeller from 'src/components/seller/sidebar-seller'
import { useAuth } from 'src/hooks/useAuth'
import RegisterAgency from '../seller/RegisterAgency'

function SellerLayout() {
  const { user } = useAuth()

  if (user?.isSeller === false) {
    return <RegisterAgency />
  }

  return (
    <div>
      <Header />
      <div className="flex flex-row">
        <div className="relative">
          <SidebarSeller />
        </div>
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
export default SellerLayout
