import React, { useMemo, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Table as ITable } from '@tanstack/table-core'
import { Table, TableBody, TableCell, TableHeader, TableRow } from './table'
import { CircleOffIcon } from 'lucide-react'
import { IBook } from 'src/types'
import BookGridLoading from '../book/book-grid-loading'
import { Input } from './input'
import { Button } from './button'
import { toast } from './use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { removeBookFromBookGroup } from 'src/api/books/delete-book'

interface DataTableProps<TData extends IBook, TValue> {
  id: string
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  header?: React.ReactNode
  footer?: React.ReactNode
  isLoading?: boolean
  table: ITable<TData>
  onSelectItem?: (items: string[]) => void // Cập nhật kiểu dữ liệu ở đây
}

interface deleteData {
  productId: string
  bookGroupId: string
}
export function DataTableGrid<TData extends IBook, TValue>({
  id,
  columns,
  data,
  footer,
  header,
  table,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]) // State để lưu trữ các phần tử được chọn

  console.log(selectedItems)

  const handleItemClick = (item: string) => {
    const selectedIndex = selectedItems.findIndex((selectedItem) => selectedItem === item)
    if (selectedIndex === -1) {
      setSelectedItems([...selectedItems, item]) // Thêm vào danh sách nếu chưa được chọn
    } else {
      const updatedItems = [...selectedItems]
      updatedItems.splice(selectedIndex, 1) // Loại bỏ khỏi danh sách nếu đã được chọn
      setSelectedItems(updatedItems)
    }
  }

  const handleAllItemClick = () => {
    // Nếu tất cả các mục đã được chọn, hãy bỏ chọn tất cả. Ngược lại, chọn tất cả.
    const allSelected = data.every((item) => selectedItems.includes(item.productId as string))
    if (allSelected) {
      setSelectedItems([])
    } else {
      const allItemIds = data.map((item) => item.productId as string)
      setSelectedItems(allItemIds)
    }
  }

  const queryClient = useQueryClient()
  const deleteBookFunction = async (data: deleteData) => {
    const book = await removeBookFromBookGroup(data.productId, data.bookGroupId)
    return book
  }

  const { mutate } = useMutation(deleteBookFunction, {
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries()
      } else {
        toast({
          title: 'Failed',
          description: 'Delete Book Failed',
        })
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error Delete Book',
        description: error.message,
      })
    },
  })

  const onDelete = () => {
    selectedItems.map((item) => {
      const data: deleteData = {
        productId: item,
        bookGroupId: id,
      }
      mutate(data)
    })
  }

  const renderHeader = useMemo(() => {
    if (!header) return null
    return <div>{header}</div>
  }, [header])

  const renderFooter = useMemo(() => {
    if (!footer) return null
    return (
      <div className="flex flex-col">
        <div>{footer}</div>
        {selectedItems.length > 0 ? (
          <div className="fixed bottom-0 flex-grow border-t-2 bg-white text-right">
            <div className="flex w-[90rem] flex-row items-center justify-around">
              <div className="flex flex-row items-center gap-2 pl-2">
                <Input
                  type="checkbox"
                  className="h-4 w-4 p-0"
                  onChange={() => handleAllItemClick()}
                  checked={selectedItems.length === data.length}
                />
                <p className="w-20">Select All</p>
              </div>
              <Button onClick={onDelete} className="my-2 ml-[50rem] mr-[40rem] w-32" type="submit">
                Delete
              </Button>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }, [footer, selectedItems.length])

  const renderBody = useMemo(() => {
    if (isLoading) {
      return <BookGridLoading pageSize={10} className="col-span-full grid grid-cols-5 gap-4" />
    }

    if (!data || data.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length}>
            <div className="m-8 flex flex-col items-center justify-center gap-2 text-lg font-medium uppercase opacity-25">
              <CircleOffIcon size={70} />
              <p>No results.</p>
            </div>
          </TableCell>
        </TableRow>
      )
    }

    return data.map((item, index) => (
      <div
        className={`mb-4 w-40 rounded-md border p-4 ${
          selectedItems.includes(item.productId as string) ? 'bg-gray-200' : ''
        }`}
        key={index}
      >
        <div className="relative flex flex-col items-center">
          <div className="absolute left-1 top-1 items-start">
            <Input
              type="checkbox"
              className="h-4"
              checked={selectedItems.includes(item.productId as string)}
              onChange={() => handleItemClick(item.productId as string)}
            />
          </div>
          <img width={16} src={item.bookDir as string} alt={item.name} className="h-20 w-32 object-cover" />
          <div>
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <div className="flex flex-row justify-between">
              <p className="text-gray-600">Price: ${item.price}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <Button>update</Button>
            <Button>delete</Button>
          </div>
        </div>
      </div>
    ))
  }, [columns.length, data, isLoading, selectedItems])

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
          <div className="col-span-full grid grid-cols-6 p-4 px-8">{renderBody}</div>
        </TableBody>
      </Table>
      {renderFooter}
    </div>
  )
}
