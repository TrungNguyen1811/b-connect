import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import React, { useMemo, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { GetAllBookInInventory, GetManyBooksParams } from 'src/api/books/get-book'
import { API_GET_ALL_USER_QUERY_KEYS } from 'src/api/user/get-all-user.const'
import BookFilterSidebar from 'src/components/book/book-filter-sidebar'
import BookGridLoading from 'src/components/book/book-grid-loading'
import MetaData from 'src/components/metadata'
import Book from 'src/components/seller/card-book'
import { Avatar, AvatarImage } from 'src/components/ui/avatar'
import Pagination from 'src/components/ui/pagination'
import useGetSellerBook from 'src/hooks/useGetSellerBook'
import { IAgency } from 'src/types/agency'
import { IBook } from 'src/types/books'
import { IQueryPagination, IQuerySearch } from 'src/types/requests'
import { IResponse } from 'src/types/response'

const initBookState: GetManyBooksParams = {
  PageNumber: 1,
  PageSize: 40,
  Name: undefined,
  CateIds: undefined,
  MinPrice: undefined,
  MaxPrice: undefined,
  OverRating: undefined,
  Type: undefined,
}

function MyShop() {
  const shop = useLoaderData() as { shop: IAgency }

  const [bookState, setBookState] = React.useState<GetManyBooksParams>(initBookState)
  const { data, isLoading, isError } = useGetSellerBook(bookState, {
    refetchOnWindowFocus: false,
  })

  const [queries, setQueries] = useState<Partial<IQueryPagination & IQuerySearch> & { [key: string]: any }>({
    PageNumber: 0,
    PageSize: 6,
  })

  const topBook = useQuery<IResponse<IBook[]>, AxiosError>(
    [...API_GET_ALL_USER_QUERY_KEYS, queries],
    () => GetAllBookInInventory(queries),
    {
      keepPreviousData: true,
    },
  )

  const renderBooks = useMemo(() => {
    if (isLoading)
      return (
        <BookGridLoading pageSize={initBookState.PageSize as number} className="col-span-full grid grid-cols-5 gap-4" />
      )
    if (!data?.data || data.data.length === 0)
      return (
        <div className="col-span-full row-span-full h-full w-full">
          <h3 className="text-center text-slate-300">No result found</h3>
        </div>
      )
    return data?.data.map((book) => {
      return <Book key={book.productId} book={book} />
    })
  }, [data?.data, isLoading])

  const TotalPages = useMemo(() => {
    return data?._pagination?.TotalPages || 1
  }, [data?._pagination?.TotalPages])

  const totalBook = useMemo(() => {
    return data?._pagination?.TotalCount || 0
  }, [data?._pagination?.TotalCount])

  return (
    <div className="bg-accent">
      <div>
        <MetaData title="Shop" />
        <main>
          <div className="">
            <div className="h-[12rem]">
              <div className="h-36 bg-black"></div>
              <div className="">
                <header className="">
                  <Avatar className="">
                    <AvatarImage
                      src={'https://down-vn.img.susercontent.com/file/sg-11134004-7qvg8-limw3k5iiy5v7e_tn'}
                      alt={shop?.shop.logoImg as string}
                      className="absolute left-[45rem] top-28 z-10 h-28 w-28 rounded-[50%] p-2"
                    />
                  </Avatar>
                  <div className="absolute left-[16rem] top-44 h-[8rem] w-[63rem] rounded-md border-2 bg-slate-50">
                    <div className="right-0 flex flex-row items-center justify-center pt-8">
                      <p className="ml-8 py-2 text-xl font-semibold">{shop.shop.agencyName}</p>
                    </div>
                    <div className="flex flex-row items-center justify-evenly">
                      <p className="px-4">Product: {data?.data.length}</p>
                      <p className="px-4">Joined on: {}</p>
                      <p className="px-4">Rating: {}</p>
                    </div>
                  </div>
                </header>
              </div>
            </div>
          </div>
          <div className="mt-8 flex w-full gap-2 px-16 pb-8">
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
            <div className="ml-8 w-full">
              <section key="main.section.books" className="grid flex-1 grid-cols-5 gap-5">
                {renderBooks}
                <div className="col-span-full mx-auto w-fit">
                  <Pagination
                    currentPage={bookState.PageNumber || 1}
                    totalPage={TotalPages}
                    onPageChange={(PageNumber) => {
                      setBookState((prev) => ({
                        ...prev,
                        PageNumber,
                      }))
                    }}
                    onFirstPage={() => {
                      setBookState(() => ({
                        PageNumber: 0,
                      }))
                    }}
                    onPreviousPage={() => {
                      setBookState((prev) => ({
                        ...prev,
                        PageNumber: prev.PageNumber! - 1,
                      }))
                    }}
                    onNextPage={() => {
                      setBookState((prev) => ({
                        ...prev,
                        PageNumber: prev.PageNumber! + 1,
                      }))
                    }}
                    onLastPage={() => {
                      setBookState(() => ({
                        PageNumber: TotalPages - 1,
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
export default MyShop
