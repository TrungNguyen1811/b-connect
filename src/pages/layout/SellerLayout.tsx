import { Outlet } from 'react-router-dom'
import Header from 'src/components/header/header-dashboard'
import SidebarSeller from 'src/components/seller/sidebar-seller'
import { useAuth } from 'src/hooks/useAuth'
import { ROLE } from 'src/types/user'
import RegisterAgency from '../seller/RegisterAgency'

function SellerLayout() {
  const { user } = useAuth()

  console.log(user)
  if (user?.roles && !user.roles.includes(ROLE.SELLER)) {
    return <RegisterAgency />
  }

  return (
    <div>
      <Header />
      <div className="flex flex-row">
        <div className="relative">
          <SidebarSeller />
        </div>
        <div className="h-full w-full">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
export default SellerLayout
