import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { ICategory } from 'src/types'
import { getCategoryById } from 'src/api/categories/get-category'

function TagItem({ id }: { id: string }) {
  const [tag, setTag] = useState<ICategory>()

  useEffect(() => {
    const fetchTag = async () => {
      try {
        const tagData: ICategory = await getCategoryById(id as string)
        setTag(tagData)
      } catch (error) {
        console.error('Error fetching category:', error)
        // Handle the error as needed
      }
    }

    fetchTag()
  }, [id])

  return (
    <div className="h-48 w-full rounded-lg border-2 bg-white">
      <div className="flex flex-col p-4">
        <div className="px-1">
          <Link to={`/blog/c/${tag?.cateName}`}>
            <p className="font-semibold">{tag?.cateName}</p>
          </Link>
        </div>
        <div className="h-16 p-1">
          <p className="text-sm font-light">
            {tag?.description && tag.description.length > 50 ? `${tag.description.slice(0, 100)}...` : tag?.description}
          </p>
        </div>
        <div className="flex flex-row items-end justify-between p-1 py-2">
          <Button>Following</Button>
          {/* <Button onClick={() => unFollowingFromInteyrested(id as string)}>Following</Button> */}
          <img className="h-14 w-14 rounded-sm" src={tag?.imageDir as string} />
        </div>
      </div>
    </div>
  )
}
export default TagItem
