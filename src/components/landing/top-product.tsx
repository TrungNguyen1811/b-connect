import { ChevronRight } from 'lucide-react'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Book from './card-book'
import { Separator } from '../ui/separator'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { GetManyBooksParams } from 'src/api/books/get-book'
import useGetTopBooks from 'src/hooks/useGetTopBook'
import BookGridLoading from '../book/book-grid-loading'

const initBookState: GetManyBooksParams = {
  PageNumber: 1,
  PageSize: 40,
  Name: undefined,
  CategoryIds: undefined,
  MinPrice: undefined,
  MaxPrice: undefined,
  OverRating: undefined,
  Type: undefined,
}

function TopBook() {
  const { data, isLoading, isError } = useGetTopBooks(initBookState, {
    refetchOnWindowFocus: false,
    refetchInterval: 300000,
  })
  const renderBooks = useMemo(() => {
    if (isLoading)
      return (
        <div className="w-full flex-row p-2 px-0.5">
          <BookGridLoading pageSize={6} className="grid grid-cols-6 gap-5" />
        </div>
      )

    return data?.data.map((book, index) => (
      <div key={index} className={`carousel-item flex-none p-2 px-0.5 hover:scale-105`}>
        <Book book={book} />
      </div>
    ))
  }, [data?.data, isLoading])
  // if (isError)
  //   return (
  //     <div>
  //       <img src="../public/error.png" alt="Something went wrong ;v" />
  //       <p>Something went wrong ;v</p>
  //     </div>
  //   )

  return (
    <div className=" bg-orange-100">
      <div className="mx-auto mt-7 max-w-7xl bg-orange-50 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-1 sm:py-2 lg:max-w-none lg:py-4">
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl font-bold  text-orange-500">Top Book</h2>
            <Link to="/top-book" className="flex items-center text-sm  text-orange-500">
              Browse all books
              <span className="ml-1">
                <ChevronRight size={10} />
              </span>
            </Link>
          </div>
          <Separator />
          <div className="relative mt-5">
            <ScrollArea>
              <div className="flex space-x-4 pb-4 pr-4">{renderBooks}</div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TopBook
