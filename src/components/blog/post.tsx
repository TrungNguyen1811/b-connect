import { Avatar } from '@radix-ui/react-avatar'
import React, { useEffect, useState } from 'react'
import { getPostByIdApi } from 'src/api/blog/get-blog'
import { IResponsePost } from 'src/types/blog'
import { AvatarImage } from '../ui/avatar'
import { Separator } from '../ui/separator'
import { BookMarkedIcon, HandshakeIcon, MessageCircleIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { postInterestedPost } from 'src/api/blog/interested'
import { useAuth } from 'src/hooks/useAuth'

interface PostProps {
  postId: string
}

function Post({ postId }: PostProps) {
  const { user } = useAuth()
  const [blog, setBlog] = useState<IResponsePost>()
  const [isSaved, setIsSaved] = useState<boolean>(false)
  const [isInterested, setIsInterested] = useState<boolean>(false)

  console.log(blog)

  const navigate = useNavigate()

  useEffect(() => {
    // if (!blog || blog.userId === undefined) {
    //   return // Return early if blog or blog.userId is undefined
    // }

    const fetchBlogAndUser = async () => {
      const blogData = await getPostByIdApi(postId)
      setBlog(blogData)
    }

    fetchBlogAndUser()
  }, [postId])

  const saveToReadingList = async () => {
    if (blog?.postData) {
      //   await postReadingList(blog._id)
      setIsSaved(true)
    }
  }

  const unsaveFromReadingList = async () => {
    //   await postRemoveReadingList(blog._id)
    setIsSaved(false)
  }

  const saveInterested = async () => {
    if (blog?.postData) {
      await postInterestedPost(blog.postData.postId as string, user?.userId as string)
      setIsInterested(true)
    }
  }

  const unSaveInterested = async () => {
    //   await postRemoveReadingList(blog._id)
    setIsInterested(false)
  }

  return (
    <div className="border-gray-250 mt-2 max-h-[37rem] w-full rounded-md border-2 bg-slate-50">
      <Link to={`/blog/${blog?.postData.postId}`}>
        {blog?.postData.imageDir ? (
          <div className="w-full rounded-md">
            <img src={blog?.postData.imageDir as string} className="max-h-[18rem] w-full rounded-t-md" />
          </div>
        ) : blog?.postData.videoDir ? (
          <video src={blog?.postData.videoDir as string} className="w-full rounded-t-md" controls></video>
        ) : (
          ''
        )}

        <div className="m-4">
          <div className="flex flex-row">
            <Avatar>
              <AvatarImage src={blog?.avatarDir} className="h-10 w-10 rounded-[50%]" />
            </Avatar>
            <div className="ml-2 flex flex-col">
              <p className="font-semibold">{blog?.username}</p>
              <p className="text-xs font-light">{blog?.postData.createdAt}</p>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="my-2 ml-12 text-2xl font-extrabold">{blog?.postData.title}</p>
            <p className="mb-2 ml-12 flex flex-row gap-1 text-sm">
              {/* {blog?.postData.listCate.map((cat, index) => (
                <React.Fragment key={index}>
                  <Link to={} className="hover:border-1 hover:border hover:shadow-sm">
                    <div className="text-sm">#{cat.cateName}</div>
                  </Link>
                </React.Fragment>
              ))} */}
            </p>
          </div>
        </div>
      </Link>
      <Separator />
      <div className="flex flex-row items-center justify-between">
        <button
          className="ml-12  flex flex-row items-center text-sm font-light"
          onClick={() => navigate(`/blog/${blog?.postData.postId}`)}
        >
          <MessageCircleIcon size={20} className="mr-1" /> Add Comment
        </button>
        <div className="flex flex-row items-center">
          {blog?.postData.isTradePost ? (
            <div
              className="m-2 rounded-sm p-1 hover:bg-gray-300"
              onClick={isInterested ? unSaveInterested : saveInterested}
            >
              <HandshakeIcon size={20} className={isInterested ? ' text-orange-400 ' : ''} />
            </div>
          ) : (
            ''
          )}
          <div
            className="m-2 mr-8 rounded-sm p-1 hover:bg-gray-300"
            onClick={isSaved ? unsaveFromReadingList : saveToReadingList}
          >
            <BookMarkedIcon size={20} className={isSaved ? ' text-orange-400 ' : ''} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Post
