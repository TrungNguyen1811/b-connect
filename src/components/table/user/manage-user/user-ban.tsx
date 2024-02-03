// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { postBanUserApi } from 'src/apis/users/post-ban-user'
// import { Button } from 'src/components/ui/button'

// export function BanUserApi({ userId }: { userId: string }) {
//   const queryClient = useQueryClient()

//   // Tạo mutation để ban user
//   const banUserMutation = useMutation(() => postBanUserApi(userId), {
//     onSuccess: () => {
//       // Sau khi mutation hoàn thành thành công, bạn có thể làm một số việc sau đây:
//       // - Invalidates queries để cập nhật lại dữ liệu.
//       // - Hiển thị thông báo thành công.
//       queryClient.invalidateQueries()
//     },
//   })

//   if (banUserMutation.isLoading) {
//     return <div className="loader">Banning...</div>
//   }

//   if (banUserMutation.isError) {
//     return <div className="error">{`Error: ${banUserMutation.error}`}</div>
//   }

//   return (
//     <Button variant="outline" size="sm" onClick={() => banUserMutation.mutate()}>
//       Ban
//     </Button>
//   )
// }
