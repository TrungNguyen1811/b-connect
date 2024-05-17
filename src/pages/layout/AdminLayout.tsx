import { Navigate, Outlet } from 'react-router-dom'
import Header from 'src/components/header/header-dashboard'
import SidebarAdmin from 'src/components/admin/sidebar-admin'
import { useAuth } from 'src/hooks/useAuth'
import { ROLE } from 'src/types'

function AdminLayout() {
  const { user } = useAuth()

  if (!(user?.roles && user.roles.includes(ROLE.ADMIN))) {
    return <Navigate to={'/'} />
  }
  return (
    <div>
      <Header />
      <div className="flex flex-row">
        <SidebarAdmin />
        <Outlet />
      </div>
    </div>
  )
}
export default AdminLayout
