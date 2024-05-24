import { Link } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardTitle } from '../ui/card'
import { IBook } from 'src/types'
import { formatPrice } from 'src/lib/utils'
import '@smastrom/react-rating/style.css'
import { Rating } from '@smastrom/react-rating'
import { useTranslation } from 'react-i18next'

type Props = { book: IBook }

function BookDaily({ book }: Props) {
  const { t } = useTranslation('translation')

  return (
    <Link to={`/books/${book.productId}`} key={book.productId}>
      <Card className="w-[100%] hover:scale-105">
        <CardTitle className="aspect-[1] flex-col overflow-clip rounded-md p-0 shadow-md transition-all duration-300 group-hover:shadow-xl">
          <img
            src={book.backgroundImg as string}
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
        <CardFooter className="flex flex-row place-content-between px-2">
          <p className="text-xs text-red-500 lg:text-base">{formatPrice(book.price)}</p>
        </CardFooter>
        <div className="my-1 mr-2 flex flex-row items-center justify-between">
          <div className="p-0 lg:pl-2">
            <Rating style={{ maxWidth: 50 }} value={book.rating} readOnly />
          </div>
          <div className="text-xs font-extralight">
            {book.numberOfBookSold} {t('sold')}
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default BookDaily
