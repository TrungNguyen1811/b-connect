import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu'
import { Button } from 'src/components/ui/button'
import { CopyCheckIcon, CopyIcon, DeleteIcon, MoreHorizontal } from 'lucide-react'
import { IListReplyResponse } from 'src/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'src/components/ui/use-toast'
import { useState } from 'react'
import { ReplyCustomer } from './manage/add-reply'
import { UpdateReplyCustomer } from './manage/update-reply'
import { deleteReply } from 'src/api/review/delete'

interface CellActionProps {
  data: IListReplyResponse
}
export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const ratingRecordId = data.ratingRecordId
  const [copyId, setCopyId] = useState<boolean>(false)

  const queryClient = useQueryClient()

  const deleteReplyFunction = async (replyId: string) => {
    const reply = await deleteReply(replyId)
    return reply
  }

  const { mutate } = useMutation(deleteReplyFunction, {
    onSuccess: (data) => {
      if (data) {
        toast({
          title: 'Success',
          description: 'Delete Reply Success',
        })
        queryClient.invalidateQueries()
      } else {
        toast({
          title: 'Failed',
          description: 'Delete Reply Failed',
        })
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error Submitting Reply',
        description: error.message,
      })
    },
  })
  const onDelete = () => {
    mutate(data.reply.replyId as string)
  }

  const onCopyId = () => {
    navigator.clipboard
      .writeText(ratingRecordId as string)
      .then(() => {
        setCopyId(true)
        setTimeout(() => setCopyId(false), 2000)
      })
      .catch(() => setCopyId(false))
  }
  return (
    <div className="flex w-32 flex-row gap-2">
      <div className="">
        {data.reply.replyText == null ? <ReplyCustomer data={data} /> : <UpdateReplyCustomer data={data} />}
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
          <DropdownMenuItem onClick={onDelete}>
            <DeleteIcon className="mr-2 h-4 w-4" />
            <div className="flex gap-2 ">Delete</div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
