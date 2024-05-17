import { Table } from '@tanstack/react-table'
import React from 'react'
import { cn } from 'src/lib/utils'
import SearchInput from 'src/components/ui/search-input'
import { DataTableFacetedFilter } from 'src/components/ui/data-table-facet'
import { TABLE_USER_ROLE_FACET_OPTIONS } from './option'
import { IQueryPagination, IQuerySearch } from 'src/types/requests'
import { User } from 'src/types/user'
export interface DataTableToolbarProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>
  queries: Partial<IQueryPagination & IQuerySearch> & Record<string, unknown>
  setSearchQuery?: (value: Partial<IQueryPagination & IQuerySearch> & Record<string, unknown>) => void
}

export function UserTableToolbar({ table, queries, setSearchQuery, className, ...props }: DataTableToolbarProps<User>) {
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
        {table.getColumn('role') && (
          <DataTableFacetedFilter
            title="Role"
            onOptionsChange={(options) => {
              const role = options.map((option) => option.value).join(',')
              setSearchQuery &&
                setSearchQuery({
                  ...queries,
                  role,
                })
            }}
            options={TABLE_USER_ROLE_FACET_OPTIONS}
          />
        )}
      </div>
    </div>
  )
}
