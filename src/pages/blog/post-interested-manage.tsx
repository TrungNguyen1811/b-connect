import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IResponsePostLocked, getLockedPostByUserId, getPostByUserId } from 'src/api/blog/get-blog'
import { getPostInterestByPostId, getPostInterestedByUser, removeInterestedPost } from 'src/api/blog/interested'
import { Avatar, AvatarImage } from 'src/components/ui/avatar'
import { Button } from 'src/components/ui/button'
import { Checkbox } from 'src/components/ui/check-box'
import { Separator } from 'src/components/ui/separator'
import { toast } from 'src/components/ui/use-toast'
import { useAuth } from 'src/hooks/useAuth'
import { IResponsePost } from 'src/types/blog'
import { IResponseInteresterList } from 'src/types/interester'

function PostInterestedManage() {
  const { user } = useAuth()
  const [postId, setPostId] = useState('')
  const [interestList, setInterestedList] = useState<IResponsePost[]>([])
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const interestedData: IResponsePost[] = await getPostInterestedByUser()
          setInterestedList(interestedData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [user])

  const { mutate } = useMutation(removeInterestedPost, {
    onSuccess: (data) => {
      if (data == 'Successful!')
        toast({
          title: 'Successful!',
          description: 'Uninterested Post Success!!!',
        })
      queryClient.invalidateQueries()
      setInterestedList((prevList) => prevList.filter((post) => post.postData.postId !== postId))
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed!',
        description: 'Uninterested Post Fail with Error' + error.message,
      })
    },
  })

  const onDelete = async (id: string) => {
    setPostId(id)
    const data: IResponseInteresterList[] = await getPostInterestByPostId(id as string)
    const userInterest = data.find((dt) => dt.userId === user?.userId)
    mutate(userInterest?.recordId as string)
  }
  //
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
        <p className="p-4 text-3xl font-bold">Dashboard {'>>'} Manage Post Interested</p>
      </div>
      <div className="mx-4 flex flex-row">
        <nav className="mr-3 md:w-[18rem]">
          <Link to={'/blog/dashboard'} className="">
            <div className="flex flex-row items-center rounded-sm px-2 py-1">
              <p className="w-full font-semibold">Post</p>
              <p className="border-1 r-0 m-1 rounded-xl bg-slate-300 px-2">0</p>
            </div>
          </Link>
          <Link to={'/blog/dashboard/following_tags'} className="">
            <div className="flex flex-row items-center rounded-sm px-2 py-1">
              <p className="w-full font-semibold">Following Category</p>
              <p className="border-1 r-0 m-1 rounded-xl bg-slate-300 px-2">0</p>
            </div>
          </Link>
          <Link to={'/blog/dashboard/manage-interested'} className=" ">
            <div className="flex flex-row items-center rounded-sm bg-orange-50 px-2 py-1">
              <p className="w-full font-semibold">Manage Post Interested</p>
              <p className="border-1 r-0 m-1 rounded-xl bg-slate-300 px-2">0</p>
            </div>
          </Link>
        </nav>
        <div className="h-full w-full">
          <div className="flex flex-row items-center">
            <p className="mr-2">Lock Post</p>
            <Checkbox checked={checkbox} onCheckedChange={(checked: boolean) => setCheckbox(checked)} />
          </div>
          {checkbox ? (
            <div className="min-h-[35rem] rounded-md border-2 bg-white p-4">
              {lockBlogs?.map((lock, index) => (
                <div key={index} className="">
                  <Link to={`/blog/dashboard/submit-form/${lock.postId}`}>
                    <div className="flex flex-col">
                      <p className="text-lg">{lock.title}</p>
                      <p className="text-red-600">{lock.status}</p>
                    </div>
                  </Link>
                  <Separator className="my-2" />
                </div>
              ))}
            </div>
          ) : interestList && interestList.length > 0 ? (
            <div className="min-h-[35rem] rounded-md border-2 bg-white">
              {interestList.map((post, index) => (
                <div key={index} className="flex w-full flex-col">
                  <div className="mx-4 p-4 pb-2">
                    <div className="w-9/10 flex flex-row items-center">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={'https://down-vn.img.susercontent.com/file/sg-11134004-7qvg8-limw3k5iiy5v7e_tn'}
                        />
                      </Avatar>
                      <div className="my-2 ml-4 flex flex-col items-start">
                        <Link className="flex flex-row items-center justify-start" to={`/blog/${post.postData.postId}`}>
                          <p className="mr-2 text-lg font-bold text-orange-600 hover:text-orange-700">
                            {post.postData.title}
                          </p>
                          {post.postData.isLock ? (
                            <p className="rounded-sm border-2 border-red-600 px-2 text-sm text-red-600">Process</p>
                          ) : (
                            ''
                          )}
                        </Link>
                        <div className="flex flex-row items-center justify-stretch gap-2">
                          <p className="font-semibold text-gray-700">{post.username}</p>
                          <p className="text-sm font-light">{format(post.postData.createdAt as string, 'PPP')}</p>
                          <p className="flex flex-row gap-1">
                            {post.postData.listCate?.map((cate, index) => (
                              <p className="text-base font-normal" key={index}>
                                #{cate.cateName}
                              </p>
                            ))}
                          </p>
                        </div>
                      </div>
                      <div className="flex-grow"></div>
                      <Button onClick={() => onDelete(post.postData.postId as string)}>Remove</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <img
                className="pb-6 pt-16"
                src="https://media.dev.to/cdn-cgi/image/width=300,height=,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2Fy5767q6brm62skiyywvc.png"
              />
              <p className="text-lg">
                This is where you can manage your post interested, but you are not interested in any post yet.
              </p>
              <Button onClick={() => navigate('/blog')} className="text-md mx-8 my-6 p-6">
                Add more post which you are interested in
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default PostInterestedManage
