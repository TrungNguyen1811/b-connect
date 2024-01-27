import { Outlet } from 'react-router-dom'
import SideBar from 'src/components/sidebar-user/sidebar'

function UserLayout() {
  return (
    <div className="flex flex-row">
      <div>
        <SideBar />
      </div>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  )
}
export default UserLayout
