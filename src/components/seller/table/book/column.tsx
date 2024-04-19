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
        const truncateName = name.length > 20 ? `${name.substring(0, 20)}...` : name
        return <p className="w-[8rem]">{truncateName}</p>
      } else return <p className="w-[8rem]">{name}</p>
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ getValue }) => {
      const type = getValue() as string
      return <p className="w-[8rem]">{type}</p>
    },
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'))

      return <div className="">{formatPrice(price)}</div>
    },
    // cell: ({ getValue }) => {
    //   const price = getValue() as string
    //   return <p className="w-[8rem]">{price}</p>
    // },
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: ({ getValue }) => {
      const stock = getValue() as string
      return <p className="w-[8rem]">{stock}</p>
    },
  },
  // {
  //   accessorKey: 'category',
  //   header: 'category',
  //   cell: ({ getValue }) => {
  //     const category = getValue() as string
  //     return <p className="w-[8rem]">{category}</p>
  //   },
  // },
  {
    header: 'Action',
    id: 'action',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
