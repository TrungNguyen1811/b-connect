import React, { useEffect, useState } from 'react'
import { ICategory } from 'src/types'
import { Link } from 'react-router-dom'
import { unFollowingFromInterested } from 'src/api/blog/post-blog'
import { getCategoryById } from 'src/api/categories/get-category'
import { Button } from '../ui/button'

function Interested(id: any) {
  const [categories, setCategories] = useState<ICategory>()

  useEffect(() => {
    const fetchBlogAndUser = async () => {
      const categoryData = await getCategoryById(id as string)
      setCategories(categoryData)
    }

    fetchBlogAndUser()
  }, [id])

  return (
    <div className="h-48 w-full rounded-lg border-2 bg-slate-50">
      <div className="flex flex-col p-4">
        <div className="px-1">
          <Link to={`/blog/${id}`}>
            <p className="font-semibold">{categories?.cateName}</p>
          </Link>
        </div>
        <div className="p-1">
          <p className="text-sm font-light">
            {categories?.description && categories.description.length > 50
              ? `${categories.description.slice(0, 100)}...`
              : categories?.description}
          </p>
        </div>
        <div className="flex flex-row items-end justify-between p-1 py-2">
          <Button onClick={() => unFollowingFromInterested(id as string)}>Following</Button>
          <img className="h-14 w-14 rounded-sm" src={categories?.imageDir} />
        </div>
      </div>
    </div>
  )
}
export default Interested
