import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from 'src/components/ui/check-box'
import { IBook } from 'src/types'
import { CellAction } from './cell-action'
import { formatPrice } from 'src/lib/utils'
import { ArrowUpDown } from 'lucide-react'
import { Button } from 'src/components/ui/button'

export const columns: ColumnDef<IBook>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    // header: 'Name',
    cell: ({ getValue }) => {
      const name = getValue() as string
      if (name) {
        const truncateName = name.length > 40 ? `${name.substring(0, 40)}...` : name
        return <p className="w-[18em]">{truncateName}</p>
      } else return <p className="w-[18rem]">{name}</p>
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ getValue }) => {
      const type = getValue() as string
      return <p className="w-[4rem]">{type}</p>
    },
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ getValue }) => {
      const price = getValue() as number
      return <p className="w-[4rem]">{formatPrice(price as number)}</p>
    },
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: ({ getValue }) => {
      const stock = getValue() as string
      return <p className=" w-[4rem] text-center">{stock}</p>
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ getValue }) => {
      const category = getValue() as string[]
      return <p className="w-[20rem]">{category.join(', ')}</p>
    },
  },
  {
    header: 'Action',
    id: 'action',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
