import { Avatar } from '@radix-ui/react-avatar'
import React, { useEffect, useState } from 'react'
import { getBlogById } from 'src/api/blog/get-blog'
import { getUserByIdFaker } from 'src/api/user/get-user-faker'
import { User } from 'src/types'
import { IBlogg } from 'src/types/blog'
import { AvatarImage } from '../ui/avatar'
import { Separator } from '../ui/separator'
import { BookMarkedIcon, MessageCircleIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

function Post(id: any) {
  const [users, setUser] = useState<User>()
  const [blog, setBlog] = useState<IBlogg>()
  const [isSaved, setIsSaved] = useState<boolean>(false)
  console.log(blog?._id)

  const navigate = useNavigate()

  useEffect(() => {
    // if (!blog || blog.userId === undefined) {
    //   return // Return early if blog or blog.userId is undefined
    // }

    const fetchBlogAndUser = async () => {
      const blogData = await getBlogById('1')

      setBlog(blogData)

      const userData = await getUserByIdFaker('blog.userId as string')
      setUser(userData)
    }

    fetchBlogAndUser()
  }, [id, blog?.userId, blog])

  const saveToReadingList = async () => {
    if (blog) {
      //   await postReadingList(blog._id)
      setIsSaved(true)
    }
  }

  const unsaveFromReadingList = async () => {
    //   await postRemoveReadingList(blog._id)
    setIsSaved(false)
  }

  return (
    <div className="max-h-[37rem] w-full rounded-md border-2 bg-slate-50">
      <Link to={`/blog/${blog?._id}`}>
        <div className="w-full rounded-md">
          <img src={blog?.image} className="max-h-[18rem] w-full rounded-t-md" />
        </div>
        <div className="m-4">
          <div className="flex flex-row">
            <Avatar>
              <AvatarImage src={users?.avatar} className="h-10 w-10 rounded-[50%]" />
            </Avatar>
            <div className="ml-2 flex flex-col">
              <p className="font-semibold">{users?.username}</p>
              <p className="text-xs font-light">{blog?.date}</p>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="my-2 ml-12 text-2xl font-extrabold">{blog?.title}</p>
            <p className="mb-2 ml-12 flex flex-row text-sm">
              Category:
              {/* {blog?.map((cat, index) => (
                <React.Fragment key={index}>
                  <div className="text-sm">{cat.name}</div>
                  {index < blog.category.length - 1 && <span>, </span>}
                </React.Fragment>
              ))} */}
            </p>
          </div>
          <Separator />
          <div className="flex flex-row items-center justify-between">
            <button
              className="ml-12  flex flex-row items-center text-sm font-light"
              onClick={() => navigate(`/blog/${blog?._id}`)}
            >
              <MessageCircleIcon size={20} className="mr-1" /> Add Comment
            </button>
            <div
              className="m-2 rounded-sm p-1 hover:bg-gray-300"
              onClick={isSaved ? unsaveFromReadingList : saveToReadingList}
            >
              <BookMarkedIcon size={20} className={isSaved ? ' text-orange-400 ' : ''} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
export default Post
