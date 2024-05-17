import { IResponsePost } from 'src/types/blog'
import { useAuth } from 'src/hooks/useAuth'
import React, { useEffect, useState } from 'react'
import { AvatarImage } from 'src/components/ui/avatar'
import { Avatar } from '@radix-ui/react-avatar'
import { Button } from 'src/components/ui/button'
import { BookHeartIcon, MessageSquareDotIcon, StickyNoteIcon } from 'lucide-react'
import MetaData from 'src/components/metadata'
import Post from 'src/components/blog/post'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getPostByUserId } from 'src/api/blog/get-blog'
import { IAnalystPost, IRatingOverall, User } from 'src/types/user'
import { getUserByUserName, getUserPostData } from 'src/api/user/get-user'
import { getUserRatingInfo } from 'src/api/review/get-all-review-by-bookId'

function ProfileUser() {
  const { user } = useAuth()
  const { username } = useParams()
  const [userData, setUserData] = useState<User | null>(null)
  const [blogs, setBlogs] = useState<IResponsePost[] | null>(null)
  const [analyst, setAnalyst] = useState<IAnalystPost>()
  const [rating, setRating] = useState<IRatingOverall>()
  const isCurrentUser = user && user.username === username
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const getUser = await getUserByUserName(username as string)
          setUserData(getUser)
          const analyst = await getUserPostData()
          setAnalyst(analyst)
          const rating = await getUserRatingInfo(userData?.userId as string)
          setRating(rating)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [username, user])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userData) {
          const allBlogData = await getPostByUserId(userData?.userId as string)
          setBlogs(allBlogData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [userData])

  return (
    <div className="h-full">
      <MetaData title="Profile" />
      <main>
        <div className="">
          <div className="h-[20rem]">
            <div className="h-40 bg-orange-950"></div>
            <div className="">
              <header className="">
                <Avatar className="">
                  <AvatarImage
                    src={userData?.avatarDir as string}
                    alt={userData?.fullName || ''}
                    className="absolute left-[44rem] top-20 z-10 h-32 w-32 rounded-[50%] p-2"
                  />
                </Avatar>
                <div className="absolute left-[16rem] top-36 h-[14rem] w-[63rem] rounded-md border-2 bg-orange-100">
                  <div className="right-0 flex flex-row items-center justify-center pt-16">
                    <p className="ml-20 text-xl font-semibold">{userData?.username}</p>
                    {isCurrentUser ? (
                      <Button
                        onClick={() => {
                          navigate('/blog/setting/profile')
                        }}
                        className="ml-5"
                      >
                        Edit Profile
                      </Button>
                    ) : (
                      <Button className="ml-5">Follow</Button>
                    )}
                  </div>
                  <div>
                    <p className="px-36 py-4 text-center text-lg">
                      Hello 👋, my name is {userData?.fullName} I am a Trader
                    </p>
                  </div>
                  <div className="flex flex-row items-center justify-center">
                    <Link to={`/blog/user/rating/${userData?.userId}`} className="px-4 hover:text-orange-500">
                      Rating: {rating?.overallRating}* ({rating?.totalReviews} Rating)
                    </Link>
                    <p className="px-4">Add: 123 Abcd, Hoa Hai, Ngu Hanh Son, Da Nang{userData?.addressId}</p>
                    <p className="px-4">Joined on: 15/04/2024{userData?.createdAt as string}</p>
                    {/* <p className="px-4">Shopee: {user?.username}</p> */}
                  </div>
                </div>
              </header>
            </div>
          </div>
        </div>
        <div className="mx-[16rem] flex flex-row">
          <div className="mr-5 mt-2 max-h-40 w-1/3 rounded-md border-2 bg-orange-100">
            <div className="m-4">
              <div className="flex flex-row p-2">
                <StickyNoteIcon /> <p className="pl-1">{analyst?.postCount} posts published</p>
              </div>
              <div className="flex flex-row p-2">
                <MessageSquareDotIcon />
                <p className="pl-1">{analyst?.commentCount} comments written</p>
              </div>
              <div className="flex flex-row p-2">
                <BookHeartIcon />
                <p className="pl-1">{analyst?.tagFollowCount} tags followed</p>
              </div>
            </div>
          </div>
          <main className="h-full w-full rounded-md">
            {blogs?.map((blog, index) => (
              <div className="my-4 mt-2" key={index}>
                {blog?.postData.postId && <Post postId={blog.postData.postId} />}
              </div>
            ))}
          </main>
        </div>
      </main>
    </div>
  )
}

export default ProfileUser
