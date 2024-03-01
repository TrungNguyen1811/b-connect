import React, { useState, useEffect } from 'react'
import SearchInput from '../../components/ui/search-input'
import { useAuth } from 'src/hooks/useAuth'
import { getReadingListFaker } from 'src/api/blog/save-reading-list'
import { IBlogg, IReadingList } from 'src/types/blog'
import { getBlogById } from 'src/api/blog/get-blog'
import SavedPostsList from '../../components/blog/list-reading-list'
import { Link } from 'react-router-dom'
import { getCategoryById } from 'src/api/categories/get-category'

function ReadingList() {
  const { user } = useAuth()
  const [savedPosts, setSavedPosts] = useState<IReadingList[]>([])
  const [postDetail, setPostDetail] = useState<IBlogg[]>([])
  const [postDetailFilter, setPostDetailFilter] = useState<IBlogg[]>([])
  //   const [filteredPosts, setFilteredPosts] = useState<string[]>([])
  const [searchKeyword, setSearchKeyword] = useState('')

  useEffect(() => {
    const fetchReadingList = async () => {
      if (user && user.userId) {
        try {
          const readingList = await getReadingListFaker(user.userId)
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
          if (post && post.blog_Id) {
            const blog = await getBlogById(post.blog_Id)
            return blog
          }
          return null
        }),
      )
      const filteredBlogTitles = blogs.filter((blog) => blog !== null) as IBlogg[]
      setPostDetail(filteredBlogTitles)
    }

    fetchBlogDetail()
  }, [savedPosts])

  const handleSearchChange = async (value: string) => {
    setSearchKeyword(value)

    const filteredPosts = postDetail.filter((post) => post.title.toLowerCase().includes(value.toLowerCase()))
    const filteredPostIds = filteredPosts.map((post) => post._id).filter((id) => id !== undefined) as string[]

    // setFilteredPosts(filteredPostIds)

    const newPostDetail: IBlogg[] = []
    await Promise.all(
      filteredPostIds.map(async (id) => {
        const blog = await getBlogById(id)
        newPostDetail.push(blog)
      }),
    )
    setPostDetailFilter(newPostDetail)
  }

  const Interested = () => {
    const { user } = useAuth()
    const [categoryNames, setCategoryNames] = useState<string[]>([])

    useEffect(() => {
      const fetchCategoryNames = async () => {
        const names: string[] = []
        for (const interest of user?.interested || []) {
          for (const category of interest.category_id) {
            const name = await getCategoryById(category.name)
            if (name) {
              names.push(name.name)
            }
          }
        }
        setCategoryNames(names)
      }

      fetchCategoryNames()
    }, [user])

    return (
      <div className="flex flex-col">
        <p className="text-md border-1 mb-4 rounded-sm border bg-slate-50 p-2 font-semibold">My Interest</p>
        <div className="flex max-h-[16rem] flex-col overflow-y-auto">
          <ul className="list-none">
            {categoryNames.map((name) => (
              <li
                className="hover-underline-animation hover:hover-underline-animation w-full rounded-md p-2 text-sm hover:bg-slate-300"
                key={name}
              >
                <Link to={`/reading-list?category=${name}`}>{name}</Link>
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
          <p className="w-full text-3xl font-bold">Reading list</p>
        </section>
        <div className="col-span-1 md:col-span-3">
          <SearchInput value={searchKeyword} onChange={handleSearchChange} />
        </div>

        {/* Phần 3-9 */}
        <div className=" col-span-1 md:col-span-3">
          <Interested />
        </div>
        <section className="border-1 col-span-1 mb-4 rounded-sm border bg-slate-50  md:col-span-9">
          <SavedPostsList posts={searchKeyword ? postDetailFilter : postDetail} />
        </section>
      </main>
    </div>
  )
}

export default ReadingList
