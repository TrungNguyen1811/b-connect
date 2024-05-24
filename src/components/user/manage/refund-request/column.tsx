import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from 'src/components/ui/check-box'
import { CellAction } from './cell-action'
import { IRefund } from 'src/types/transaction'

export const columns: ColumnDef<IRefund>[] = [
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
    accessorKey: 'id',
    header: 'Refund Id',
    cell: ({ getValue }) => {
      const id = getValue() as string
      return (
        <div className="w-[12rem]">
          <p>{id}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'transactionId',
    header: 'Transaction Id',
    cell: ({ getValue }) => {
      const transactionId = getValue() as string
      return (
        <div className="w-[12rem]">
          <p>{transactionId}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
    cell: ({ getValue }) => {
      const reason = getValue() as string
      return (
        <div className="w-[16rem]">
          <p>{reason}</p>
        </div>
      )
    },
  },
  {
    header: 'Action',
    id: 'action',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
