import { useQuery } from '@tanstack/react-query'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { IQueryPagination, IQuerySearch } from 'src/types/requests'
import { IResponse } from 'src/types/response'
import { API_GET_ALL_USER_QUERY_KEYS } from 'src/api/user/get-all-user.const'
import { IListReplyResponse } from 'src/types'
import { getAllReviewByAgency } from 'src/api/review/get-all-review-by-bookId'

export function useRatingTable(columns: ColumnDef<IListReplyResponse>[]) {
  const [queries, setQueries] = useState<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Partial<IQueryPagination & IQuerySearch> & { [key: string]: any }
  >({
    PageNumber: 0,
    PageSize: 6,
  })

  const queryController = useQuery<IResponse<IListReplyResponse[]>, AxiosError>(
    [...API_GET_ALL_USER_QUERY_KEYS, queries],
    () => getAllReviewByAgency(queries),
    {
      keepPreviousData: true,
    },
  )

  console.log('quee', queries)
  const table = useReactTable<IListReplyResponse>({
    columns,
    data: queryController.data?.data || [],
    manualPagination: true,
    initialState: {
      pagination: {
        pageIndex: queries.PageNumber || 0,
        pageSize: queries.PageSize,
      },
      globalFilter: queries.BookName,
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
      recentDays: queries.RecentDays,
      hasReplied: queries.HasReplied,
    }))
  }, [queries, setTableStates])

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
      ratingPoint: otherFilters?.[0]?.value,
      PageNumber: tableStates.pagination.pageIndex + 1,
      PageSize: tableStates.pagination.pageSize,
      BookName: tableStates.globalFilter || undefined,
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
    queries,
    setQueries: setTableQueries,
  }
}
