import { authAxiosClient } from 'src/lib/axios'
import { UserChat } from 'src/types/chat'

export async function getChatUsers() {
  return authAxiosClient.get(`/Chat/GetChatUsers`).then((res) => {
    const data: UserChat[] = res.data
    return data
  })
}

export async function getUserChat() {
  return authAxiosClient.get(`/Chat/GetUserChat`).then((res) => {
    const data: UserChat = res.data
    return data
  })
}

export async function getChatMessages(id: string, chatUserId: string) {
  return authAxiosClient.get(`/Chat/GetChatMessages?id=${id}&chatUserId=${chatUserId}`).then((res) => {
    const data = res.data
    return data
  })
}
