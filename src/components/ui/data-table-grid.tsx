import React, { useMemo, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Table as ITable } from '@tanstack/table-core'
import { Table, TableBody, TableCell, TableHeader, TableRow } from './table'
import { CircleOffIcon, Edit } from 'lucide-react'
import { IBook } from 'src/types'
import BookGridLoading from '../book/book-grid-loading'
import { Input } from './input'
import { Button } from './button'
import { toast } from './use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { removeBookFromBookGroup } from 'src/api/books/delete-book'
import { CellAction } from '../seller/table/book-group-detail/cell-action'
import { useNavigate } from 'react-router-dom'
import { addBookToBookGroup } from 'src/api/books/post-add-book'
import { formatPrice } from 'src/lib/utils'

interface DataTableProps<TData extends IBook, TValue> {
  id: string
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  header?: React.ReactNode
  footer?: React.ReactNode
  isLoading?: boolean
  isAdd?: boolean
  table: ITable<TData>
  onSelectItem?: (items: string[]) => void // Cập nhật kiểu dữ liệu ở đây
}

interface addData {
  productId: string
  bookGroupIds: string[]
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
  isAdd,
}: DataTableProps<TData, TValue>) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const navigate = useNavigate()

  const handleItemClick = (item: string) => {
    const selectedIndex = selectedItems.findIndex((selectedItem) => selectedItem === item)
    if (selectedIndex === -1) {
      setSelectedItems([...selectedItems, item])
    } else {
      const updatedItems = [...selectedItems]
      updatedItems.splice(selectedIndex, 1)
      setSelectedItems(updatedItems)
    }
  }

  const handleAllItemClick = () => {
    const allSelected = data.every((item) => selectedItems.includes(item.productId as string))
    if (allSelected) {
      setSelectedItems([])
    } else {
      const allItemIds = data.map((item) => item.productId as string)
      setSelectedItems(allItemIds)
    }
  }

  const queryClient = useQueryClient()

  const addBookFunction = async (data: addData) => {
    const book = await addBookToBookGroup(data)
    return book
  }

  const { mutate: AddBook } = useMutation(addBookFunction, {
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries()
        setSelectedItems([])
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

  const deleteBookFunction = async (data: deleteData) => {
    const book = await removeBookFromBookGroup(data.productId, data.bookGroupId)
    return book
  }

  const { mutate: deleteBook } = useMutation(deleteBookFunction, {
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries()
        setSelectedItems([])
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

  const onAdd = () => {
    selectedItems.map((item) => {
      const data: addData = {
        productId: item,
        bookGroupIds: [id],
      }
      AddBook(data)
    })
  }

  const onDelete = () => {
    selectedItems.map((item) => {
      const data: deleteData = {
        productId: item,
        bookGroupId: id,
      }
      deleteBook(data)
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
          <div className="fixed bottom-0 flex-grow border-t-2 bg-orange-50 text-right">
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
              {isAdd ? (
                <Button onClick={onAdd} className="my-2 ml-[50rem] mr-[40rem] w-32" type="submit">
                  Add
                </Button>
              ) : (
                <Button onClick={onDelete} className="my-2 ml-[50rem] mr-[40rem] w-32" type="submit">
                  Delete
                </Button>
              )}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }, [footer, selectedItems.length, data.length, isAdd])

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
        className={`mb-4 w-40 rounded-md border p-1 ${
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
          <img src={item.bookDir as string} alt={item.name} className="aspect-[1/1] h-44 object-cover" />

          <div className="w-full px-1">
            <p className="h-16 text-base font-semibold">{item.name}</p>
            <div className="flex flex-grow"></div>
            <div className="mt-4 flex flex-row justify-between">
              <p className="text-red-600">{formatPrice(item.price)}</p>
              <p className="text-gray-600">Stock: {item.quantity}</p>
            </div>
          </div>
          <div className="mt-1 flex w-full flex-row justify-around border-t-2">
            {/* <Button>update</Button>
            <Button>delete</Button> */}
            <button
              className="mt-1 rounded-sm p-1 px-2 hover:bg-gray-100"
              onClick={() => navigate(`/seller/manage/books/${item.productId}`)}
            >
              <Edit size={20} />
            </button>
            <CellAction data={item} />
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
