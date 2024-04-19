import { useQuery } from '@tanstack/react-query'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { IQueryPagination, IQuerySearch } from 'src/types/requests'
import { IResponse } from 'src/types/response'
import { API_GET_ALL_USER_QUERY_KEYS } from 'src/api/user/get-all-user.const'
import { ICategory } from 'src/types'
import { getSearchCategory } from 'src/api/categories/get-category'

export function useCategoryTable(columns: ColumnDef<ICategory>[]) {
  const [queries, setQueries] = useState<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Partial<IQueryPagination & IQuerySearch> & { [key: string]: any }
  >({
    PageNumber: 1,
    PageSize: 5,
  })

  const queryController = useQuery<IResponse<ICategory[]>, AxiosError>(
    [...API_GET_ALL_USER_QUERY_KEYS, queries],
    () => getSearchCategory(queries),
    {
      keepPreviousData: true,
    },
  )
  console.log('meta', queryController.data)

  const table = useReactTable<ICategory>({
    columns,
    data: queryController.data?.data || [],
    manualPagination: true,
    initialState: {
      pagination: {
        pageIndex: queries.PageNumber || 1 - 1,
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
      role: otherFilters?.[0]?.value,
      PageNumber: tableStates.pagination.pageIndex + 1,
      PageSize: tableStates.pagination.pageSize,
      inputString: tableStates.globalFilter || undefined,
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
