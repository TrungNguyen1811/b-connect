import { PlusIcon } from 'lucide-react'
import React, { useCallback } from 'react'
import { getAllBookOfBookGroupByBookId } from 'src/api/books/get-book'
import BookGridLoading from 'src/components/book/book-grid-loading'
import Book from 'src/components/landing/card-book'
import { Button } from 'src/components/ui/button'
import { useToast } from 'src/components/ui/use-toast'
import { useCustomQuery } from 'src/hooks/useCustomQuery'
import { useOrderCart } from 'src/hooks/useOrderCart'
import { formatPrice } from 'src/lib/utils'
import { IBook } from 'src/types/books'

type Props = {
  book: IBook | null
}

function BookShouldByWith({ book }: Props) {
  const { data: shouldByWithBooks, isLoading: isLoadingShouldBuyWithBooks } = useCustomQuery<IBook[]>(
    () => getAllBookOfBookGroupByBookId(book?.productId as string),
    {
      refetchOnWindowFocus: false,
    },
  )

  const relatedBooks = React.useMemo(() => {
    if (isLoadingShouldBuyWithBooks || !book || !shouldByWithBooks) return []

    const arr = shouldByWithBooks?.data.filter((b) => b.productId !== book?.productId).slice(0, 3) || []
    arr.unshift(book)

    return arr
  }, [book, isLoadingShouldBuyWithBooks, shouldByWithBooks])

  const { toast } = useToast()
  const { addToCart } = useOrderCart()
  const renderShouldByWith = React.useMemo(() => {
    if (isLoadingShouldBuyWithBooks) return <BookGridLoading pageSize={4} />
    return relatedBooks?.map((book) => (
      <>
        <Book book={book} />
        <PlusIcon />
      </>
    ))
  }, [isLoadingShouldBuyWithBooks, relatedBooks])

  const totalShouldBuyWith = React.useMemo(() => {
    if (isLoadingShouldBuyWithBooks) return 0
    return relatedBooks.length || 0
  }, [isLoadingShouldBuyWithBooks, relatedBooks.length])

  const totalPriceShouldBuyWith = React.useMemo(() => {
    if (isLoadingShouldBuyWithBooks) return 0
    return relatedBooks.reduce((acc, book) => acc + book.price, 0)
  }, [isLoadingShouldBuyWithBooks, relatedBooks])

  const addShouldBuyWithToCart = useCallback(() => {
    if (relatedBooks.length === 0) return

    relatedBooks.forEach((book) => {
      addToCart(book.productId as string)
    })

    toast({
      type: 'foreground',
      title: 'Add to cart successfully',
      description: 'Your cart have been updated',
    })
  }, [addToCart, relatedBooks, toast])

  if (!book) return null

  return (
    <div className="flex flex-row items-center gap-4 py-8">
      {renderShouldByWith && renderShouldByWith}
      {relatedBooks.length > 0 && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-md border border-border px-4 py-8">
          <Button variant={'default'} className="" onClick={addShouldBuyWithToCart}>
            <p>Add {totalShouldBuyWith}</p>
          </Button>
          <p className="text-xl font-bold">{formatPrice(totalPriceShouldBuyWith)}</p>
          <p className="text-sm text-gray-500">for {relatedBooks.length} books</p>
        </div>
      )}
    </div>
  )
}

export default BookShouldByWith
