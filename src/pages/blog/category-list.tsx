// import { useEffect, useState } from 'react'
// import { getAllCategory } from 'src/api/categories/get-category'
// import Interested from 'src/components/blog/category-manage'
// import { Button } from 'src/components/ui/button'
// import { ICategory } from 'src/types'

// function CategoryList() {
//   const [categories, setCategories] = useState<ICategory[]>()

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const categoriesData = await getAllCategory()
//         setCategories(categoriesData)
//       } catch (error) {
//         console.error('Error fetching data:', error)
//       }
//     }

//     fetchData()
//   }, [])

//   return (
//     <div className="mx-28">
//       <div className="mb-4 flex flex-col">
//         <p className="p-4 text-3xl font-bold">Categories</p>
//       </div>
//       <div className="h-full w-full">
//         {categories ? (
//           categories?.map((category, index) => (
//             <div className="grid h-full w-full sm:grid-cols-1 sm:gap-1 md:grid-cols-3 md:gap-3" key={index}>
//               {category?.categoryId && <Interested id={category.categoryId} />}
//             </div>
//           ))
//         ) : (
//           <div className="flex flex-col items-center">
//             <img
//               className="pb-6 pt-16"
//               src="https://media.dev.to/cdn-cgi/image/width=300,height=,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2Fy5767q6brm62skiyywvc.png"
//             />
//             <p className="text-lg">
//               This is where you can manage your categories, but you are not interested in any categories yet.
//             </p>
//             <Button className="text-md mx-8 my-6 p-6">Add more categories which you are interested in</Button>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
// export default CategoryList
