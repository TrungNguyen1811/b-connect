import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import useGetAllCategory from 'src/hooks/useGetManyCategories'
import { z } from 'zod'
import { IComboboxData } from '../ui/combobox'
import React, { useEffect, useMemo, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/selector'
import { Filter } from 'lucide-react'
import { Separator } from '../ui/separator'
import { SearchCategory } from './search-categories'

type Props = {
  onFilterChange?: (filter: Record<string, unknown>) => void
  totalBooks?: number
  onRentAll?: () => void
}

const FilterSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  rating: z.string().optional(),
  status: z.string().optional(),
})
type FilterForm = z.infer<typeof FilterSchema>
function BookFilterSideBar({ onFilterChange, totalBooks }: Props) {
  const [searchParams, setSearchParams] = useSearchParams()
  const { control, handleSubmit, reset, setValue, watch } = useForm<FilterForm>({
    resolver: zodResolver(FilterSchema),
  })
  const { isLoading: isCategoryLoading, data: categories } = useGetAllCategory()
  const categoriesCombobox = useMemo(() => {
    if (!categories) return []
    else
      return categories.map<IComboboxData>((ct) => ({
        label: ct.name,
        value: ct._id || '',
      }))
  }, [categories])

  useEffect(() => {
    const search = searchParams.get('search') || ''
    const minPrice = searchParams.get('minPrice') || ''
    const maxPrice = searchParams.get('maxPrice') || ''
    const rating = searchParams.get('rating') || ''
    const category = searchParams.get('category') || ''
    const status = searchParams.get('status') || ''

    setValue('search', search)
    setValue('category', category)
    setValue('minPrice', minPrice)
    setValue('maxPrice', maxPrice)
    setValue('rating', rating)
    setValue('status', status)

    control.handleSubmit((data) => {
      onFilterChange && onFilterChange(data)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])
  const onSubmit = React.useCallback(
    (data: FilterForm) => {
      const searchParams = new URLSearchParams()

      data.search && searchParams.set('search', data.search)
      data.category && searchParams.set('category', data.category)
      data.minPrice && searchParams.set('minPrice', data.minPrice)
      data.maxPrice && searchParams.set('maxPrice', data.maxPrice)
      data.rating && searchParams.set('rating', data.rating)
      data.status && searchParams.set('status', data.status)

      setSearchParams(searchParams, { replace: true })

      if (onFilterChange) {
        onFilterChange(data)
      }
    },
    [onFilterChange, setSearchParams],
  )
  const [clearFlag, setClearFlag] = useState(false)
  const onClear = React.useCallback(() => {
    reset()
    setClearFlag((prev) => !prev)
  }, [reset])

  return (
    <React.Fragment key={'sidebar.filter'}>
      {totalBooks && <p className="text-sm text-slate-500">{totalBooks} books found</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <span className="my-2 flex flex-row items-center py-3">
            <Filter /> <p className="pl-2 text-lg font-extrabold">Search Filter </p>
          </span>
          <Separator />
          <div aria-label="search">
            <Label htmlFor="search">Find book</Label>
            <Input placeholder="Search name of book" id="search" {...control.register('search')} className="bg-card" />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <SearchCategory
              isLoading={isCategoryLoading}
              data={categoriesCombobox}
              defaultValue={watch('category')}
              onSelection={(category) => setValue('category', category)}
              clear={clearFlag}
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              onValueChange={(value) => {
                setValue('status', value)
              }}
              value={watch('status')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="hover:bg-accent" value="NEW">
                  NEW
                </SelectItem>
                <SelectItem className="hover:bg-accent" value="OLD">
                  OlD
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <div className="-center flex flex-row">
              <Input placeholder="From" id="minPrice" {...control.register('minPrice')} className="bg-card" />
              <p className="p-2">-</p>
              <Input placeholder="To" id="maxPrice" {...control.register('maxPrice')} className="bg-card" />
            </div>
          </div>
          <div>
            <Label htmlFor="rating">Rating</Label>
            <Select
              onValueChange={(value) => {
                setValue('rating', value)
              }}
              value={watch('rating')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="hover:bg-accent" value="1">
                  <p className="flex-row">1 * and more</p>
                </SelectItem>
                <SelectItem className="hover:bg-accent" value="2">
                  <p className="flex-row">2 * and more</p>
                </SelectItem>
                <SelectItem className="hover:bg-accent" value="3">
                  <p className="flex-row">3 * and more</p>
                </SelectItem>
                <SelectItem className="hover:bg-accent" value="4">
                  <p className="flex-row">4 * and more</p>
                </SelectItem>
                <SelectItem className="hover:bg-accent" value="5">
                  <p className="flex-row">5 * and more</p>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Separator />
        <div className="flex justify-between">
          <Button type="submit">Find now</Button>
          <Button variant={'ghost'} type="button" onClick={onClear} className="">
            Clear
          </Button>
        </div>
      </form>
    </React.Fragment>
  )
}
export default BookFilterSideBar
