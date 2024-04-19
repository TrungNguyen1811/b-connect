import React, { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Table as ITable } from '@tanstack/table-core'
import { Table, TableBody, TableCell, TableHeader, TableRow } from './table'
import { CircleOffIcon } from 'lucide-react'
import { IResponseAgencyOrder } from 'src/types'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import BlockGridLoading from '../book/block-grid-loading'

interface DataTableProps<TData extends IResponseAgencyOrder, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  header?: React.ReactNode
  footer?: React.ReactNode
  isLoading?: boolean
  table: ITable<TData>
}

export function DataTableOrderGrid<TData extends IResponseAgencyOrder, TValue>({
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
        <div className="flex flex-col items-center">
          <div className="flex flex-row items-center">
            <p>{item.customerId}</p>
            <p>{item.orderId}</p>
          </div>
          <div className="relative flex flex-row items-center">
            <img
              className="w-24"
              src="https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/348552244_822910029389915_4239600546742768007_n.jpg?stp=cp0_dst-jpg_p50x50&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=_zm2hOyYavQAb5Q5j4w&_nc_ht=scontent.fhan14-1.fna&oh=00_AfCi5VNoCzqpAHkSCK3RRBg34yhj0eXS3BM0GAZ9cg3msQ&oe=6624B008"
            />
            {/* <p>{bo}</p>
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
            </div> */}
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
