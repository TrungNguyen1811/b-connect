import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from 'src/components/ui/check-box'
import { CellAction } from './cell-action'
import { IResponseOrderAgency } from 'src/types/order'
import { formatPrice } from 'src/lib/utils'
import { format } from 'date-fns'

export const columns: ColumnDef<IResponseOrderAgency>[] = [
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
    accessorKey: 'customerName',
    header: 'Customer',
    cell: ({ getValue }) => {
      const customerName = getValue() as string
      return <p className="w-[4rem]">{customerName}</p>
    },
  },
  {
    accessorKey: 'bookName',
    header: 'Book',
    cell: ({ getValue }) => {
      const bookName = getValue() as string
      return <p className="w-[8rem]">{bookName}</p>
    },
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ getValue }) => {
      const quantity = getValue() as string
      return <p className="w-[2rem] text-center">{quantity}</p>
    },
  },
  {
    accessorKey: 'price',
    header: 'Total Price',
    cell: ({ getValue }) => {
      const price = getValue() as number
      return <p className="w-[4rem]">{formatPrice(price as number)}</p>
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue() as number
      return <p className="w-[5rem]">{status}</p>
    },
  },
  {
    accessorKey: 'createdDate',
    header: 'Date',
    cell: ({ getValue }) => {
      const createdDate = getValue() as Date
      return <p className="w-[4rem]">{format(createdDate, 'P')}</p>
    },
  },
  {
    header: 'Action',
    id: 'action',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
