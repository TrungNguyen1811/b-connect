import React from 'react'
import { UserChat } from 'src/types/chat'

interface ChatTopbarProps {
  selectedUser: UserChat
}

export default function ChatTopbar({ selectedUser }: ChatTopbarProps) {
  return (
    <div className="flex h-16 w-full items-center justify-between border-b p-4">
      <div className="flex items-center gap-2">
        {/* <Avatar className="flex items-center justify-center">
          <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} width={6} height={6} className="h-10 w-10 " />
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{selectedUser.name}</span>
          <span className="text-xs">Active 2 mins ago</span>
        </div> */}
      </div>
    </div>
  )
}
