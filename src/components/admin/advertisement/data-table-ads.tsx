import { ColumnDef, flexRender } from '@tanstack/react-table'
import { Table as ITable } from '@tanstack/table-core'
import React, { useMemo } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table'
import { CircleOffIcon, Loader2Icon } from 'lucide-react'
import { IResponseAds } from 'src/types/advertisement'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'src/components/ui/use-toast'
import { postUpdateBannerList } from 'src/api/advertisement/post-checkout-ads'
import { Button } from 'src/components/ui/button'

interface DataTableProps<TData extends IResponseAds, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  header?: React.ReactNode
  footer?: React.ReactNode
  isLoading?: boolean
  table: ITable<TData>
}

export function DataTable<TData extends IResponseAds, TValue>({
  columns,
  data,
  footer,
  header,
  table,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const selectedRows = table.getFilteredSelectedRowModel().rows
  const selectedAgencyIds: string[] = selectedRows.map((row) => row.original.transactionId)
  const query = useQueryClient()

  const updateBannerList = useMutation((list: string[]) => postUpdateBannerList(list), {
    onSuccess: (data) => {
      if (data) {
        toast({
          title: 'Update Banner List Success!!!',
          description: data,
        })
      } else {
        toast({
          title: 'Update Banner List Failed!!!',
          description: data,
        })
      }
      query.invalidateQueries()
    },
    onError: (error: any) => {
      toast({
        title: 'Error Update Banner List Failed!!!',
        description: error.response.data,
      })
    },
  })
  const onSubmit = () => {
    updateBannerList.mutate(selectedAgencyIds)
  }
  const renderHeader = useMemo(() => {
    if (!header) return null
    return (
      <div className="flex flex-row items-center justify-between">
        <div className="w-full">{header}</div>
        <div className="w-32">
          {selectedRows.length > 0 ? (
            <Button className="" onClick={() => onSubmit()}>
              Update
            </Button>
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }, [header, selectedRows.length])

  const renderFooter = useMemo(() => {
    if (!footer) return null
    return <div>{footer}</div>
  }, [footer])

  const renderLoading = () => (
    <TableRow>
      <TableCell colSpan={columns.length}>
        <div className="m-8 flex flex-col items-center justify-center gap-2 text-lg font-medium uppercase opacity-25">
          <Loader2Icon className="animate-spin ease-in" size={30} />
          <p>Loading...</p>
        </div>
      </TableCell>
    </TableRow>
  )

  const renderNoResults = () => (
    <TableRow>
      <TableCell colSpan={columns.length}>
        <div className="m-8 flex flex-col items-center justify-center gap-2 text-lg font-medium uppercase opacity-25">
          <CircleOffIcon size={70} />
          <p>No results.</p>
        </div>
      </TableCell>
    </TableRow>
  )

  const renderBody = useMemo(() => {
    if (isLoading) return renderLoading()
    if (!data || data.length === 0) return renderNoResults()
    return (
      <>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected()}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
            ))}
          </TableRow>
        ))}
      </>
    )
  }, [columns.length, data, isLoading, table, selectedRows.length])

  return (
    <div className="rounded-md border p-2">
      {renderHeader}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>{renderBody}</TableBody>
      </Table>
      <div className="flex-1 text-sm text-muted-foreground">
        {selectedRows.length} of {data.length} row(s) selected.
      </div>
      {renderFooter}
    </div>
  )
}
