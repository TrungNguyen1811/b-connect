import React from 'react'
import { IResponsePost } from 'src/types/blog'
import { Avatar, AvatarImage } from '../ui/avatar'
import { format } from 'date-fns'

const RenderNameUser: React.FC<{ post: IResponsePost }> = ({ post }) => {
  return (
    <div className="p-4 pb-2">
      <div className="w-9/10 flex flex-row items-center">
        <Avatar className="h-8 w-8">
          <AvatarImage src={'https://down-vn.img.susercontent.com/file/sg-11134004-7qvg8-limw3k5iiy5v7e_tn'} />
        </Avatar>
        <div className="my-2 ml-4 flex flex-col items-start">
          <p className="mr-2 text-lg font-bold">{post.postData.title}</p>
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
      </div>
    </div>
  )
}

const SavedPostsList: React.FC<{ posts: IResponsePost[] }> = ({ posts }) => {
  return (
    <div>
      {posts.map((post, index) => (
        <div key={index} className="flex w-full flex-col">
          {post.postData.userId && <RenderNameUser post={post} />}
        </div>
      ))}
    </div>
  )
}

export default SavedPostsList
