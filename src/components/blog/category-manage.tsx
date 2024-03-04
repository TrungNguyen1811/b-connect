import React, { useEffect, useState } from 'react'
import { ICategory } from 'src/types'
import { Link } from 'react-router-dom'
import { unFollowingFromInterested } from 'src/api/blog/post-blog'
import { getCategoryById } from 'src/api/categories/get-category'

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
    <div className="w-full rounded-md border-2 bg-slate-50">
      <div className="flex flex-col">
        <div className="">
          <Link to={`/blog/${id}`}>
            <p className="font-semibold">{categories?.name}</p>
          </Link>
        </div>
        <div className="">
          <p className="font-light">{categories?.description}</p>
        </div>
        <div className="">
          <button onClick={() => unFollowingFromInterested(id as string)}>Following</button>
        </div>
      </div>
    </div>
  )
}
export default Interested
