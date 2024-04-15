import { format } from 'date-fns'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { IResponsePostLocked, getLockedPostByUserId, getPostByIdApi } from 'src/api/blog/get-blog'
import { getPostInterestByPostId, postAcceptTrade } from 'src/api/blog/interested'
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar'
import { Button } from 'src/components/ui/button'
import { Separator } from 'src/components/ui/separator'
import { useAuth } from 'src/hooks/useAuth'
import { IResponsePost } from 'src/types/blog'
import { IResponseInteresterList } from 'src/types/interester'

function ManagePostInterester() {
  const { user } = useAuth()
  const { id } = useParams()
  const [postData, setPostData] = useState<IResponsePost>()
  const [interestList, setInteresterList] = useState<IResponseInteresterList[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && id) {
          const interestersData: IResponseInteresterList[] = await getPostInterestByPostId(id as string)
          console.log(interestList)
          setInteresterList(interestersData)
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

  const acceptTrade = async (postId: string, interesterId: string) => {
    // response portId
    await postAcceptTrade(postId, interesterId)
    const postData: IResponsePost = await getPostByIdApi(id as string)
    setPostData(postData)
  }

  const trader = useCallback(
    ({ recordId, userId, username, avatarDir, createDate, isChosen }: IResponseInteresterList) => (
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
        <div>
          <Button onClick={() => acceptTrade(id as string, userId)}>Accept</Button>
        </div>
      </div>
    ),
    [],
  )

  const trader2 = useCallback(
    ({ recordId, userId, username, avatarDir, createDate, isChosen }: IResponseInteresterList) => (
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
        <div className=" flex flex-row items-center">
          {isChosen ? (
            <Link to={`/blog/dashboard/submit-form/${id}`} className="mr-4 w-32 border-2 border-red-600 text-center">
              Confirm Trade
            </Link>
          ) : (
            ''
          )}
          <div>{isChosen ? <Button> Deny </Button> : ''}</div>
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
        <Separator className="my-4" />
      </div>
    ))
  }, [interestList, trader])

  const renderTrader2 = useMemo(() => {
    if (!Array.isArray(interestList)) return null
    return interestList.map((interest) => (
      <div key={interest.userId} className="mb-2 w-full">
        {trader2(interest)}
        <Separator className="my-4" />
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
    <div className="mx-28">
      <div className="mb-4 flex flex-col">
        <p className="p-4 text-3xl font-bold">Dashboard {'>>'} Manage Post Interester</p>
      </div>
      <div className="mx-4 flex flex-row">
        <nav className="mr-3 w-1/4">
          <Link to={'/blog/dashboard'} className="">
            <div className="flex flex-row items-center rounded-sm px-2 py-1">
              <p className="w-full font-semibold">Post</p>
              <p className="border-1 r-0 m-1 rounded-xl bg-slate-300 px-2">0</p>
            </div>
          </Link>
          <Link to={'/blog/dashboard/following_categories'} className="">
            <div className="flex flex-row items-center rounded-sm px-2 py-1">
              <p className="w-full font-semibold">Following Category</p>
              <p className="border-1 r-0 m-1 rounded-xl bg-slate-300 px-2">0</p>
            </div>
          </Link>
          <Link to={'/blog/dashboard/manage-interested'} className="">
            <div className="flex flex-row items-center rounded-sm px-2 py-1">
              <p className="w-full font-semibold">Manage Post Interested</p>
              <p className="border-1 r-0 m-1 rounded-xl bg-slate-300 px-2">0</p>
            </div>
          </Link>
          <Link to={'/blog/dashboard/manage-interester'} className=" ">
            <div className="flex flex-row items-center rounded-sm bg-orange-50 px-2 py-1">
              <p className="w-full font-semibold">Manage Post Interester</p>
              <p className="border-1 r-0 m-1 rounded-xl bg-slate-300 px-2">0</p>
            </div>
          </Link>
        </nav>
        <div className="h-full w-full">
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
