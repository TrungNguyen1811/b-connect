export interface Message {
  id: string
  avatar: string
  name: string
  message: string
}

export interface UserChat {
  id?: string
  avatar: string
  messages: Message[]
  name: string
}

export interface UserChatReply {
  receiverId: string
  messageText: string
}
