import React from 'react'
import { Search } from 'lucide-react'
import { Input } from '../ui/input'
import AddToCart from '../cart/add-to-cart'
import { Link } from 'react-router-dom'
import Navigation from './nav'

function Header() {
  return (
    <div className="left-0 top-0 z-10 w-full flex-col items-center justify-between border bg-slate-50 md:px-12">
      <Navigation />
      <div className="flex justify-evenly py-4">
        <div className="flex">
          <Link to={'/'} className="text-black-100 xs:text-2xl mr-4 cursor-pointer text-3xl font-extrabold">
            BConnect
          </Link>
          <Link to={'/'} className="text-black-100 xs:text-2xl cursor-pointer text-3xl font-extrabold">
            BSocial
          </Link>
        </div>
        <div className="">
          <form>
            <div className="relative">
              <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="w-[48rem] pr-12" />
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
