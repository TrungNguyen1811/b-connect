'use client'

import { cn } from 'src/lib/utils'
import { buttonVariants } from 'src/components/ui/button'
import { Avatar, AvatarImage } from 'src/components/ui/avatar'
import { Message, UserChat } from 'src/types/chat'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from 'src/components/plate-ui/tooltip'

interface SidebarProps {
  isCollapsed: boolean
  links?: {
    userId: string
    username: string
    chatHistory: Message[]
    avatar: string
  }[]
  onClick?: () => void
  onSetSelectedUser: (value: UserChat) => void
}

export function Sidebar({ links, isCollapsed, onSetSelectedUser }: SidebarProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group relative flex h-full flex-col gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      {!isCollapsed && (
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2 text-2xl">
            <p className="text-lg font-medium">Chats</p>
            <span className="text-lg text-zinc-300">({links?.length})</span>
          </div>
        </div>
      )}
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links?.map((link, index) =>
          isCollapsed ? (
            <TooltipProvider key={index}>
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onSetSelectedUser(link)}
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'icon' }),
                      ' h-11 w-11 px-0 md:h-16 md:w-16',
                      'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
                    )}
                  >
                    <Avatar className="flex items-center justify-center">
                      <AvatarImage src={link.avatar} alt={link.avatar} width={6} height={6} className="h-10 w-10 " />
                    </Avatar>{' '}
                    <span className="sr-only">{link.username}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" className="flex items-center gap-4">
                  {link.username}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <button
              onClick={() => onSetSelectedUser(link)}
              key={index}
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'shrink px-0 dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                'justify-start gap-1 px-1',
              )}
            >
              <Avatar className="flex items-center justify-center">
                <AvatarImage src={link.avatar} alt={link.avatar} width={6} height={6} className="h-10 w-10 " />
              </Avatar>
              <div className="max-w-20 flex flex-col">
                <span className="text-xs">{link.username}</span>
                {link.chatHistory.length > 0 && (
                  <span className="truncate text-xs text-zinc-300 ">
                    {link.chatHistory[link.chatHistory.length - 1].username.split(' ')[0]}:{' '}
                    {link.chatHistory[link.chatHistory.length - 1].messageText}
                  </span>
                )}
              </div>
            </button>
          ),
        )}
      </nav>
    </div>
  )
}
