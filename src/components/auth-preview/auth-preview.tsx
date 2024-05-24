import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import React, { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ROLE } from 'src/types/user'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { cn, getLabelByFullname } from 'src/lib/utils'
import { Button } from '../ui/button'
import { useAuth } from 'src/hooks/useAuth'
import {
  ArrowLeftRight,
  Book,
  CarFrontIcon,
  Disc,
  HandCoinsIcon,
  LayoutDashboardIcon,
  List,
  LucideTruck,
  User,
} from 'lucide-react'

export const Icons = {
  lucideTruck: LucideTruck,
  user: User,
  disc: Disc,
  dashboard: LayoutDashboardIcon,
  book: Book,
  cart: CarFrontIcon,
  category: List,
  transaction: ArrowLeftRight,
}
export const ADMIN_SECTION_ITEMS: {
  to: string
  title: string
  icon: keyof typeof Icons
}[] = [
  {
    to: '/admin',
    title: 'Dashboard',
    icon: 'dashboard',
  },
  {
    to: '/admin/manage/user',
    title: 'Users',
    icon: 'user',
  },
  {
    to: '/admin/book',
    title: 'Books',
    icon: 'book',
  },
  {
    to: '/admin/orders',
    title: 'Orders',
    icon: 'cart',
  },
  {
    to: '/admin/category',
    title: 'Category',
    icon: 'category',
  },
  {
    to: '/admin/transaction',
    title: 'Transaction',
    icon: 'transaction',
  },
]

type Props = React.HTMLAttributes<HTMLDivElement>

function AuthPreview({ className, ...prosp }: Props) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const onLogin = useCallback(() => {
    navigate('/login')
  }, [navigate])

  const onLogout = useCallback(() => {
    logout()
    navigate('/')
  }, [logout, navigate])

  const AdminSection = React.useMemo(() => {
    if (user?.roles && user.roles.includes(ROLE.BASEUSER)) {
      return <></>
    }
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <Disc className="mr-2 h-4 w-4" />
          Admin center
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            {ADMIN_SECTION_ITEMS.map(({ icon, title, to }) => {
              const Icon = Icons[icon] || <span />
              return (
                <DropdownMenuItem key={title}>
                  <Link to={to} className="flex items-center justify-center">
                    <Icon size={12} className="mr-2 h-4 w-4" />
                    <p>{title}</p>
                  </Link>
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    )
  }, [user?.roles])

  const renderUserDropdown = React.useMemo(() => {
    if (!user) return <></>
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="user-profile flex items-center justify-start gap-2">
          <Avatar>
            <AvatarImage src={user.avatarDir as string} alt={user.fullName} />
            <AvatarFallback>{getLabelByFullname(user.fullName)}</AvatarFallback>
          </Avatar>
          <div className="text-start">
            <h6 className="font-medium">{user.fullName}</h6>
            <p className="text-xs text-accent-foreground">{user.email}</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col">
          <DropdownMenuSeparator />
          <Link to="/user/account/profile" className="hover-underline-animation hover:hover-underline-animation">
            <DropdownMenuItem className="flex flex-row gap-2">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
          </Link>
          <Link to="/user/purchase?type=1" className="hover-underline-animation hover:hover-underline-animation">
            <DropdownMenuItem className="flex flex-row gap-2">
              <LucideTruck className="mr-2 h-4 w-4 hover:animate-bounce hover:text-orange-500" />
              My purchase
            </DropdownMenuItem>
          </Link>
          <Link to="/user/transaction" className="hover-underline-animation hover:hover-underline-animation">
            <DropdownMenuItem className="flex flex-row gap-2">
              <ArrowLeftRight className="mr-2 h-4 w-4" />
              Payment history
            </DropdownMenuItem>
          </Link>
          <Link to="/user/refund" className="hover-underline-animation hover:hover-underline-animation">
            <DropdownMenuItem className="flex flex-row gap-2">
              <HandCoinsIcon className="mr-2 h-4 w-4" />
              Request Refund
            </DropdownMenuItem>
          </Link>
          {AdminSection}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            inset
            onClick={onLogout}
            className="hover-underline-animation hover:hover-underline-animation text-destructive hover:bg-destructive/20 hover:text-orange-700"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }, [AdminSection, onLogout, user])

  return (
    <div className={(cn(className), 'flex')} {...prosp}>
      {user ? (
        <div className="flex items-center justify-between gap-2">{renderUserDropdown}</div>
      ) : (
        <div>
          <Button variant="outline" onClick={onLogin}>
            Login
          </Button>
        </div>
      )}
    </div>
  )
}

export default AuthPreview
