import React from 'react'
import { useParams } from 'react-router-dom'

function MyShop() {
  const param = useParams()

  //   const [bookState, setBookState] = React.useState<GetManyBooksParams>(initBookState)
  //   const { data, isLoading, isError } = useGetManyBooks(bookState, {
  //     refetchOnWindowFocus: false,
  //   })

  //   const renderBooks = useMemo(() => {
  //     if (isLoading) return <BookGridLoading pageSize={8} className="col-span-full grid grid-cols-4 gap-4" />
  //     if (!data?.data || data.data.length === 0)
  //       return (
  //         <div className="col-span-full row-span-full h-full w-full">
  //           <h3 className="text-center text-slate-300">No result found</h3>
  //         </div>
  //       )
  //     return data?.data.map((book) => {
  //       return <Book key={book._id} book={book} />
  //     })
  //   }, [data?.data, isLoading])

  //   const totalPage = useMemo(() => {
  //     return data?._pagination?.totalPage || 1
  //   }, [data?._pagination?.totalPage])

  //   const totalBook = useMemo(() => {
  //     return data?._pagination?.total || 0
  //   }, [data?._pagination?.total])

  return (
    <div>
      <div>
        {/* <MetaData title="Shop" /> */}
        <main>
          <div className="">
            <div className="h-[24rem]">
              <div className="h-36 bg-black"></div>
              <div className="">
                {/* <header className="">
                  <Avatar className="">
                    <AvatarImage
                      src={'https://down-vn.img.susercontent.com/file/sg-11134004-7qvg8-limw3k5iiy5v7e_tn'}
                      alt={agency?.logoUrl || ''}
                      className="absolute left-[45rem] top-28 z-10 h-28 w-28 rounded-[50%] p-2"
                    />
                  </Avatar>
                  <div className="absolute left-[16rem] top-44 h-[8rem] w-[63rem] rounded-md border-2 bg-slate-50">
                    <div className="right-0 flex flex-row items-center justify-center pt-8">
                      <p className="ml-8 py-2 text-xl font-semibold">{agency?.agencyName}</p>
                    </div>
                    <div className="flex flex-row items-center justify-evenly">
                      <p className="px-4">Product: {}</p>
                      <p className="px-4">Joined on: {}</p>
                      <p className="px-4">Rating: {}</p>
                    </div>
                  </div>
                </header> */}
              </div>
            </div>
          </div>
          <div className="mb-8 mt-8 flex w-full gap-2">
            <section key="main.section.sidebar" className="sticky top-0 h-min w-1/5 rounded-md bg-accent">
              {/* <BookFilterSidebar
                onFilterChange={(data) => {
                  setBookState((prev) => ({
                    ...prev,
                    ...data,
                  }))
                }}
                totalBooks={totalBook}
              /> */}
            </section>
            <div className="ml-8">
              <section key="main.section.books" className="grid flex-1 grid-cols-4 gap-5">
                {/* {renderBooks} */}
                {/* <div className="col-span-full mx-auto w-fit">
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
                </div> */}
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
export default MyShop
