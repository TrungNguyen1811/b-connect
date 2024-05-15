import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { ICategory } from 'src/types'
import { getCategoryById } from 'src/api/categories/get-category'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from '../ui/use-toast'
import { postAddUserTargetedCategory } from 'src/api/blog/interested'
import { useAuth } from 'src/hooks/useAuth'
import { IResponseTag } from 'src/types/blog'
import { getUserTargetedTags } from 'src/api/blog/get-blog'
import { deleteUserTargetedCategories } from 'src/api/blog/delete-blog'

function TagItem({ id, name }: { id: string; name: string }) {
  const [getTag, setTag] = useState<ICategory>()
  const [follow, setFollowing] = useState<boolean>()
  const queryClient = useQueryClient()
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
  const { user } = useAuth()
  const [myTags, setMyTags] = useState<IResponseTag[]>([])

  useEffect(() => {
    const fetchCategoryNames = async () => {
      const tags = await getUserTargetedTags()
      if (tags) {
        setMyTags(tags)
      }
    }

    fetchCategoryNames()
  }, [user])

  const filter = myTags?.find((tag) => tag.cateId == getTag?.cateId)

  const { mutate } = useMutation(postAddUserTargetedCategory, {
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries()
        toast({
          title: 'Successful!',
          description: 'Following Tag Success!!!',
        })
        setMyTags((prevTags) => [...prevTags, { cateId: id, cateName: name }])
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed!',
        description: 'Following Tag Fail with Error' + error.message,
      })
    },
  })

  const onAdd = (id: string) => {
    const array: string[] = [id]
    mutate(array)
  }

  const { mutate: Delete } = useMutation(deleteUserTargetedCategories, {
    onSuccess: (data) => {
      if (data == 'Successful!')
        toast({
          title: 'Successful!',
          description: 'UnFollowing Tag Success!!!',
        })
      queryClient.invalidateQueries()
      setMyTags((prevTags) => prevTags.filter((tag) => tag.cateId !== tag.cateId))
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed!',
        description: 'UnFollowing Tag Fail with Error' + error.message,
      })
    },
  })

  const onDelete = (id: string) => {
    Delete(id)
  }

  return (
    <div className="h-48 w-full rounded-lg border-2 bg-white">
      <div className="flex flex-col p-4">
        <div className="px-1">
          <Link to={`/blog/c/${getTag?.cateName}`}>
            <p className="font-semibold">{getTag?.cateName}</p>
          </Link>
        </div>
        <div className="h-16 p-1">
          <p className="text-sm font-light">
            {getTag?.description && getTag.description.length > 50
              ? `${getTag.description.slice(0, 100)}...`
              : getTag?.description}
          </p>
        </div>
        <div className="flex flex-row items-end justify-between p-1 py-2">
          {filter ? (
            <Button variant="outline" onClick={() => onDelete(id as string)}>
              Following
            </Button>
          ) : (
            <Button onClick={() => onAdd(id)}>Follow</Button>
          )}
          <img className="h-14 w-14 rounded-sm" src={getTag?.imageDir as string} />
        </div>
      </div>
    </div>
  )
}
export default TagItem
