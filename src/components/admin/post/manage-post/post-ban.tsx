import { Button } from 'src/components/ui/button'
import { Loader2 } from 'lucide-react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'src/components/ui/use-toast'
import { postBanPost } from 'src/api/blog/post-blog'

function BanPost({ postId }: { postId: string }) {
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
    <Button
      onClick={() => onSubmit(postId as string)}
      disabled={banPost.isLoading}
      variant={'default'}
      className="my-2 w-16"
      type="submit"
    >
      {banPost.isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ''}
      Ban
    </Button>
  )
}
export default BanPost
