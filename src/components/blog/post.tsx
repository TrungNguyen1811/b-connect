import { Avatar } from '@radix-ui/react-avatar'
import React, { useEffect, useState } from 'react'
import { getPostByIdApi, getUserSavedPosts } from 'src/api/blog/get-blog'
import { IResponsePost } from 'src/types/blog'
import { AvatarImage } from '../ui/avatar'
import { Separator } from '../ui/separator'
import { BookMarkedIcon, HandshakeIcon, HeartIcon, MessageCircleIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from 'src/hooks/useAuth'
import { IResponseInteresterList } from 'src/types/interester'
import { getPostInterestByPostId, postInterestedPost, removeInterestedPost } from 'src/api/blog/interested'
import { addNewSavedPost, postLikePost } from 'src/api/blog/post-blog'
import { removeUserSavedPost } from 'src/api/blog/delete-blog'

interface PostProps {
  postId: string
}

function Post({ postId }: PostProps) {
  const { user } = useAuth()
  const [blog, setBlog] = useState<IResponsePost>()
  const [interesterList, setInteresterList] = useState<IResponseInteresterList[]>([])
  const [isSaved, setIsSaved] = useState<boolean>(false)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [isInterested, setIsInterested] = useState<boolean>(false)
  const [postInterestId, setPostInterestId] = useState<string | undefined>(undefined) // Sử dụng kiểu union để cho phép giá trị undefined

  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlogAndUser = async () => {
      const blogData = await getPostByIdApi(postId)
      setBlog(blogData)
    }

    fetchBlogAndUser()
  }, [postId])

  useEffect(() => {
    const getSavedPost = async () => {
      const save: IResponsePost[] = await getUserSavedPosts()
      const isSave = save.filter((save) => save.postData.postId === blog?.postData.postId)

      if (isSave && isSave.length > 0) {
        setIsSaved(true)
        console.log('isSaved', isSave)
      } else {
        setIsSaved(false)
      }
    }
    getSavedPost()
  }, [blog?.postData.postId])

  const saveToReadingList = async () => {
    if (blog) {
      await addNewSavedPost(blog.postData.postId as string).then((res) => {
        if (res === 'Successful!') {
          setIsSaved(true)
        }
      })
    }
  }

  const unsaveFromReadingList = async () => {
    if (blog) {
      await removeUserSavedPost(blog.postData.postId as string).then((res) => {
        if (res === 'Successful!') {
          setIsSaved(false)
        }
      })
    }
  }

  const likePost = async () => {
    if (blog) {
      await postLikePost(blog.postData.postId as string).then((res) => {
        if (res === true) {
          setIsLiked(true)
        } else {
          setIsLiked(false)
        }
      })
    }
  }

  useEffect(() => {
    const fetchInterestStatus = async () => {
      try {
        const interesters = await getPostInterestByPostId(postId)
        setInteresterList(interesters)
        const userInterest = interesters.find((interester) => interester.userId === user?.userId)
        if (userInterest) {
          setIsInterested(true)
          setPostInterestId(userInterest.recordId)
        } else {
          setIsInterested(false)
        }
      } catch (error) {
        console.error('Error fetching interest status:', error)
      }
    }
    if (user) {
      fetchInterestStatus()
    }
  }, [postId, user, isInterested])

  const handleInterestClick = async () => {
    try {
      if (!isInterested) {
        const data = await postInterestedPost(postId)
        setPostInterestId(data)
        setIsInterested(true)
      } else {
        if (postInterestId) {
          await removeInterestedPost(postInterestId)
        }
        setIsInterested(false)
        setPostInterestId(undefined)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="border-gray-250 mt-2 max-h-[37rem] w-full rounded-md border bg-white">
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
            <p className="my-2 ml-12 text-3xl font-extrabold">{blog?.postData.title}</p>
            <p className="mb-2 ml-12 flex flex-row gap-1 text-sm">
              {blog?.tags.map((tag, index) => (
                <React.Fragment key={index}>
                  <Link
                    to={'/'}
                    className="ml-2 rounded-md px-2 py-1 text-sm hover:border hover:bg-orange-100 hover:text-orange-600"
                  >
                    #{tag.cateName}
                  </Link>
                </React.Fragment>
              ))}
            </p>
          </div>
          <div className="flex flex-row">
            <p className="flex-grow"></p>
            <p className="right-0 text-xs font-extralight">{blog?.readingTime}</p>
          </div>
        </div>
      </Link>
      <Separator />
      <div className="flex flex-row items-center justify-between">
        <div className="ml-2 flex flex-row items-center justify-start gap-2">
          <div
            className="m-2 my-0 flex flex-row items-center gap-1 rounded-sm p-1 py-0 hover:bg-gray-300"
            onClick={() => likePost()}
          >
            <HeartIcon size={16} className={isLiked ? ' text-orange-400 ' : ''} />
            {blog?.likesCount}
          </div>
          <button
            className="flex flex-row items-center text-sm font-light"
            onClick={() => navigate(`/blog/${blog?.postData.postId}`)}
          >
            <MessageCircleIcon size={16} className="mr-1" /> Add Comment
          </button>
        </div>

        <div className="flex flex-row items-center">
          {blog?.postData.isTradePost ? (
            blog.postData.isLock ? (
              <div className=" flex flex-row items-center gap-1">
                <HandshakeIcon size={20} />
                <p className="text-xs text-gray-600">Lock</p>
              </div>
            ) : (
              <div className="m-2 my-0 rounded-sm p-1 hover:bg-gray-300" onClick={handleInterestClick}>
                <HandshakeIcon size={20} className={isInterested ? ' text-orange-400 ' : ''} />
              </div>
            )
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
