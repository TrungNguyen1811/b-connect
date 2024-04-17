import { authAxiosClient } from 'src/lib/axios'

async function postChatMessage(
  id: string,
  chat: {
    receiverId: string
    messageText: string
  },
) {
  return await authAxiosClient
    .post(`/Chat/PostChatMessage/${id}`, chat, {})
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        throw new Error('Request failed with status ' + response.status)
      }
    })
    .catch((error) => {
      throw error
    })
}
export { postChatMessage }
