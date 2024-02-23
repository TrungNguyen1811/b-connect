import React from 'react'
import { Search } from 'lucide-react'
import { Input } from '../ui/input'
import AddToCart from '../cart-test/add-to-cart'
import { Link } from 'react-router-dom'
import Navigation from './nav'

function Header() {
  return (
    <div className="left-0 top-0 z-10 w-full flex-col items-center justify-between border bg-slate-50 md:px-12">
      <Navigation />
      <div className="flex justify-evenly py-4">
        <div className="flex items-center">
          <Link
            to={'/'}
            className="text-black-100 mr-4 cursor-pointer justify-center font-extrabold xs:text-2xl lg:text-3xl"
          >
            BConnect
          </Link>
          <Link to={'/'} className="text-black-100 cursor-pointer font-extrabold xs:text-2xl lg:text-3xl">
            BSocial
          </Link>
        </div>
        <div className="">
          <form>
            <div className="relative">
              <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="w-[80%] pr-12 md:w-[32rem] lg:w-[48rem]" />
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
