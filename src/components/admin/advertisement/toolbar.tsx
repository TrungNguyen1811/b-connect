import { Table } from '@tanstack/react-table'
import React, { useEffect } from 'react'
import { cn, formatDate } from 'src/lib/utils'
import SearchInput from 'src/components/ui/search-input'
import { IQueryPagination, IQuerySearch } from 'src/types/requests'
import { DateRange } from 'react-day-picker'
import { format, subDays } from 'date-fns'
import { Popover, PopoverTrigger, PopoverContent } from 'src/components/ui/popover'
import { Button } from 'src/components/ui/button'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from 'src/components/ui/calendar'
import { IResponseAds } from 'src/types/advertisement'
import { GetBannerParams } from 'src/api/advertisement/get-top-banner'
export interface DataTableToolbarProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>
  queries: Partial<IQueryPagination & IQuerySearch> & Record<string, unknown> & GetBannerParams
  setSearchQuery?: (value: Partial<IQueryPagination & IQuerySearch> & Record<string, unknown> & GetBannerParams) => void
  onStartDateChange?: (value: string) => void
  onEndDateChange?: (value: string) => void
  onSearchChange?: (value: string) => void
  onSetLabelChange?: (value: string) => void
  type?: (value: string) => void
}

export function AdsTableToolbar({
  table,
  queries,
  setSearchQuery,
  className,
  onStartDateChange,
  onEndDateChange,
  ...props
}: DataTableToolbarProps<IResponseAds>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 20),
    to: new Date(),
  })
  console.log('date', date)
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

  return (
    <div className={cn('flex items-center justify-between border-b border-card', className)} {...props}>
      <div className="flex flex-1 items-center space-x-2 px-3 py-1.5">
        <SearchInput
          value={queries.agencyId || ''}
          onChange={(value) => {
            setSearchQuery &&
              setSearchQuery({
                ...queries,
                agencyId: value,
              })
          }}
          className="h-8 max-w-xs"
        />

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
