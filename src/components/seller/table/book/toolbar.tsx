import { Table } from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'
import { cn } from 'src/lib/utils'
import SearchInput from 'src/components/ui/search-input'
import { IQueryPagination, IQuerySearch } from 'src/types/requests'
import { IBook, ICategory } from 'src/types'
import { TYPE_OPTIONS } from 'src/components/table/user/option'
import { DataTableRadioFacetedFilter } from 'src/components/ui/data-table-radio-facet'
import { getAllCategoryNoParam } from 'src/api/categories/get-category'
import { DataTableFacetedFilter } from 'src/components/ui/data-table-facet'
export interface DataTableToolbarProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>
  queries: Partial<IQueryPagination & IQuerySearch> & Record<string, unknown>
  setSearchQuery?: (value: Partial<IQueryPagination & IQuerySearch> & Record<string, unknown>) => void
}

export function BookTableToolbar({
  table,
  queries,
  setSearchQuery,
  className,
  ...props
}: DataTableToolbarProps<IBook>) {
  interface Options {
    readonly value: string
    readonly label: string
  }
  const [options, setOptions] = useState<Options[]>([])
  useEffect(() => {
    getAllCategoryNoParam().then((category: ICategory[]) => {
      if (category) {
        const validCategories = category.filter((cat) => cat.cateId !== undefined)
        const categoryOptions: Options[] = validCategories.map((cat) => ({
          value: cat.cateName,
          label: cat.cateName,
        }))
        setOptions(categoryOptions)
      }
    })
  }, [])
  return (
    <div className={cn('flex items-center justify-between border-b border-card', className)} {...props}>
      <div className="flex flex-1 items-center space-x-2 px-3 py-1.5">
        <SearchInput
          value={queries.search || ''}
          onChange={(value) => {
            setSearchQuery &&
              setSearchQuery({
                ...queries,
                search: value,
              })
          }}
          className="h-8 max-w-xs"
        />
        {table.getColumn('type') && (
          <DataTableRadioFacetedFilter
            title="Type"
            onOptionsChange={(options) => {
              const type = options.map((option) => option.value)
              setSearchQuery &&
                setSearchQuery({
                  ...queries,
                  type,
                })
            }}
            options={TYPE_OPTIONS}
          />
        )}
        {table.getColumn('category') && (
          <DataTableFacetedFilter
            title="Category"
            onOptionsChange={(options) => {
              const cate = options.map((option) => option.value).join(',')
              setSearchQuery &&
                setSearchQuery({
                  ...queries,
                  cate,
                })
            }}
            options={options}
          />
        )}
      </div>
    </div>
  )
}
