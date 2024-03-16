import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getInterestedByUserId } from 'src/api/blog/get-blog'
import Interested from 'src/components/blog/category-manage'
import { Button } from 'src/components/ui/button'
import { useAuth } from 'src/hooks/useAuth'
import { ICategory } from 'src/types'

function FollowingCategory() {
  const { user } = useAuth()
  const [categories, setCategories] = useState<ICategory[]>()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const categoriesData = await getInterestedByUserId(user.userId as string)
          setCategories(categoriesData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [user])

  return (
    <div className="mx-28">
      <div className="mb-4 flex flex-col">
        <p className="p-4 text-3xl font-bold">Dashboard {'>>'} Following categories</p>
      </div>
      <div className="mx-4 flex flex-row">
        <nav className="mr-3 w-1/4">
          <Link to={'/blog/dashboard'} className="">
            <div className="flex flex-row items-center rounded-sm px-2 py-1">
              <p className="w-full font-semibold">Post</p>
              <p className="border-1 r-0 m-1 rounded-xl bg-slate-300 px-2">0</p>
            </div>
          </Link>
          <Link to={'/blog/dashboard/following_categories'} className=" ">
            <div className="flex flex-row items-center rounded-sm bg-white px-2 py-1">
              <p className="w-full font-semibold">Following Category</p>
              <p className="border-1 r-0 m-1 rounded-xl bg-slate-300 px-2">0</p>
            </div>
          </Link>
        </nav>
        <div className="h-full w-full">
          {categories ? (
            categories?.map((category, index) => (
              <div className="grid h-full w-full sm:grid-cols-1 sm:gap-1 md:grid-cols-3 md:gap-3" key={index}>
                {category?.cateId && <Interested id={category.cateId} />}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center">
              <img
                className="pb-6 pt-16"
                src="https://media.dev.to/cdn-cgi/image/width=300,height=,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2Fy5767q6brm62skiyywvc.png"
              />
              <p className="text-lg">
                This is where you can manage your categories, but you are not interested in any categories yet.
              </p>
              <Button onClick={() => navigate('/blog/categories')} className="text-md mx-8 my-6 p-6">
                Add more categories which you are interested in
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default FollowingCategory
