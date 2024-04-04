import { useNavigate } from 'react-router-dom'
import { User } from 'src/types/user'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu'
import { Button } from 'src/components/ui/button'
import { Edit, MoreHorizontal } from 'lucide-react'
import BanUser from 'src/components/admins/ban-user'
import UpdateBanUser from './manage-user/user-unban'
import UpdateRoleUser from './manage-user/update-role-user'

interface CellActionProps {
  data: User
}
export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  // const [loading, setLoading] = useState(false)
  // const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  // const onConfirm = async () => {}
  return (
    <div className="flex w-16 flex-row items-center gap-2">
      {/* <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onConfirm} loading={loading} /> */}
      <div className="flex gap-2">
        {data.userId && (data.isBanned ? <UpdateBanUser userId={data.userId} /> : <BanUser userId={data.userId} />)}
        {data.userId && <UpdateRoleUser userId={data.userId} />}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigate(`/admin/manage/user/${data.userId}`)}>
            <Edit className="mr-2 h-4 w-4" /> Detail
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
