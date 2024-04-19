export interface Message {
  id: string
  senderId?: string
  avatar: string
  username: string
  messageText: string
  sentDate?: string
}

export interface UserChat {
  id?: string
  userId: string
  avatar: string
  chatHistory?: Message[]
  username: string
}

export interface UserChatReply {
  receiverId: string
  messageText: string
}
