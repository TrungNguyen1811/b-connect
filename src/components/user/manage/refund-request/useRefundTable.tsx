import { useQuery } from '@tanstack/react-query'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { IQueryPagination, IQuerySearch } from 'src/types/requests'
import { IResponse } from 'src/types/response'
import { API_GET_ALL_USER_QUERY_KEYS } from 'src/api/user/get-all-user.const'
import { getAllRefundByUser } from 'src/api/transaction/get-transaction'
import { IRefund } from 'src/types/transaction'

export function useRefundTable(columns: ColumnDef<IRefund>[]) {
  const [queries, setQueries] = useState<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Partial<IQueryPagination & IQuerySearch> & { [key: string]: any }
  >({
    PageNumber: 0,
    PageSize: 6,
  })

  const queryController = useQuery<IResponse<IRefund[]>, AxiosError>(
    [...API_GET_ALL_USER_QUERY_KEYS, queries],
    () => getAllRefundByUser(queries),
    {
      keepPreviousData: true,
    },
  )
  console.log('queryController', queryController.data)

  const table = useReactTable<IRefund>({
    columns,
    data: queryController.data?.data || [],
    manualPagination: true,
    initialState: {
      pagination: {
        pageIndex: queries.PageNumber || 0,
        pageSize: queries.PageSize,
      },
      globalFilter: queries.search,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getCoreRowModel(),
    getFacetedRowModel: getCoreRowModel(),
    getPaginationRowModel: getCoreRowModel(),
  })
  const [tableStates, setTableStates] = useState(table.initialState)

  table.setOptions((prev) => ({
    ...prev,
    state: tableStates,
    pageCount: queryController.data?._pagination?.TotalPages || 0,
    onStateChange: setTableStates,
    debugTable: tableStates.pagination.pageIndex > 2,
  }))

  useEffect(() => {
    const otherFilters = tableStates.columnFilters
    setQueries((prev) => ({
      ...prev,
      PageNumber: tableStates.pagination.pageIndex + 1,
      PageSize: tableStates.pagination.pageSize,
      name: tableStates.globalFilter || undefined,
    }))
  }, [
    tableStates.columnFilters,
    tableStates.globalFilter,
    tableStates.pagination.pageIndex,
    tableStates.pagination.pageSize,
  ])

  useEffect(() => {
    if (!queryController.data?._pagination) return

    const pageCount = queryController.data?._pagination?.TotalPages || 0
    table.setPageCount(pageCount)
  }, [queryController.data?._pagination, table])

  return {
    ...queryController,
    table,
    tableStates,
    setTableStates,
  }
}
