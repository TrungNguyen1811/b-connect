import { Button } from 'src/components/ui/button'
import React, { useEffect, useMemo, useState } from 'react'
import Pagination from 'src/components/ui/pagination'
import TableSizeSelector from 'src/components/ui/table-size-selector'
import { Skeleton } from 'src/components/ui/skeleton'
import { columns } from './column'
import { AdsTableToolbar } from './toolbar'
import { useAdvertisementTable } from './useAdvertisementTable'
import { DataTable } from './data-table-ads'

function AdvertisementTable() {
  const { isError, isLoading, table, error, refetch, data, tableStates, setTableStates, queries, setQueries } =
    useAdvertisementTable(columns)

  const [startDate, setStartDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()

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
    }))
  }, [startDate, setTableStates, endDate])

  console.log('quee', queries)

  const renderHeader = useMemo(() => {
    return (
      <div>
        <AdsTableToolbar
          table={table}
          queries={{
            PageNumber: tableStates.pagination.pageIndex + 1,
            PageSize: tableStates.pagination.pageSize,
            agencyId: tableStates.globalFilter,
            ...queries,
          }}
          setSearchQuery={(value) => {
            table.setGlobalFilter(value.search)
            setQueries(value)
          }}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
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
export default AdvertisementTable
