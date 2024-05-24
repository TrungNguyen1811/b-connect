import { authAxiosClient } from 'src/lib/axios'
import { UserChat } from 'src/types/chat'

export async function getChatUsers() {
  return authAxiosClient.get(`/chat/get-chat-users`).then((res) => {
    const data: UserChat[] = res.data
    return data
  })
}

export async function getOwnChat(chatUserId: string) {
  return authAxiosClient.get(`/chat/get-own-chat?chatUserId=${chatUserId}`).then((res) => {
    const data: UserChat = res.data
    return data
  })
}

export async function getChatMessages() {
  return authAxiosClient.get(`/chat/get-chat-messages`).then((res) => {
    const data: UserChat[] = res.data
    return data
  })
}
