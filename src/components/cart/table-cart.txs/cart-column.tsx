import { ColumnDef } from '@tanstack/react-table'
import { ICart } from 'src/types'
import { MoreHorizontal } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu'
import { Button } from 'src/components/ui/button'
import { Checkbox } from 'src/components/ui/check-box'
export const columns: ColumnDef<ICart>[] = [
  {
    accessorKey: 'productId',
    header: () => <div className="text-left">BookId</div>,
    cell: ({ getValue }) => {
      const productId: string = getValue() as string
      return <div className="text-left font-medium">{productId}</div>
    },
  },
  // {
  //   accessorKey: "bookName",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Book" />
  //   ),
  // },
  {
    accessorKey: 'quantity',
    header: () => <div className="text-left">Quantity</div>,
    cell: ({ row }) => {
      const quantity = parseInt(row.getValue('quantity'))
      return <div className="text-left font-medium">{quantity}</div>
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-left">Action</div>,
    cell: ({ row }) => {
      const cart = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(cart.productId)}>
              Copy Book ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Remove</DropdownMenuItem>
            <DropdownMenuItem>View Book details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
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
]
