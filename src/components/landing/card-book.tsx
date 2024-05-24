import { Link } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardTitle } from '../ui/card'
import { IBook } from 'src/types'
import { formatPrice } from 'src/lib/utils'
import { useTranslation } from 'react-i18next'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

type Props = { book: IBook }
function Book({ book }: Props) {
  const { t } = useTranslation('translation')

  return (
    <div className="hover:scale-105">
      <Link to={`/books/${book.productId}`} key={book.productId}>
        <Card className="xs:w-[4rem] rounded-sm lg:w-[12rem]">
          <CardTitle className="aspect-[1] flex-col overflow-clip rounded-t-md p-0 shadow-md transition-all duration-300 group-hover:shadow-xl">
            <img
              src={book.backgroundImg as string}
              alt={book.name}
              className="aspect-[1] object-contain transition-all duration-300"
              style={{ width: '100%' }}
            />
          </CardTitle>
          <CardContent className="p-0 lg:p-2 lg:text-lg">
            <p className="h-8 text-sm font-semibold">
              {book.name && book.name.length > 40 ? <p>{book.name.slice(0, 40)}...</p> : book.name}
            </p>
          </CardContent>
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
    </div>
  )
}

export default Book
