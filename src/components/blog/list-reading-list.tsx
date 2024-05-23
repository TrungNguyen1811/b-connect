import React from 'react'
import { IResponsePost } from 'src/types/blog'
import { Avatar, AvatarImage } from '../ui/avatar'
import { format } from 'date-fns'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

const RenderNameUser: React.FC<{ post: IResponsePost }> = ({ post }) => {
  return (
    <div className="p-4 pb-2">
      <div className="w-9/10 flex flex-row items-center">
        <Avatar className="h-8 w-8">
          <AvatarImage src={'https://down-vn.img.susercontent.com/file/sg-11134004-7qvg8-limw3k5iiy5v7e_tn'} />
        </Avatar>
        <div className="my-2 ml-4 flex flex-col items-start">
          <p className="mr-2 text-lg font-bold hover:text-orange-400">{post.postData.title}</p>
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
  const navigate = useNavigate()
  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <Link to={`/blog/${post.postData.postId}`} key={index} className="flex w-full flex-col hover:bg-gray-100">
            {post.postData.userId && <RenderNameUser post={post} />}
          </Link>
        ))
      ) : (
        <div className="w-full">
          <div className="flex w-full flex-col items-center rounded-md border-2 border-gray-400 bg-white">
            <img
              className="w-1/2 pb-6 pt-16"
              src="https://res.cloudinary.com/dbpvdxzvi/image/upload/v1716461939/Books/Image/jut8ong8vnfbb3igoyzs.png"
            />
            <p className="text-lg">
              This is where you can manage your tags, but you are not interested in any categories yet.
            </p>
            <Button onClick={() => navigate('/blog')} className="text-md mx-8 my-6 p-6">
              Add more tags which you are interested in
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SavedPostsList
