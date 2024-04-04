import { Table } from '@tanstack/react-table'
import React from 'react'
import { cn } from 'src/lib/utils'
import SearchInput from 'src/components/ui/search-input'
import { IQueryPagination, IQuerySearch } from 'src/types/requests'
import { IBook } from 'src/types'
export interface DataTableToolbarProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>
  queries: Partial<IQueryPagination & IQuerySearch> & Record<string, unknown>
  setSearchQuery?: (value: Partial<IQueryPagination & IQuerySearch> & Record<string, unknown>) => void
}

export function BookGroupTableToolbar({
  table,
  queries,
  setSearchQuery,
  className,
  ...props
}: DataTableToolbarProps<IBook>) {
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
                // bookGroupId: value,
              })
          }}
          className="h-8 max-w-xs"
        />
      </div>
    </div>
  )
}
