import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from 'src/components/ui/check-box'
import { IListReplyResponse, IReplyResponse } from 'src/types'
import { CellAction } from './cell-action'

export const columns: ColumnDef<IListReplyResponse>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
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
    accessorKey: 'bookName',
    header: 'Book Name',
    cell: ({ getValue }) => {
      const bookName = getValue() as string
      return <p className="w-[8rem]">{bookName}</p>
    },
  },
  {
    accessorKey: 'username',
    header: 'Username',
    cell: ({ getValue }) => {
      const username = getValue() as string
      return <p className="w-[8rem]">{username}</p>
    },
  },
  {
    accessorKey: 'ratingPoint',
    header: 'Rating Point',
    cell: ({ getValue }) => {
      const ratingPoint = getValue() as string
      return <p className="w-[8rem]">{ratingPoint}</p>
    },
  },
  {
    accessorKey: 'comment',
    header: 'Comment',
    cell: ({ getValue }) => {
      const comment = getValue() as string
      return <p className="w-[8rem]">{comment}</p>
    },
  },
  {
    accessorKey: 'reply',
    header: 'Reply',
    cell: ({ getValue }) => {
      const reply = getValue() as IReplyResponse
      return <p className="w-[8rem]">{reply.replyText || ''}</p>
    },
  },
  {
    header: 'Action',
    id: 'action',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
