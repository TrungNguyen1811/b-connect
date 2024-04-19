import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from 'src/components/ui/check-box'
import { IBook } from 'src/types'
import { CellAction } from './cell-action'
import { formatPrice } from 'src/lib/utils'

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
    accessorKey: 'bookImg',
    header: 'Image',
    cell: ({ getValue }) => {
      const image = getValue() as string
      return <p className="">{image}</p>
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ getValue }) => {
      const name = getValue() as string
      return <p className="w-[8rem]">{name}</p>
    },
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'))

      return <div className="text-right font-medium">{formatPrice(price)}</div>
    },
    // cell: ({ getValue }) => {
    //   const price = getValue() as string
    //   return <p className="w-[8rem]">{price}</p>
    // },
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ getValue }) => {
      const quantity = getValue() as string
      return <p className="w-[8rem]">{quantity}</p>
    },
  },
  {
    header: 'Action',
    id: 'action',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
