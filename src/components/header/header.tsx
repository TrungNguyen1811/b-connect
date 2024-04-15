import React, { useCallback } from 'react'
import { Search } from 'lucide-react'
import { Input } from '../ui/input'
import AddToCart from '../cart/add-to-cart'
import { Link, useNavigate } from 'react-router-dom'
import Navigation from './nav'

function Header() {
  const nav = useNavigate()

  const onSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault()
      const target = e.target as typeof e.target & {
        search: { value: string }
      }
      nav(`/books?Name=${target.search.value}`)
    },
    [nav],
  )
  return (
    <div className="sticky left-0 top-0 z-20 w-full flex-col items-center justify-between border bg-orange-200 md:px-12">
      <Navigation />
      <div className="flex justify-evenly py-4">
        <div className="flex items-center">
          <Link
            to={'/'}
            className="xs:text-md mr-4 cursor-pointer justify-center font-extrabold text-orange-900 sm:text-lg md:text-2xl lg:text-3xl"
          >
            BConnect
          </Link>
          <Link
            to={'/blog'}
            className="xs:text-md cursor-pointer font-extrabold text-orange-900 sm:text-lg  md:text-2xl lg:text-3xl"
          >
            BSocial
          </Link>
        </div>
        <div className="">
          <form onSubmit={onSubmit}>
            <div className="relative">
              <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                name="search"
                className="w-[80%] pr-12 sm:w-[24rem] md:w-[32rem] lg:w-[48rem]"
              />
            </div>
          </form>
        </div>
        <div className="flex items-center gap-4">
          <AddToCart />
        </div>
      </div>
    </div>
  )
}
export default Header
