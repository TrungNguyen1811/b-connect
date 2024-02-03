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

interface CellActionProps {
  data: User
}
export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  // const [loading, setLoading] = useState(false)
  // const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  // const onConfirm = async () => {}
  return (
    <div>
      {/* <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onConfirm} loading={loading} /> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => navigate(`/admin/dashboard/user/${data.userId}`)}>
            <Edit className="mr-2 h-4 w-4" /> Detail
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex gap-2 ">
              {data.blocked ? (
                data.userId ? (
                  <div>Unban</div>
                ) : // <UnBanUserApi userId={data.userId} />
                null
              ) : data.userId ? (
                <div>Ban</div>
              ) : // <BanUserApi userId={data.userId} />
              null}
            </div>{' '}
          </DropdownMenuItem>
          {/* <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> {data.blocked ? 'Unban' : 'Ban'}
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
