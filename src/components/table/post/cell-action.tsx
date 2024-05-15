import { useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu'
import { Button } from 'src/components/ui/button'
import { Edit, Loader2, MoreHorizontal } from 'lucide-react'
import { IResponsePost } from 'src/types/blog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'src/components/ui/use-toast'
import { postBanPost } from 'src/api/blog/post-blog'

interface CellActionProps {
  data: IResponsePost
}
export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  console.log('data', data.postData)
  const navigate = useNavigate()
  // const onConfirm = async () => {}
  const query = useQueryClient()
  const banPost = useMutation((postId: string) => postBanPost(postId), {
    onSuccess: (data) => {
      if (data) {
        toast({
          title: 'Success',
          description: 'Ban Post Success!!!',
        })
      } else {
        toast({
          title: 'Failed',
          description: 'Ban Post Failed!!!',
        })
      }
      query.invalidateQueries()
    },
    onError: (error: any) => {
      toast({
        title: 'Error Ban Post',
        description: error.response.data,
      })
    },
  })

  if (banPost.isError) {
    return <div className="error">{`Error: ${banPost.error}`}</div>
  }
  const onSubmit = (postId: string) => {
    banPost.mutate(postId)
  }
  return (
    <div className="flex w-16 flex-row items-center gap-2">
      {/* <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onConfirm} loading={loading} /> */}
      <div className="flex gap-2">
        {data.postData.postId && (
          <Button
            onClick={() => onSubmit(data.postData.postId as string)}
            disabled={banPost.isLoading}
            variant={data.postData.isBanned ? 'destructive' : 'default'}
            className="my-2"
            type="submit"
          >
            {banPost.isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ''}
            {data.postData.isBanned ? 'Banned' : 'Ban'}
          </Button>
        )}
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
