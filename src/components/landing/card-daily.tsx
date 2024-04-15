import { Link } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardTitle } from '../ui/card'
import { IBook } from 'src/types'
import { formatPrice } from 'src/lib/utils'
// import { Button } from '../ui/button'

type Props = { book: IBook }

function BookDaily({ book }: Props) {
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
    <Link to={`/books/${book.productId}`} key={book.productId}>
      <Card className="w-[100%] hover:scale-105">
        <CardTitle className="aspect-[1] flex-col overflow-clip rounded-md p-0 shadow-md transition-all duration-300 group-hover:shadow-xl">
          <img
            src={book.bookDir as string}
            alt={book.name}
            className="aspect-[1] object-contain transition-all duration-300"
            style={{ width: '100%' }}
          />
        </CardTitle>
        <CardContent className="h-12 p-0 lg:p-2 lg:text-lg">
          <p className="text-sm font-semibold">
            {book.name.length > 30 ? <p>{book.name && book.name.slice(0, 35)}...</p> : book.name}
          </p>
        </CardContent>
        {/* <CardDescription className="p-0 lg:pl-2">{renderRatingIcon()}</CardDescription> */}
        <CardFooter className="flex flex-row place-content-between lg:p-2">
          <p className="text-xs text-red-500 lg:text-base">{formatPrice(book.price)}</p>
          <p className="lg:text-md text-xss text-gray-500">10k sold</p>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default BookDaily
