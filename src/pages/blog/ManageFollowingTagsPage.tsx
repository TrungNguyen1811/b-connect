import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteUserTargetedCategories } from 'src/api/blog/delete-blog'
import { getUserTargetedTags } from 'src/api/blog/get-blog'
import { getCategoryById } from 'src/api/categories/get-category'
import { getUserPostData } from 'src/api/user/get-user'
import { Button } from 'src/components/ui/button'
import { toast } from 'src/components/ui/use-toast'
import { useAuth } from 'src/hooks/useAuth'
import { IResponseTag } from 'src/types/blog'
import { ICategory } from 'src/types/categories'
import { IAnalystPost } from 'src/types/user'

function FollowingTags() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [tags, setTags] = useState<IResponseTag[]>([])
  const [dashboard, setDashboard] = useState<IAnalystPost>()

  useEffect(() => {
    const fetchCategoryNames = async () => {
      const tags = await getUserTargetedTags()
      if (tags) {
        setTags(tags)
      }
      const dashboard = await getUserPostData()
      setDashboard(dashboard)
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
      <div className="h-48 w-52 rounded-lg border-2 bg-white hover:border-orange-500 hover:text-orange-400">
        <div className="flex h-full flex-col justify-between p-4 pb-1">
          <div className="px-1">
            <Link to={`/blog/c/${tag?.cateName}`}>
              <p className="font-semibold">#{tag?.cateName}</p>
            </Link>
          </div>

          <div className="h-24 p-1 ">
            <p className="text-sm font-light text-black">
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
              <p className="border-1 r-0 m-1 rounded-xl bg-slate-300 px-2">{dashboard?.postCount}</p>
            </div>
          </Link>
          <Link to={'/blog/dashboard/following_tags'} className=" ">
            <div className="flex flex-row items-center rounded-sm bg-white px-2 py-1">
              <p className="w-full font-semibold">Following Tags</p>
              <p className="border-1 r-0 m-1 rounded-xl bg-slate-300 px-2">{dashboard?.tagFollowCount}</p>
            </div>
          </Link>
          <Link to={'/blog/dashboard/manage-interested'} className=" ">
            <div className="flex flex-row items-center rounded-sm px-2 py-1">
              <p className="w-full font-semibold">Manage Post interested</p>
              <p className="border-1 r-0 m-1 rounded-xl bg-slate-300 px-2">{dashboard?.interestedCount}</p>
            </div>
          </Link>
        </nav>
        <div className="">
          {tags && tags.length > 0 ? (
            <div className="col-span-full grid grid-cols-4 gap-4">
              {tags.map((tag, index) => (
                <div key={index}>{tag?.cateId && <TagDetail id={tag.cateId} />}</div>
              ))}
            </div>
          ) : (
            <div className="mx-8 w-full">
              <div className="flex min-h-[35rem] flex-col items-center rounded-md border-2 border-gray-400 bg-white">
                <img
                  className="w-1/2 pb-6 pt-16"
                  src="https://res.cloudinary.com/dbpvdxzvi/image/upload/v1716461937/Books/Image/iwm7jjwbutk9ixeincom.png"
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
