import { Button } from 'src/components/ui/button'
import React, { useState } from 'react'
import Pagination from 'src/components/ui/pagination'
import TableSizeSelector from 'src/components/ui/table-size-selector'
import { Skeleton } from 'src/components/ui/skeleton'
import { columns } from './column'
import { useBookGroupTable } from './useBookGroupTable'
import { BookGroupTableToolbar } from './toolbar'
import { DataTableGrid } from 'src/components/ui/data-table-grid'
import { useParams } from 'react-router-dom'
import { useBookTable } from '../book/useBookTable'

function BookGroupDetailTable() {
  const { id } = useParams<{ id: string }>()
  const [isAdd, setIsAdd] = useState<boolean>(false)

  const bookGroupTable = useBookGroupTable(columns)
  const bookTable = useBookTable(columns)

  const { isError, isLoading, table, error, refetch, data, tableStates } = isAdd ? bookTable : bookGroupTable

  const renderHeader = React.useMemo(() => {
    return (
      <div className="flex flex-row items-center justify-between">
        <BookGroupTableToolbar
          table={table}
          queries={{
            PageNumber: tableStates.pagination.pageIndex + 1,
            PageSize: tableStates.pagination.pageSize,
            search: tableStates.globalFilter,
          }}
          setSearchQuery={(value) => {
            table.setGlobalFilter(value.search)
          }}
        />
        <div className="mr-4 flex flex-row gap-2">
          <Button onClick={() => setIsAdd(true)}>Add Book</Button>
          <Button onClick={() => setIsAdd(false)}>View Book</Button>
        </div>
      </div>
    )
  }, [table, tableStates.pagination.pageIndex, tableStates.pagination.pageSize, tableStates.globalFilter])

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
            currentPage={tableStates.pagination.pageIndex}
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
    <div className="mt-8">
      {isError && <Button onClick={() => refetch()}>Retry</Button>}
      {isError && <p>{error?.message}</p>}
      <DataTableGrid
        id={id as string}
        table={table}
        isLoading={isLoading}
        header={renderHeader}
        columns={columns}
        data={data?.data ?? []}
        footer={renderFooter}
        isAdd={isAdd}
      />
    </div>
  )
}
export default BookGroupDetailTable
