import { FormEvent, useEffect, useState } from 'react'
import { ICategory } from 'src/types'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Input } from 'src/components/ui/input'
import { Search } from 'lucide-react'
import { getAllCategoryNoParam } from 'src/api/categories/get-category'
import TagItem from 'src/components/blog/tags-item'
import { useAuth } from 'src/hooks/useAuth'
import { IResponseTag } from 'src/types/blog'
import { getUserTargetedTags } from 'src/api/blog/get-blog'

function TagList() {
  const [categories, setCategories] = useState<ICategory[]>()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setSearchParams({ q: searchQuery })
    navigate(`/blog/tags?q=${encodeURIComponent(searchQuery)}`)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getAllCategoryNoParam()
        setCategories(categoriesData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const { user } = useAuth()
  const [myTags, setMyTags] = useState<IResponseTag[]>([])

  useEffect(() => {
    const fetchCategoryNames = async () => {
      const tags = await getUserTargetedTags()
      if (tags) {
        setMyTags(tags)
      }
    }

    fetchCategoryNames()
  }, [user])

  const userTagIds = new Set(myTags.map((tag) => tag.cateId))
  const filteredCategories = categories?.filter((category) => !userTagIds.has(category.cateId as string))

  return (
    <div className="mx-28">
      <div className="mb-4 flex flex-row items-center justify-between">
        <p className="p-4 text-3xl font-bold">Categories</p>
        <div className="relative">
          <form onSubmit={handleSubmit}>
            <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </form>
        </div>
      </div>
      <div className="h-full w-full pb-8">
        {categories ? (
          <div className="mx-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
            {myTags.map((tag) => (
              <TagItem key={tag.cateId} id={tag.cateId} name={tag.cateName} />
            ))}
            {filteredCategories?.map((category, index) => (
              <div key={index}>{category.cateId && <TagItem id={category.cateId} name={category.cateName} />}</div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <img
              className="pb-6 pt-16"
              src="https://media.dev.to/cdn-cgi/image/width=300,height=,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2Fy5767q6brm62skiyywvc.png"
              alt="Error"
            />
            <p className="text-lg">Something Wrong ;v</p>
          </div>
        )}
      </div>
    </div>
  )
}
export default TagList
