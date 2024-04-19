import React, { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Table as ITable } from '@tanstack/table-core'
import { Table, TableBody, TableCell, TableHeader, TableRow } from './table'
import { CircleOffIcon } from 'lucide-react'
import { IListReplyResponse } from 'src/types'
import { useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import BlockGridLoading from '../book/block-grid-loading'
import { CellAction } from '../seller/table/rating/cell-action'
import { Avatar, AvatarImage } from './avatar'

interface DataTableProps<TData extends IListReplyResponse, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  header?: React.ReactNode
  footer?: React.ReactNode
  isLoading?: boolean
  table: ITable<TData>
  onSelectItem?: (items: string[]) => void
}

export function DataTableRatingGrid<TData extends IListReplyResponse, TValue>({
  columns,
  data,
  footer,
  header,
  table,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const renderHeader = useMemo(() => {
    if (!header) return null
    return <div>{header}</div>
  }, [header])

  const renderFooter = useMemo(() => {
    if (!footer) return null
    return (
      <div className="flex flex-col">
        <div>{footer}</div>
      </div>
    )
  }, [footer])

  const renderBody = useMemo(() => {
    if (isLoading) {
      return <BlockGridLoading pageSize={9} className="col-span-full grid grid-cols-3 gap-4" />
    }

    if (!data || data.length === 0) {
      return (
        <TableRow>
          <TableCell>
            <div className="m-8 flex flex-col items-center justify-center gap-2 text-lg font-medium uppercase opacity-25">
              <CircleOffIcon size={70} />
              <p>No results.</p>
            </div>
          </TableCell>
        </TableRow>
      )
    }

    return data.map((item, index) => (
      <div className={`mb-4 w-80 rounded-md border p-1`} key={index}>
        <div className="relative flex flex-row items-center">
          <Avatar>
            <AvatarImage className="h-8 rounded-full" src={item.avatarDir as string} alt={item.username}></AvatarImage>
          </Avatar>
          <div className="w-full px-1">
            <p className=" text-base font-bold">{item.username}</p>
            <div className="mt-4 flex flex-row justify-between">
              <p className="">Point: {item.ratingPoint}</p>
            </div>
          </div>
          <div>
            <Link to={`/seller/manage/books/${item.bookId}`} className="text-gray-600">
              {item.bookName}
            </Link>
            <p className="text-gray-600"> {item.comment}</p>
          </div>
          <div className="mt-1 flex w-full flex-row justify-around border-t-2">
            <CellAction data={item} />
          </div>
        </div>
      </div>
    ))
  }, [data, isLoading])

  return (
    <div className="rounded-md border">
      {renderHeader}
      <Table>
        <TableHeader>
          {/* {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))} */}
        </TableHeader>
        <TableBody>
          <div className="col-span-full grid grid-cols-3 p-4 px-8">{renderBody}</div>
        </TableBody>
      </Table>
      {renderFooter}
    </div>
  )
}
