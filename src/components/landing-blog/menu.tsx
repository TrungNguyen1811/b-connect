import React, { useState } from 'react'
import { IMenuItem } from '../breadcrumb'
import MenuSideBar from '../menu-items/menu-item'
import { FacebookIcon, GithubIcon, InstagramIcon, SettingsIcon, TwitterIcon, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from 'src/hooks/useAuth'

export function Menu() {
  const menu = React.useMemo<IMenuItem[]>(() => {
    return [
      {
        title: 'Home',
        key: 'home',
        href: '/home',
        icon: 'home',
      },
      {
        title: 'Reading List',
        key: 'reading-list',
        href: '/reading-list',
        icon: 'list',
      },
      {
        title: 'Tags',
        key: 'tags',
        href: '/tags',
        icon: 'tags',
      },
      {
        title: 'Store',
        key: 'store',
        href: '/',
        icon: 'store',
      },
      {
        title: 'About',
        key: 'about',
        href: '/about',
        icon: 'book',
      },
      {
        title: 'Contact',
        key: 'contact',
        href: '/contact',
        icon: 'contact',
      },
      {
        title: 'Privacy Policy',
        key: 'privacy-policy',
        href: '/privacy-policy',
        icon: 'policy',
      },
    ]
  }, [])
  const CONTACT = [
    {
      id: 1,
      icon: GithubIcon,
      href: '',
    },
    {
      id: 2,
      icon: FacebookIcon,
      href: '',
    },
    {
      id: 3,
      icon: InstagramIcon,
      href: '',
    },
    {
      id: 4,
      icon: TwitterIcon,
      href: '',
    },
    {
      id: 5,
      icon: Youtube,
      href: '',
    },
  ]

  const Contact = ({ items }: { items: Array<{ id: number; icon: React.ElementType; href: string }> }) => {
    return (
      <div className="my-6">
        <p className="text-md pb-2 font-bold">Follow us</p>
        <ul className="flex flex-row">
          {items.map((item) => (
            <li key={item.id} className="rounded-sm p-2 hover:bg-gray-300">
              <Link to={item.href}>
                <item.icon />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const Interested = () => {
    const { user } = useAuth()
    const [categoryNames, setCategoryNames] = useState<string[]>([])

    // useEffect(() => {
    //   const fetchCategoryNames = async () => {
    //     const names: string[] = []
    //     for (const interest of user?.interested || []) {
    //       for (const category of interest.category_id) {
    //         const name = await getCategoryById(category.name)
    //         if (name) {
    //           names.push(name.name)
    //         }
    //       }
    //     }
    //     setCategoryNames(names)
    //   }

    //   fetchCategoryNames()
    // }, [user])

    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <p className="text-md mb-4 font-bold">My Interest</p>
          <Link to={'dashboard/following_tags'}>
            <SettingsIcon />
          </Link>
        </div>
        <div className="flex max-h-[16rem] flex-col overflow-y-auto">
          <ul className="list-none">
            {categoryNames.map((name) => (
              <li
                className="hover-underline-animation hover:hover-underline-animation w-full rounded-md p-2 text-sm hover:bg-slate-300"
                key={name}
              >
                <Link to={`c/${name}`}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div>
      <aside>
        <nav>
          <MenuSideBar items={menu} />
          <Contact items={CONTACT} />
          <Interested />
        </nav>
      </aside>
    </div>
  )
}
