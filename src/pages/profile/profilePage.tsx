import { Link, useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import { Separator } from 'src/components/ui/separator'
import { Card, CardContent, CardFooter, CardHeader } from 'src/components/ui/card'
import { useAuth } from 'src/hooks/useAuth'
import { Button } from 'src/components/ui/button'
import UserDetailDialog from 'src/components/user/user-detail'
import ChangePasswordModal from 'src/components/user/change-password'

function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const onLogout = () => {
    logout()
    navigate('/login')
  }
  return (
    <div className="container mx-auto flex h-screen flex-col items-center justify-center gap-4">
      <h3 className="text-4xl font-bold">
        👋 Welcome back <span className="text-primary">{user?.fullName}</span>
      </h3>
      <Separator className="max-w-sm" />
      <Card>
        <CardHeader className="flex-row items-center justify-center gap-4">
          <Avatar>
            <AvatarImage sizes={'lg'} src={user?.avatar ?? ''} alt={user?.fullName} />
            <AvatarFallback>{user?.fullName}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-bold">{user?.fullName}</h3>
            <p className="text-sm text-slate-500">{user?.email}</p>
          </div>
        </CardHeader>
        <CardContent className="flex">
          <ChangePasswordModal>
            <Button variant={'link'}>Change Password</Button>
          </ChangePasswordModal>
          <Separator className="h-[none]" orientation="vertical" />
          <Link to="/profile/orders">
            <Button variant={'link'}>Order history</Button>
          </Link>
          <Separator className="h-[none]" orientation="vertical" />
          <Link to="/transaction">
            <Button variant={'link'}>Payment history</Button>
          </Link>
        </CardContent>
        <CardFooter className="space-x-2">
          <UserDetailDialog user={user!}>
            <Button>My profile details</Button>
          </UserDetailDialog>
          <Button onClick={onLogout}>Logout</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ProfilePage
