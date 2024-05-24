import { Button } from 'src/components/ui/button'
import { Loader2 } from 'lucide-react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'src/components/ui/use-toast'
import { postUnbanPost } from 'src/api/blog/post-blog'

function UnBanPost({ postId }: { postId: string }) {
  const query = useQueryClient()
  const unbanPost = useMutation((postId: string) => postUnbanPost(postId), {
    onSuccess: (data) => {
      if (data) {
        toast({
          title: 'Success',
          description: 'Unban Post Success!!!',
        })
      } else {
        toast({
          title: 'Failed',
          description: 'Unban Post Failed!!!',
        })
      }
      query.invalidateQueries()
    },
    onError: (error: any) => {
      toast({
        title: 'Error Unban Post',
        description: error.response.data,
      })
    },
  })

  if (unbanPost.isError) {
    return <div className="error">{`Error: ${unbanPost.error}`}</div>
  }
  const onSubmit = (postId: string) => {
    unbanPost.mutate(postId)
  }

  return (
    <Button
      onClick={() => onSubmit(postId as string)}
      disabled={unbanPost.isLoading}
      variant={'destructive'}
      className="my-2 w-16"
      type="submit"
    >
      {unbanPost.isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ''}
      Banned
    </Button>
  )
}
export default UnBanPost
