import React, { useState, useEffect } from 'react'
import { getUserById } from 'src/api/user/get-user'
import { IBlogg } from 'src/types/blog'
import { User } from 'src/types/user'
import { Avatar, AvatarImage } from '../ui/avatar'

const RenderNameUser: React.FC<{ id: string; post: IBlogg }> = ({ id, post }) => {
  const [users, setUsers] = useState<User>()

  useEffect(() => {
    const fetchUsers = async () => {
      const user = await getUserById(id)
      setUsers(user)
    }
    fetchUsers()
  }, [id])

  return (
    <div className="p-4 pb-2">
      <div className="w-9/10 flex flex-col">
        <div>{users?.avatar}</div>
        <div className="my-2 ml-4 flex flex-row items-center">
          <p className="mr-2 text-lg font-bold">{post.title}</p>
          <p className="text-sm font-light">{post.date}</p>
        </div>
        <div>
          <Avatar>
            <AvatarImage />
          </Avatar>
        </div>
      </div>
    </div>
  )
}

const SavedPostsList: React.FC<{ posts: IBlogg[] }> = ({ posts }) => {
  return (
    <div>
      {posts.map((post, index) => (
        <div key={index} className="flex w-full flex-col">
          {post.userId && <RenderNameUser id={post.userId} post={post} />}
        </div>
      ))}
    </div>
  )
}

export default SavedPostsList
