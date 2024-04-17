import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { CalendarIcon, CheckIcon, Loader2, SortAscIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { postAddBook } from 'src/api/books/post-add-book'
import { Button } from 'src/components/ui/button'
import { Calendar } from 'src/components/ui/calendar'
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from 'src/components/ui/command'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover'
import { Textarea } from 'src/components/ui/text-area'
import { toast } from 'src/components/ui/use-toast'
import { cn } from 'src/lib/utils'
import { BOOK_TYPE } from 'src/types/books'
import { z } from 'zod'
import { bookSchema } from './validation'
import useGetAllCategory from 'src/hooks/useGetManyCategories'
import { useEffect, useMemo, useState } from 'react'
import { IComboboxData } from 'src/components/ui/combobox'
import { MultiSelect } from 'src/components/ui/multi-select'

type FormData = z.infer<typeof bookSchema>
function AddBookPage() {
  const form = useForm<FormData>({ resolver: zodResolver(bookSchema) })
  const queryClient = useQueryClient()
  const typeBook = [
    { label: 'NEW', value: 'New' },
    { label: 'OLD', value: 'Old' },
  ]

  const { data: categories } = useGetAllCategory()
  const [selected, setSelected] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    form.setValue('category', selected)
  }, [selected])

  const categoriesCombobox = useMemo(() => {
    if (!categories) return []
    else
      return categories.map<IComboboxData>((ct) => ({
        label: ct.cateName,
        value: ct.cateName || '',
      }))
  }, [categories])

  const { mutate: addBook } = useMutation((data: FormData) => postAddBook(data), {
    onSuccess: (data) => {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        if (data == 'Successful') {
          toast({
            title: 'Success',
            description: 'Add Book Success!!!',
          })
        } else {
          toast({
            title: 'Failed',
            description: 'Add Book Failed with' + ' ' + data,
          })
        }
        queryClient.invalidateQueries()
      }, 2000)
    },
    onError: (error: Error) => {
      toast({
        title: 'Error Add Book',
        description: error.message,
      })
    },
  })
  const onSubmit = (data: FormData) => {
    addBook(data)
  }
  return (
    <div className="h-full ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="bg-gray-100 px-12 pb-16 pt-8">
            <p className="py-2 text-lg font-semibold">Basic Information</p>
            <div className="mx-4">
              <FormField
                control={form.control}
                name="bookImg"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center">
                    <FormLabel className="w-40 pr-2 text-right">Book Img</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="backgroundImg"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center">
                    <FormLabel className="w-40 pr-2 text-right">Background Img</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center">
                    <FormLabel className="w-40 pr-2 text-right"> Name book</FormLabel>
                    <FormControl>
                      <Input placeholder="book name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center">
                    <FormLabel className="w-40 pr-2 text-right">Author</FormLabel>
                    <FormControl>
                      <Input placeholder="author" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* <FormField
              control={form.control}
              name=""
              render={({ field }) => (
                <FormItem className="flex flex-row items-center">
                  <FormLabel className="w-40 text-right pr-2">Category</FormLabel>
                  <FormControl>
                    <Input placeholder="author" {...field} />
                  </FormControl>
                </FormItem>
              )}
            /> */}

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start">
                    <FormLabel className="w-40 pr-2 text-right"> Description</FormLabel>
                    <FormControl>
                      <Textarea className="h-40 bg-white" placeholder="Show more detail about book" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center">
                    <FormLabel className="mr-2 w-32 text-right">Type of Book</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn('ml-1 justify-between bg-white', !field.value && 'text-muted-foreground')}
                          >
                            {field.value
                              ? typeBook.find((type) => type.value === field.value)?.label
                              : 'Select type book'}
                            <SortAscIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className=" p-0">
                        <Command>
                          <CommandInput placeholder="Search framework..." className="h-9" />
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {typeBook.map((type) => (
                              <CommandItem
                                value={type.label}
                                key={type.value}
                                onSelect={() => {
                                  form.setValue('type', type.value as BOOK_TYPE)
                                }}
                              >
                                {type.label}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    type.value === field.value ? 'opacity-100' : 'opacity-0',
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={() => (
                  <FormItem className="flex flex-row items-center">
                    <FormLabel className="w-40 pr-2 text-right">Category</FormLabel>
                    <MultiSelect options={categoriesCombobox} selected={selected} onChange={setSelected} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center">
                    <FormLabel className="w-40 pr-2 text-right">Price</FormLabel>
                    <FormControl>
                      <Input placeholder="price" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center">
                    <FormLabel className="w-40 pr-2 text-right">Quantity</FormLabel>
                    <FormControl>
                      <Input placeholder="quantity" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="publishDate"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center">
                    <FormLabel className="mr-2 w-32 text-right">PublishDate</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'ml-1 w-[240px] bg-white pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="fixed bottom-0 flex-grow border-t-2 bg-white text-right">
            <div className="w-[90rem]">
              <Button disabled={isLoading} className="my-2 mr-96 w-32" type="submit">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Submit'}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
export default AddBookPage
