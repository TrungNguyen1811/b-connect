import { useQuery } from '@tanstack/react-query'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { IBookGroupSearch, IQueryPagination, IQuerySearch } from 'src/types/requests'
import { IResponse } from 'src/types/response'
import { API_GET_ALL_USER_QUERY_KEYS } from 'src/api/user/get-all-user.const'
import { IBook } from 'src/types'
import { getAllBookOfBookGroup } from 'src/api/books/get-book'
import { useParams } from 'react-router-dom'

export function useBookGroupTable(columns: ColumnDef<IBook>[]) {
  const { id } = useParams<{ id: string }>()
  const [bookGroupId, setBookGroupId] = useState<string | undefined>(id)

  const [queries, setQueries] = useState<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Partial<IQueryPagination & IQuerySearch & IBookGroupSearch> & { [key: string]: any }
  >({
    PageNumber: 0,
    PageSize: 6,
    bookGroupId: id,
  })

  const queryController = useQuery<IResponse<IBook[]>, AxiosError>(
    [...API_GET_ALL_USER_QUERY_KEYS, queries],
    () => getAllBookOfBookGroup(queries),
    {
      keepPreviousData: true,
    },
  )

  useEffect(() => {
    setBookGroupId(id)
  }, [id])

  useEffect(() => {
    setQueries((prev) => ({
      ...prev,
      bookGroupId: bookGroupId,
    }))
  }, [bookGroupId])

  const table = useReactTable<IBook>({
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
      PageNumber: tableStates.pagination.pageIndex + 1,
      PageSize: tableStates.pagination.pageSize,
      search: tableStates.globalFilter || undefined,
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
    bookGroupId,
  }
}
