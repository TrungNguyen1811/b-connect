import { useQuery } from '@tanstack/react-query'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { IQueryPagination, IQuerySearch } from 'src/types/requests'
import { IResponse } from 'src/types/response'
import { API_GET_ALL_USER_QUERY_KEYS } from 'src/api/user/get-all-user.const'
import { IResponseOrderAgency } from 'src/types'
import { GetManyOrderParams, SearchOrders } from 'src/api/order/get-order'
import { useLocation } from 'react-router-dom'

export function useFinanceTable(columns: ColumnDef<IResponseOrderAgency>[]) {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const type = searchParams.get('type')

  const [queries, setQueries] = useState<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Partial<IQueryPagination & IQuerySearch> & { [key: string]: any } & GetManyOrderParams
  >({
    address: undefined,
    bookName: undefined,
    customerName: undefined,
    status: undefined,
    startDate: undefined,
    endDate: undefined,
    PageNumber: 0,
    PageSize: 6,
  })

  const queryController = useQuery<IResponse<IResponseOrderAgency[]>, AxiosError>(
    [...API_GET_ALL_USER_QUERY_KEYS, queries],
    () => SearchOrders(queries),
    {
      keepPreviousData: true,
    },
  )

  const table = useReactTable<IResponseOrderAgency>({
    columns,
    data: queryController.data?.data || [],
    manualPagination: true,
    initialState: {
      pagination: {
        pageIndex: queries.PageNumber || 0,
        pageSize: queries.PageSize,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getCoreRowModel(),
    getFacetedRowModel: getCoreRowModel(),
    getPaginationRowModel: getCoreRowModel(),
  })
  const [tableStates, setTableStates] = useState(table.initialState)
  const setTableQueries = (newQueries: Partial<IQueryPagination & IQuerySearch> & { [key: string]: any }) => {
    setQueries((prevQueries) => ({
      ...prevQueries,
      ...newQueries,
    }))
  }

  useEffect(() => {
    setTableStates((prev) => ({
      ...prev,
      startDate: queries.startDate,
      endDate: queries.endDate,
      bookName: queries.bookName,
      customerName: queries.customerName,
      address: queries.address,
      status: queries.status,
    }))
  }, [queries])

  table.setOptions((prev) => ({
    ...prev,
    state: tableStates,
    pageCount: queryController.data?._pagination?.TotalPages || 0,
    onStateChange: setTableStates,
    debugTable: tableStates.pagination.pageIndex > 2,
  }))

  useEffect(() => {
    setQueries((prev) => ({
      ...prev,
      PageNumber: tableStates.pagination.pageIndex + 1,
      PageSize: tableStates.pagination.pageSize,
    }))
  }, [tableStates.pagination.pageIndex, tableStates.pagination.pageSize])

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
    queries,
    setQueries: setTableQueries,
  }
}
