import React, { useState } from 'react'
import MetaData from '../metadata'
import { getManyBooks } from 'src/api/books/get-book'
import { useQuery } from '@tanstack/react-query'
import { IResponse } from 'src/types/response'
import { IBook } from 'src/types/books'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import BookDaily from './card-daily'
import { Button } from '../ui/button'

function DailyDiscover() {
  const navigate = useNavigate()

  const { data } = useQuery<IResponse<IBook[]>, AxiosError>(
    ['getManyBooks'], // Provide a unique key for this query
    () => getManyBooks(), // Pass an empty object as the argument
    {
      keepPreviousData: true,
    },
  )

  const [displayedBooks, setDisplayedBooks] = useState(40)

  const handleSeeMoreClick = () => {
    if (displayedBooks > 50) {
      navigate('/daily_discover?pageNumber=2')
    }
    setDisplayedBooks((prevCount) => prevCount + 10)
  }

  const renderBooks = React.useMemo(() => {
    if (!data?.data || data.data.length === 0) {
      return (
        <div className="col-span-full row-span-full h-full w-full">
          <h3 className="text-center text-slate-300">No result found</h3>
        </div>
      )
    }

    return data?.data.slice(0, displayedBooks).map((book) => (
      <div key={book.productId}>
        <BookDaily book={book} />
      </div>
    ))
  }, [data?.data, displayedBooks])

  return (
    <main className="mx-auto mt-7 min-h-screen w-full">
      <MetaData title="Books" />
      <div className="mx-auto max-w-7xl bg-white px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-1 sm:py-2 lg:max-w-none lg:py-4">
          <div className="sticky pb-7 text-center">
            <h2 className="text-2xl text-red-600">DAILY DISCOVER</h2>
          </div>
          <div className="mb-8 flex w-full gap-2">
            <section key="main.section.books" className="grid flex-1 grid-cols-5 gap-5">
              {renderBooks}
            </section>
          </div>
          {data?.data && data.data.length > displayedBooks && (
            <div className="text-center">
              <Button onClick={handleSeeMoreClick}>See More</Button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default DailyDiscover
