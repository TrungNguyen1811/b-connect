// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { Button } from 'src/components/ui/button'
// import { postUnbanUserApi } from 'src/apis/users/post-unban-user'

// export function UnBanUserApi({ userId }: { userId: string }) {
//   const queryClient = useQueryClient()

//   // Tạo mutation để ban user
//   const unbanUserMutation = useMutation(() => postUnbanUserApi(userId), {
//     onSuccess: () => {
//       // Sau khi mutation hoàn thành thành công, bạn có thể làm một số việc sau đây:
//       // - Invalidates queries để cập nhật lại dữ liệu.
//       // - Hiển thị thông báo thành công.
//       queryClient.invalidateQueries()
//     },
//   })

//   if (unbanUserMutation.isLoading) {
//     return <div className="loader">Updating...</div>
//   }

//   if (unbanUserMutation.isError) {
//     return <div className="error">{`Error: ${unbanUserMutation.error}`}</div>
//   }

//   return (
//     <Button variant="outline" size="sm" onClick={() => unbanUserMutation.mutate()}>
//       UnBan
//     </Button>
//   )
// }
