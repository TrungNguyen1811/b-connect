import { useMemo, useState } from 'react'
import { GetManyBooksParams } from 'src/api/books/get-book'
import BookGridLoading from 'src/components/book/book-grid-loading'
import Book from 'src/components/landing/card-book'
import MetaData from 'src/components/metadata'
import Pagination from 'src/components/ui/pagination'
import { Separator } from 'src/components/ui/separator'
import useGetTopBooks from 'src/hooks/useGetTopBook'
const initBookState: GetManyBooksParams = {
  PageNumber: 1,
  PageSize: 36,
}

function TopBookPage() {
  const [bookState, setBookState] = useState<GetManyBooksParams>(initBookState)

  const { data, isLoading, isError } = useGetTopBooks(bookState, {
    refetchOnWindowFocus: false,
  })

  const renderBooks = useMemo(() => {
    if (isLoading) return <BookGridLoading pageSize={36} className="col-span-full grid grid-cols-6 gap-4" />
    if (!data?.data || data.data.length === 0)
      return (
        <div className="col-span-full row-span-full w-full">
          <h3 className="h-96 pt-48 text-center text-slate-300">No result found</h3>
        </div>
      )
    return data?.data.map((book) => {
      return <Book key={book.productId} book={book} />
    })
  }, [data?.data, isLoading])

  const totalPage = useMemo(() => {
    return data?._pagination?.TotalPages || 1
  }, [data?._pagination?.TotalPages])

  const totalBook = useMemo(() => {
    return data?._pagination?.TotalCount || 0
  }, [data?._pagination?.TotalCount])

  // if (isError) return <ErrorPage />
  return (
    <div>
      <MetaData title="Books" />
      <div className="relative flex flex-col  bg-orange-100">
        <p className="self-center p-5 text-2xl font-bold text-orange-600">TOP BOOK</p>
        <Separator />
        <div className="w-full">
          <div className="mx-auto max-w-7xl sm:px-6">
            <main className="mx-auto min-h-screen w-full">
              <div className="mt-8 flex w-full gap-2 pb-8">
                <div className="ml-8 w-full">
                  <section key="main.section.books" className="ml-4 grid flex-1 grid-cols-6 gap-4">
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
      </div>
    </div>
  )
}
export default TopBookPage
