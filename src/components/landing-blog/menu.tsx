import React, { useEffect, useState } from 'react'
import { IMenuItem } from '../breadcrumb'
import MenuSideBar from '../menu-items/menu-item'
import { FacebookIcon, GithubIcon, InstagramIcon, SettingsIcon, TwitterIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from 'src/hooks/useAuth'
import { getUserTargetedTags } from 'src/api/blog/get-blog'
import { IResponsePost, IResponseTag } from 'src/types/blog'
import { getPostInterestedByUser } from 'src/api/blog/interested'

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
        href: '/blog/reading-list',
        icon: 'list',
      },
      {
        title: 'Tags',
        key: 'tags',
        href: '/blog/tags',
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

  const Tags = () => {
    const { user } = useAuth()
    const [tags, setTags] = useState<IResponseTag[]>([])

    useEffect(() => {
      const fetchTagsNames = async () => {
        const tags = await getUserTargetedTags()
        if (tags) {
          setTags(tags)
        }
      }

      fetchTagsNames()
    }, [user])

    return (
      <div className="mb-8 flex flex-col">
        <div className="flex flex-row justify-between">
          <p className="text-md mb-4 font-bold">My Tags</p>
          <Link to={'dashboard/following_tags'}>
            <SettingsIcon />
          </Link>
        </div>
        <div className="flex max-h-[16rem] flex-col overflow-y-auto">
          <ul className="list-none">
            {tags.map((tag) => (
              <li
                className="hover-underline-animation hover:hover-underline-animation w-full rounded-md p-2 text-sm hover:bg-orange-500"
                key={tag.cateId}
              >
                <Link to={`c/${tag.cateName}`}>
                  <p className="text-base">#{tag.cateName}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  const Interested = () => {
    const { user } = useAuth()
    const [interested, setInterested] = useState<IResponsePost[]>([])

    useEffect(() => {
      const fetchInterestedNames = async () => {
        const cate = await getPostInterestedByUser()
        if (cate) {
          setInterested(cate)
        }
      }

      fetchInterestedNames()
    }, [user])

    return (
      <div className=" flex flex-col">
        <div className="mb-4 flex flex-row items-center justify-between">
          <p className="text-md font-bold">My Trade</p>
          <Link to={'/blog/dashboard/manage-interested'}>
            <SettingsIcon />
          </Link>
        </div>
        <div className="flex max-h-[16rem] flex-col overflow-y-auto">
          <ul className="list-none">
            {interested.map((i) => (
              <li
                className="hover-underline-animation hover:hover-underline-animation hover:bg-orange-50300 w-full rounded-md p-1 text-sm"
                key={i.postData.postId}
              >
                <Link className="p-1 text-base" to={`/blog/${i.postData.postId}`}>
                  {i.postData.title?.slice(0, 20)}...
                </Link>
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
          <Tags />
          <Interested />
        </nav>
      </aside>
    </div>
  )
}
