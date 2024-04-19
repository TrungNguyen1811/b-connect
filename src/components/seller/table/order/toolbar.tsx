import { Table } from '@tanstack/react-table'
import React, { useCallback, useEffect, useState } from 'react'
import { cn, formatDate } from 'src/lib/utils'
import SearchInput from 'src/components/ui/search-input'
import { IQueryPagination, IQuerySearch } from 'src/types/requests'
import { IResponseAgencyOrder } from 'src/types'
import { DateRange } from 'react-day-picker'
import { format, subDays } from 'date-fns'
import { Popover, PopoverTrigger, PopoverContent } from 'src/components/ui/popover'
import { Button } from 'src/components/ui/button'
import { CalendarIcon, MoreHorizontal } from 'lucide-react'
import { Calendar } from 'src/components/ui/calendar'
import { GetManyOrderParams } from 'src/api/order/get-order'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from 'src/components/ui/command'
export interface DataTableToolbarProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>
  queries: Partial<IQueryPagination & IQuerySearch> & Record<string, unknown> & GetManyOrderParams
  setSearchQuery?: (
    value: Partial<IQueryPagination & IQuerySearch> & Record<string, unknown> & GetManyOrderParams,
  ) => void
  onStartDateChange?: (value: string) => void
  onEndDateChange?: (value: string) => void
  onSearchChange?: (value: string) => void
  onSetLabelChange?: (value: string) => void
}

export function RatingTableToolbar({
  table,
  queries,
  setSearchQuery,
  className,
  onStartDateChange,
  onEndDateChange,
  onSearchChange,
  onSetLabelChange,
  ...props
}: DataTableToolbarProps<IResponseAgencyOrder>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 20),
    to: new Date(),
  })

  useEffect(() => {
    setSearchQuery &&
      setSearchQuery({
        ...queries,
        startDate: formatDate(date?.from as Date),
        endDate: formatDate(date?.to as Date),
      })
    onStartDateChange && onStartDateChange(formatDate(date?.from as Date))
    onEndDateChange && onEndDateChange(formatDate(date?.to as Date))
  }, [date?.from, date?.to])

  const [label, setLabel] = useState('bookname')
  const [newLabel, setNewLabel] = useState('BookName')
  const [open, setOpen] = useState(false)
  const labels = ['BookName', 'CustomerName', 'OrderId', 'Address']

  useEffect(() => {
    if (label === 'bookname') {
      setNewLabel('BookName')
    }
    if (label === 'customername') {
      setNewLabel('CustomerName')
    }
    if (label === 'orderid') {
      setNewLabel('OrderId')
    }
    if (label === 'address') {
      setNewLabel('Address')
    }
  }, [label])

  const handleSearchInputChange = useCallback(
    (value: string) => {
      setSearchQuery &&
        setSearchQuery({
          ...queries,
          [newLabel]: value.trim() !== '' ? value : undefined,
        })
      onSearchChange && onSearchChange(value)
      onSetLabelChange && onSetLabelChange(newLabel)
    },
    [newLabel, onSearchChange, queries],
  )

  // MinPrice?: number
  // MaxPrice?: number
  // Method?: string
  // QuantityMin?: number
  // QuantityMax?: number

  return (
    <div className={cn('flex items-center justify-between border-b border-card', className)} {...props}>
      <div className="flex flex-1 items-center space-x-2 px-3 py-1.5">
        {/* <SearchInput
          value={queries.Method || ''}
          onChange={(value) => {
            setSearchQuery &&
              setSearchQuery({
                ...queries,
                Method: value,
              })
          }}
          className="h-8 max-w-xs"
        /> */}

        <div className="flex w-96 flex-col items-start justify-between rounded-md border px-4 py-3 sm:flex-row sm:items-center">
          <span className="mr-2 rounded-lg bg-primary px-2 py-1 text-xs text-primary-foreground">{label}</span>
          {label === 'orderid' && (
            <SearchInput value={queries.OrderId || ''} onChange={handleSearchInputChange} className="h-8 max-w-xs" />
          )}

          {label === 'customername' && (
            <SearchInput
              value={queries.CustomerName || ''}
              onChange={handleSearchInputChange}
              className="h-8 max-w-xs"
            />
          )}

          {label === 'bookname' && (
            <SearchInput value={queries.BookName || ''} onChange={handleSearchInputChange} className="h-8 max-w-xs" />
          )}

          {label === 'address' && (
            <SearchInput value={queries.OrderId || ''} onChange={handleSearchInputChange} className="h-8 max-w-xs" />
          )}

          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuGroup>
                <Command>
                  <CommandInput placeholder="Filter label..." autoFocus={true} className="h-9" />
                  <CommandList>
                    <CommandEmpty>No label found.</CommandEmpty>
                    <CommandGroup>
                      {labels.map((label) => (
                        <CommandItem
                          key={label}
                          value={label}
                          onSelect={(value) => {
                            setLabel(value)
                            setOpen(false)
                          }}
                        >
                          {label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={'outline'}
              className={cn('w-[300px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'yyyy, MM, dd')} - {format(date.to, 'yyyy, MM, dd')}
                  </>
                ) : (
                  format(date.from, 'yyyy, MM, dd')
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
