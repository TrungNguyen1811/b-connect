import { Outlet } from 'react-router-dom'
import Header from 'src/components/header/header-dashboard'
import SidebarSeller from 'src/components/seller/sidebar-seller'
// import { useAuth } from 'src/hooks/useAuth'
// import { ROLE } from 'src/types'

function SellerLayout() {
  // const { user } = useAuth()
  // if (user?.role === ROLE.CUSTOMER || user?.role === ROLE.MANAGER || user?.role === ROLE.ADMIN) {
  //   return <Navigate to={''} />
  // }
  return (
    <div>
      <Header />
      <div className="flex flex-row">
        <div className="fixed">
          <SidebarSeller />
        </div>
        <div className="ml-72">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
export default SellerLayout
