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
    cell: ({ getValue }) => {
      const postId = getValue() as boolean
      return (
        <div className="w-[18rem]">
          <p>{postId}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'userId',
    header: 'UserId',
    cell: ({ getValue }) => {
      const userId = getValue() as boolean
      return (
        <div className="w-[16rem]">
          <p>{userId}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ getValue }) => {
      const title = getValue() as boolean
      return (
        <div className="w-[18rem]">
          <p>{title}</p>
        </div>
      )
    },
  },
  // {
  //   accessorKey: 'createdAt',
  //   header: 'Created At',
  //   cell: ({ getValue }) => {
  //     const createdAt = getValue() as string
  //     return (
  //       <div className="w-[8rem]">
  //         <p>{format(new Date(createdAt), 'PPP')}</p>
  //       </div>
  //     )
  //   },
  // },

  {
    header: 'Action',
    id: 'action',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
