import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/selector'
import { Filter } from 'lucide-react'
import { Separator } from '../ui/separator'
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
  Type: z.string().optional(),
})

type FilterForm = z.infer<typeof FilterSchema>
function BookFilterSeller({ onFilterChange, totalBooks }: Props) {
  const [searchParams, setSearchParams] = useSearchParams()
  const { control, handleSubmit, reset, setValue, watch } = useForm<FilterForm>({
    resolver: zodResolver(FilterSchema),
  })

  useEffect(() => {
    const search = searchParams.get('Name') || ''
    const MinPrice = searchParams.get('MinPrice') || ''
    const MaxPrice = searchParams.get('MaxPrice') || ''
    const Type = searchParams.get('Type') || ''

    setValue('Name', search)
    setValue('MinPrice', MinPrice)
    setValue('MaxPrice', MaxPrice)
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
      data.Type && searchParams.set('Type', data.Type)
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
            <Label htmlFor="Type">{t('Type')}</Label>
            <Select
              onValueChange={(value) => {
                setValue('Type', value)
              }}
              value={watch('Type')}
            >
              <SelectTrigger className="bg-white text-gray-500">
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
export default BookFilterSeller
