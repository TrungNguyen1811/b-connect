import React from 'react'
import { Link } from 'react-router-dom'
import { Separator } from '../ui/separator'
import { useQuery } from '@tanstack/react-query'
import { IResponse } from 'src/types/response'
import { ICategory } from 'src/types'
import { AxiosError } from 'axios'
import { getAllCategory } from 'src/api/categories/get-category'
import Category from './card-category'
import { ChevronRight } from 'lucide-react'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

function Categories() {
  const { data } = useQuery<IResponse<ICategory[]>, AxiosError>(['FeatureCategory'], () => getAllCategory(), {
    keepPreviousData: true,
  })

  const renderCategories = (categories: ICategory[]) => {
    return categories.map((category, index) => (
      <div key={index} className="carousel-item flex-none lg:space-x-4 lg:pb-4 lg:pr-4">
        <Category category={category} />
      </div>
    ))
  }

  const splitCategoriesIntoRows = (categories: ICategory[]) => {
    const rows = []
    const firstRow = categories.slice(0, 10)
    const secondRow = categories.slice(10, 20)
    rows.push(firstRow)
    rows.push(secondRow)
    return rows
  }

  return (
    <div className="bg-orange-100">
      <div className="mx-auto mt-7 max-w-7xl bg-orange-50 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-1 sm:py-2 lg:max-w-none lg:py-4">
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl font-bold  text-orange-500">Category</h2>
            <Link to="/" className="flex items-center text-sm  text-orange-500">
              Browse all category
              <span className="ml-1">
                <ChevronRight size={10} />
              </span>
            </Link>
          </div>
          <Separator />
          <div className="relative mt-5">
            <ScrollArea>
              <div className="flex flex-col lg:pb-4">
                {data &&
                  splitCategoriesIntoRows(data.data).map((row, rowIndex) => (
                    <div key={rowIndex} className="flex lg:pb-4">
                      {renderCategories(row)}
                    </div>
                  ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categories
