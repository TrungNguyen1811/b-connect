import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardTitle } from '../ui/card'
import { IBook } from 'src/types'
import { formatPrice } from 'src/lib/utils'
import { Button } from '../ui/button'

type Props = { book: IBook }
function Book({ book }: Props) {
  const navigate = useNavigate()
  return (
    <div className="hover:scale-105">
      <Link to={`/books/${book.productId}`} key={book.productId}>
        <Card className="xs:w-[4rem] lg:w-[12rem]">
          <CardTitle className="aspect-[1] flex-col overflow-clip rounded-t-md p-0 shadow-md transition-all duration-300 group-hover:shadow-xl">
            <img
              src={
                'https://res.cloudinary.com/dbpvdxzvi/image/upload/v1711622416/Categories/Book/c58owdoqgrqccyi8qkna.jpg'
              }
              alt={book.name}
              className="aspect-[1] object-contain transition-all duration-300"
              style={{ width: '100%' }}
            />
          </CardTitle>
          <CardContent className="p-0 lg:p-2 lg:text-lg">
            <strong>{book.name}</strong>
            <div className="flex flex-row items-center justify-between">
              <strong>{book.stock}</strong>
              <p className="text-xs text-red-500 lg:text-base">{formatPrice(book.price)}</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row place-content-between lg:p-2">
            <Button onClick={() => navigate(`/seller/manage/books/${book.productId}`)}>Update</Button>

            <div></div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  )
}

export default Book
