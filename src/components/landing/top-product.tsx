import { ChevronRight } from 'lucide-react'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Book from './card-book'
import { Separator } from '../ui/separator'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { GetManyBooksParams } from 'src/api/books/get-book'
import useGetTopBooks from 'src/hooks/useGetTopBook'
import BookGridLoading from '../book/book-grid-loading'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation('translation')
  const renderBooks = useMemo(() => {
    if (isLoading)
      return (
        <div className="w-full flex-row p-2 px-0.5">
          <BookGridLoading pageSize={6} className="grid grid-cols-6 gap-5" />
        </div>
      )

    return data?.data.map((book, index) => (
      <div key={index} className={`carousel-item hover:scale-102 flex-none p-2 px-0.5`}>
        <Book book={book} />
      </div>
    ))
  }, [data?.data, isLoading])
  // if (isError)
  //   return (
  //     <div>
  //       <img src="../public/error.png" alt="Something went wrong " />
  //       <p>Something went wrong </p>
  //     </div>
  //   )

  return (
    <div className=" bg-orange-100">
      <div className="mx-auto mt-7 max-w-7xl bg-orange-50 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-1 sm:py-2 lg:max-w-none lg:py-4">
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl font-bold  text-orange-500">{t('TopBook')}</h2>
            <Link to="/top-book" className="flex items-center text-sm  text-orange-500">
              {t('Browseallcategory')}
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
