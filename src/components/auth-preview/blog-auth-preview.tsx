import React, { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from 'src/hooks/useAuth'
import { cn, getLabelByFullname } from 'src/lib/utils'
import { Button } from '../ui/button'
import NotificationBlog from '../nofication/nofication-blog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

type Props = React.HtmlHTMLAttributes<HTMLDivElement>
export function AuthPreviewBlog({ className, ...prosp }: Props) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const onLogin = useCallback(() => {
    navigate('/login')
  }, [navigate])

  const onLogout = useCallback(() => {
    logout()
    navigate('/blog')
  }, [logout, navigate])

  const renderUserDropDown = React.useMemo(() => {
    if (!user) return <></>
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-sm p-1 hover:bg-orange-500">
          <Avatar>
            <AvatarImage src={user.avatarDir as string} alt={user.fullName} />
            <AvatarFallback>{getLabelByFullname(user.fullName)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
          <Link to={`/blog/profile/${user.username}`}>
            <DropdownMenuItem>
              <div className="hover-underline-animation hover:hover-underline-animation flex flex-col">
                {user.fullName}
                <div>@{user.username}</div>
              </div>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <Link to="/blog/dashboard">
            <DropdownMenuItem className=" hover-underline-animation hover:hover-underline-animation w-full">
              Dashboard
            </DropdownMenuItem>
          </Link>
          <Link to="/blog/create-post">
            <DropdownMenuItem className="hover-underline-animation hover:hover-underline-animation  w-full">
              Create Post
            </DropdownMenuItem>
          </Link>
          <Link to="/blog/reading-list">
            <DropdownMenuItem className="hover-underline-animation hover:hover-underline-animation  w-full">
              Reading list
            </DropdownMenuItem>
          </Link>
          <Link to="/setting">
            <DropdownMenuItem className="hover-underline-animation hover:hover-underline-animation  w-full">
              Setting
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            inset
            onClick={onLogout}
            className="px-3 text-destructive hover:bg-destructive/20 hover:text-destructive"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }, [onLogout, user])

  return (
    <div className={(cn(className), 'flex')} {...prosp}>
      {user ? (
        <div className="flex flex-row items-center justify-between gap-4">
          <Button onClick={() => navigate('/blog/create-post')}>Create Post</Button>
          <NotificationBlog />
          {renderUserDropDown}
        </div>
      ) : (
        <div>
          <Button onClick={onLogin}>Login</Button>
        </div>
      )}
    </div>
  )
}
