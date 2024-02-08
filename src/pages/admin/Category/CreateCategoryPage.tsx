// import React from 'react'
// import Breadcrumb from 'src/components/breadcrumb/breadcrumb'
// import { IBreadcrumb } from 'src/components/breadcrumb/type'
// import MetaData from 'src/components/metadata'
// import { CreateCategoryForm } from 'src/components/table/category/manage/create-category'
// import { columns } from 'src/components/table/user/column'
// import { CreateUserForm } from 'src/components/table/user/manage-user/create-user'
// import { useUserTable } from 'src/components/table/user/useUserTable'
// import { Heading } from 'src/components/ui/heading'
// import { Separator } from 'src/components/ui/separator'

// function CreateCategoryPage() {
//   const { data } = useUserTable(columns)

//   const title = 'Create Category'
//   const description = 'Add a new category'

//   const breadcrumb = React.useMemo<IBreadcrumb[]>(() => {
//     return [
//       {
//         label: 'DashBoard',
//         key: 'dashboard',
//         href: '/admin',
//         icon: 'dashboard',
//       },
//       {
//         key: 'manage_category',
//         label: 'Manage Category',
//         href: `/admin/manage/category`,
//       },
//       {
//         key: 'create_category',
//         label: 'Create Category',
//       },
//     ]
//   }, [])
//   return (
//     <div className="mx-8 w-full">
//       <MetaData title={'Create Category'} />
//       {<Breadcrumb items={breadcrumb} className="max-w-7xl py-4" />}
//       <Heading title={title} description={description} />
//       <Separator className="mt-4" />
//       <CreateCategoryForm />
//     </div>
//   )
// }

// export default CreateCategoryPage
