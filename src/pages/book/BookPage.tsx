import React from 'react'
import { GetManyBooksParams } from 'src/api/books/get-book'
import BookFilterSidebar from 'src/components/book/book-filter-sidebar'
import BookGridLoading from 'src/components/book/book-grid-loading'
import Publishers from 'src/components/book/publisher'
import CarouselAdv from 'src/components/book/carousel-adv'
import Book from 'src/components/landing/card-book'
import MetaData from 'src/components/metadata'

import useGetManyBooks from 'src/hooks/useGetManyBooks'
import SortBook from 'src/components/book/sort-book'
import Pagination from 'src/components/ui/pagination'
import { IBreadcrumb } from 'src/components/breadcrumb/type'
import Breadcrumb from 'src/components/breadcrumb/breadcrumb'
const initBookState: GetManyBooksParams = {
  page: 0,
  perPage: 40,
  authors: undefined,
  genres: undefined,
  reviews: undefined,
  search: undefined,
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
        <div className="col-span-full row-span-full h-full w-full">
          <h3 className="text-center text-slate-300">No result found</h3>
        </div>
      )
    return data?.data.map((book) => {
      return <Book key={book._id} book={book} />
    })
  }, [data?.data, isLoading])

  const totalPage = React.useMemo(() => {
    return data?._pagination?.totalPage || 1
  }, [data?._pagination?.totalPage])

  const totalBook = React.useMemo(() => {
    return data?._pagination?.total || 0
  }, [data?._pagination?.total])

  if (isError) return <div>Something went wrong</div>
  return (
    <div className=" bg-gray-100">
      <div className="mx-auto max-w-7xl sm:px-6">
        <main className="mx-auto min-h-screen w-full">
          <MetaData title="Books" />
          <Breadcrumb items={breadcrumb} className="w-full pt-4" />
          <CarouselAdv />
          <Publishers />
          <div className="mb-8 mt-8 flex w-full gap-2">
            <section key="main.section.sidebar" className="sticky top-0 h-min w-1/5 rounded-md bg-accent">
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
            <div className="ml-8">
              <SortBook />
              <section key="main.section.books" className="grid flex-1 grid-cols-4 gap-5">
                {renderBooks}
                <div className="col-span-full mx-auto w-fit">
                  <Pagination
                    currentPage={bookState.page || 1}
                    totalPage={totalPage}
                    onPageChange={(page) => {
                      setBookState((prev) => ({
                        ...prev,
                        page,
                      }))
                    }}
                    onFirstPage={() => {
                      setBookState(() => ({
                        page: 0,
                      }))
                    }}
                    onPreviousPage={() => {
                      setBookState((prev) => ({
                        ...prev,
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        page: prev.page! - 1,
                      }))
                    }}
                    onNextPage={() => {
                      setBookState((prev) => ({
                        ...prev,
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        page: prev.page! + 1,
                      }))
                    }}
                    onLastPage={() => {
                      setBookState(() => ({
                        page: totalPage - 1,
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
