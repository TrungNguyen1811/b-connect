import { useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu'
import { Button } from 'src/components/ui/button'
import { Edit, MoreHorizontal } from 'lucide-react'
import { IResponsePost } from 'src/types/blog'
import BanPost from './manage-post/post-ban'
import UnBanPost from './manage-post/post-unban'

interface CellActionProps {
  data: IResponsePost
}
export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  console.log('data', data.postData)
  const navigate = useNavigate()
  // const onConfirm = async () => {}

  return (
    <div className="flex w-16 flex-row items-center gap-2">
      {/* <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onConfirm} loading={loading} /> */}
      <div className="flex gap-2">
        {data.postData.postId &&
          (data.postData.isBanned ? (
            <UnBanPost postId={data.postData.postId} />
          ) : (
            <BanPost postId={data.postData.postId} />
          ))}
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
          <DropdownMenuItem onClick={() => navigate(`/blog/${data.postData.postId}`)}>
            <Edit className="mr-2 h-4 w-4" /> Detail
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
