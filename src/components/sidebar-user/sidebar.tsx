import { useState } from 'react'
import { useSidebar } from 'src/hooks/useSidebar'
import { cn } from 'src/lib/utils'
import { SideNav } from './side-nav'
import {
  ArrowLeftIcon,
  AsteriskIcon,
  BellDotIcon,
  CreditCardIcon,
  Edit,
  Info,
  ListOrderedIcon,
  MapPinIcon,
  ShoppingBagIcon,
  TicketIcon,
  UserCircle,
} from 'lucide-react'
import { NavItem } from 'src/types/NavItem'
import { Avatar, AvatarImage } from '../ui/avatar'
import { useAuth } from 'src/hooks/useAuth'
import { Link } from 'react-router-dom'

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  const { isOpen, toggle } = useSidebar()
  const [status, setStatus] = useState(false)

  const { user } = useAuth()
  const handleToggle = () => {
    setStatus(true)
    toggle()
    setTimeout(() => setStatus(false), 500)
  }

  const NavItems: NavItem[] = [
    {
      title: 'My Profile',
      icon: UserCircle,
      href: 'user/account/profile',
      color: 'text-orange-500',
      isChildren: true,
      children: [
        {
          title: 'Information',
          icon: Info,
          color: 'text-red-500',
          href: '/user/account/profile',
        },
        {
          title: 'Bank',
          icon: CreditCardIcon,
          color: 'text-red-500',
          href: '/user/account/payment',
        },
        {
          title: 'Address',
          icon: MapPinIcon,
          color: 'text-red-500',
          href: '/user/account/address',
        },
        {
          title: 'Change Password',
          icon: AsteriskIcon,
          color: 'text-red-500',
          href: '/user/account/password',
        },
      ],
    },
    {
      title: 'My Purchase',
      icon: ShoppingBagIcon,
      href: '/user/purchase',
      color: 'text-orange-500',
    },
    {
      title: 'Notifications',
      icon: BellDotIcon,
      href: '/user/notifications',
      color: 'text-orange-500',
      isChildren: true,
      children: [
        {
          title: 'Order Updates',
          icon: ListOrderedIcon,
          href: '/user/notifications/order',
          color: 'text-orange-500',
        },
      ],
    },
    {
      title: 'My Voucher',
      icon: TicketIcon,
      href: '/user/voucher',
      color: 'text-orange-500',
    },
  ]
  return (
    <nav
      className={cn(
        `relative hidden h-screen border-r md:block`,
        status && 'duration-500',
        isOpen ? 'w-72' : 'w-[78px]',
        className,
      )}
    >
      <ArrowLeftIcon
        className={cn(
          'absolute -right-3 top-10 cursor-pointer rounded-full border bg-background text-3xl text-foreground',
          !isOpen && 'rotate-180',
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <Link to="/user/profile">
              <div className="flex flex-row">
                <Avatar>
                  <AvatarImage
                    className={cn('h-12 w-12 rounded-full', !isOpen && 'ml-2.5 h-8 w-8 rounded-full')}
                    src={'https://down-vn.img.susercontent.com/file/sg-11134004-7qvg8-limw3k5iiy5v7e_tn'}
                    alt={user?.fullName}
                  />
                  {/* <AvatarFallback>{getLabelByFullname(user.fullName)}</AvatarFallback> */}
                </Avatar>
                <div className={cn('ml-2 text-start', !isOpen && 'hidden')}>
                  <p className="text-lg text-accent-foreground">{user?.email}</p>
                  <p className="flex flex-row items-center">
                    <Edit size={16} /> Edit Profile
                  </p>
                </div>
              </div>
            </Link>

            <SideNav
              className="text-background opacity-0 transition-all duration-300 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100"
              items={NavItems}
            />
          </div>
        </div>
      </div>
    </nav>
  )
}
