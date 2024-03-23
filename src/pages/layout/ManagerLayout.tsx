import { Outlet } from 'react-router-dom'
import Header from 'src/components/header/header-dashboard'
import SidebarManager from 'src/components/manager/sidebar-manager'
// import { useAuth } from 'src/hooks/useAuth'
// import { ROLE } from 'src/types'

function ManagerLayout() {
  // const { user } = useAuth()
  // if (user?.role === ROLE.CUSTOMER || user?.role === ROLE.SELLER || user?.role === ROLE.ADMIN) {
  //   return <Navigate to={''} />
  // }
  return (
    <div>
      <Header />
      <div className="flex flex-row">
        <SidebarManager />
        <Outlet />
      </div>
    </div>
  )
}
export default ManagerLayout
