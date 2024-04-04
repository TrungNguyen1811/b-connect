import { format } from 'date-fns'
import { User } from 'src/types/user'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Label } from '../ui/label'
import { Check, DoorClosedIcon } from 'lucide-react'

type Props = {
  user: User | undefined
} & React.HTMLAttributes<HTMLDivElement>

function UserDetailDialog({ children, user }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="custom-dialog-content max-w-screen-xl">
        <DialogHeader>
          <DialogTitle>User Detail</DialogTitle>
        </DialogHeader>
        <div className="flex gap-5 space-y-4">
          <div className="flex-1 space-y-2">
            <div className="flex-column flex">
              <Label className="font-semibold">Id:</Label>
              <p className="pl-5 text-sm text-gray-700">{user?.userId}</p>
            </div>

            <div className=" flex-column flex">
              <Label className="font-semibold">Full Name: </Label>
              <p className="pl-5 text-sm text-gray-700">{user?.fullName}</p>
            </div>
            <div className=" flex-column flex">
              <Label className="font-semibold">Email:</Label>
              <p className="pl-5 text-sm text-gray-700">{user?.email}</p>
            </div>
            <div className=" flex-column flex">
              <Label className="font-semibold">Role:</Label>
              <p className="pl-5 text-sm text-gray-700">{user?.roles}</p>
            </div>
            <div className=" flex-column flex">
              <Label className="font-semibold">Phone:</Label>
              <p className="pl-5 text-sm text-gray-700">{user?.phone}</p>
            </div>
            <div className=" flex-column flex">
              <Label className="font-semibold">Address:</Label>
              <p className="pl-5 text-sm text-gray-700">{user?.addressId}</p>
            </div>
            <div className=" flex-column flex">
              <Label className="font-semibold">Create at:</Label>
              <p className="pl-5 text-sm text-gray-700">
                {user?.createdAt ? format(new Date(user?.createdAt), 'PPpp') : 'N/A'}
              </p>
            </div>
            <div className=" flex-column flex">
              <Label className="font-semibold">Update at:</Label>
              <p className="pl-5 text-sm text-gray-700">
                {user?.updatedAt ? format(new Date(user?.updatedAt), 'PPpp') : 'N/A'}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className=" flex-column flex">
              <Label className="font-semibold">User Name: </Label>
              <p className="pl-5 text-sm text-gray-700">{user?.username}</p>
            </div>
            <div className="flex-column flex">
              <Label className="font-semibold">Blocked: </Label>
              <p className="pl-5 text-sm text-gray-700">{user?.isBanned ? <Check /> : <DoorClosedIcon />}</p>
            </div>
            <div className=" flex-column flex">
              <Label className="font-semibold">Blocked Date:</Label>
              <p className="pl-5 text-sm text-gray-700">
                {user?.blockedDate ? format(new Date(user?.blockedDate), 'PPpp') : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UserDetailDialog
