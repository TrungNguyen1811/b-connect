import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getBlogsByUserId } from 'src/api/blog/get-blog'
import Blog from 'src/components/blog/post-manage'
import { Button } from 'src/components/ui/button'
import { useAuth } from 'src/hooks/useAuth'
import { IBlogg } from 'src/types/blog'

function DashboardBlog() {
  const { user } = useAuth()
  const [blogs, setBlogs] = useState<IBlogg[]>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const blogsData = await getBlogsByUserId(user.userId as string)
          setBlogs(blogsData.data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [user])

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
          <Link to={'/'} className="">
            <div className="flex flex-row items-center rounded-sm bg-white px-2 py-1">
              <p className="w-full font-semibold">Post</p>
              <p className="border-1 r-0 m-1 rounded-xl bg-slate-300 px-2">0</p>
            </div>
          </Link>
          <Link to={'/'} className=" ">
            <div className="flex flex-row items-center rounded-sm px-2 py-1">
              <p className="w-full font-semibold">Following Category</p>
              <p className="border-1 r-0 m-1 rounded-xl bg-slate-300 px-2">0</p>
            </div>
          </Link>
        </nav>
        <div className="h-full min-h-[32rem] w-full">
          <p className="text-xl font-bold">Posts</p>
          <div className="h-full min-h-[32rem] w-full rounded-md border-2 bg-slate-50 p-6">
            {blogs ? (
              blogs?.map((blog, index) => (
                <div className="my-4 mt-2" key={index}>
                  {blog?._id && <Blog id={blog._id} />}
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
