// import { Dialog, DialogContent, DialogHeader } from 'src/components/ui/dialog'
// import { Button } from '../ui/button'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { toast } from '../ui/use-toast'
// import { useState } from 'react'
// import { postInterestedPost } from 'src/api/blog/interested'
// import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
// import { Input } from '../ui/input'
// import { z } from 'zod'
// import { ITradeInterested } from 'src/types/interester'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'

// interface Props {
//   postId: string
//   boolean: boolean
// }
// const formSchema = z.object({
//   video: z.any(),
// })
// type FormData = z.infer<typeof formSchema>

// function InterestedPost({ postId, boolean }: Props) {
//   const form = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//   })

//   const [open, setOpen] = useState<boolean>(boolean)
//   const queryClient = useQueryClient()

//   const postInterestedTrade = useMutation((data: ITradeInterested) => postInterestedPost(data), {
//     onSuccess: (status) => {
//       if (status === 200) {
//         console.log('Successful!!!')
//         toast({
//           title: 'Successful!!!',
//           description: 'Interested trade post success!',
//         })
//         setOpen(false)
//         queryClient.invalidateQueries()
//       } else {
//         toast({
//           title: 'Invalid interested trade response',
//           description: 'Interested trade post false',
//         })
//       }
//     },
//     onError: (error: any) => {
//       toast({
//         title: 'Error Submitting Form',
//         description: error.response.data,
//       })
//     },
//   })
//   const onSubmit = async (data: FormData) => {
//     const formData: ITradeInterested = {
//       postId: postId,
//       video: data.video,
//     }
//     postInterestedTrade.mutate(formData)
//   }
//   return (
//     <div>
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="h-[12rem] w-[36rem]">
//           <DialogHeader className="font-semibold">Video</DialogHeader>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)}>
//               <FormField
//                 name="video"
//                 control={form.control}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Video</FormLabel>
//                     <FormControl>
//                       <Input
//                         className="screen-reader-only"
//                         type="file"
//                         onChange={(e) => field.onChange(e.target.files?.[0] || null)}
//                       />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//             </form>
//           </Form>
//           <div className="flex flex-row justify-between">
//             <Button type="submit">Submit</Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }
// export default InterestedPost
