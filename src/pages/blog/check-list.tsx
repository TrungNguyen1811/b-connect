import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { getCheckList, putCheckList } from 'src/api/blog/interested'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { toast } from 'src/components/ui/use-toast'
import { useAuth } from 'src/hooks/useAuth'
import { ICheckList } from 'src/types/advertisement'
import { ROLE } from 'src/types/user'
import { z } from 'zod'

const formSchema = z.object({
  //   tradeDetailsId: z.string(),
  //   target: z.string().optional(),
  bookOwnerUploadDir: z.any().optional(),
  middleUploadDir: z.any().optional(),
})
type FormData = z.infer<typeof formSchema>

function CheckListItemForm({
  id,
  target,
  checkList,
  isStaff,
  onSubmit,
}: {
  id: string
  target: string
  isStaff: boolean
  checkList: ICheckList
  onSubmit: (data: ICheckList) => void
}) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })
  const handleSubmit = (data: FormData) => {
    const formData: ICheckList = {
      ...data,
      id: checkList.id,
      target: target,
      tradeDetailsId: id as string,
    }
    console.log('formData', formData)
    onSubmit(formData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-row items-center gap-4">
          <FormLabel className="w-48">Target: {target}</FormLabel>
          {isStaff ? (
            <FormField
              control={form.control}
              name="middleUploadDir"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-4">
                  <FormLabel>UploadDir:</FormLabel>
                  <img src={checkList.middleUploadDir as string} className="h-16" />
                  <FormControl>
                    <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0] || null)} />
                  </FormControl>
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="bookOwnerUploadDir"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-4">
                  <FormLabel>UploadDir:</FormLabel>
                  <img src={checkList.bookOwnerUploadDir as string} className="h-16" />
                  <FormControl>
                    <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0] || null)} />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )
}

function CheckListPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [checkList, setCheckList] = useState<ICheckList[]>()
  const [targets, setTarget] = useState<string[]>()
  const queryClient = useQueryClient()

  useEffect(() => {
    const fetchCheckList = async () => {
      const checkList = await getCheckList(id as string)
      setCheckList(checkList)
    }
    fetchCheckList()
  }, [id])

  useEffect(() => {
    if (checkList) {
      const targets = checkList.map((item) => item.target)
      setTarget(targets)
    }
  }, [checkList])

  const submitCheckList = useMutation((formData: ICheckList) => putCheckList(formData), {
    onSuccess: (formData) => {
      if (formData) {
        toast({
          title: 'Success',
          description: 'Submit Target Success!!!',
        })
        queryClient.invalidateQueries()
      } else {
        toast({
          title: 'Failed',
          description: 'Submit Target Failed!!!',
        })
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error Submit Target',
        description: error.message,
      })
    },
  })
  const handleSubmitForm = (formData: ICheckList) => {
    submitCheckList.mutate(formData)
  }

  return (
    <div className="mx-32 min-h-[42rem]">
      <div>
        {targets?.map((target, index) => (
          <div key={index}>
            <CheckListItemForm
              checkList={checkList?.find((ck) => ck.target == target) as ICheckList}
              id={id as string}
              target={target}
              isStaff={user?.roles?.includes(ROLE.STAFF) || false}
              onSubmit={handleSubmitForm}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
export default CheckListPage
