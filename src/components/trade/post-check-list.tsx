// import { zodResolver } from '@hookform/resolvers/zod'
// import React, { useEffect, useState } from 'react'
// import { useForm, useForm } from 'react-hook-form'
// import { ITradeDetail, getCheckList } from 'src/api/blog/interested'
// import { ICheckList } from 'src/types/advertisement'
// import { z } from 'zod'

// interface TradeProps {
//   tradeDetail: ITradeDetail
// }

// const checkListSchema = z.object({
//   id: z.string().optional(),
//   tradeDetailsId: z.string().optional(),
//   target: z.string().optional(),
//   bookOwnerUploadDir: z.any(),
//   middleUploadDir: z.any(),
// })
// type FormData = z.infer<typeof checkListSchema>
// function PostCheckList(tradeDetail: TradeProps) {
//   const [checkList, setCheckList] = useState<ICheckList[]>([])

//   useEffect(() => {
//     const fetchCheckList = async () => {
//       const getList = await getCheckList(tradeDetail.tradeDetail.details.tradeDetailId)
//       setCheckList(getList)
//     }
//     fetchCheckList()
//   }, [tradeDetail.tradeDetail.details.tradeDetailId])

//   const form = useForm<FormData>({
//     resolver: zodResolver(checkListSchema),
//     defaultValues: {
//       id: checkList[0].id,
//       tradeDetailsId: checkList.tradeDetailsId,
//       target: checkList.target,
//       bookOwnerUploadDir: checkList.bookOwnerUploadDir,
//       middleUploadDir: checkList.middleUploadDir,
//     },
//   })

//   const submitTradeMutation = useMutation((formData: ISubmitTrade) => putSubmitTrade(formData), {
//     onSuccess: (formData) => {
//       if (formData) {
//         toast({
//           title: 'Success',
//           description: 'Submit Trade Success!!!',
//         })
//       } else {
//         toast({
//           title: 'Failed',
//           description: 'Submit Trade Failed!!!',
//         })
//       }
//       queryClient.invalidateQueries()
//     },
//     onError: (error: Error) => {
//       toast({
//         title: 'Error Update User',
//         description: error.message,
//       })
//     },
//   })

//   const onSubmit = async (data: FormData) => {
//     const formData: ISubmitTrade = {
//       postId: id as string,
//       tradeDetailsId: userTrade?.details.tradeDetailId as string,
//       isPostOwner: isOwner,
//       city_Province: data.city_Province,
//       district: data.district,
//       subDistrict: data.subDistrict,
//       rendezvous: data.rendezvous,
//       phone: data.phone,
//       note: data.note,
//     }

//     submitTradeMutation.mutate(formData)
//   }

//   return <div></div>
// }

// export default PostCheckList
