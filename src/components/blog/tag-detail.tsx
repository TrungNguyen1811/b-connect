// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { Button } from '../ui/button'
// import { ICategory } from 'src/types'
// import { getCategoryById } from 'src/api/categories/get-category'
// import { deleteUserTargetedCategories } from 'src/api/blog/delete-blog'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { toast } from '../ui/use-toast'

// function TagDetail({ id }: { id: string }) {
//   const [tag, setTag] = useState<ICategory>()
//   const queryClient = useQueryClient()

//   useEffect(() => {
//     const fetchTag = async () => {
//       try {
//         const tagData: ICategory = await getCategoryById(id as string)
//         setTag(tagData)
//       } catch (error) {
//         console.error('Error fetching category:', error)
//         // Handle the error as needed
//       }
//     }

//     fetchTag()
//   }, [id])

//   const { mutate } = useMutation(deleteUserTargetedCategories, {
//     onSuccess: (data) => {
//       if (data == 'Successful!')
//         toast({
//           title: 'Successful!',
//           description: 'UnFollowing Tag Success!!!',
//         })
//       queryClient.invalidateQueries()
//     },
//     onError: (error: Error) => {
//       toast({
//         title: 'Failed!',
//         description: 'UnFollowing Tag Fail with Error' + error.message,
//       })
//     },
//   })

//   const onDelete = (id: string) => {
//     mutate(id)
//   }

//   return (
//     <div className="h-48 w-full rounded-lg border-2 bg-orange-100">
//       <div className="flex h-full flex-col justify-between p-4 pb-1">
//         <div className="px-1">
//           <Link to={`/blog/${tag?.cateId}`}>
//             <p className="font-semibold">#{tag?.cateName}</p>
//           </Link>
//         </div>
//         <div className="p-1">
//           <p className="text-sm font-light">
//             {tag?.description && tag.description.length > 50 ? `${tag.description.slice(0, 100)}...` : tag?.description}
//           </p>
//         </div>
//         <div className="flex flex-row items-end justify-between p-1 py-2">
//           <Button onClick={() => onDelete(id as string)}>Following</Button>
//         </div>
//       </div>
//     </div>
//   )
// }
// export default TagDetail
