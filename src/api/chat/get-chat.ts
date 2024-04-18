import { authAxiosClient } from 'src/lib/axios'
import { UserChat } from 'src/types/chat'

export async function getChatUsers() {
  return authAxiosClient.get(`/Chat/GetChatUsers`).then((res) => {
    const data: UserChat[] = res.data
    return data
  })
}

export async function getOwnChat(chatUserId: string) {
  return authAxiosClient.get(`/Chat/GetOwnChat?chatUserId=${chatUserId}`).then((res) => {
    const data: UserChat = res.data
    return data
  })
}

export async function getChatMessages() {
  return authAxiosClient.get(`/Chat/GetChatMessages`).then((res) => {
    const data: UserChat[] = res.data
    return data
  })
}
