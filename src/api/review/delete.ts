import { authAxiosClient } from 'src/lib/axios'

export async function deleteReply(replyId: string) {
  return await authAxiosClient.delete(`/account/delete-reply?replyId=${replyId}`).then((res) => res.data)
}
