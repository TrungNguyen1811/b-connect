import { Avatar } from '@radix-ui/react-avatar'
import React, { useEffect, useState } from 'react'
import { checkUserLikePost, getPostByIdApi, getUserSavedPosts } from 'src/api/blog/get-blog'
import { IResponsePost } from 'src/types/blog'
import { AvatarImage } from '../ui/avatar'
import { Separator } from '../ui/separator'
import { BookMarkedIcon, HandshakeIcon, HeartIcon, Loader2, MessageCircleIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from 'src/hooks/useAuth'
import { IResponseInteresterList, ITradeInterested } from 'src/types/interester'
import { getPostInterestByPostId, postInterestedPost, removeInterestedPost } from 'src/api/blog/interested'
import { addNewSavedPost, postLikePost } from 'src/api/blog/post-blog'
import { removeUserSavedPost } from 'src/api/blog/delete-blog'
import { format } from 'date-fns'
import { useMutation } from '@tanstack/react-query'
import { toast } from '../ui/use-toast'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { z } from 'zod'
import { Button } from '../ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
interface PostProps {
  postId: string
}

const formSchema = z.object({
  video: z.any(),
})
type FormData = z.infer<typeof formSchema>

function Post({ postId }: PostProps) {
  const { user } = useAuth()
  const [blog, setBlog] = useState<IResponsePost>()
  const [interesterList, setInteresterList] = useState<IResponseInteresterList[]>([])
  const [isSaved, setIsSaved] = useState<boolean>(false)
  const [isInterested, setIsInterested] = useState<boolean>(false)
  const [postInterestId, setPostInterestId] = useState<string | undefined>(undefined)
  const [checkLike, setCheckLike] = useState<boolean>()
  const [likes, setLikes] = useState<number>(0)
  const navigate = useNavigate()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })
  useEffect(() => {
    const fetchBlogAndUser = async () => {
      const blogData = await getPostByIdApi(postId)
      setBlog(blogData)
      setLikes(blogData.likesCount)
    }

    fetchBlogAndUser()
  }, [postId])

  useEffect(() => {
    const getSavedPost = async () => {
      const save: IResponsePost[] = await getUserSavedPosts()
      const isSave = save.filter((save) => save.postData.postId === postId)

      if (isSave && isSave.length > 0) {
        setIsSaved(true)
        console.log('isSaved', isSave)
      } else {
        setIsSaved(false)
      }
    }
    getSavedPost()
  }, [postId])

  const saveToReadingList = async () => {
    if (blog) {
      await addNewSavedPost(postId as string).then((res) => {
        if (res === 'Successful!') {
          setIsSaved(true)
        }
      })
    }
  }

  const unsaveFromReadingList = async () => {
    if (blog) {
      await removeUserSavedPost(postId as string).then((res) => {
        if (res === 'Successful!') {
          setIsSaved(false)
        }
      })
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const checkLike = await checkUserLikePost(postId as string)
      if (checkLike == true) {
        setCheckLike(true)
      } else {
        setCheckLike(false)
      }
    }
    fetchData()
  }, [postId])

  const likePost = async () => {
    if (blog) {
      try {
        const response = await postLikePost(postId as string)
        if (response.liked) {
          setCheckLike(true)
          setLikes(likes + 1)
        } else {
          setCheckLike(false)
          setLikes(likes - 1)
        }
      } catch (error) {
        console.error('Error liking post:', error)
      }
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

  const [open, setOpenDialog] = useState<boolean>(false)
  const [openTrade, setOpenTradeDialog] = useState<boolean>(false)

  const handleInterestClick = async () => {
    try {
      if (user?.isValidated && open == false) {
        if (!isInterested && openTrade == false) {
          setOpenTradeDialog(true)
        } else {
          if (postInterestId) {
            await removeInterestedPost(postInterestId)
          }
          setIsInterested(false)
          setPostInterestId(undefined)
        }
      } else if (!user?.isValidated && open == false) {
        setOpenDialog(true)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const postInterestedTrade = useMutation((data: ITradeInterested) => postInterestedPost(data), {
    onSuccess: (status) => {
      if (status) {
        console.log('Successful!!!')
        toast({
          title: 'Successful!!!',
          description: 'Interested trade post success!',
        })
        setIsInterested(true)
        setOpenTradeDialog(false)
      } else {
        toast({
          title: 'Invalid interested trade response',
          description: 'Interested trade post false',
        })
      }
    },
    onError: (error: any) => {
      toast({
        title: 'Error Submitting Form',
        description: error.response.data,
      })
    },
  })
  const onSubmit = (data: FormData) => {
    const formData: ITradeInterested = {
      postId: blog?.postData.postId as string,
      video: data.video as File,
    }
    postInterestedTrade.mutate(formData)
  }

  return (
    <div className="mt-2 max-h-[37rem] w-full rounded-md border border-gray-400 bg-white">
      <Link to={`/blog/${postId}`}>
        {blog?.postData.imageDir ? (
          <div className="w-full rounded-md">
            <img src={blog?.postData.imageDir as string} className="max-h-[18rem] w-full rounded-t-md" />
          </div>
        ) : blog?.postData.videoDir ? (
          <video
            src={blog?.postData.videoDir as string}
            className="max-h-[18rem] w-full  rounded-t-md"
            controls
          ></video>
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
              <p className="text-xs font-light">
                {blog?.postData.createdAt ? format(new Date(blog?.postData.createdAt), 'PPpp') : 'N/A'}
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="my-2 ml-12 text-3xl font-extrabold hover:text-orange-600">{blog?.postData.title}</p>
            <p className="mb-2 ml-12 flex flex-row gap-1 text-sm">
              {Array.isArray(blog?.tags) &&
                blog?.tags.map((tag, index) => (
                  <React.Fragment key={index}>
                    {index < 4 ? (
                      <Link
                        to={`/blog/c/${tag.cateName}`}
                        className="ml-2 rounded-md px-2 py-1 text-sm hover:border hover:bg-orange-100 hover:text-orange-600"
                      >
                        #{tag.cateName}
                      </Link>
                    ) : (
                      ''
                    )}
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
            className="m-2 my-0 flex flex-row items-center gap-1 rounded-sm p-1 py-0 hover:bg-gray-200"
            onClick={() => likePost()}
          >
            <HeartIcon size={16} className={checkLike ? ' text-orange-400 ' : ''} />
            {likes}
          </div>
          <button
            className="flex flex-row items-center rounded-sm p-1 text-sm font-light hover:bg-gray-200"
            onClick={() => navigate(`/blog/${postId}`)}
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
                <Dialog open={open} onOpenChange={setOpenDialog}>
                  <DialogContent className="w-[32rem]">
                    <DialogHeader>
                      <DialogTitle className="pb-4 text-xl font-bold">
                        You don&apos;t have permission to do this
                      </DialogTitle>
                      <Separator />
                      <p className="py-2">
                        You must authenticate your account to be able to perform this action. Do you want to update
                        national identify card?
                      </p>
                      <DialogDescription className="flex flex-row">
                        <Button className="mr-4 bg-red-600" onClick={() => navigate('/user/account/identify')}>
                          Yes, I do.
                        </Button>
                        <Button>
                          <DialogClose>No, keep editing.</DialogClose>
                        </Button>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <Dialog open={openTrade} onOpenChange={setOpenTradeDialog}>
                  <DialogContent className="h-[12rem] w-[36rem]">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                          control={form.control}
                          name="video"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Upload Video</FormLabel>
                              <FormControl>
                                <Input
                                  className="py-0"
                                  type="file"
                                  accept="video/*"
                                  onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <div className="flex flex-row justify-between">
                          <Button disabled={postInterestedTrade.isLoading} type="submit">
                            {postInterestedTrade.isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ''}
                            Submit
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
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
