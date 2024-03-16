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
import { ICategory } from 'src/types'
import { deleteCategory } from 'src/api/categories/delete-category'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'src/components/ui/use-toast'
import { UpdateCategory } from './manage/upate-category'

interface CellActionProps {
  data: ICategory
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const navigate = useNavigate()
  const cateId = data.cateId

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

  return (
    <div className="flex flex-row">
      <div className="flex gap-2">
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
          <DropdownMenuItem onClick={() => navigate(`/admin/category/${data.cateId}`)}>
            <Edit className="mr-2 h-4 w-4" /> Detail
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete}>
            <div className="flex gap-2 ">Delete</div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
