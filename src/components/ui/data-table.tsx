import { ColumnDef, flexRender } from '@tanstack/react-table'
import { Table as ITable } from '@tanstack/table-core'
import React, { useMemo } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table'
import { CircleOffIcon, Loader2Icon } from 'lucide-react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  header?: React.ReactNode
  footer?: React.ReactNode
  isLoading?: boolean
  table: ITable<TData>
}

export function DataTable<TData, TValue>({
  columns,
  data,
  footer,
  header,
  table,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const renderHeader = useMemo(() => {
    if (!header) return null
    return <div>{header}</div>
  }, [header])

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

  const selectedLength = table.getFilteredSelectedRowModel().rows

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
        <div className="flex-1 text-sm text-muted-foreground">
          {selectedLength.length} of {data.length} row(s) selected.
        </div>
      </>
    )
  }, [columns.length, data, isLoading, table, selectedLength.length])

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
      {renderFooter}
    </div>
  )
}
