import { Button } from 'src/components/ui/button'
import { DataTable } from 'src/components/ui/data-table'
import React, { useEffect, useMemo, useState } from 'react'
import Pagination from 'src/components/ui/pagination'
import TableSizeSelector from 'src/components/ui/table-size-selector'
import { Skeleton } from 'src/components/ui/skeleton'
import { columns } from './column'
import { RatingTableToolbar } from './toolbar'
import { useOrderTable } from './useOrderTable'

function OrderTable() {
  const { isError, isLoading, table, error, refetch, data, tableStates, setTableStates, queries, setQueries } =
    useOrderTable(columns)
  const [startDate, setStartDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()
  const [search, setSearch] = useState<string>()
  const [label, setLabel] = useState<string>('')

  const handleLabelChange = (value: string) => {
    setLabel(value)
  }
  const handleSearchChange = (value: string) => {
    setSearch(value)
  }
  const handleStartDateChange = (value: string) => {
    setStartDate(value)
  }

  const handleEndDateChange = (value: string) => {
    setEndDate(value)
  }

  useEffect(() => {
    setTableStates((prev) => ({
      ...prev,
      startDate: startDate,
      endDate: endDate,
      [label]: search,
    }))
  }, [startDate, setTableStates, endDate, label, search])

  console.log('quee', queries)

  const renderHeader = useMemo(() => {
    return (
      <div>
        <RatingTableToolbar
          table={table}
          queries={{
            PageNumber: tableStates.pagination.pageIndex + 1,
            PageSize: tableStates.pagination.pageSize,
            // OrderId: tableStates.globalFilter,
            ...queries,
          }}
          setSearchQuery={(value) => {
            setQueries(value)
          }}
          onSearchChange={handleSearchChange}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
          onSetLabelChange={handleLabelChange}
        />
      </div>
    )
  }, [queries, table, tableStates.pagination.pageIndex, tableStates.pagination.pageSize])

  const renderFooter = React.useMemo(() => {
    if (isLoading)
      return (
        <div className="flex justify-end gap-2 px-3 py-1.5">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      )
    return (
      <>
        <div className="flex justify-end gap-2 px-3 py-1.5">
          <TableSizeSelector
            className="right-0 max-w-[100px]"
            defaultSize={table.getState().pagination.pageSize}
            onChange={(value) => {
              table.setPageSize(value)
            }}
          />
          <Pagination
            currentPage={tableStates.pagination.pageIndex + 1}
            totalPage={data?._pagination?.TotalPages || 1}
            onPageChange={(index) => {
              table.setPageIndex(index - 1)
            }}
            onFirstPage={() => table.setPageIndex(0)}
            onNextPage={() => {
              table.nextPage()
            }}
            onPreviousPage={() => {
              table.previousPage()
            }}
            onLastPage={() => table.setPageIndex(table.getPageCount() - 1)}
          />
        </div>
      </>
    )
  }, [isLoading, tableStates.pagination.pageIndex, table, data])

  return (
    <div className="mt-4">
      {isError && <Button onClick={() => refetch()}>Retry</Button>}
      {isError && <p>{error?.message}</p>}
      <DataTable
        table={table}
        isLoading={isLoading}
        header={renderHeader}
        columns={columns}
        data={data?.data ?? []}
        footer={renderFooter}
      />
    </div>
  )
}
export default OrderTable
