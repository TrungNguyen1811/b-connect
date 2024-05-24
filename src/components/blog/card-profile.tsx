import { MessageCircle, MoreHorizontalIcon, StarIcon, User2 } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { useEffect, useState } from 'react'
import { IRatingOverall, User } from 'src/types/user'
import { getUserById } from 'src/api/user/get-user'
import { toast } from '../ui/use-toast'
import { Link } from 'react-router-dom'
import { getUserRatingInfo } from 'src/api/review/get-all-review-by-bookId'
import '@smastrom/react-rating/style.css'

function CardProfile({ userId }: { userId: string }) {
  const [userDetail, setUserDetail] = useState<User | undefined>(undefined)
  const [rating, setRating] = useState<IRatingOverall>()

  useEffect(() => {
    const fetchDataAndUpdateForm = async () => {
      try {
        const fetchedUser: any = await getUserById(userId as string)
        if (fetchedUser && fetchedUser.userId) {
          setUserDetail(fetchedUser)
        } else {
          toast({
            title: 'Invalid category response',
            description: 'No category ID in the response.',
          })
        }
      } catch (error) {
        toast({
          title: 'Error category detail',
        })
      }
    }
    fetchDataAndUpdateForm()
  }, [userId])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rating = await getUserRatingInfo(userId as string)
        setRating(rating)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="relative w-full rounded-xl border">
      <div className="my-2 w-full px-2">
        <div className="h-20 rounded-lg bg-slate-600">.</div>
      </div>
      <div className="absolute left-32 top-10">
        <Avatar className="h-20 w-20">
          <AvatarImage className="z-5 h-20 w-20" src={userDetail?.avatarDir as string} alt="" />
        </Avatar>
      </div>
      <div className="mb-4 mt-8">
        <Link to={`/blog/profile/${userDetail?.username}`}>
          <p className="text-center text-sm text-gray-400 hover:text-orange-500">@{userDetail?.username}</p>
        </Link>
        <p className="text-center text-lg font-medium">{userDetail?.fullName}</p>
        <div className="my-2 flex flex-row justify-center gap-1">
          <Link
            to={`/blog/user/rating/${userId}`}
            className=" flex flex-row items-center gap-1 px-4 text-xs text-gray-400 hover:text-orange-500"
          >
            Rating: <StarIcon className="h-3 w-3" /> {rating?.overallRating}
          </Link>
          <p className=" text-xs text-gray-400">{userDetail?.createdAt as string}</p>
        </div>
        <div className="flex flex-row justify-center gap-2">
          <div className="flex flex-row gap-2 rounded-sm border p-1 px-2">
            <User2 size={16} />
            <p className="text-xs ">Follow</p>
          </div>
          <div className="flex flex-row gap-2 rounded-sm border p-1 px-2">
            <MessageCircle size={16} />
            <p className="text-xs ">Message</p>
          </div>
          <div className="flex flex-row gap-2 rounded-sm border p-1 px-2">
            <MoreHorizontalIcon size={16} />
            <p className="text-xs">More</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CardProfile
