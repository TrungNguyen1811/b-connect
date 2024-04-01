import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IResponsePostLocked, getLockedPostByUserId, getPostByUserId } from 'src/api/blog/get-blog'
import { Button } from 'src/components/ui/button'
import { Checkbox } from 'src/components/ui/check-box'
import { Separator } from 'src/components/ui/separator'
import { useAuth } from 'src/hooks/useAuth'
import { IResponsePost } from 'src/types/blog'

function DashboardBlog() {
  const { user } = useAuth()
  const [blogs, setBlogs] = useState<IResponsePost[]>()
  const [lockBlogs, setLockBlogs] = useState<IResponsePostLocked[]>()
  const [checkbox, setCheckbox] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.userId) {
          if (checkbox) {
            const id = '1'
            const lockedBlogsData: IResponsePostLocked[] = await getLockedPostByUserId(id as string)
            setLockBlogs(lockedBlogsData)
          } else {
            const id = '0'
            const lockedBlogsData: IResponsePostLocked[] = await getLockedPostByUserId(id as string)
            setLockBlogs(lockedBlogsData)
            const blogsData: IResponsePost[] = await getPostByUserId(user.userId)
            setBlogs(blogsData)
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [user, checkbox])

  return (
    <div className="mx-28">
      <div className="mb-4 flex flex-col">
        <p className="p-4 text-3xl font-bold">Dashboard</p>
        <div className="mx-4 flex flex-row justify-between">
          <div className="flex w-full flex-col rounded-md border-2 bg-slate-50 p-6">
            <p className="text-2xl font-bold">{}0</p>
            <p className="font-light">Total post reactions</p>
          </div>
          <div className="mx-3 flex w-full flex-col rounded-md border-2 bg-slate-50 p-6">
            <p className="text-2xl font-bold">{}0</p>
            <p className="font-light">Total post comments</p>
          </div>
          <div className="flex w-full flex-col rounded-md border-2 bg-slate-50 p-6">
            <p className="text-2xl font-bold">{}0</p>
            <p className="font-light">Total post views</p>
          </div>
        </div>
      </div>
      <div className="mx-4 flex flex-row">
        <nav className="mr-3 w-1/4">
          <Link to={'/blog/dashboard'} className="">
            <div className="flex flex-row items-center rounded-sm bg-white px-2 py-1">
              <p className="w-full font-semibold">Post</p>
              <p className="border-1 r-0 m-1 rounded-xl bg-slate-300 px-2">0</p>
            </div>
          </Link>
          <Link to={'/blog/dashboard/following_categories'} className=" ">
            <div className="flex flex-row items-center rounded-sm px-2 py-1">
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
          <Link to={'/blog/dashboard/manage-interester'} className="">
            <div className="flex flex-row items-center rounded-sm px-2 py-1">
              <p className="w-full font-semibold">Manage Post Interester</p>
              <p className="border-1 r-0 m-1 rounded-xl bg-slate-300 px-2">0</p>
            </div>
          </Link>
        </nav>
        <div className="h-full min-h-[32rem] w-full">
          <div className="flex flex-row items-center justify-between">
            <p className="text-xl font-bold">Posts</p>
            <div className="flex flex-row items-center">
              <p className="mr-2">Lock Post</p>
              <Checkbox checked={checkbox} onCheckedChange={(checked: boolean) => setCheckbox(checked)} />
            </div>
          </div>

          <div className="h-full min-h-[32rem] w-full rounded-md border-2 bg-slate-50 p-6">
            {checkbox
              ? lockBlogs?.map((lock, index) => (
                  <>
                    <Link key={index} to={`/blog/dashboard/submit-form/${lock.postId}`}>
                      <div className="flex flex-col">
                        <p className="text-lg">{lock.title}</p>
                        <p className="text-red-600">{lock.status}</p>
                      </div>
                    </Link>
                    <Separator className="my-2" />
                  </>
                ))
              : ''}
            {blogs ? (
              blogs?.map((blog, index) => (
                <div className="my-4 mt-2" key={index}>
                  {blog.postData && blog.postData.postId ? (
                    <div>
                      <Link to={`/blog/dashboard/manage-interester/${blog.postData.postId}`}>
                        <div>{blog.postData.title}</div>
                        <div>{blog.postData.createdAt}</div>
                      </Link>
                    </div>
                  ) : (
                    <div>This post data is incomplete.</div>
                  )}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center">
                <img
                  className="pb-6 pt-16"
                  src="https://media.dev.to/cdn-cgi/image/width=300,height=,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2Fy5767q6brm62skiyywvc.png"
                />
                <p className="text-lg">
                  This is where you can manage your posts, but you haven{"'"}t written anything yet.
                </p>
                <Button className="text-md mx-8 my-6 p-6">Write your first post now</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default DashboardBlog
