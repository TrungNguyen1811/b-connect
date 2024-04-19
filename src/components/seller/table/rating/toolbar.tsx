import { Table } from '@tanstack/react-table'
import React from 'react'
import { cn } from 'src/lib/utils'
import SearchInput from 'src/components/ui/search-input'
import { IQueryPagination, IQuerySearch } from 'src/types/requests'
import { IListReplyResponse } from 'src/types'
import { BOOLEAN_OPTIONS, RATING_OPTIONS, RECENT_DAYS_OPTIONS } from 'src/components/table/user/option'
import { DataTableRadioFacetedFilter } from 'src/components/ui/data-table-radio-facet'
import { GetManyReviewParams } from 'src/api/review/get-all-review-by-bookId'
export interface DataTableToolbarProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>
  queries: Partial<IQueryPagination & IQuerySearch> & Record<string, unknown> & GetManyReviewParams
  setSearchQuery?: (
    value: Partial<IQueryPagination & IQuerySearch> & Record<string, unknown> & GetManyReviewParams,
  ) => void
  onRecentDaysChange?: (value: string) => void
  onHasRepliedChange?: (value: string) => void
}

export function RatingTableToolbar({
  table,
  queries,
  setSearchQuery,
  onRecentDaysChange,
  onHasRepliedChange,
  className,
  ...props
}: DataTableToolbarProps<IListReplyResponse>) {
  return (
    <div className={cn('flex items-center justify-between border-b border-card', className)} {...props}>
      <div className="flex flex-1 items-center space-x-2 px-3 py-1.5">
        <SearchInput
          value={queries.BookName || ''}
          onChange={(value) => {
            setSearchQuery &&
              setSearchQuery({
                ...queries,
                BookName: value,
              })
          }}
          className="h-8 max-w-xs"
        />

        <DataTableRadioFacetedFilter
          title="ratingPoint"
          onOptionsChange={(options) => {
            const RatingPoint = options.map((option) => option.value).join(',')
            setSearchQuery &&
              setSearchQuery({
                ...queries,
                RatingPoint: RatingPoint,
              })
          }}
          options={RATING_OPTIONS}
        />

        <DataTableRadioFacetedFilter
          title="recentDays"
          onOptionsChange={(options) => {
            const RecentDays = options.map((option) => option.value).join(',')
            setSearchQuery &&
              setSearchQuery({
                ...queries,
                RecentDays: RecentDays,
              })
            onRecentDaysChange && onRecentDaysChange(RecentDays)
          }}
          options={RECENT_DAYS_OPTIONS}
        />

        <DataTableRadioFacetedFilter
          title="HasReplied"
          onOptionsChange={(options) => {
            const HasReplied = options.map((option) => option.value).join(',')
            setSearchQuery &&
              setSearchQuery({
                ...queries,
                HasReplied: HasReplied,
              })
            onHasRepliedChange && onHasRepliedChange(HasReplied)
          }}
          options={BOOLEAN_OPTIONS}
        />
      </div>
    </div>
  )
}
