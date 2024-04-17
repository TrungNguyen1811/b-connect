import { Message, UserChat } from 'src/types/chat'
import { ChatList } from './chat-list'
import React from 'react'
import ChatTopbar from './top-bar'

interface ChatProps {
  messages?: Message[]
  selectedUser: UserChat
}

export function Chat({ messages, selectedUser }: ChatProps) {
  const [messagesState, setMessages] = React.useState<Message[]>(messages ?? [])

  const sendMessage = (newMessage: Message) => {
    setMessages([...messagesState, newMessage])
  }

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <ChatTopbar selectedUser={selectedUser} />
      <ChatList messages={messagesState} selectedUser={selectedUser} sendMessage={sendMessage} />
    </div>
  )
}
