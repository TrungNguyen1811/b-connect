import { useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from 'src/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from 'src/components/ui/form'
import { IBan } from 'src/types/ban'
import { Input } from 'src/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover'
import { Button } from 'src/components/ui/button'
import { cn } from 'src/lib/utils'
import { CalendarHeart } from 'lucide-react'
import {
  addDays,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  format,
} from 'date-fns'
import { Calendar } from 'src/components/ui/calendar'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postBanUser } from 'src/api/admin/ban-user'
import { toast } from 'src/components/ui/use-toast'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select'
const DATE_REQUIRED_ERROR = 'Date is required.'

const FormSchema = z.object({
  reason: z.string(),
  duration: z
    .object(
      {
        from: z.date().optional(),
        to: z.date().optional(),
      },
      { required_error: DATE_REQUIRED_ERROR },
    )
    .refine((date) => {
      return !!date.from
    }, DATE_REQUIRED_ERROR),
})

type FormData = z.infer<typeof FormSchema>
function BanUser({ userId }: { userId: string }) {
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      duration: {
        from: new Date(),
        to: undefined,
      },
      reason: '',
    },
  })
  const query = useQueryClient()
  const banUser = useMutation((formData: IBan) => postBanUser(formData), {
    onSuccess: (data) => {
      if (data) {
        toast({
          title: 'Success',
          description: 'Ban User Success!!!',
        })
      } else {
        toast({
          title: 'Failed',
          description: 'Ban User Failed!!!',
        })
      }
      query.invalidateQueries()
    },
    onError: (error: Error) => {
      toast({
        title: 'Error Ban User',
        description: error.message,
      })
    },
  })

  if (banUser.isLoading) {
    return <div className="loader">Updating...</div>
  }

  if (banUser.isError) {
    return <div className="error">{`Error: ${banUser.error}`}</div>
  }

  const formatDuration = (startDate: Date, endDate: Date): string => {
    const days = differenceInDays(endDate, startDate)
    const hours = differenceInHours(endDate, startDate) % 24
    const minutes = differenceInMinutes(endDate, startDate) % 60
    const seconds = differenceInSeconds(endDate, startDate) % 60

    return `${days}.${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`
  }

  const onSubmit = (data: FormData) => {
    const formData: IBan = {
      ...data,
      userId: userId,
      duration: formatDuration(data.duration.from!, data.duration.to!),
    }
    banUser.mutate(formData)
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Ban</Button>
      </DialogTrigger>
      <DialogContent className="mt-16">
        <DialogHeader>
          <DialogTitle>Ban User</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason</FormLabel>
                  <FormControl>
                    <Input placeholder="Reason..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Duration</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          id="date"
                          variant={'outline'}
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !field.value.from && 'text-muted-foreground',
                          )}
                        >
                          <CalendarHeart className="mr-2 h-4 w-4" />
                          {field.value.from ? (
                            field.value.to ? (
                              <>
                                {format(field.value.from, 'LLL dd, y')} - {format(field.value.to, 'LLL dd, y')}
                              </>
                            ) : (
                              format(field.value.from, 'LLL dd, y')
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="flex w-auto flex-col space-y-2 p-2">
                      <Select
                        onValueChange={(value) =>
                          field.onChange({
                            from: field.value.from,
                            to: addDays(field.value.from as Date, parseInt(value)),
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="0">Today</SelectItem>
                          <SelectItem value="1">Tomorrow</SelectItem>
                          <SelectItem value="3">In 3 days</SelectItem>
                          <SelectItem value="7">In a week</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="rounded-md border">
                        <Calendar
                          mode="range"
                          defaultMonth={field.value?.from}
                          selected={{ from: field.value.from, to: field.value.to }}
                          onSelect={field.onChange}
                          numberOfMonths={2}
                          initialFocus
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <Button className="mt-4" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
export default BanUser
