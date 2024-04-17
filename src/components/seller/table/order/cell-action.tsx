import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu'
import { Button } from 'src/components/ui/button'
import { CopyCheckIcon, CopyIcon, MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import { IResponseAgencyOrder } from 'src/types/order'
import { useNavigate } from 'react-router-dom'

interface CellActionProps {
  data: IResponseAgencyOrder
}
export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const orderId = data.orderId
  const [copyId, setCopyId] = useState<boolean>(false)
  const navigate = useNavigate()
  const onCopyId = () => {
    navigator.clipboard
      .writeText(orderId as string)
      .then(() => {
        setCopyId(true)
        setTimeout(() => setCopyId(false), 2000)
      })
      .catch(() => setCopyId(false))
  }
  return (
    <div className="flex w-40 flex-row gap-2">
      <Button onClick={() => navigate(`/manage/order/${orderId}`)}>View Detail</Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onCopyId}>
            {copyId ? (
              <span className="flex flex-row items-center">
                <CopyCheckIcon className="mr-2 h-4 w-4" /> Copied!
              </span>
            ) : (
              <span className="flex flex-row items-center">
                <CopyIcon className="mr-2 h-4 w-4" /> CopyId
              </span>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
