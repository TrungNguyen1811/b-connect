import { useQueries } from '@tanstack/react-query'
import React, { useMemo } from 'react'
import { useLoaderData } from 'react-router-dom'
import { getBestSellerProductIdByNumberOfBookSold, getBestSellerProductIdByRevenue } from 'src/api/agency/get-agency'
import { GetAllBookInInventoryByAgencyId, GetManyBooksParams } from 'src/api/books/get-book'
import BookFilterSidebar from 'src/components/book/book-filter-sidebar'
import BookGridLoading from 'src/components/book/book-grid-loading'
import Book from 'src/components/landing/card-book'
import MetaData from 'src/components/metadata'
import Pagination from 'src/components/ui/pagination'
import { ScrollArea, ScrollBar } from 'src/components/ui/scroll-area'
import { useCustomQuery } from 'src/hooks/useCustomQuery'
import { IBook, IResponseBook } from 'src/types'
import { IAgency } from 'src/types/agency'

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

const initParamState = {
  PageNumber: 1,
  PageSize: 40,
}

function MyShop() {
  const shop = useLoaderData() as { shop: IAgency }

  const [bookState, setBookState] = React.useState<GetManyBooksParams>(initBookState)
  const { data, isLoading, isError } = useCustomQuery<IResponseBook[]>(
    () => GetAllBookInInventoryByAgencyId(bookState, shop.shop.ownerId as string),
    {
      refetchOnWindowFocus: false,
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
      return <Book key={book.item1.productId} book={book.item1} />
    })
  }, [data?.data, isLoading])

  const TotalPages = useMemo(() => {
    return data?._pagination?.TotalPages || 1
  }, [data?._pagination?.TotalPages])

  const totalBook = useMemo(() => {
    return data?._pagination?.TotalCount || 0
  }, [data?._pagination?.TotalCount])

  const queries = [
    { queryKey: ['topBooks'], queryFn: () => getBestSellerProductIdByNumberOfBookSold(initParamState) },
    { queryKey: ['recommendBooks'], queryFn: () => getBestSellerProductIdByRevenue(initParamState) },
  ]

  const queryResults = useQueries({ queries })

  const isLoadingTopBook = queryResults[0].isLoading
  const isLoadingFeaturedBook = queryResults[1].isLoading
  const dataTopBook: IBook[] = queryResults[0].data as IBook[]
  const dataFeaturedBook = queryResults[1].data

  const renderTopBooks = useMemo(() => {
    if (isLoadingTopBook) return <BookGridLoading pageSize={8} className="carousel-item flex-none p-2 px-0.5 " />

    return dataTopBook?.map((book, index) => (
      <div key={index} className={`carousel-item hover:scale-102 flex-none`}>
        <Book book={book} />
      </div>
    ))
  }, [dataTopBook, isLoadingTopBook])

  const renderFeatureBooks = useMemo(() => {
    if (isLoadingFeaturedBook) return <BookGridLoading pageSize={8} className="col-span-full grid grid-cols-4 gap-4" />

    return dataFeaturedBook?.map((book, index) => (
      <div key={index} className={`carousel-item m-2 flex-none p-4 px-0.5 hover:scale-95`}>
        <Book book={book} />
      </div>
    ))
  }, [dataFeaturedBook, isLoadingFeaturedBook])

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
                  <img
                    src={'https://down-vn.img.susercontent.com/file/sg-11134004-7qvg8-limw3k5iiy5v7e_tn'}
                    alt={shop?.shop.logoImg as string}
                    className="absolute left-[45rem] top-28 z-10 h-28 w-28 rounded-[50%] p-2"
                  />
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
          <div className="mt-8 flex w-[100vw] gap-2 px-32">
            <div className="w-full">
              <p className="text-g text-lg">TOP BOOKS</p>

              <ScrollArea>
                <div className="my-4 flex gap-3">{renderTopBooks}</div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </div>
          <div className="mt-8 flex w-[100vw] gap-2 px-32 pb-8">
            <div className="mt-5 w-full">
              <p className="text-g my-4 text-lg">RECOMMENDED FOR YOU</p>
              <ScrollArea>
                <div className="flex space-x-4 pb-4 pr-4">{renderFeatureBooks}</div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </div>
          <div className="mt-8 flex w-full gap-4 px-32 pb-8">
            <section key="main.section.sidebar" className="sticky top-0 h-min w-1/6 rounded-md bg-accent">
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
            <div className="">
              <section key="main.section.books" className="grid flex-1 grid-cols-5 gap-4">
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
