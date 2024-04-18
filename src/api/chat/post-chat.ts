import { authAxiosClient } from 'src/lib/axios'
import { Message, UserChatReply } from 'src/types/chat'

async function postChatMessage(data: UserChatReply) {
  return await authAxiosClient
    .post(`/Chat/PostChatMessage`, data, {})
    .then((response) => {
      if (response.status === 200 || response.status === 204) {
        const data: Message = response.data
        return data
      } else {
        throw new Error('Request failed with status ' + response.status)
      }
    })
    .catch((error) => {
      throw error
    })
}
export { postChatMessage }
