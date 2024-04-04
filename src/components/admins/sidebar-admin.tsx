import { useState } from 'react'
import { useSidebar } from 'src/hooks/useSidebar'
import { cn } from 'src/lib/utils'
import {
  ArrowLeftIcon,
  ArrowRightLeftIcon,
  BookTemplateIcon,
  LayoutDashboardIcon,
  StickyNoteIcon,
  Users,
} from 'lucide-react'
import { NavItem } from 'src/types/NavItem'
import { SideNav } from '../sidebar-user/side-nav'

interface SidebarProps {
  className?: string
}

export default function SidebarAdmin({ className }: SidebarProps) {
  const { isOpen, toggle } = useSidebar()
  const [status, setStatus] = useState(false)

  // const { user } = useAuth()
  const handleToggle = () => {
    setStatus(true)
    toggle()
    setTimeout(() => setStatus(false), 500)
  }

  const NavItems: NavItem[] = [
    {
      title: 'Dashboard',
      icon: LayoutDashboardIcon,
      href: '/admin/dashboard',
      color: 'text-orange-500',
    },
    {
      title: 'Manage Users',
      icon: Users,
      href: '/admin/manage/user',
      color: 'text-orange-500',
    },
    {
      title: 'Manage Post',
      icon: StickyNoteIcon,
      href: '/admin/manage/post',
      color: 'text-orange-500',
    },
    {
      title: 'Manage Category',
      icon: BookTemplateIcon,
      href: '/admin/manage/category',
      color: 'text-orange-500',
    },
    {
      title: 'Manage Transaction',
      icon: ArrowRightLeftIcon,
      href: '/admin/manage/transaction',
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
          'absolute -right-3 top-5 cursor-pointer rounded-full border bg-background text-3xl text-foreground',
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
