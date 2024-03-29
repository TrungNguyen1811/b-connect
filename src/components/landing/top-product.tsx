import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { ChevronRight } from 'lucide-react'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getTopBooks } from 'src/api/books/get-book'
import { IBook } from 'src/types/books'
import { IResponse } from 'src/types/response'
import Book from './card-book'
import { Separator } from '../ui/separator'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

function TopBook() {
  // const { data } = useQuery<IResponse<IBook[]>, AxiosError>(
  //   ['Top'],
  //   () =>
  //     getManyBooks({
  //       genres: 'popular',
  //     }),
  //   {
  //     keepPreviousData: true,
  //   },
  // )

  const { data } = useQuery<IResponse<IBook[]>, AxiosError>(['Top'], () => getTopBooks(), {
    keepPreviousData: true,
  })
  console.log(data?.data)

  const renderBooks = useMemo(() => {
    return data?.data.map((book, index) => (
      <div key={index} className={`carousel-item flex-none p-2 px-0.5 hover:scale-105`}>
        <Book book={book} />
      </div>
    ))
  }, [data?.data])
  return (
    <div className=" bg-zinc-100">
      <div className="mx-auto mt-7 max-w-7xl bg-white px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-1 sm:py-2 lg:max-w-none lg:py-4">
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Top Book</h2>
            <Link to="/" className="flex items-center text-sm text-gray-900">
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
