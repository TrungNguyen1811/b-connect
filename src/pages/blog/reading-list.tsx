import React, { useState, useEffect } from 'react'
import SearchInput from '../../components/ui/search-input'
import { useAuth } from 'src/hooks/useAuth'
import { IResponsePost, IResponseTag } from 'src/types/blog'
import { getPostByIdApi, getUserSavedPosts, getUserTargetedTags } from 'src/api/blog/get-blog'
import SavedPostsList from '../../components/blog/list-reading-list'
import { Link } from 'react-router-dom'

function ReadingList() {
  const { user } = useAuth()
  const [savedPosts, setSavedPosts] = useState<IResponsePost[]>([])
  const [postDetail, setPostDetail] = useState<IResponsePost[]>([])
  const [postDetailFilter, setPostDetailFilter] = useState<IResponsePost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<string[]>([])
  const [searchKeyword, setSearchKeyword] = useState('')

  useEffect(() => {
    const fetchReadingList = async () => {
      if (user && user.userId) {
        try {
          const readingList = await getUserSavedPosts()
          setSavedPosts(readingList)
        } catch (error) {
          console.error('Error fetching reading list:', error)
        }
      }
    }

    fetchReadingList()
  }, [user])

  useEffect(() => {
    const fetchBlogDetail = async () => {
      const blogs = await Promise.all(
        savedPosts.map(async (post) => {
          if (post && post.postData.postId) {
            const blog = await getPostByIdApi(post.postData.postId)
            return blog
          }
          return null
        }),
      )
      const filteredBlogTitles = blogs.filter((blog) => blog !== null) as IResponsePost[]
      setPostDetail(filteredBlogTitles)
    }

    fetchBlogDetail()
  }, [savedPosts])

  const handleSearchChange = async (value: string) => {
    setSearchKeyword(value)

    const filteredPosts = postDetail.filter((post) => post.postData.title?.toLowerCase().includes(value.toLowerCase()))
    const filteredPostIds = filteredPosts
      .map((post) => post.postData.postId)
      .filter((id) => id !== undefined) as string[]

    setFilteredPosts(filteredPostIds)

    const newPostDetail: IResponsePost[] = []
    await Promise.all(
      filteredPostIds.map(async (id) => {
        const blog = await getPostByIdApi(id)
        newPostDetail.push(blog)
      }),
    )
    setPostDetailFilter(newPostDetail)
  }

  const Tags = () => {
    const { user } = useAuth()
    const [tags, setTags] = useState<IResponseTag[]>([])

    useEffect(() => {
      const fetchCategoryNames = async () => {
        const tags = await getUserTargetedTags()
        if (tags) {
          setTags(tags)
        }
      }

      fetchCategoryNames()
    }, [user])

    return (
      <div className="flex min-h-[37rem] flex-col">
        <p className="text-md border-1 mb-4 rounded-sm border bg-orange-100 p-2 font-semibold">My Tags</p>
        <div className="flex max-h-[16rem] flex-col overflow-y-auto">
          <ul className="list-none">
            {tags.map((tag) => (
              <li
                className="hover-underline-animation hover:hover-underline-animation w-full rounded-md p-2 text-sm hover:bg-orange-300"
                key={tag.cateId}
              >
                <Link to={`/reading-list?category=${tag.cateId}`}>{tag.cateName}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
  return (
    <div>
      <main id="main-content" className="mx-36 grid grid-cols-1 gap-4 p-4 md:grid-cols-12">
        {/* Phần 9-3 */}
        <section className=" crayons-card col-span-1 md:col-span-9">
          <p className="w-full text-3xl font-bold">Reading list ({savedPosts.length})</p>
        </section>
        <div className="col-span-1 md:col-span-3">
          <SearchInput value={searchKeyword} onChange={handleSearchChange} />
        </div>

        {/* Phần 3-9 */}
        <div className=" col-span-1 md:col-span-3">
          <Tags />
        </div>
        <section className="border-1 col-span-1 mb-4 rounded-sm border bg-orange-100  md:col-span-9">
          <SavedPostsList posts={searchKeyword ? postDetailFilter : postDetail} />
        </section>
      </main>
    </div>
  )
}

export default ReadingList
