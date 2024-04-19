import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteUserTargetedCategories } from 'src/api/blog/delete-blog'
import { getUserTargetedTags } from 'src/api/blog/get-blog'
import { getCategoryById } from 'src/api/categories/get-category'
import { Button } from 'src/components/ui/button'
import { toast } from 'src/components/ui/use-toast'
import { useAuth } from 'src/hooks/useAuth'
import { IResponseTag } from 'src/types/blog'
import { ICategory } from 'src/types/categories'

function FollowingTags() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [tags, setTags] = useState<IResponseTag[]>([])

  useEffect(() => {
    const fetchCategoryNames = async () => {
      const tags = await getUserTargetedTags()
      if (tags) {
        setTags(tags)
      }
    }

    fetchCategoryNames()
  }, [user])

  const TagDetail = ({ id }: { id: string }) => {
    const [tag, setTag] = useState<ICategory>()
    const queryClient = useQueryClient()

    useEffect(() => {
      const fetchTag = async () => {
        try {
          const tagData: ICategory = await getCategoryById(id as string)
          setTag(tagData)
        } catch (error) {
          console.error('Error fetching category:', error)
        }
      }

      fetchTag()
    }, [id])

    const { mutate } = useMutation(deleteUserTargetedCategories, {
      onSuccess: (data) => {
        if (data == 'Successful!') queryClient.invalidateQueries()
        toast({
          title: 'Successful!',
          description: 'UnFollowing Tag Success!!!',
        })
        setTags((prevTags) => prevTags.filter((tag) => tag.cateId !== id))
      },
      onError: (error: Error) => {
        toast({
          title: 'Failed!',
          description: 'UnFollowing Tag Fail with Error' + error.message,
        })
      },
    })

    const onDelete = (id: string) => {
      mutate(id)
    }

    return (
      <div className="h-48 w-full rounded-lg border-2 bg-white">
        <div className="flex h-full flex-col justify-between p-4 pb-1">
          <div className="px-1">
            <Link to={`/blog/${tag?.cateId}`}>
              <p className="font-semibold">#{tag?.cateName}</p>
            </Link>
          </div>
          <div className="h-24 p-1">
            <p className="text-sm font-light">
              {tag?.description ? (
                tag.description.length > 99 ? (
                  `${tag.description.slice(0, 100)}...`
                ) : (
                  tag?.description
                )
              ) : (
                <p className="text-sm font-light">This tag seems quite interesting to discover new knowledge!</p>
              )}
            </p>
          </div>
          <div className="flex flex-row items-end justify-between p-1 py-2">
            <Button onClick={() => onDelete(id as string)}>Following</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-28 min-h-[43rem]">
      <div className="mb-4 flex flex-col">
        <p className="p-4 text-3xl font-bold">Dashboard {'>>'} Following Tags</p>
      </div>
      <div className="mx-4 flex flex-row">
        <nav className="mr-3 w-64">
          <Link to={'/blog/dashboard'} className="">
            <div className="flex flex-row items-center rounded-sm px-2 py-1">
              <p className="w-full font-semibold">Post</p>
              <p className="border-1 r-0 m-1 rounded-xl bg-slate-300 px-2">0</p>
            </div>
          </Link>
          <Link to={'/blog/dashboard/following_tags'} className=" ">
            <div className="flex flex-row items-center rounded-sm bg-orange-50 px-2 py-1">
              <p className="w-full font-semibold">Following Category</p>
              <p className="border-1 r-0 m-1 rounded-xl bg-slate-300 px-2">0</p>
            </div>
          </Link>
          <Link to={'/blog/dashboard/manage-interested'} className=" ">
            <div className="flex flex-row items-center rounded-sm px-2 py-1">
              <p className="w-full font-semibold">Manage Post interested</p>
              <p className="border-1 r-0 m-1 rounded-xl bg-slate-300 px-2">0</p>
            </div>
          </Link>
        </nav>
        <div className="">
          {tags && tags.length > 0 ? (
            <div className="col-span-full grid grid-cols-3 gap-4">
              {tags.map((tag, index) => (
                <div key={index}>{tag?.cateId && <TagDetail id={tag.cateId} />}</div>
              ))}
            </div>
          ) : (
            <div className="mx-8 w-full">
              <div className="flex flex-col items-center">
                <img
                  className="pb-6 pt-16"
                  src="https://media.dev.to/cdn-cgi/image/width=300,height=,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2Fy5767q6brm62skiyywvc.png"
                />
                <p className="text-lg">
                  This is where you can manage your tags, but you are not interested in any categories yet.
                </p>
                <Button onClick={() => navigate('/blog/tags')} className="text-md mx-8 my-6 p-6">
                  Add more tags which you are interested in
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default FollowingTags
