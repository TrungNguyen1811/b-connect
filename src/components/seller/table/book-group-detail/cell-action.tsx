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
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { removeBookFromBookGroup } from 'src/api/books/delete-book'
import { toast } from 'src/components/ui/use-toast'

interface CellActionProps {
  data: IBook
}
export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const productId = data.productId
  const { id } = useParams()
  const [copyId, setCopyId] = useState<boolean>(false)
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const deleteBookFunction = async (data: string) => {
    const book = await removeBookFromBookGroup(data, id as string)
    return book
  }

  const { mutate } = useMutation(deleteBookFunction, {
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries()
      } else {
        toast({
          title: 'Failed',
          description: 'Delete Book of Group Failed',
        })
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error Delete Book of Group',
        description: error.message,
      })
    },
  })

  const onDelete = () => {
    mutate(data.productId as string)
  }

  const onCopyId = () => {
    navigator.clipboard
      .writeText(productId as string)
      .then(() => {
        setCopyId(true)
        setTimeout(() => setCopyId(false), 2000)
      })
      .catch(() => setCopyId(false))
  }
  return (
    <div className="flex flex-row gap-2">
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
          <DropdownMenuItem onClick={() => navigate(`/books/${productId}`)}>
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
