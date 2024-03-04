import { Link } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardTitle } from '../ui/card'
import { IBook } from 'src/types'
import { formatPrice } from 'src/lib/utils'
// import { Star } from 'lucide-react'

type Props = { book: IBook }
function Book({ book }: Props) {
  // Hàm để render icon dựa trên giá trị rating
  // const renderRatingIcon = () => {
  //   if (book.reviews && book.reviews.length > 0) {
  //     const totalRating = book.reviews.reduce((sum, review) => sum + (review.rating ?? 0), 0)
  //     const averageRating = Math.round(totalRating / book.reviews.length)

  //     const icons = []

  //     for (let i = 0; i < averageRating; i++) {
  //       icons.push(<Star key={i} size={10} className="mr-1" />)
  //     }

  //     return <div className="flex">{icons}</div>
  //   }

  //   return <div>No reviews yet</div>
  // }

  return (
    <div>
      <Link to={`/books/${book.productId}`} key={book.productId}>
        <Card className="xs:w-[4rem] lg:w-[12rem]">
          <CardTitle className="aspect-[1] flex-col overflow-clip rounded-md p-0 shadow-md transition-all duration-300 group-hover:shadow-xl">
            <img
              src={book.image}
              alt={book.name}
              className="aspect-[1] object-contain transition-all duration-300"
              style={{ width: '100%' }}
            />
          </CardTitle>
          <CardContent className="p-0 lg:p-2 lg:text-lg">
            <strong>{book.name}</strong>
          </CardContent>
          {/* <CardDescription className="p-0 lg:pl-2">{renderRatingIcon()}</CardDescription> */}
          <CardFooter className="flex flex-row place-content-between lg:p-2">
            <p className="text-xs text-red-500 lg:text-base">{formatPrice(book.price)}</p>
          </CardFooter>
        </Card>
      </Link>
    </div>
  )
}

export default Book
