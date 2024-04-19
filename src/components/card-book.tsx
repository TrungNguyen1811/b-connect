import { Link } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardTitle } from './ui/card'
import { formatPrice } from 'src/lib/utils'
import { IRelevantBooks } from 'src/types/advertisement'
// import { Star } from 'lucide-react'

type Props = { book: IRelevantBooks }
function CardBook({ book }: Props) {
  //   const renderRatingIcon = () => {
  //     if (book.ratingId && book.rating) {
  //       const icons = []
  //       for (let i = 0; i < book.rating; i++) {
  //         icons.push(<Star key={i} size={10} className="mr-1" />)
  //       }
  //       console.log('icons', icons)

  //       return <div className="flex">{icons}</div>
  //     }

  //     return null
  //   }

  return (
    <div className="hover:scale-105">
      <Link to={`/books/${book.bookId}`} key={book.bookId}>
        <Card className="xs:w-[4rem] rounded-sm lg:w-[12rem]">
          <CardTitle className="aspect-[1] flex-col overflow-clip rounded-t-md p-0 shadow-md transition-all duration-300 group-hover:shadow-xl">
            <img
              src={book.imageDir}
              alt={book.title}
              className="aspect-[1] object-contain transition-all duration-300"
              style={{ width: '100%' }}
            />
          </CardTitle>
          <CardContent className="p-0 lg:p-2 lg:text-lg">
            <p className="h-8 text-sm font-semibold">
              {book.title && book.title.length > 40 ? <p>{book.title.slice(0, 40)}...</p> : book.title}
            </p>
          </CardContent>
          <CardFooter className="flex flex-row place-content-between px-2">
            <p className="text-xs text-red-500 lg:text-base">{formatPrice(book.price)}</p>
          </CardFooter>
          <div className="my-1 flex flex-row items-center justify-between px-4">
            {/* <div className="p-0 lg:pl-2">{renderRatingIcon()}</div> */}
            <div className="text-xs font-extralight">{book.rating}</div>
          </div>
        </Card>
      </Link>
    </div>
  )
}

export default CardBook
