import { Link } from 'react-router-dom'
import { Card, CardContent } from '../ui/card'
import { ICategory } from 'src/types'
type Props = { category: ICategory }
function Category({ category }: Props) {
  return (
    <Link to={'/'} key={category.categoryId}>
      <Card className="my-0.5 w-[100%]">
        <CardContent className="aspect-[7/7] flex-col overflow-clip rounded-md border border-gray-200 p-0 shadow-md transition-all duration-300 group-hover:shadow-xl">
          <img
            src={
              'data:image/jpeg;base64,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'
            }
            alt={category.name}
            className="aspect-[7/7] object-contain transition-all duration-300 hover:scale-105"
            style={{ width: '95%' }}
          />
        </CardContent>
      </Card>
    </Link>
  )
}

export default Category
