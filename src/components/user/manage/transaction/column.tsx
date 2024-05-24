import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from 'src/components/ui/check-box'
import { CellAction } from './cell-action'
import { ITransaction } from 'src/types/transaction'

export const columns: ColumnDef<ITransaction>[] = [
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
    accessorKey: 'bankCode',
    header: 'BankCode',
    cell: ({ getValue }) => {
      const bankCode = getValue() as string
      return (
        <div className="w-[2rem]">
          <p>{bankCode}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'cardType',
    header: 'Card Type',
    cell: ({ getValue }) => {
      const cardType = getValue() as string
      return (
        <div className="w-[4rem]">
          <p>{cardType}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'orderInfo',
    header: 'Order Info',
    cell: ({ getValue }) => {
      const orderInfo = getValue() as boolean
      return (
        <div className="w-[12rem]">
          <p>{orderInfo}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Status',
    cell: ({ getValue }) => {
      const paymentStatus = getValue() as boolean
      return (
        <div className="w-[4rem]">
          <p>{paymentStatus}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ getValue }) => {
      const amount = getValue() as boolean
      return (
        <div className="w-[4rem]">
          <p>{amount}</p>
        </div>
      )
    },
  },
  // {
  //   accessorKey: 'paymentDate',
  //   header: 'Payment Date',
  //   cell: ({ getValue }) => {
  //     const paymentDate = getValue() as string
  //     return (
  //       <div className="w-[8rem]">
  //         <p>{format(new Date(paymentDate), 'PPP')}</p>
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
