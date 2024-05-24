import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from 'src/components/ui/check-box'
import { CellAction } from './cell-action'
import { IResponseOrderAgency } from 'src/types/order'
import { format } from 'date-fns'
import { formatPrice } from 'src/lib/utils'

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
    accessorKey: 'orderId',
    header: 'OrderId',
    cell: ({ getValue }) => {
      const orderId = getValue() as number
      return <p className="w-[12rem]">{orderId}</p>
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
    accessorKey: 'paymentMethod',
    header: 'Method',
    cell: ({ getValue }) => {
      const paymentMethod = getValue() as number
      return <p className="w-[4rem]">{paymentMethod}</p>
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
