import { useQuery } from '@tanstack/react-query'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { AxiosError } from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { IQueryPagination, IQuerySearch } from 'src/types/requests'
import { IResponse } from 'src/types/response'
import { API_GET_ALL_USER_QUERY_KEYS } from 'src/api/user/get-all-user.const'
import { GetBannerParams, getAllBannerAds } from 'src/api/advertisement/get-top-banner'
import { IResponseAds } from 'src/types/advertisement'

export function useAdvertisementTable(columns: ColumnDef<IResponseAds>[]) {
  const [queries, setQueries] = useState<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Partial<IQueryPagination & IQuerySearch> & { [key: string]: any } & GetBannerParams
  >({
    agencyId: undefined,
    startDate: undefined,
    endDate: undefined,
    PageNumber: 0,
    PageSize: 20,
  })

  const queryController = useQuery<IResponse<IResponseAds[]>, AxiosError>(
    [...API_GET_ALL_USER_QUERY_KEYS, queries],
    () => getAllBannerAds(queries),
    {
      keepPreviousData: true,
    },
  )

  const data = useMemo(() => queryController.data?.data ?? [], [queryController.data?.data])
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => (b.isDisplaySelected === a.isDisplaySelected ? 0 : b.isDisplaySelected ? 1 : -1))
  }, [data])

  const table = useReactTable<IResponseAds>({
    columns,
    data: sortedData || [],
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
  const setTableQueries = (newQueries: Partial<IQueryPagination & IQuerySearch>) => {
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
      agencyId: tableStates.globalFilter || undefined,
    }))
  }, [queries, tableStates.globalFilter])

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
