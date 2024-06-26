import { format } from 'date-fns'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { IResponsePostLocked, getLockedPostByUserId, getPostByIdApi } from 'src/api/blog/get-blog'
import { getPostInterestByPostId, postAcceptTrade } from 'src/api/blog/interested'
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar'
import { Button } from 'src/components/ui/button'
import { useAuth } from 'src/hooks/useAuth'
import { IResponsePost } from 'src/types/blog'
import { IResponseInteresterList } from 'src/types/interester'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'src/components/ui/dialog'
import { getUserPostData } from 'src/api/user/get-user'
import { IAnalystPost } from 'src/types/user'

function ManagePostInterester() {
  const { user } = useAuth()
  const { id } = useParams()
  const [postData, setPostData] = useState<IResponsePost>()
  const [interestList, setInteresterList] = useState<IResponseInteresterList[]>([])
  const navigate = useNavigate()
  const [dashboard, setDashboard] = useState<IAnalystPost>()
  const [open, setOpenDialog] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && id) {
          const interestersData: IResponseInteresterList[] = await getPostInterestByPostId(id as string)
          setInteresterList(interestersData)
          const dashboard = await getUserPostData()
          setDashboard(dashboard)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [user, id])

  useEffect(() => {
    const reloadPost = async () => {
      try {
        if (user && id) {
          const postData: IResponsePost = await getPostByIdApi(id as string)
          console.log(postData)
          setPostData(postData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    reloadPost()
  }, [])

  const acceptTrade = async (postId: string, interesterId: string, isUsingMiddle: boolean) => {
    // response portId
    await postAcceptTrade(postId, interesterId, isUsingMiddle)
    const postData: IResponsePost = await getPostByIdApi(id as string)
    setPostData(postData)
  }

  const trader = useCallback(
    ({ recordId, userId, username, avatarDir, createDate, isChosen, videoDir }: IResponseInteresterList) => (
      <div className="flex flex-row">
        <div className="ml-8 flex w-full items-center gap-3">
          <Avatar>
            <AvatarImage width={'50rem'} src={avatarDir} alt={`${username}`} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-1 justify-between">
            <div>
              <div className="text-lg font-medium">{username}</div>
              <div className="text-sm font-light">{createDate ? format(new Date(createDate), 'PPpp') : 'N/A'}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <Dialog>
            <DialogTrigger>
              <Button className="w-20 bg-blue-500">View</Button>
            </DialogTrigger>
            <DialogContent className="w-[32rem]">
              <DialogHeader>
                <DialogTitle className="pb-4 text-xl font-bold">Video</DialogTitle>
                <video src={videoDir as string} className="max-h-[24rem] w-full rounded-md" controls></video>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger>
              <Button>Accept</Button>
            </DialogTrigger>
            <DialogContent className="w-[28rem]">
              <DialogHeader className="w-96">
                <DialogTitle className="text-xl font-medium">
                  Do you want to use a middle to make the exchange more secure?
                </DialogTitle>
                <DialogDescription className="flex flex-row items-center justify-center gap-4">
                  <Button
                    variant="default"
                    className="mt-4 w-24"
                    onClick={() => acceptTrade(id as string, userId, true)}
                  >
                    Yes
                  </Button>
                  <Button
                    variant="destructive"
                    className="mt-4 w-24"
                    onClick={() => acceptTrade(id as string, userId, false)}
                  >
                    No
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    ),
    [],
  )

  const trader2 = useCallback(
    ({ recordId, userId, username, avatarDir, createDate, isChosen, videoDir }: IResponseInteresterList) => (
      <div className="flex flex-row">
        <div className="ml-2 flex w-full items-center gap-3">
          <Avatar>
            <AvatarImage width={'60rem'} src={avatarDir} alt={`${username}`} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-1 justify-between">
            <div>
              <div className="text-lg font-medium">{username}</div>
              <div className="text-sm font-light">{createDate ? format(new Date(createDate), 'PPpp') : 'N/A'}</div>
            </div>
          </div>
        </div>
        <div className=" flex flex-row items-center">
          {isChosen ? (
            <Link to={`/blog/dashboard/submit-form/${id}`}>
              <Button className="w-32">Confirm Trade</Button>
            </Link>
          ) : (
            ''
          )}
        </div>
      </div>
    ),
    [],
  )
  const renderTrader = useMemo(() => {
    if (!Array.isArray(interestList)) return null
    return interestList.map((interest) => (
      <div key={interest.userId} className="mb-2 w-full">
        {trader(interest)}
        {/* <Separator className="my-4" /> */}
      </div>
    ))
  }, [interestList, trader])

  const renderTrader2 = useMemo(() => {
    if (!Array.isArray(interestList)) return null
    return interestList.map((interest) => (
      <div key={interest.userId} className="mb-2 w-full rounded-sm border border-gray-400 p-2">
        {trader2(interest)}
        {/* <Separator className="my-4" /> */}
      </div>
    ))
  }, [interestList, trader2])

  const [lockedBlogsData, setLockedBlogsData] = useState<IResponsePostLocked[]>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.userId) {
          const id = '1'
          const data: IResponsePostLocked[] = await getLockedPostByUserId(id)
          setLockedBlogsData(data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [user])

  return (
    <div className="mx-28 h-[43rem]">
      <div className="mb-4 flex flex-col">
        <p className="p-4 text-3xl font-bold">Dashboard {'>>'} Manage Post Interester</p>
      </div>
      <div className="mx-4 flex flex-row">
        <nav className="mr-3 w-1/4">
          <Link to={'/blog/dashboard'} className="">
            <div className="flex flex-row items-center rounded-sm px-2 py-1">
              <p className="w-full font-semibold">Post</p>
              <p className="border-1 r-0 m-1 rounded-xl bg-slate-300 px-2">{dashboard?.postCount}</p>
            </div>
          </Link>
          <Link to={'/blog/dashboard/following_tags'} className="">
            <div className="flex flex-row items-center rounded-sm px-2 py-1">
              <p className="w-full font-semibold">Following Tags</p>
              <p className="border-1 r-0 m-1 rounded-xl bg-slate-300 px-2">{dashboard?.tagFollowCount}</p>
            </div>
          </Link>
          <Link to={'/blog/dashboard/manage-interested'} className="">
            <div className="flex flex-row items-center rounded-sm px-2 py-1">
              <p className="w-full font-semibold">Manage Post Interested</p>
              <p className="border-1 r-0 m-1 rounded-xl bg-slate-300 px-2">{dashboard?.interestedCount}</p>
            </div>
          </Link>
          <Link to={'/blog/dashboard/manage-interester'} className=" ">
            <div className="flex flex-row items-center rounded-sm bg-white px-2 py-1">
              <p className="w-full font-semibold">Manage Post Interester</p>
              <p className="border-1 r-0 m-1 rounded-xl bg-slate-300 px-2">{interestList.length}</p>
            </div>
          </Link>
        </nav>
        <div className="h-full min-h-[70vh] w-full rounded-md border-2 border-gray-400 bg-white p-4">
          {interestList ? (
            postData?.postData.isLock ? (
              renderTrader2
            ) : (
              renderTrader
            )
          ) : (
            <div className="flex flex-col items-center">
              <img
                className="pb-6 pt-16"
                src="https://media.dev.to/cdn-cgi/image/width=300,height=,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2Fy5767q6brm62skiyywvc.png"
              />
              <p className="text-lg">
                This is where you can manage your categories, but you are not interested in any categories yet.
              </p>
              <Button onClick={() => navigate('/blog/categories')} className="text-md mx-8 my-6 p-6">
                Add more categories which you are interested in
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default ManagePostInterester
