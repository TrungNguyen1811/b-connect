import { IBlogg } from 'src/types/blog'
import { IResponse } from 'src/types/response'
import { useAuth } from 'src/hooks/useAuth'
import { getBlogsByUserId } from 'src/api/blog/get-blog'
import React, { useEffect, useState } from 'react'
import { AvatarImage } from 'src/components/ui/avatar'
import { Avatar } from '@radix-ui/react-avatar'
import { Button } from 'src/components/ui/button'
import { BookHeartIcon, MessageSquareDotIcon, StickyNoteIcon } from 'lucide-react'
import MetaData from 'src/components/metadata'
import Post from 'src/components/blog/post'
import { useNavigate, useParams } from 'react-router-dom'
import { User } from 'src/types'
import { getUserByUserName } from 'src/api/user/get-user-faker'

function ProfileUser() {
  const { user } = useAuth()
  const { username } = useParams()
  const [userData, setUserData] = useState<User | null>(null)
  const [blogs, setBlogs] = useState<IResponse<IBlogg[]> | null>(null)
  const isCurrentUser = user && user.username === username
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call getUserByUserName with the username obtained from useParams()
        const userResponse = await getUserByUserName(username as string)
        setUserData(userResponse)

        // If userResponse contains data, proceed to fetch blogs
        if (userResponse) {
          const allBlogData = await getBlogsByUserId(userResponse.userId as string)
          setBlogs(allBlogData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [username])

  return (
    <div>
      <div>
        <MetaData title="Profile" />
        <main>
          <div className="">
            <div className="h-[24rem]">
              <div className="h-40 bg-black"></div>
              <div className="">
                <header className="">
                  <Avatar className="">
                    <AvatarImage
                      src={'https://down-vn.img.susercontent.com/file/sg-11134004-7qvg8-limw3k5iiy5v7e_tn'}
                      alt={userData?.fullName || ''}
                      className="absolute left-[44rem] top-20 z-10 h-32 w-32 rounded-[50%] p-2"
                    />
                  </Avatar>
                  <div className="absolute left-[16rem] top-36 h-[18rem] w-[63rem] rounded-md border-2 bg-slate-50">
                    <div className="right-0 flex flex-row items-center justify-center pt-16">
                      <p className="ml-20 text-xl font-semibold">{userData?.username}</p>{' '}
                      {isCurrentUser ? (
                        <Button
                          onClick={() => {
                            navigate('/setting/profile')
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
                      <p className="px-36 py-4 text-center text-lg">Hello 👋, my name is {userData?.fullName} I am a</p>
                    </div>
                    <div className="flex flex-row items-center justify-center">
                      <p className="px-4">Add: {userData?.address}</p>
                      <p className="px-4">Joined on: {userData?.createdAt?.toISOString()}</p>
                      {/* <p className="px-4">Shopee: {userData?.username}</p> */}
                    </div>
                  </div>
                </header>
              </div>
            </div>
          </div>
          <div className="mx-[16rem] flex flex-row">
            <div className="mr-5 mt-2 max-h-40 w-1/3 rounded-md border-2 bg-slate-50">
              <div className="m-4">
                <div className="flex flex-row p-2">
                  <StickyNoteIcon /> <p className="pl-1">3 posts published</p>
                </div>
                <div className="flex flex-row p-2">
                  <MessageSquareDotIcon />
                  <p className="pl-1">2 comments written</p>
                </div>
                <div className="flex flex-row p-2">
                  <BookHeartIcon />
                  <p className="pl-1">2 tags followed</p>
                </div>
              </div>
            </div>
            <main className="h-full w-full rounded-md">
              {blogs?.data.map((blog, index) => (
                <div className="my-4 mt-2" key={index}>
                  {blog?._id && <Post id={blog._id} />}
                </div>
              ))}
            </main>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ProfileUser
