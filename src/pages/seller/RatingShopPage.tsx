import { AvatarImage } from '@radix-ui/react-avatar'
import { Rating, RoundedStar } from '@smastrom/react-rating'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getReviewForAgencyUserView } from 'src/api/review/get-all-review-by-bookId'
import { Avatar } from 'src/components/ui/avatar'
import { IListReplyResponse } from 'src/types'
import '@smastrom/react-rating/style.css'
import { Separator } from 'src/components/ui/separator'
import { getAgencyStat } from 'src/api/seller/get-agency'
import { IAgencyStat } from 'src/types/agency'

function RatingShopPage() {
  const { id } = useParams()
  const [lists, setLists] = useState<IListReplyResponse[]>()
  const [agencyStat, setAgencyStat] = useState<IAgencyStat | null>()
  const [rating, setRating] = useState(0)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [countRating, setCountRating] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const lists = await getReviewForAgencyUserView(id as string, selectedRating)
      setLists(lists.data)
      setCountRating(lists.data.length)
      const stat = await getAgencyStat(id as string)
      setAgencyStat(stat)
    }
    fetchData()
  }, [selectedRating, id])

  const getCount = (rating: number) => lists?.filter((list) => parseInt(list.ratingPoint) === rating).length || 0
  const myStyles = {
    itemShapes: RoundedStar,
    activeFillColor: '#ea580c',
    inactiveFillColor: '#fdba74',
  }
  return (
    <div className="min-h-screen bg-orange-50 pt-4">
      <div className="mx-24 border bg-white p-8 pt-4">
        <p className="pb-4 text-2xl font-bold">Rating ({lists?.length})</p>
        <div className="mb-16 flex flex-row items-center justify-start gap-4 border border-orange-200 bg-orange-100 p-4">
          <div className="flex flex-col items-center">
            <p className="text-md mb-2 flex flex-row items-baseline gap-1 text-orange-600">
              <p className="text-3xl">{agencyStat?.agencyAverageRate ? agencyStat?.agencyAverageRate : 0}</p> out of 5
            </p>
            <Rating style={{ maxWidth: 120 }} value={rating} onChange={setRating} itemStyles={myStyles} readOnly />
          </div>
          <div className="flex flex-row gap-2">
            <button
              className={`my-1 w-24 border border-gray-400 px-2 ${
                selectedRating === 6 ? 'border border-orange-600 text-orange-500' : ''
              }`}
              onClick={() => setSelectedRating(null)}
            >
              All ({countRating})
            </button>
            <button
              className={`my-1 w-24 border  border-gray-400 px-2 ${
                selectedRating === 5 ? 'border-orange-600 text-orange-500' : ''
              }`}
              onClick={() => setSelectedRating(5)}
            >
              5 Star ({getCount(5)})
            </button>
            <button
              className={`my-1 w-24 border  border-gray-400 px-2 ${
                selectedRating === 4 ? 'border-orange-600 text-orange-500' : ''
              }`}
              onClick={() => setSelectedRating(4)}
            >
              4 Star ({getCount(4)})
            </button>
            <button
              className={`my-1 w-24 border  border-gray-400 px-2 ${
                selectedRating === 3 ? 'border-orange-600 text-orange-500' : ''
              }`}
              onClick={() => setSelectedRating(3)}
            >
              3 Star ({getCount(3)})
            </button>
            <button
              className={`my-1 w-24 border  border-gray-400 px-2 ${
                selectedRating === 2 ? 'border-orange-600 text-orange-500' : ''
              }`}
              onClick={() => setSelectedRating(2)}
            >
              2 Star ({getCount(2)})
            </button>
            <button
              className={`my-1 w-24 border  border-gray-400 px-2 ${
                selectedRating === 1 ? 'border-orange-600 text-orange-500' : ''
              }`}
              onClick={() => setSelectedRating(1)}
            >
              1 Star ({getCount(1)})
            </button>
          </div>
        </div>
        <div>
          {lists?.map((list, index) => {
            return (
              <div key={index} className="flex flex-row items-start gap-1">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={list.avatarDir} />
                </Avatar>
                <div>
                  <p>{list.username}</p>
                  <Rating style={{ maxWidth: 100 }} value={parseInt(list.ratingPoint) as number} />
                  <p className="text-gray-600">{list.bookName}</p>
                  <p>{list.comment}</p>
                </div>
                {lists.length - 1 > index ? <Separator /> : ''}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default RatingShopPage
