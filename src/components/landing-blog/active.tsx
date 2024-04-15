import { useEffect, useState } from 'react'
import { getBlogActive } from 'src/api/blog/get-blog'
import { IBlogg } from 'src/types/blog'
import { Separator } from '../ui/separator'
import { Link } from 'react-router-dom'

export function Active() {
  const [blogList, setBlogList] = useState<IBlogg[]>([])

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const blogs = await getBlogActive(7)
        setBlogList(blogs.data)
      } catch (error) {
        console.error('Error fetching blogs:', error)
        // Xử lý lỗi nếu cần thiết
      }
    }

    getBlogs()
  }, [])

  return (
    <div>
      <div className="rounded-lg border border-gray-300 bg-orange-50">
        <div className="m-2">
          <p className="p-2 pb-0 text-lg font-bold">Active discussions</p>
          <div className="my flex flex-col p-2">
            {blogList.map((blog, index) => (
              <Link key={index} to={`/blog/${blog.postId}`}>
                <div className="mx-2 my-2">
                  {index < 1 && <Separator className="border-1 mb-4" />}
                  <p className="font-semibold hover:text-orange-500">{blog.title}</p>
                  <div className="flex flex-row items-center justify-start">
                    <p className="flex flex-row items-center font-light">
                      {/* {blog.like?.length} <HeartIcon size={16} className="ml-1" /> */}
                    </p>
                    <p className="ml-4 flex flex-row items-center font-light">
                      {/* {blog.comments?.length} <MessageCircleHeartIcon size={16} className="ml-1" /> */}
                    </p>
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
