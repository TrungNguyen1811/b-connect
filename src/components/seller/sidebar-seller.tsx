import { useState } from 'react'
import { useSidebar } from 'src/hooks/useSidebar'
import { cn } from 'src/lib/utils'
import {
  ArrowLeftIcon,
  BookIcon,
  BookPlusIcon,
  BookTemplate,
  LayoutDashboardIcon,
  LibraryBigIcon,
  ListStartIcon,
  PackageIcon,
  StoreIcon,
  TagIcon,
  User2Icon,
  WalletCardsIcon,
} from 'lucide-react'
import { NavItem } from 'src/types/NavItem'
import { useAuth } from 'src/hooks/useAuth'
import { SideNav } from '../sidebar-user/side-nav'

interface SidebarProps {
  className?: string
}

export default function SidebarSeller({ className }: SidebarProps) {
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
      title: 'Dashboard',
      icon: LayoutDashboardIcon,
      href: '/seller/dashboard',
      color: 'text-orange-500',
    },
    {
      title: 'Manage Order',
      icon: PackageIcon,
      href: '/seller/manage/order?type=1',
      color: 'text-orange-500',
    },
    {
      title: 'Manage Book',
      icon: BookIcon,
      href: '/seller/manage/books',
      color: 'text-orange-500',
      isChildren: true,
      children: [
        {
          title: 'All of Books',
          icon: BookTemplate,
          href: '/seller/manage/books',
          color: 'text-orange-500',
        },
        {
          title: 'Add book',
          icon: BookPlusIcon,
          href: '/seller/manage/books/new',
          color: 'text-orange-500',
        },
        {
          title: 'All Book Groups',
          icon: LibraryBigIcon,
          href: '/seller/manage/book-groups',
          color: 'text-orange-500',
        },
      ],
    },
    {
      title: 'Marketing Channel',
      icon: TagIcon,
      href: '/seller/marketing',
      color: 'text-orange-500',
    },
    {
      title: 'Finance',
      icon: WalletCardsIcon,
      href: '/seller/finance',
      color: 'text-orange-500',
    },
    {
      title: 'Manage Shop',
      icon: TagIcon,
      href: '/seller/shop',
      color: 'text-orange-500',
      isChildren: true,
      children: [
        {
          title: 'Account',
          icon: User2Icon,
          href: '/seller/account',
          color: 'text-orange-500',
        },
        {
          title: 'Profile Shop',
          icon: StoreIcon,
          href: '/seller/profile',
          color: 'text-orange-500',
        },
        {
          title: 'Rating Shop',
          icon: ListStartIcon,
          href: '/seller/rating',
          color: 'text-orange-500',
        },
      ],
    },
  ]
  return (
    <nav
      className={cn(
        `relative h-screen border-r md:block`,
        status && 'duration-500',
        isOpen ? 'w-72' : 'w-[78px]',
        className,
      )}
    >
      <ArrowLeftIcon
        className={cn(
          'absolute -right-3 top-5 z-10 cursor-pointer rounded-full border bg-background text-3xl text-foreground',
          !isOpen && 'rotate-180',
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <p className={cn('px-6 pb-4 text-3xl font-extrabold', !isOpen && 'hidden')}>Overview</p>
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
