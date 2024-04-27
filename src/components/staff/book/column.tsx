import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from 'src/components/ui/check-box'
import { CellAction } from './cell-action'
import { IPostResponse } from 'src/types/blog'

export const columns: ColumnDef<IPostResponse>[] = [
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
    accessorKey: 'postId',
    header: 'PostId',
  },
  {
    accessorKey: 'userId',
    header: 'UserId',
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
  },

  {
    header: 'Action',
    id: 'action',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
