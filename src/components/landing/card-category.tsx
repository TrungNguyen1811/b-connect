import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '../ui/card'
import { ICategory } from 'src/types'
import { useCallback } from 'react'
type Props = { category: ICategory }
function Category({ category }: Props) {
  const navigate = useNavigate()

  const onSubmit = useCallback(
    (id: string) => {
      navigate(`/books?CategoryIds=${id}`)
    },
    [navigate],
  )
  return (
    <button onClick={() => onSubmit(category.cateId as string)}>
      {/* <Link to={`/books?CategoryIds=${category.cateId}`} key={category.cateId}> */}
      <Card className=" w-[100%]">
        <CardContent className="aspect-[7/7] flex-col overflow-clip rounded-md border border-gray-200 p-0 shadow-md transition-all duration-300 group-hover:shadow-xl">
          <img
            src={category.imageDir as string}
            alt={category.cateName}
            className="aspect-[7/7] object-contain transition-all duration-300 hover:scale-105"
            style={{ width: '8vw' }}
          />
        </CardContent>
      </Card>
      {/* </Link> */}
    </button>
  )
}

export default Category
