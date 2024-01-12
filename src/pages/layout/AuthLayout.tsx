import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from 'src/hooks/useAuth'

function AuthLayout() {
  const { user } = useAuth()
  if (user) return <Navigate to={'/'} replace={true} />
  return <Outlet />
}

export default AuthLayout
