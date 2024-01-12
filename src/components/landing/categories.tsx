import React from 'react'
import { Link } from 'react-router-dom'
import { Separator } from '../ui/separator'
import { useQuery } from '@tanstack/react-query'
import { IResponse } from 'src/types/response'
import { ICategory } from 'src/types'
import { AxiosError } from 'axios'
import { getManyCategories } from 'src/api/caregories/get-category'
import Category from './card-category'
import { ChevronRight } from 'lucide-react'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

function Categories() {
  const { data } = useQuery<IResponse<ICategory[]>, AxiosError>(['FeatureCategory'], () => getManyCategories(), {
    keepPreviousData: true,
  })

  // const renderCategories = React.useMemo(() => {
  //   return data?.data.map((category, index) => (
  //     <div key={index} className={`carousel-item mr-1 flex-none`}>
  //       <Category category={category} />
  //     </div>
  //   ))
  // }, [data?.data])

  const evenCategories = React.useMemo(() => {
    return data?.data.filter((_, index) => index % 2 === 0)
  }, [data?.data])

  const oddCategories = React.useMemo(() => {
    return data?.data.filter((_, index) => index % 2 !== 0)
  }, [data?.data])

  const renderEvenCategories = React.useMemo(() => {
    if (evenCategories != null)
      return evenCategories.map((category, index) => (
        <div key={index}>
          <div className="flex space-x-4 pb-4 pr-4">
            <Category category={category} />
          </div>
        </div>
      ))
    return []
  }, [evenCategories])

  const renderOddCategories = React.useMemo(() => {
    if (oddCategories != null)
      return oddCategories.map((category, index) => (
        <div key={index}>
          <div className="flex space-x-4 pb-4 pr-4">
            <Category category={category} />
          </div>
        </div>
      ))
    return []
  }, [oddCategories])

  return (
    <div className=" bg-gray-100">
      <div className="mx-auto mt-7 max-w-7xl bg-white px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-1 sm:py-2 lg:max-w-none lg:py-4">
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Category</h2>
            <Link to="/" className="flex items-center text-sm text-gray-900">
              Browse all category
              <span className="ml-1">
                <ChevronRight size={10} />
              </span>
            </Link>
          </div>
          <Separator />
          <div className="relative mt-5">
            <ScrollArea>
              <div className="flex flex-wrap pb-4">
                <div className="flex">{renderEvenCategories}</div>
                <div className="flex">{renderOddCategories}</div>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            {/* <div className="carousel-container flex flex-wrap overflow-hidden overflow-x-auto">
              <div className="flex">{renderEvenCategories}</div>
              <div className="flex">{renderOddCategories}</div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categories
