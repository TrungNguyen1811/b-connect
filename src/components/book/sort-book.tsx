import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/selector'
import { Label } from '../ui/label'
import { useTranslation } from 'react-i18next'
// const FilterSchema = z.object({
//   price: z.string().optional(),
// })
// type FilterForm = z.infer<typeof FilterSchema>

function SortBook() {
  const { t } = useTranslation()
  //   const { handleSubmit, setValue, watch } = useForm<FilterForm>({
  //     resolver: zodResolver(FilterSchema),
  //   })
  return (
    <div className=" mb-4 flex w-[102%] flex-row bg-gray-300 p-4">
      <div className="mr-4 py-1">
        <p>{t('sort')}</p>
      </div>
      <div className="flex w-[48rem] flex-row">
        <div className="mr-4  flex flex-row">
          <div className="mx-1 rounded-sm bg-orange-50 px-4 py-1">{t('popular')}</div>
          <div className="mx-1 rounded-sm bg-orange-50 px-4 py-1">{t('laster')}</div>
          <div className="mx-1 rounded-sm bg-orange-50 px-4 py-1">{t('top-sale')}</div>
        </div>
        <div>
          <div>
            {/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-8"> */}
            <Label htmlFor="price"></Label>
            <Select
            //   onValueChange={(value) => {
            //     setValue('price', value)
            //   }}
            //   value={watch('price')}
            >
              <SelectTrigger className="w-48 bg-orange-50">
                <SelectValue placeholder={t('Price')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="hover:bg-accent" value="LOW">
                  {t('sort-price')}
                </SelectItem>
                <SelectItem className="hover:bg-accent" value="HIGH">
                  {t('sort-price-d')}
                </SelectItem>
              </SelectContent>
            </Select>
            {/* </form> */}
          </div>
        </div>
      </div>

      {/* <div className="mx-1">
        <div className="ml-54 my-1 ">1/10</div>
      </div> */}
    </div>
  )
}

export default SortBook
