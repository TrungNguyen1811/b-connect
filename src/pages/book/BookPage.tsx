import React from 'react'
import BookGridLoading from 'src/components/book/book-grid-loading'
import Publishers from 'src/components/book/publisher'
import CarouselAdv from 'src/components/book/carousel-adv'
import Book from 'src/components/landing/card-book'
import MetaData from 'src/components/metadata'

import useGetManyBooks from 'src/hooks/useGetManyBooks'
import SortBook from 'src/components/book/sort-book'
import { IBreadcrumb } from 'src/components/breadcrumb/type'
import Breadcrumb from 'src/components/breadcrumb/breadcrumb'
import Pagination from 'src/components/ui/pagination'
import BookFilterSidebar from 'src/components/book/book-filter-sidebar'
import { GetManyBooksParams } from 'src/api/books/get-book'
import ErrorPage from '../error-page'

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
function BookPage() {
  const breadcrumb = React.useMemo<IBreadcrumb[]>(() => {
    return [
      {
        label: 'Home',
        key: 'home',
        href: '/',
        icon: 'home',
      },
      {
        key: 'books',
        label: 'Books',
        href: '/books',
        icon: 'book',
      },
    ]
  }, [])

  const [bookState, setBookState] = React.useState<GetManyBooksParams>(initBookState)
  const { data, isLoading, isError } = useGetManyBooks(bookState, {
    refetchOnWindowFocus: false,
  })

  const renderBooks = React.useMemo(() => {
    if (isLoading) return <BookGridLoading pageSize={8} className="col-span-full grid grid-cols-4 gap-4" />
    if (!data?.data || data.data.length === 0)
      return (
        <div className="col-span-full row-span-full  w-full">
          <h3 className="h-96 pt-48 text-center text-slate-300">No result found</h3>
        </div>
      )
    return data?.data.map((book) => {
      return <Book key={book.productId} book={book} />
    })
  }, [data?.data, isLoading])

  const totalPage = React.useMemo(() => {
    return data?._pagination?.TotalPages || 1
  }, [data?._pagination?.TotalPages])

  const totalBook = React.useMemo(() => {
    return data?._pagination?.TotalCount || 0
  }, [data?._pagination?.TotalCount])

  if (isError) return <ErrorPage />
  return (
    <div className=" bg-orange-100">
      <div className="mx-auto max-w-7xl sm:px-4">
        <main className="mx-auto min-h-screen w-full">
          <MetaData title="Books" />
          <Breadcrumb items={breadcrumb} className="w-full pt-4" />
          <CarouselAdv />
          <Publishers />
          <div className="mt-8 flex w-full gap-2 pb-8">
            <section key="main.section.sidebar" className="sticky top-28 h-min w-1/6 rounded-md bg-orange-100">
              <BookFilterSidebar
                onFilterChange={(data) => {
                  setBookState((prev) => ({
                    ...prev,
                    ...data,
                  }))
                }}
                totalBooks={totalBook}
              />
            </section>
            <div className="ml-4">
              <SortBook />
              <section key="main.section.books" className="ml-4 grid flex-1 grid-cols-5 gap-2">
                {renderBooks}
                <div className="col-span-full mx-auto w-fit">
                  <Pagination
                    currentPage={bookState.PageNumber || 1}
                    totalPage={totalPage}
                    onPageChange={(PageNumber) => {
                      setBookState((prev) => ({
                        ...prev,
                        PageNumber,
                      }))
                    }}
                    onFirstPage={() => {
                      setBookState((prev) => ({
                        ...prev,
                        PageNumber: 1,
                      }))
                    }}
                    onPreviousPage={() => {
                      setBookState((prev) => ({
                        ...prev,
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        PageNumber: prev.PageNumber! - 1,
                      }))
                    }}
                    onNextPage={() => {
                      setBookState((prev) => ({
                        ...prev,
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        PageNumber: prev.PageNumber! + 1,
                      }))
                    }}
                    onLastPage={() => {
                      setBookState((prev) => ({
                        ...prev,
                        PageNumber: totalPage,
                      }))
                    }}
                  />
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
export default BookPage
