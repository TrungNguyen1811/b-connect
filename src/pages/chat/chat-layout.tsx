'use client'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'src/components/ui/resizable'
import { cn } from 'src/lib/utils'
import { Chat } from './chat'
import { Sidebar } from './chat-side-bar'
import { useEffect, useState } from 'react'
import { getChatUsers } from 'src/api/chat/get-chat'
import { UserChat } from 'src/types/chat'
import { MessageCircle, XIcon } from 'lucide-react'

interface ChatLayoutProps {
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
}

export function ChatLayout({
  defaultLayout = [200, 480],
  defaultCollapsed = false,
  navCollapsedSize,
}: ChatLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
  const [userData, setUserData] = useState<UserChat[]>()
  const [selectedUser, setSelectedUser] = useState<UserChat>()

  useEffect(() => {
    const fetchListUser = async () => {
      const listUser = await getChatUsers()
      setUserData(listUser)
    }
    fetchListUser()
  }, [])

  const handleSelected = (value: UserChat) => {
    setSelectedUser(value)
  }
  return (
    <div>
      <input type="checkbox" id="click" />
      <label className="label" htmlFor="click">
        <i className="fab">
          <MessageCircle />
        </i>
        <i className="fas">
          <XIcon />
        </i>
      </label>
      <ResizablePanelGroup direction="horizontal" className="wrapper-chat h-full items-stretch border">
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          onCollapse={() => {
            setIsCollapsed(true)
          }}
          onExpand={() => {
            setIsCollapsed(false)
          }}
          className={cn(isCollapsed && 'min-w-24 md:min-w-36 transition-all duration-300 ease-in-out')}
        >
          <Sidebar
            isCollapsed={isCollapsed}
            links={userData?.map((user) => ({
              name: user.name,
              messages: user.messages ?? [],
              avatar: user.avatar,
              variant: selectedUser?.name === user.name ? 'grey' : 'ghost',
            }))}
            onSetSelectedUser={handleSelected}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Chat messages={selectedUser?.messages} selectedUser={selectedUser as UserChat} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
