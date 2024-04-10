import { LockKeyholeIcon, Mail, Phone, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'src/components/ui/button'
import { Separator } from 'src/components/ui/separator'
import { useAuth } from 'src/hooks/useAuth'

function AccountSeller() {
  const { user } = useAuth()
  const navigate = useNavigate()
  return (
    <div className="mx-24 my-12 ">
      <div className="rounded-md border-2">
        <div className=" flex flex-row items-center justify-between p-4">
          <div className="flex flex-col items-start">
            <p className="text-lg font-semibold">Account</p>
            <p className="text-sm font-light">Change basic settings</p>
          </div>
          <div>
            <Button onClick={() => navigate('/user/account/profile')}>Edit</Button>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col">
          <div className="flex flex-row p-4">
            <User size={22} className="mr-2" />
            <p className="w-36">Username</p>
            <p className="">{user?.username}</p>
          </div>

          <Separator className="ml-[10%] w-[90%]" />

          <div className="flex flex-row p-4">
            <Phone size={22} className="mr-2" />
            <p className="w-36">Phone Number</p>
            <p>{user?.phone}</p>
          </div>
          <Separator className="ml-[10%] w-[90%]" />

          <div className="flex flex-row p-4">
            <Mail size={22} className="mr-2" />
            <p className="w-36">Email</p>
            <p>{user?.email}</p>
          </div>
          <Separator className="ml-[10%] w-[90%]" />

          <div className="flex flex-row items-center p-4">
            <div className="flex flex-row">
              <LockKeyholeIcon size={22} className="mr-2" />
              <p className="w-36">Password</p>
              <p className="font-light">
                Reminder: You should regularly change your password to avoid security problems
              </p>
            </div>
            <div className="ml-4">
              <Button onClick={() => navigate('/user/account/password')}>Update</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AccountSeller
