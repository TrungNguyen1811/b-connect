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
            <div key={index}>
              <div className=" my-1 ml--2 flex items-center gap-3">
                {message.username === selectedUser.username && (
                  <>
                    <Avatar className="flex items-center justify-center">
                      <AvatarImage src={message.avatar} alt={message.username} width={6} height={6} />
                    </Avatar>
                    <span className=" max-w-xs rounded-md bg-accent p-3">{message.messageText}</span>
                  </>
                )}
              </div>
              <div className="my-1 mr-2 flex items-center justify-end gap-2">
                {message.username !== selectedUser.username && (
                  <>
                    <span className=" max-w-xs rounded-md bg-accent p-3">{message.messageText}</span>
                    <Avatar className="flex items-center justify-end">
                      <AvatarImage src={message.avatar} alt={message.username} width={6} height={6} />
                    </Avatar>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ChatBottomBar selectedUser={selectedUser} sendMessage={sendMessage} />
    </div>
  )
}
