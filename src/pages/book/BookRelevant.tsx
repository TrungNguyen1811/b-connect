import React, { useEffect, useState } from 'react'
import { getRelevantBooks } from 'src/api/advertisement/get-top-banner'
import BookGridLoading from 'src/components/book/book-grid-loading'
import CardBook from 'src/components/card-book'
import { useCustomQueryDetail } from 'src/hooks/useCustomQueryDetail'
import { IRelevantBooks } from 'src/types/advertisement'
import { IBook } from 'src/types/books'

type Props = {
  book: IBook | null
}

function BookRelevant({ book }: Props) {
  const { data, isLoading } = useCustomQueryDetail<IRelevantBooks[]>(
    () => getRelevantBooks(book?.productId as string),
    {
      refetchOnWindowFocus: false,
    },
  )

  const [datas, setData] = useState<IRelevantBooks[]>()
  useEffect(() => {
    const a = async () => {
      const b = (await getRelevantBooks(book?.productId as string)) as IRelevantBooks[]
      setData(b)
    }
    a()
  }, [book?.productId])
  console.log('datas', datas)

  const renderBookRelevant = React.useMemo(() => {
    if (isLoading || !Array.isArray(datas)) return <BookGridLoading pageSize={4} />
    return datas.map((book) => (
      <React.Fragment key={book.bookId}>
        <CardBook book={book} />
      </React.Fragment>
    ))
  }, [isLoading, datas])

  if (!book) return null

  return <div className="grid grid-cols-4 gap-4 py-4">{renderBookRelevant}</div>
}

export default BookRelevant
