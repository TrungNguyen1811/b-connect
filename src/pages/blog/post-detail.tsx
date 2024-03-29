import { Avatar } from '@radix-ui/react-avatar'
import React, { useCallback, useEffect, useId, useState } from 'react'
import { AvatarImage } from '../../components/ui/avatar'
import { Separator } from '../../components/ui/separator'
import { BookMarkedIcon, HeartIcon, MessageCircleHeart, MessageCircleHeartIcon } from 'lucide-react'
import { useLoaderData } from 'react-router-dom'
import { IResponsePost } from 'src/types/blog'
import { useToast } from '../../components/ui/use-toast'
import { Button } from '../../components/ui/button'
import { useAuth } from 'src/hooks/useAuth'
import { getPostCommentByPostId, postPostComment } from 'src/api/blog/comment'
import { IComment } from 'src/types/comment'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Textarea } from 'src/components/ui/text-area'
import { Value } from '@udecode/plate-common'
import { PlateView } from 'src/components/ui/plate-view'

type FormValue = {
  content: string
}

function BlogDetail() {
  const data = useLoaderData() as { blog: IResponsePost }
  const [blog, setBlog] = React.useState<IResponsePost | null>(data.blog)
  const contents: Value = JSON.parse(blog?.postData.content as string)
  const [comments, setComments] = useState<IComment[]>()
  const [isSaved, setIsSaved] = useState<boolean>()
  const [isLiked, setIsLiked] = useState<boolean>()
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const { toast } = useToast()
  useEffect(() => {
    setBlog(data.blog)
  }, [data])

  useEffect(() => {
    const renderCommentsPost = async () => {
      const comments = await getPostCommentByPostId(blog?.postData.postId as string)
      setComments(comments)
    }

    renderCommentsPost()
  }, [blog?.postData.postId])

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

  const saveToLikePost = async () => {
    if (blog) {
      //   await postLikeBlog(blog._id)
      setIsLiked(true)
    }
  }

  const unsaveToLikePost = async () => {
    if (blog) {
      //   await postLikeBlog(blog._id)
      setIsLiked(false)
    }
  }

  const focusTextarea = () => {
    const textarea = document.getElementById('commentTextarea')
    if (textarea) {
      textarea.focus()
    }
  }

  const [totalLikes, setTotalLikes] = useState(0)

  // useEffect(() => {
  //   let likesCount = 0

  //   if (blog && blog.like) {
  //     for (const liked of blog.like) {
  //       if (liked._id) {
  //         likesCount += 1
  //       }
  //     }
  //   }

  //   setTotalLikes(likesCount)
  // }, [blog])

  const [totalComment, setTotalComment] = useState(0)

  // useEffect(() => {
  //   let commentsCount = 0

  //   if (blog && blog.comments) {
  //     for (const comments of blog.comments) {
  //       if (comments.commentId) {
  //         commentsCount += 1
  //       }
  //     }
  //   }

  //   setTotalComment(commentsCount)
  // }, [blog])

  const [commentText, setCommentText] = useState('')

  const handleCommentChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setCommentText(e.target.value)
  }

  const renderTextWithFormatting = (children: any[]) => {
    return children.map((child, index) => {
      let formattedText = child.text
      if (child.bold) formattedText = <strong>{formattedText}</strong>
      if (child.italic) formattedText = <em>{formattedText}</em>
      if (child.underline) formattedText = <u>{formattedText}</u>
      if (child.strikethrough) formattedText = <s>{formattedText}</s>
      if (child.subscript) formattedText = <sub>{formattedText}</sub>
      if (child.superscript) formattedText = <sup>{formattedText}</sup>
      if (child.fontSize) formattedText = <span style={{ fontSize: child.fontSize }}>{formattedText}</span>
      if (child.backgroundColor)
        formattedText = <span style={{ backgroundColor: child.backgroundColor }}>{formattedText}</span>
      if (child.color) formattedText = <span style={{ color: child.color }}>{formattedText}</span>
      if (child.code) formattedText = <code>{formattedText}</code>
      if (child.url) formattedText = <a href={child.url}>{formattedText}</a>
      return <React.Fragment key={index}>{formattedText}</React.Fragment>
    })
  }

  useEffect(() => {
    if (blog?.postData.content) {
      try {
        const contentString = JSON.parse(
          '[{"type":"h1","align":"start","children":[{"text":"Writing a Great Post","bold":true}],"id":"ivw9i"},{"type":"p","children":[{"text":"Title Think of your p","fontSize":"medium","backgroundColor":"rgb(241, 245, 249)","color":"rgb(9, 9, 11)","code":true},{"fontSize":"medium","backgroundColor":"rgb(241, 245, 249)","color":"rgb(9, 9, 11)","code":true,"text":"ost title as a super short (but compelling!) description — like an overview of the actual post in one short sentence.","strikethrough":true}],"id":"2hoj7"},{"type":"p","children":[{"text":"Use keywords where appropriate to help ensu","fontSize":"medium","backgroundColor":"rgb(241, 245, 249)","color":"rgb(9, 9, 11)"},{"fontSize":"medium","backgroundColor":"rgb(241, 245, 249)","color":"rgb(9, 9, 11)","text":"re people can find your post by search.","underline":true,"italic":true}],"id":"e2dkd"},{"type":"p","children":[{"text":""},{"type":"a","url":"http://localhost:5000/blog/create-post","children":[{"text":"http://localhost:5000/blog/create-post"}],"id":"mxe1k"},{"text":""}],"id":"o5gze"}]',
        )
        setBlog((prevBlog) => ({
          ...prevBlog!,
          content: contentString,
        }))
      } catch (error) {
        console.error('Error converting content to JSON string:', error)
      }
    }
  }, [blog?.postData.content])
  console.log(blog?.postData.content)

  const renderCommenter = React.useCallback(
    ({ userName, avatarDir, content, createDate }: IComment) => (
      <div className="flex flex-row items-start justify-start">
        <div className="mr-4">
          <Avatar>
            <AvatarImage src={avatarDir} className="h-10 w-10 rounded-[50%]" />
          </Avatar>
        </div>
        <div className="flex w-full flex-col">
          <div className=" border-1 w-9/10 flex flex-col rounded-md border">
            <div className="my-2 ml-4 flex flex-row items-center">
              <p className="mr-2 text-lg font-bold">{userName}</p>
              <p className="text-sm font-light">{createDate ? format(new Date(createDate), 'PPpp') : 'N/A'}</p>
            </div>
            <div>
              <p className="ml-4">{content}</p>
            </div>
          </div>
          <div className="m-4 flex flex-row">
            <div className="mx-2 flex flex-row items-center">
              <HeartIcon size={16} /> <p className="mx-1">Like</p>
            </div>
            <div className="mx-2 flex flex-row items-center">
              <MessageCircleHeart size={16} />
              <button className="mx-1">Reply</button>
            </div>
          </div>
        </div>
      </div>
    ),
    [],
  )

  const renderComments = React.useMemo(() => {
    return comments?.map((cmt) => (
      <div key={cmt.commentId} className="mb-2 w-full">
        {renderCommenter(cmt)}
      </div>
    ))
  }, [comments, renderCommenter])

  const addComment = useCallback((comment: IComment) => {
    return postPostComment(comment)
  }, [])

  const id = useId()

  const { mutateAsync, isLoading: isAddComment } = useMutation({
    mutationFn: postPostComment,
    onSuccess: (payload: IComment) => {
      if (!blog) return
      addComment(payload)
      queryClient.invalidateQueries()
    },
  })

  const { reset, register, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      content: '',
    },
  })

  const handleCommentSubmit = useCallback(
    ({ content }: FormValue) => {
      const payload = {
        postId: blog?.postData.postId as string,
        commenterId: user?.userId as string,
        content: content,
      }

      mutateAsync(payload)
        .then(() => {
          toast({
            type: 'foreground',
            title: 'Post a comment successfully',
            description: 'Your comment have been successfully',
          })
          setComments((prevComments) => [...(prevComments || []), payload])
          reset()
        })
        .catch((e) => {
          toast({
            type: 'foreground',
            title: 'Post a comment failed',
            description: 'Your comment have been failed',
          })
        })
    },
    [blog?.postData.postId, user?.userId, mutateAsync, reset, toast],
  )

  return (
    <div className="mx-32 px-4 py-2">
      <div className="grid grid-cols-12 gap-4 pt-2">
        <div className="col-span-1 bg-zinc-100">
          <div className="flex flex-col items-center justify-center">
            <div
              className="m-2 mt-16 flex flex-col items-center rounded-sm p-2 hover:bg-gray-300"
              onClick={isLiked ? unsaveToLikePost : saveToLikePost}
            >
              <HeartIcon size={24} className={isLiked ? ' text-orange-400 ' : ''} />
              <p>{totalLikes}</p>
            </div>
            <div className="m-2 flex flex-col items-center rounded-sm p-2 hover:bg-gray-300" onClick={focusTextarea}>
              <MessageCircleHeartIcon size={24} />
              <p>{totalComment}</p>
            </div>
            <div
              className="m-2 rounded-sm p-2 hover:bg-gray-300"
              onClick={isSaved ? unsaveFromReadingList : saveToReadingList}
            >
              <BookMarkedIcon size={24} className={isSaved ? ' text-orange-400 ' : ''} />
            </div>
          </div>
        </div>
        <div className="col-span-8">
          <div className="h-full w-full rounded-md border-2 bg-slate-50">
            <div className="w-full rounded-md">
              <img src={blog?.postData.imageDir as string} className="max-h-[24rem] w-full rounded-t-md" />
            </div>
            <div className="w-full rounded-md"></div>
            <div className="m-4  px-12 pt-4">
              <div className="flex flex-row">
                <Avatar>
                  <AvatarImage src={blog?.avatarDir} className="h-10 w-10 rounded-[50%]" />
                </Avatar>
                <div className="ml-2 flex flex-col items-start">
                  <p className="font-semibold">{blog?.username}</p>
                  <p className="text-xs font-light">{blog?.postData.createdAt}</p>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="my-4 text-5xl font-extrabold">{blog?.postData.title}</p>
                <p className="mb-2 flex flex-row text-sm">
                  Category:
                  {/* {blog?.category.map((cat, index) => (
                    <React.Fragment key={index}>
                      <div className="text-sm">{cat.name}</div>
                      {index < blog.category.length - 1 && <span>, </span>}
                    </React.Fragment>
                  ))} */}
                </p>
              </div>
              <div className="pt-4">
                <PlateView content={contents} />
              </div>
              {blog?.postData.videoDir ? (
                <video
                  src={blog?.postData.videoDir as string}
                  className="max-h-[24rem] w-full rounded-md"
                  controls
                ></video>
              ) : (
                ''
              )}

              <Separator className="my-8" />
              <div>
                <div className="mb-6 flex flex-row items-center justify-between">
                  <p>Top Comments ({})</p>
                  <Button>Subscribe</Button>
                </div>
                <div className="flex flex-row">
                  <Avatar>
                    <AvatarImage
                      src={'https://down-vn.img.susercontent.com/file/sg-11134004-7qvg8-limw3k5iiy5v7e_tn'}
                      className="mr-4 h-10 w-10 rounded-[50%]"
                    />
                  </Avatar>
                  <div className="w-full">
                    <form onSubmit={handleSubmit(handleCommentSubmit)} className="space-y-2">
                      <Textarea
                        id="commentTextarea"
                        placeholder="Add to the discussion"
                        {...register('content')}
                        onChange={handleCommentChange}
                        disabled={isAddComment}
                      />

                      {commentText && (
                        <Button className="my-2" type="submit">
                          Submit
                        </Button>
                      )}
                    </form>
                  </div>
                </div>
                <div className="my-4 space-y-8">{renderComments}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 bg-zinc-100">{/* <More /> */}</div>
      </div>
    </div>
  )
}
export default BlogDetail
