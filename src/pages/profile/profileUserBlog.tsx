import { Avatar } from '@radix-ui/react-avatar'
import { BookHeartIcon, MessageSquareDotIcon, StickyNoteIcon } from 'lucide-react'
import React from 'react'
import MetaData from 'src/components/metadata'
import { AvatarImage } from 'src/components/ui/avatar'
import { Button } from 'src/components/ui/button'
import { useAuth } from 'src/hooks/useAuth'

function ProfileUser() {
  const { user } = useAuth()

  return (
    <div>
      <div>
        <MetaData title="Profile" />
        <main>
          <div>
            <div className="h-[24rem]">
              <div className="h-40 bg-black"></div>
              <div className="">
                <header className="">
                  <Avatar className="">
                    <AvatarImage
                      src={'https://down-vn.img.susercontent.com/file/sg-11134004-7qvg8-limw3k5iiy5v7e_tn'}
                      alt={user?.fullName}
                      className="absolute left-[44rem] top-20 z-10 h-32 w-32 rounded-[50%] p-2"
                    />
                  </Avatar>
                  <div className="absolute left-[16rem] top-36 h-[18rem] w-[64rem] rounded-md border-2 bg-slate-50">
                    <div className="right-0 flex flex-row items-center justify-center pt-16">
                      <p className="ml-20 text-xl font-semibold">{user?.username}</p>{' '}
                      <Button className="ml-5">Follow</Button>
                    </div>
                    <div>
                      {/* <p>{user?.bio}</p> */}
                      <p className="px-36 py-4 text-center text-lg">
                        Hello 👋, my name is Martin I am a dad, husband, and software engineer 👨👩👧 🐕🦮 💻 I have two
                        Golden Retrievers 🦮🦮 💞 I love to learn and to share what I learn 📚
                      </p>
                    </div>
                    <div className="flex flex-row items-center justify-center">
                      <p className="px-4">Add: Erie, CO</p>
                      <p className="px-4">Joined on: Jul 21, 2019</p>
                      <p className="px-4">Shopee: https://martincartledge.io</p>
                    </div>
                  </div>
                </header>
              </div>
            </div>
          </div>
          <div className="mx-[16rem] flex flex-row">
            <div className="mr-5 w-1/3 rounded-md border-2 bg-slate-50">
              <div className="m-4">
                <div className="flex flex-row p-2">
                  <StickyNoteIcon /> <p className="pl-1">31 posts published</p>
                </div>
                <div className="flex flex-row p-2">
                  <MessageSquareDotIcon />
                  <p className="pl-1">8 comments written</p>
                </div>
                <div className="flex flex-row p-2">
                  <BookHeartIcon />
                  <p className="pl-1">12 tags followed</p>
                </div>
              </div>
            </div>
            <main className="h-full w-full rounded-md border-2 bg-slate-50">haha</main>
          </div>
        </main>
      </div>
    </div>
  )
}
export default ProfileUser
