import { Message, UserChat } from 'src/types/chat'
import { ChatList } from './chat-list'
import React, { useEffect } from 'react'
import ChatTopBar from './top-bar'

interface ChatProps {
  messages?: Message[]
  selectedUser: UserChat
}

export function Chat({ messages, selectedUser }: ChatProps) {
  useEffect(() => {
    if (messages) {
      setMessages(messages)
    }
  }, [messages])
  const [messagesState, setMessages] = React.useState<Message[]>(messages || [])

  const sendMessage = (newMessage: Message) => {
    setMessages((prevMessages) => [...prevMessages, newMessage])
  }

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <ChatTopBar selectedUser={selectedUser} />
      {/* <ChatList messages={messages} selectedUser={selectedUser} sendMessage={sendMessage} /> */}
      <ChatList messages={messagesState} selectedUser={selectedUser} sendMessage={sendMessage} />
    </div>
  )
}
