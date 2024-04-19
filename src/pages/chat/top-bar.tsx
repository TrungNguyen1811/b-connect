import React from 'react'
import { Avatar, AvatarImage } from 'src/components/ui/avatar'
import { UserChat } from 'src/types/chat'

interface ChatTopBarProps {
  selectedUser: UserChat
}

export default function ChatTopBar({ selectedUser }: ChatTopBarProps) {
  return (
    <div className="flex h-16 w-full items-center justify-between border-b p-4">
      <div className="flex items-center gap-2">
        <Avatar className="flex items-center justify-center">
          <AvatarImage
            src={selectedUser ? selectedUser.avatar : ''}
            alt={selectedUser ? selectedUser.username : ''}
            width={6}
            height={6}
            className="h-10 w-10 "
          />
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{selectedUser ? selectedUser.username : ''}</span>
        </div>
      </div>
    </div>
  )
}
