// import Post from 'src/components/blog/post'
import { Active } from 'src/components/landing-blog/active'
import { Menu } from 'src/components/landing-blog/menu'

export default function LandingBlog() {
  // const { user } = useAuth()
  // const [blogs, setBlogs] = useState<IResponse<IBlogg[]> | null>(null)

  // useEffect(() => {
  //   const getAllBlogFollowOnCategory = async () => {
  //     const allBlogData = await getManyBlogBooks()

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

  return (
    <div className="mx-24 px-4 py-2">
      <div className="grid grid-cols-12 gap-4 pt-2">
        <div className="col-span-2 bg-gray-200">
          <Menu />
        </div>
        <div className="col-span-7">
          {/* {blogs.data.map((blog, index) => (
            <div className="my-4" key={index}>
              {blog?._id && <Post id={blog._id} />}
            </div>
          ))} */}
        </div>
        <div className="col-span-3 bg-gray-200">
          <Active />
        </div>
      </div>
    </div>
  )
}
