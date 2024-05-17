import { useEffect, useState } from 'react'
import { getBlogActive } from 'src/api/blog/get-blog'
import { Separator } from '../ui/separator'
import { Link } from 'react-router-dom'
import { IResponsePost } from 'src/types/blog'

export function Active() {
  const [blogList, setBlogList] = useState<IResponsePost[]>([])

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const blogs = await getBlogActive()
        setBlogList(blogs)
      } catch (error) {
        console.error('Error fetching blogs:', error)
        // Xử lý lỗi nếu cần thiết
      }
    }

    getBlogs()
  }, [])

  return (
    <div>
      <div className="rounded-lg border border-gray-300 bg-white">
        <div className="m-2">
          <p className="p-2 pb-0 text-lg font-bold text-orange-500">Active discussions</p>
          <div className="my flex flex-col p-2">
            {blogList.map((blog, index) => (
              <Link key={index} to={`/blog/${blog.postData.postId}`}>
                <div className="mx-2 my-2">
                  {index < 1 && <Separator className="border-1 mb-4" />}
                  <p className="font-semibold hover:text-orange-500">{blog.postData.title}</p>
                  <div className="flex flex-row items-center justify-start gap-2">
                    <p className="flex flex-row items-center text-sm text-gray-500 ">{blog.totalLikes} likes</p>
                    <p className="flex flex-row items-center text-sm text-gray-500 ">{blog.totalComments} comments</p>
                  </div>
                  {index + 1 < blogList.length && <Separator className="border-1 mt-4" />}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
