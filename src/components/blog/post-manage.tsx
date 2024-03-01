import React, { useEffect, useState } from 'react'
import { getBlogById } from 'src/api/blog/get-blog'
import { getUserByIdFaker } from 'src/api/user/get-user-faker'
import { User } from 'src/types'
import { IBlogg } from 'src/types/blog'
import { MessageCircleIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { postDeleteBlogById } from 'src/api/blog/post-blog'

function Blog(id: any) {
  const [users, setUser] = useState<User>()
  const [blog, setBlog] = useState<IBlogg>()

  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlogAndUser = async () => {
      const blogData = await getBlogById('1')

      setBlog(blogData)

      const userData = await getUserByIdFaker('blog.userId as string')
      setUser(userData)
    }

    fetchBlogAndUser()
  }, [id, blog?.userId, blog])

  return (
    <div className="w-full rounded-md border-2 bg-slate-50">
      <div className="m-4">
        <div className="flex flex-col">
          <Link to={`/blog/${blog?._id}`}>
            <p className="my-2 ml-12 text-2xl font-extrabold">{blog?.title}</p>
          </Link>
          <p>Published: {blog?.date}</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <p className="ml-12  flex flex-row items-center text-sm font-light">
            <MessageCircleIcon size={20} className="mr-1" /> {blog?.like?.length}
          </p>
          <p className="ml-12  flex flex-row items-center text-sm font-light">
            <MessageCircleIcon size={20} className="mr-1" /> {blog?.comments?.length}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <button onClick={() => navigate(`/blog/${blog?._id}/edit`)}>Edit</button>
          <button onClick={() => postDeleteBlogById(blog?._id as string)}>Delete</button>
        </div>
      </div>
    </div>
  )
}
export default Blog
