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
    enableSorting: true,
    enableHiding: false,
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
    accessorKey: 'cateName',
    header: 'Name',
    cell: ({ getValue }) => {
      const cateName = getValue() as string
      if (cateName) {
        const truncateName = cateName.length > 20 ? `${cateName.substring(0, 20)}...` : cateName
        return <p className="w-[8rem]">{truncateName}</p>
      } else return <p className="w-[8rem]">{cateName}</p>
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ getValue }) => {
      const description: string | null = getValue() as string | null

      if (!description) {
        return <p className="text-slate-400">No description available</p>
      }
      const truncatedDescription = description.length > 100 ? `${description.substring(0, 100)}...` : description
      return <p className="w-[36rem] text-slate-400">{truncatedDescription}</p>
    },
  },
  {
    header: 'Action',
    id: 'action',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
