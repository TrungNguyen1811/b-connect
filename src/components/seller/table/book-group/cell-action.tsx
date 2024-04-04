import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu'
import { Button } from 'src/components/ui/button'
import { CopyCheckIcon, CopyIcon, DeleteIcon, Edit, MoreHorizontal, View } from 'lucide-react'
import { IResponseBookGroup } from 'src/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'src/components/ui/use-toast'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteBookGroup } from 'src/api/books/delete-book'
import { UpdateBookGroup } from './manage/upate-book-group'

interface CellActionProps {
  data: IResponseBookGroup
}
export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const bookGroupId = data.bookGroupId
  const [copyId, setCopyId] = useState<boolean>(false)
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const deleteBookGroupFunction = async (bookGroupId: string) => {
    const cate = await deleteBookGroup(bookGroupId)
    return cate
  }

  const { mutate } = useMutation(deleteBookGroupFunction, {
    onSuccess: (data) => {
      if (data) {
        toast({
          title: 'Success',
          description: 'Delete BookGroup Success',
        })
        queryClient.invalidateQueries()
      } else {
        toast({
          title: 'Failed',
          description: 'Delete BookGroup Failed',
        })
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error Submitting BookGroup',
        description: error.message,
      })
    },
  })
  const onDelete = () => {
    mutate(bookGroupId as string)
  }

  const onCopyId = () => {
    navigator.clipboard
      .writeText(bookGroupId as string)
      .then(() => {
        setCopyId(true)
        setTimeout(() => setCopyId(false), 2000)
      })
      .catch(() => setCopyId(false))
  }
  return (
    <div className="flex w-44 flex-row gap-2">
      <div className="">
        <UpdateBookGroup bookGroupId={bookGroupId} />
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
          <DropdownMenuItem onClick={() => navigate(`/seller/manage/group-of-book/${bookGroupId}`)}>
            <View className="mr-2 h-4 w-4" />
            <div className="flex gap-2 ">View</div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate(`/seller/manage/group-of-book/add/${bookGroupId}`)}>
            <Edit className="mr-2 h-4 w-4" />
            <div className="flex gap-2 ">Edit</div>
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
