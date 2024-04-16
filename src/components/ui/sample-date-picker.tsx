'use client'

import * as React from 'react'
import { Button } from 'src/components/ui/button'
import { Calendar } from 'src/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover'
import { cn } from 'src/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

export function SampleDatePicker() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('w-[240px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'yyyy') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className=" w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={date}
          onSelect={setDate}
          fromYear={1960}
          toYear={2030}
        />
      </PopoverContent>
    </Popover>
  )
}
