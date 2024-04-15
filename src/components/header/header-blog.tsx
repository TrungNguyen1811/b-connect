import { Search } from 'lucide-react'
import { Input } from '../ui/input'
import React, { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthPreviewBlog } from '../auth-preview/blog-auth-preview'

export function HeaderBlog() {
  const navigate = useNavigate()
  const onSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      console.log('sbumt')
      e.preventDefault()
      const target = e.target as typeof e.target & {
        search: { value: string }
      }
      navigate(`/blog?Name=${target.search.value}`)
    },
    [navigate],
  )
  return (
    <div className="sticky left-0 top-0 z-10 border-b">
      <div className=" bg-orange-400">
        <div className="mx-32 flex flex-row justify-between px-4 py-2">
          <div className="flex flex-row">
            <p className="text-black-100 xs:text-2xl mr-4 cursor-pointer justify-center font-extrabold lg:text-3xl">
              <Link to="/blog">BSocial</Link>
            </p>
            <form onSubmit={onSubmit}>
              <div className="relative ">
                <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  name={'search'}
                  className="w-[80%] hover:bg-border md:w-[12rem] lg:w-[24rem]"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
          <div>
            <AuthPreviewBlog />
          </div>
        </div>
      </div>
    </div>
  )
}
