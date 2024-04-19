import { Link } from 'react-router-dom'
import { UserNav } from './nav-dashboard'
import { useAuth } from 'src/hooks/useAuth'

export default function Header() {
  const { user } = useAuth()
  const path = `${user?.roles}`
  const lowercasedPath = path.toLowerCase()
  return (
    <div className="supports-backdrop-blur:bg-background/60 sticky left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-14 items-center justify-between px-4">
        <div className="hidden lg:block">
          <Link
            to={'/'}
            className="text-black-100 xs:text-2xl mr-4 cursor-pointer justify-center font-extrabold lg:text-3xl"
          >
            BConnect
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <UserNav />
        </div>
      </nav>
    </div>
  )
}
