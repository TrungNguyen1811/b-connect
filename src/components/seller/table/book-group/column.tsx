import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from 'src/components/ui/check-box'
import { IResponseBookGroup } from 'src/types'
import { CellAction } from './cell-action'

export const columns: ColumnDef<IResponseBookGroup>[] = [
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
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'bookGroupName',
    header: 'Book Group Name',
    cell: ({ getValue }) => {
      const name = getValue() as string
      if (name) {
        const truncateName = name.length > 20 ? `${name.substring(0, 20)}...` : name
        return <p className="w-[8rem]">{truncateName}</p>
      } else return <p className="w-[8rem]">{name}</p>
    },
  },
  {
    accessorKey: 'imageDir',
    header: 'Image',
    cell: ({ getValue }) => {
      const image = getValue() as string
      return (
        <div className="w-[4rem]">
          <img src={image} />
        </div>
      )
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ getValue }) => {
      const description = getValue() as string
      return <p className="w-[8rem]">{description}</p>
    },
  },
  {
    header: 'Action',
    id: 'action',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
