import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from 'src/components/ui/check-box'
import { ICategory } from 'src/types'
import { CellAction } from './cell-action'

export const columns: ColumnDef<ICategory>[] = [
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
    accessorKey: 'img',
    header: 'Image',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    id: 'action',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
