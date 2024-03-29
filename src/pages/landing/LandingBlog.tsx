// import Post from 'src/components/blog/post'
import { useMemo, useState } from 'react'
import { GetManyPostsParams } from 'src/api/blog/get-blog'
import PostGridLoading from 'src/components/blog/loading-post'
import Post from 'src/components/blog/post'
import { Active } from 'src/components/landing-blog/active'
import { Menu } from 'src/components/landing-blog/menu'
import { useAuth } from 'src/hooks/useAuth'
import useGetManyPosts from 'src/hooks/useGetManyPosts'

const initPostState: GetManyPostsParams = {
  PageNumber: 0,
  PageSize: 40,
  category: undefined,
}

export default function LandingBlog() {
  const { user } = useAuth()
  const [blogs, setBlogs] = useState<GetManyPostsParams>(initPostState)

  const { data, isLoading, isError } = useGetManyPosts(blogs)
  console.log('blogs', data)

  const renderPosts = useMemo(() => {
    if (isLoading) return <PostGridLoading pageSize={8} className="h-96 " />
    if (!data || data.length === 0)
      return (
        <div className="col-span-full row-span-full h-full w-full">
          <h3 className="text-center text-slate-300">No result found</h3>
        </div>
      )
    return data?.map((post) => {
      return <Post key={post.postData.postId} postId={post.postData.postId!} />
    })
  }, [data, isLoading])
  if (isError) return <div>Something went wrong</div>

  // useEffect(() => {
  //   const getAllBlogFollowOnCategory = async () => {
  //     const allBlogData = await getAllPosts()

  //     if (!user?.interested) {
  //       setBlogs(allBlogData)
  //       return
  //     }

  //     const filteredBlogs = allBlogData.data.filter((blog) => {
  //       return user?.interested?.every((interest) => {
  //         return blog.category.some((cat) => interest.category_id.some((category) => category._id === cat._id))
  //       })
  //     })

  //     setBlogs({ data: filteredBlogs })
  //   }

  //   getAllBlogFollowOnCategory()
  // }, [user])

  // if (!blogs) {
  //   return <div>Loading...</div>
  // }
  if (!blogs) return <PostGridLoading pageSize={8} className="col-span-full grid grid-cols-4 gap-4" />

  return (
    <div className="mx-24 px-4 py-2">
      <div className="grid grid-cols-12 gap-4 pt-2">
        <div className="col-span-2 bg-zinc-100">
          <Menu />
        </div>
        <div className="col-span-7">
          {renderPosts}
          {/* {blogs.data.map((blog, index) => (
            <div className="my-4" key={index}>
              {blog?._id && <Post id={blog._id} />}
            </div>
          ))} */}
        </div>
        <div className="col-span-3 bg-zinc-100">
          <Active />
        </div>
      </div>
    </div>
  )
}
