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
import { MultiSelect } from '../ui/multi-select'
import { useTranslation } from 'react-i18next'

type Props = {
  onFilterChange?: (filter: Record<string, unknown>) => void
  totalBooks?: number
}

const FilterSchema = z.object({
  Name: z.string().optional(),
  CategoryIds: z.string().optional(),
  MinPrice: z.string().optional(),
  MaxPrice: z.string().optional(),
  OverRating: z.string().optional(),
  Type: z.string().optional(),
})

type FilterForm = z.infer<typeof FilterSchema>
function BookFilterSideBar({ onFilterChange, totalBooks }: Props) {
  const [searchParams, setSearchParams] = useSearchParams()
  const { control, handleSubmit, reset, setValue, watch } = useForm<FilterForm>({
    resolver: zodResolver(FilterSchema),
  })
  const { isLoading: isCategoryLoading, data: categories } = useGetAllCategory()
  const [selected, setSelected] = useState<string[]>([])

  useEffect(() => {
    setValue('CategoryIds', selected.join(','))
  }, [selected])

  const categoriesCombobox = useMemo(() => {
    if (!categories) return []
    else
      return categories.map<IComboboxData>((ct) => ({
        label: ct.cateName,
        value: ct.cateId || '',
      }))
  }, [categories])

  useEffect(() => {
    const search = searchParams.get('Name') || ''
    const MinPrice = searchParams.get('MinPrice') || ''
    const MaxPrice = searchParams.get('MaxPrice') || ''
    const OverRating = searchParams.get('OverRating') || ''
    const Type = searchParams.get('Type') || ''
    const CategoryIds = searchParams.get('CategoryIds') || ''

    setSelected(CategoryIds.split(','))

    setValue('Name', search)
    setValue('CategoryIds', CategoryIds.split(',').join(','))
    setValue('MinPrice', MinPrice)
    setValue('MaxPrice', MaxPrice)
    setValue('OverRating', OverRating)
    setValue('Type', Type)

    control.handleSubmit((data) => {
      onFilterChange && onFilterChange(data)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const onSubmit = React.useCallback(
    (data: FilterForm) => {
      const searchParams = new URLSearchParams()

      data.Name && searchParams.set('Name', data.Name)
      data.MinPrice && searchParams.set('MinPrice', data.MinPrice)
      data.MaxPrice && searchParams.set('MaxPrice', data.MaxPrice)
      data.OverRating && searchParams.set('OverRating', data.OverRating)
      data.Type && searchParams.set('Type', data.Type)
      data.CategoryIds && searchParams.set('CategoryIds', data.CategoryIds)

      setSearchParams(searchParams, { replace: true })

      if (onFilterChange) {
        onFilterChange(data)
      }
    },
    [onFilterChange, setSearchParams],
  )

  // const [clearFlag, setClearFlag] = useState(false)
  const onClear = React.useCallback(() => {
    reset()
    // setClearFlag((prev) => !prev)
  }, [reset])

  const { t } = useTranslation('translation')

  return (
    <React.Fragment key={'sidebar.filter'}>
      {totalBooks && (
        <p className="text-sm text-slate-500">
          {totalBooks} {t('booksfound')}
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <span className="my-2 flex flex-row items-center py-3">
            <Filter /> <p className="pl-2 text-lg font-extrabold">{t('SearchFilter')} </p>
          </span>
          <Separator />
          <div aria-label="Name">
            <Label htmlFor="Name">{t('Findbook')}</Label>
            <Input placeholder={t('Searchnameofbook')} id="Name" {...control.register('Name')} className="bg-card" />
          </div>
          <div>
            <Label htmlFor="CategoryIds">{t('Category')}</Label>
            <MultiSelect options={categoriesCombobox} selected={selected} onChange={setSelected} />
          </div>
          <div>
            <Label htmlFor="Type">{t('Type')}</Label>
            <Select
              onValueChange={(value) => {
                setValue('Type', value)
              }}
              value={watch('Type')}
            >
              <SelectTrigger className="bg-orange-50 text-gray-500">
                <SelectValue placeholder={t('Type')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="hover:bg-orange-500" value="New">
                  {t('NEW')}
                </SelectItem>
                <SelectItem className="hover:bg-orange-500" value="Old">
                  {t('OLD')}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="price">{t('Price')}</Label>
            <div className="flex flex-row items-center">
              <Input placeholder={t('From')} id="MinPrice" {...control.register('MinPrice')} className="bg-card" />
              <p className="p-2">-</p>
              <Input placeholder={t('To')} id="MaxPrice" {...control.register('MaxPrice')} className="bg-card" />
            </div>
          </div>
          <div>
            <Label htmlFor="OverRating">{t('OverRating')}</Label>
            <Select
              onValueChange={(value) => {
                setValue('OverRating', value)
              }}
              value={watch('OverRating')}
            >
              <SelectTrigger className="bg-orange-50 text-gray-500">
                <SelectValue placeholder={t('ChooseOverRating')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="hover:bg-orange-500" value="1">
                  <p className="flex-row">1 {t('andmore')}</p>
                </SelectItem>
                <SelectItem className="hover:bg-orange-500" value="2">
                  <p className="flex-row">2 {t('andmore')}</p>
                </SelectItem>
                <SelectItem className="hover:bg-orange-500" value="3">
                  <p className="flex-row">3 {t('andmore')}</p>
                </SelectItem>
                <SelectItem className="hover:bg-orange-500" value="4">
                  <p className="flex-row">4 {t('andmore')}</p>
                </SelectItem>
                <SelectItem className="hover:bg-orange-500" value="5">
                  <p className="flex-row">5 {t('andmore')}</p>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Separator />
        <div className="flex justify-between">
          <Button type="submit">{t('Findnow')}</Button>
          <Button variant={'ghost'} type="button" onClick={onClear} className="">
            {t('Clear')}
          </Button>
        </div>
      </form>
    </React.Fragment>
  )
}
export default BookFilterSideBar
