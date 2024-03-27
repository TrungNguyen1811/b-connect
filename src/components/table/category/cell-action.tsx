import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu'
import { Button } from 'src/components/ui/button'
import { CopyCheckIcon, CopyIcon, DeleteIcon, MoreHorizontal } from 'lucide-react'
import { ICategory } from 'src/types'
import { deleteCategory } from 'src/api/categories/delete-category'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'src/components/ui/use-toast'
import { UpdateCategory } from './manage/upate-category'
import { useState } from 'react'
import { ViewCategoryDetail } from './manage/view-category'

interface CellActionProps {
  data: ICategory
}
export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const cateId = data.cateId
  const [copyId, setCopyId] = useState<boolean>(false)

  const queryClient = useQueryClient()

  const deleteCategoryFunction = async (cateId: string) => {
    const cate = await deleteCategory(cateId)
    return cate
  }

  const { mutate } = useMutation(deleteCategoryFunction, {
    onSuccess: (data) => {
      if (data) {
        toast({
          title: 'Success',
          description: 'Delete Category Success',
        })
        queryClient.invalidateQueries()
      } else {
        toast({
          title: 'Failed',
          description: 'Delete Category Failed',
        })
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error Submitting Category',
        description: error.message,
      })
    },
  })
  const onDelete = () => {
    mutate(cateId as string)
  }

  const onCopyId = () => {
    navigator.clipboard
      .writeText(cateId as string)
      .then(() => {
        setCopyId(true)
        setTimeout(() => setCopyId(false), 2000)
      })
      .catch(() => setCopyId(false))
  }
  return (
    <div className="flex w-44 flex-row gap-2">
      <div className="">
        <ViewCategoryDetail categoryId={cateId as string} />
      </div>
      <div className="">
        <UpdateCategory categoryId={cateId as string} />
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
