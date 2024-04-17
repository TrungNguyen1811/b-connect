import { Avatar, AvatarImage } from 'src/components/ui/avatar'
import ChatBottomBar from './chat-bottom-bar'
import { Message, UserChat } from 'src/types/chat'
import { useEffect, useRef } from 'react'

interface ChatListProps {
  messages?: Message[]
  selectedUser: UserChat
  sendMessage: (newMessage: Message) => void
}

export function ChatList({ messages, selectedUser, sendMessage }: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden">
      <div ref={messagesContainerRef} className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden">
        <div>
          {messages?.map((message, index) => (
            <div key={index} className="flex items-center gap-3">
              {message.name === selectedUser.name && (
                <Avatar className="flex items-center justify-center">
                  <AvatarImage src={message.avatar} alt={message.name} width={6} height={6} />
                </Avatar>
              )}
              <span className=" max-w-xs rounded-md bg-accent p-3">{message.message}</span>
              {message.name !== selectedUser.name && (
                <Avatar className="flex items-center justify-center">
                  <AvatarImage src={message.avatar} alt={message.name} width={6} height={6} />
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </div>
      <ChatBottomBar sendMessage={sendMessage} />
    </div>
  )
}
