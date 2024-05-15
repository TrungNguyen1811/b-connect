import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu'
import { Button } from 'src/components/ui/button'
import { CopyCheckIcon, CopyIcon, MoreHorizontal } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IPostResponse } from 'src/types/blog'
import { ISetTradeStatus, ITradeDetail, getTradeDetailByPostId, putSetTradeStatus } from 'src/api/blog/interested'
import { toast } from 'src/components/ui/use-toast'

interface CellActionProps {
  data: IPostResponse
}
export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const postId = data.postId
  const [copyId, setCopyId] = useState<boolean>(false)
  const [tradeDetail, setTradeDetail] = useState<ITradeDetail[]>()
  const [isOnwer, setIsOwner] = useState<ITradeDetail>()
  const [isInterester, setIsInterester] = useState<ITradeDetail>()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTradeDetail = async () => {
      try {
        const trade = await getTradeDetailByPostId(postId as string)
        setTradeDetail(trade)
        console.log('trade', trade)
      } catch (error) {
        console.error('Error fetching trade details:', error)
      }
    }
    fetchTradeDetail()
  }, [postId])

  const queryClient = useQueryClient()

  const onCopyId = () => {
    navigator.clipboard
      .writeText(postId as string)
      .then(() => {
        setCopyId(true)
        setTimeout(() => setCopyId(false), 2000)
      })
      .catch(() => setCopyId(false))
  }

  useEffect(() => {
    const fetchTradeDetail = async () => {
      try {
        if (tradeDetail) {
          for (const trade of tradeDetail) {
            if (trade.details.isPostOwner === true) {
              setIsOwner(trade)
            } else {
              setIsInterester(trade)
            }
          }
        }
      } catch (error) {
        console.error('Error fetching trade details:', error)
      }
    }
    fetchTradeDetail()
  }, [tradeDetail])

  const tradeStatus = useMutation((formData: ISetTradeStatus) => putSetTradeStatus(formData), {
    onSuccess: (formData) => {
      if (formData) {
        toast({
          title: 'Success',
          description: 'Accept Received Order Success!!!',
        })
        queryClient.invalidateQueries()
      } else {
        toast({
          title: 'Failed',
          description: 'Accept Received Order Failed!!!',
        })
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error Received Order',
        description: error.message,
      })
    },
  })

  const putStatusTrade = async (tradeDetailsId: string) => {
    const data: ISetTradeStatus = {
      postId: postId as string,
      tradeDetailsId: tradeDetailsId,
      updatedStatus: 3,
    }
    tradeStatus.mutate(data)
  }
  const handlePutStatusTrade = (tradeDetailId: string) => {
    putStatusTrade(tradeDetailId)
  }

  return (
    <div className="flex w-12 flex-row gap-2">
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
          <DropdownMenuItem>
            {isOnwer?.details.status === 2 ? (
              <button onClick={() => handlePutStatusTrade(isOnwer?.details.tradeDetailId as string)}>
                Received Owner
              </button>
            ) : (
              <button onClick={() => navigate(`/blog/dashboard/check-list/${isOnwer?.details.tradeDetailId}`)}>
                Update Owner
              </button>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem>
            {isInterester?.details.status === 2 ? (
              <button onClick={() => handlePutStatusTrade(isInterester?.details.tradeDetailId as string)}>
                Received isInterester
              </button>
            ) : (
              <button onClick={() => navigate(`/blog/dashboard/check-list/${isInterester?.details.tradeDetailId}`)}>
                Update Interester
              </button>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
