import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu'
import { Button } from 'src/components/ui/button'
import { CopyCheckIcon, CopyIcon, DeleteIcon, MoreHorizontal, View } from 'lucide-react'
import { IBook } from 'src/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'src/components/ui/use-toast'
import { useState } from 'react'
import { deleteBook } from 'src/api/books/delete-book'
import { useNavigate } from 'react-router-dom'

interface CellActionProps {
  data: IBook
}
export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const bookId = data.productId
  const [copyId, setCopyId] = useState<boolean>(false)
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const deleteBookFunction = async (bookId: string) => {
    const book = await deleteBook(bookId)
    return book
  }

  const { mutate } = useMutation(deleteBookFunction, {
    onSuccess: (data) => {
      if (data) {
        toast({
          title: 'Success',
          description: 'Delete Book Success',
        })
        queryClient.invalidateQueries()
      } else {
        toast({
          title: 'Failed',
          description: 'Delete Book Failed',
        })
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error Submitting Book',
        description: error.message,
      })
    },
  })
  const onDelete = () => {
    mutate(bookId as string)
  }

  const onCopyId = () => {
    navigator.clipboard
      .writeText(bookId as string)
      .then(() => {
        setCopyId(true)
        setTimeout(() => setCopyId(false), 2000)
      })
      .catch(() => setCopyId(false))
  }
  return (
    <div className="flex w-44 flex-row gap-2">
      <div className="">
        <Button onClick={() => navigate(`/seller/manage/books/${bookId}`)}>Update</Button>
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
          <DropdownMenuItem onClick={() => navigate(`/books/${bookId}`)}>
            <View className="mr-2 h-4 w-4" />
            <div className="flex gap-2 ">Preview</div>
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
