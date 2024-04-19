import { FormEvent, useEffect, useState } from 'react'
import { ICategory } from 'src/types'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Input } from 'src/components/ui/input'
import { Search } from 'lucide-react'
import { getAllCategory } from 'src/api/categories/get-category'
import TagItem from 'src/components/blog/tags-item'

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
        const categoriesData = await getAllCategory()
        setCategories(categoriesData.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

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
            {categories.map((category, index) => (
              <div key={index}>{category.cateId && <TagItem id={category.cateId} />}</div>
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
