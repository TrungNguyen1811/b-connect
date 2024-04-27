import { Outlet } from 'react-router-dom'
import Header from 'src/components/header/header-dashboard'
import SidebarStaff from 'src/components/staff/book/sidebar-staff'
// import { useAuth } from 'src/hooks/useAuth'
// import { ROLE } from 'src/types'

function StaffLayout() {
  // const { user } = useAuth()
  // if (user.roles && user.roles.includes(ROLE.SELLER) || user.roles && user.roles.includes(ROLE.BASEUSER)) {
  //   return <Navigate to={''} />
  // }
  return (
    <div>
      <Header />
      <div className="flex flex-row">
        <SidebarStaff />
        <Outlet />
      </div>
    </div>
  )
}
export default StaffLayout
