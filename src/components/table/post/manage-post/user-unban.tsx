import { useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from 'src/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from 'src/components/ui/form'
import { IBan } from 'src/types/ban'
import { Input } from 'src/components/ui/input'
import { Button } from 'src/components/ui/button'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postUpdateBanUser } from 'src/api/admin/ban-user'
import { toast } from 'src/components/ui/use-toast'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'

const FormSchema = z.object({
  reason: z.string(),
})

type FormData = z.infer<typeof FormSchema>
function UpdateBanUser({ userId }: { userId: string }) {
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      reason: '',
    },
  })
  const query = useQueryClient()
  const banUser = useMutation((formData: IBan) => postUpdateBanUser(formData), {
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

  if (banUser.isError) {
    return <div className="error">{`Error: ${banUser.error}`}</div>
  }

  const onSubmit = (data: FormData) => {
    const formData: IBan = {
      ...data,
      userId: userId,
    }
    banUser.mutate(formData)
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Update Ban</Button>
      </DialogTrigger>
      <DialogContent className="mt-16">
        <DialogHeader>
          <DialogTitle>Update Ban User</DialogTitle>
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
            <Button disabled={banUser.isLoading} className="my-2" type="submit">
              {banUser.isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ''} Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
export default UpdateBanUser
