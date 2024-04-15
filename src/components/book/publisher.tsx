import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Separator } from '../ui/separator'
import { useQuery } from '@tanstack/react-query'
import { IResponse } from 'src/types/response'
import { User } from 'src/types'
import { AxiosError } from 'axios'
import { ChevronRight } from 'lucide-react'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import Publisher from './card-publisher'
import { getAllUser } from 'src/api/user/get-all-user'
import { API_GET_ALL_USER_QUERY_KEYS } from 'src/api/user/get-all-user.const'
import { IQueryPagination, IQuerySearch } from 'src/types/requests'

function Publishers() {
  const [queries, setQueries] = useState<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Partial<IQueryPagination & IQuerySearch> & { [key: string]: any }
  >({
    page: 0,
    perPage: 10,
  })
  const { data } = useQuery<IResponse<User[]>, AxiosError>(
    [...API_GET_ALL_USER_QUERY_KEYS, queries],
    () => getAllUser(queries),
    {
      keepPreviousData: true,
    },
  )

  const evenPublisher = React.useMemo(() => {
    return data?.data.filter((_, index) => index % 2 === 0)
  }, [data?.data])

  const oddPublisher = React.useMemo(() => {
    return data?.data.filter((_, index) => index % 2 !== 0)
  }, [data?.data])

  const renderEvenPublisher = React.useMemo(() => {
    if (evenPublisher != null)
      return evenPublisher.map((publisher, index) => (
        <div key={index}>
          <div className="flex space-x-4 pb-4 pr-4">
            <Publisher user={publisher} />
          </div>
        </div>
      ))
    return []
  }, [evenPublisher])

  const renderOddPublisher = React.useMemo(() => {
    if (oddPublisher != null)
      return oddPublisher.map((publisher, index) => (
        <div key={index}>
          <div className="flex space-x-4 pb-4 pr-4">
            <Publisher user={publisher} />
          </div>
        </div>
      ))
    return []
  }, [oddPublisher])

  return (
    <div className=" bg-orange-100">
      <div className="mx-auto mt-7 max-w-7xl bg-orange-50 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-1 sm:py-2 lg:max-w-none lg:py-4">
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Publisher</h2>
            <Link to="/" className="flex items-center text-sm text-gray-900">
              Browse all publisher
              <span className="ml-1">
                <ChevronRight size={10} />
              </span>
            </Link>
          </div>
          <Separator />
          <div className="relative mt-5">
            <ScrollArea>
              <div className="flex flex-wrap pb-4">
                <div className="flex">{renderEvenPublisher}</div>
                <div className="flex">{renderOddPublisher}</div>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            {/* <div className="carousel-container flex flex-wrap overflow-hidden overflow-x-auto">
              <div className="flex">{renderEvenPublisher}</div>
              <div className="flex">{renderOddPublisher}</div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Publishers
