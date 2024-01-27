import { Outlet } from 'react-router-dom'
// import { useAuth } from 'src/hooks/useAuth'
// import { ROLE } from 'src/types'

function AdminLayout() {
  // const { user } = useAuth()
  // if (user?.role === ROLE.CUSTOMER || user?.role === ROLE.SELLER) {
  //   return <Navigate to={''} />
  // }
  return (
    <div>
      <Outlet />
    </div>
  )
}
export default AdminLayout
