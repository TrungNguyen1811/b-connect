import { authAxiosClient } from 'src/lib/axios'

export async function deleteReply(replyId: string) {
  return await authAxiosClient.delete(`/Account/delete-reply?replyid=${replyId}`).then((res) => res.data)
}
