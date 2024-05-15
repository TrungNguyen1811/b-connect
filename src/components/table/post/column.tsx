import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from 'src/components/ui/check-box'
import { CellAction } from './cell-action'
import { IResponsePost } from 'src/types/blog'
import { format } from 'date-fns'

export const columns: ColumnDef<IResponsePost>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'username',
    header: 'Username',
    cell: ({ getValue }) => {
      const username = getValue() as boolean
      return (
        <div className="w-[6rem]">
          <p>{username}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'postData.title',
    header: 'Title',
    cell: ({ getValue }) => {
      const title = getValue() as boolean
      return (
        <div className="w-[12rem]">
          <p>{title}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'postData.isTradePost',
    header: 'Trade Post',
    cell: ({ getValue }) => {
      const isTradePost = getValue() as boolean
      return (
        <div className="w-[4rem]">
          <p>{isTradePost ? 'True' : 'False'}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'postData.isLock',
    header: 'Lock',
    cell: ({ getValue }) => {
      const isLock = getValue() as string
      return (
        <div className="w-[4rem]">
          <p>{isLock ? 'True' : 'False'}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'postData.createdAt',
    header: 'Created At',
    cell: ({ getValue }) => {
      const createdAt = getValue() as Date
      return (
        <div className="w-[6rem]">
          <p>{format(createdAt, 'PPP')}</p>
        </div>
      )
    },
  },
  {
    id: 'action',
    header: 'Action',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
