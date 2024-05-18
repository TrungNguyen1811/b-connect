// import Post from 'src/components/blog/post'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { GetManyPostsParams, getUserTargetedTags } from 'src/api/blog/get-blog'
import { postAddUserTargetedCategory } from 'src/api/blog/interested'
import { getAllCategoryNoParam } from 'src/api/categories/get-category'
import PostGridLoading from 'src/components/blog/loading-post'
import Post from 'src/components/blog/post'
import { Active } from 'src/components/landing-blog/active'
import { Menu } from 'src/components/landing-blog/menu'
import { Button } from 'src/components/ui/button'
import { Checkbox } from 'src/components/ui/check-box'
import { Dialog, DialogContent, DialogHeader } from 'src/components/ui/dialog'
import { ScrollArea } from 'src/components/ui/scroll-area'
import { Separator } from 'src/components/ui/separator'
import { toast } from 'src/components/ui/use-toast'
import { useAuth } from 'src/hooks/useAuth'
import { ICategory } from 'src/types'
import ErrorPage from '../error-page'
import useGetManyPosts from 'src/hooks/useGetManyPosts'

const initPostState: GetManyPostsParams = {
  PageNumber: 0,
  PageSize: 1000,
}

export default function PostTagPage() {
  const { user } = useAuth()
  const { tag } = useParams()
  const [blogs, setBlogs] = useState<GetManyPostsParams>(initPostState)
  const { data, isLoading, isError } = useGetManyPosts(blogs)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fl = async () => {
      const tag = await getUserTargetedTags()
      if (tag && tag.length > 0) {
        setOpen(false)
      } else setOpen(true)
    }
    fl()
  }, [user])

  const navigate = useNavigate()
  const [tags, setTags] = useState<ICategory[]>([])
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  useEffect(() => {
    const fetchCategoryNames = async () => {
      const tags = await getAllCategoryNoParam()
      if (tags) {
        setTags(tags)
      }
    }

    fetchCategoryNames()
  }, [user])

  const handleTagClick = (tagId: string) => {
    const selectedIndex = selectedItems.findIndex((selectedItem) => selectedItem == tagId)
    if (selectedIndex === -1) {
      setSelectedItems([...selectedItems, tagId])
    } else {
      const updateItems = [...selectedItems]
      updateItems.splice(selectedIndex, 1)
      setSelectedItems(updateItems)
    }
  }

  const onSubmit = async () => {
    await postAddUserTargetedCategory(selectedItems).then((res) => {
      if (res) {
        toast({
          title: 'Welcome to BConnect!!!',
        })
        setOpen(false)
        navigate('/blog')
      } else {
        toast({
          title: 'Ops! Add tags failed ',
        })
        navigate('/blog')
        setOpen(false)
      }
    })
  }

  const renderPosts = useMemo(() => {
    if (isLoading) return <PostGridLoading pageSize={8} className="h-96 " />
    if (!Array.isArray(data?.data) || data?.data?.length === 0)
      return (
        <div className="col-span-full row-span-full h-full w-full">
          <h3 className="text-center text-slate-300">No result found</h3>
        </div>
      )
    return data?.data.map((post) => {
      return <Post key={post.postData.postId} postId={post.postData.postId!} />
    })
  }, [data, isLoading])

  if (isError) return <ErrorPage />

  return (
    <div className="mx-20 h-full px-4 py-2">
      <div className="grid grid-cols-12 gap-4 pt-2">
        <div className="col-span-2 w-60 bg-orange-50 pr-8">
          <Menu />
        </div>
        <div className="col-span-7 ml-8">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="h-[90vh] ">
              <DialogHeader className="mb-2 px-12">
                <p className="text-4xl font-extrabold">What are you interested in?</p>
                <p className="text-xl font-semibold">Follow tags to customize your feed</p>
                <p>{selectedItems.length} tags selected</p>
              </DialogHeader>
              <ScrollArea>
                <div className="col-span-full grid grid-cols-4 gap-4 px-12 pb-0">
                  {tags.map((tag) => (
                    <div key={tag.cateId}>
                      <div className="flex flex-row items-center justify-between rounded-md border px-3 py-4">
                        <p className=" text-base font-semibold">#{tag.cateName}</p>
                        <Checkbox
                          checked={selectedItems.includes(tag.cateId as string)}
                          onCheckedChange={() => handleTagClick(tag.cateId as string)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="flex flex-col justify-end">
                <Separator className="mb-4" />
                <Button onClick={onSubmit} className="w-full">
                  Add Tags
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <div className="flex flex-row gap-6 px-3 py-2">
            <Link to="/blog" className="text-xl text-gray-500">
              Relevant
            </Link>
            <Link to="/blog/latest" className="text-xl font-bold">
              Latest
            </Link>
          </div>
          {renderPosts}
        </div>
        <div className="col-span-3 w-80 bg-orange-50">
          <Active />
        </div>
      </div>
    </div>
  )
}
