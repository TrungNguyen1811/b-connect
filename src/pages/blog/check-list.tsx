import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
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

function isImage(url: string) {
  console.log('test', /\.(jpeg|jpg|gif|png)$/i.test(url))
  return /\.(jpeg|jpg|gif|png)$/i.test(url)
}

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
  loading,
  onSubmit,
  onImageChange,
}: {
  id: string
  target: string
  isStaff: boolean
  loading: boolean
  checkList: ICheckList
  onSubmit: (data: ICheckList) => void
  onImageChange: (value: React.SetStateAction<string>) => void
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
                  <FormLabel>MiddleUploadDir:</FormLabel>
                  {checkList.middleUploadDir &&
                    (isImage(checkList.middleUploadDir as string) ? (
                      <img
                        src={checkList.middleUploadDir as string}
                        className="h-16 w-12"
                        onClick={() => onImageChange(checkList.middleUploadDir as string)}
                        onMouseEnter={() => onImageChange(checkList.middleUploadDir as string)}
                      />
                    ) : (
                      <video
                        src={checkList.middleUploadDir as string}
                        className="h-16 w-12 rounded-md"
                        onClick={() => onImageChange(checkList.middleUploadDir as string)}
                        onMouseEnter={() => onImageChange(checkList.middleUploadDir as string)}
                        controls
                      ></video>
                    ))}
                  <FormControl>
                    <Input type="file" onChange={(e) => field.onChange(e.target.files?.[0] || null)} />
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
                  {checkList.bookOwnerUploadDir &&
                    (isImage(checkList.bookOwnerUploadDir as string) ? (
                      <img
                        src={checkList.bookOwnerUploadDir as string}
                        className="h-16 w-12"
                        onClick={() => onImageChange(checkList.bookOwnerUploadDir as string)}
                        onMouseEnter={() => onImageChange(checkList.bookOwnerUploadDir as string)}
                      />
                    ) : (
                      <video
                        src={checkList.bookOwnerUploadDir as string}
                        className="h-16 w-12 rounded-md"
                        onClick={() => onImageChange(checkList.bookOwnerUploadDir as string)}
                        onMouseEnter={() => onImageChange(checkList.bookOwnerUploadDir as string)}
                        controls
                      ></video>
                    ))}
                  <FormControl>
                    <Input type="file" onChange={(e) => field.onChange(e.target.files?.[0] || null)} />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          {/* <Button type="submit">Submit</Button> */}
          <Button disabled={loading} className="mt-2" type="submit">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ''}Submit
          </Button>
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
  const [selectedImage, setSelectedImage] = useState<string>()

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

  const handleImageChange = (value: React.SetStateAction<string>) => {
    setSelectedImage(value as string)
  }
  return (
    <div className="mx-16 flex min-h-[42rem] flex-row items-center justify-start">
      <div>
        {targets?.map((target, index) => (
          <div key={index}>
            <CheckListItemForm
              checkList={checkList?.find((ck) => ck.target == target) as ICheckList}
              id={id as string}
              target={target}
              isStaff={user?.roles?.includes(ROLE.STAFF) as boolean}
              onSubmit={handleSubmitForm}
              onImageChange={handleImageChange}
              loading={submitCheckList.isLoading}
            />
          </div>
        ))}
      </div>
      <div className="mx-auto">
        {isImage(selectedImage as string) ? (
          <img src={selectedImage} alt="Selected Image" className="max-w-[32rem] rounded-sm object-cover shadow-md" />
        ) : (
          <video
            controls
            src={selectedImage}
            className="w-[32rem] max-w-[32rem] rounded-sm object-cover shadow-md"
          ></video>
        )}
      </div>
    </div>
  )
}
export default CheckListPage
