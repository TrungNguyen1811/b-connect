import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from 'src/components/ui/check-box'
import { CellAction } from './cell-action'
import { IResponseAds } from 'src/types/advertisement'
import { format } from 'date-fns'

interface RowType {
  original: IResponseAds
  getIsSelected: () => boolean
  toggleSelected: (value: boolean) => void
}

function useDisplaySelected(row: RowType): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [isChecked, setIsChecked] = useState(row.original.isDisplaySelected ? true : row.getIsSelected())

  useEffect(() => {
    if (row.original.isDisplaySelected) {
      setIsChecked(true)
      row.toggleSelected(true)
    } else {
      setIsChecked(row.getIsSelected())
    }
  }, [row.original.isDisplaySelected])

  return [isChecked, setIsChecked]
}
export const columns: ColumnDef<IResponseAds>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }: { row: RowType }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isChecked, setIsChecked] = useDisplaySelected(row)

      return (
        <Checkbox
          checked={isChecked}
          onCheckedChange={(value) => {
            setIsChecked(value as boolean)
            row.toggleSelected(!!value)
          }}
          aria-label="Select row"
        />
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'adId',
    header: 'Ads Id',
  },
  {
    accessorKey: 'agencyId',
    header: 'Agency Id',
  },
  {
    accessorKey: 'bannerTitle',
    header: 'Banner Title',
  },
  {
    accessorKey: 'bannerDir',
    header: 'Banner Dir',
  },
  {
    accessorKey: 'bannerFee',
    header: 'Banner Fee',
  },
  {
    accessorKey: 'duration',
    header: 'Duration',
  },
  {
    accessorKey: 'startDate',
    header: 'StartDate',
    cell: ({ getValue }) => {
      const startDate = getValue() as string
      return (
        <div className="w-[3rem]">
          <p>{format(new Date(startDate), 'P')}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'endDate',
    header: 'EndDate',
    cell: ({ getValue }) => {
      const endDate = getValue() as string
      return (
        <div className="w-[3rem]">
          <p>{format(new Date(endDate), 'P')}</p>
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
