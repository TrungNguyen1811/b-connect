import { PlusIcon } from 'lucide-react'
import React from 'react'
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

  const renderBookRelevant = React.useMemo(() => {
    if (isLoading || !Array.isArray(data)) return <BookGridLoading pageSize={4} />
    return data.map((book) => (
      <React.Fragment key={book.bookId}>
        <CardBook book={book} />
        <PlusIcon />
      </React.Fragment>
    ))
  }, [isLoading, data])

  if (!book) return null

  return <div className="grid grid-cols-10 place-items-center py-4">{renderBookRelevant}</div>
}

export default BookRelevant
