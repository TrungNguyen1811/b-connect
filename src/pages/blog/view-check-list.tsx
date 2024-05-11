import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  ISetTradeStatus,
  ITradeDetail,
  getCheckList,
  getTradeDetailById,
  putSetTradeStatus,
} from 'src/api/blog/interested'
import { Button } from 'src/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'src/components/ui/dialog'
import { toast } from 'src/components/ui/use-toast'
import { useAuth } from 'src/hooks/useAuth'
import { ICheckList } from 'src/types/advertisement'
import { ROLE } from 'src/types/user'
function isImage(url: string) {
  console.log('test', /\.(jpeg|jpg|gif|png)$/i.test(url))
  return /\.(jpeg|jpg|gif|png)$/i.test(url)
}

function isVideo(url: string) {
  return /\.(mp4|webm|ogg|mov|mkv)$/i.test(url)
}
function CheckListItemForm({
  id,
  target,
  checkList,
  isStaff,
  onImageChange,
}: {
  id: string
  target: string
  isStaff: boolean
  checkList: ICheckList
  onImageChange: (value: React.SetStateAction<string>) => void
}) {
  return (
    <div className="flex flex-row items-center">
      <div className="my-4 flex flex-row items-center gap-4">
        <div className="text-md w-48 font-semibold">{target}</div>
        <div className="flex flex-col items-center gap-4">
          {checkList.middleUploadDir &&
            (isImage(checkList.middleUploadDir as string) ? (
              <img
                src={checkList.middleUploadDir as string}
                className="h-16 w-12"
                onClick={() => onImageChange(checkList.middleUploadDir as string)}
                onMouseEnter={() => onImageChange(checkList.middleUploadDir as string)}
              />
            ) : (
              <video
                src={checkList.middleUploadDir as string}
                className="h-16 w-12 rounded-md"
                onClick={() => onImageChange(checkList.middleUploadDir as string)}
                onMouseEnter={() => onImageChange(checkList.middleUploadDir as string)}
                controls
              ></video>
            ))}
        </div>
        <div className="flex flex-col items-center gap-4">
          {checkList.bookOwnerUploadDir &&
            (isImage(checkList.bookOwnerUploadDir as string) ? (
              <img
                src={checkList.bookOwnerUploadDir as string}
                className="h-16 w-12"
                onClick={() => onImageChange(checkList.bookOwnerUploadDir as string)}
                onMouseEnter={() => onImageChange(checkList.bookOwnerUploadDir as string)}
              />
            ) : (
              <video
                src={checkList.bookOwnerUploadDir as string}
                className="h-16 w-12 rounded-md"
                onClick={() => onImageChange(checkList.bookOwnerUploadDir as string)}
                onMouseEnter={() => onImageChange(checkList.bookOwnerUploadDir as string)}
                controls
              ></video>
            ))}
        </div>
      </div>
    </div>
  )
}

function CheckListViewPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [checkList, setCheckList] = useState<ICheckList[]>()
  const [tradeDetail, setTradeDetail] = useState<ITradeDetail>()
  const [targets, setTarget] = useState<string[]>()
  const [selectedImage, setSelectedImage] = useState<string>()

  useEffect(() => {
    const fetchCheckList = async () => {
      const checkList = await getCheckList(id as string)
      setCheckList(checkList)
    }
    fetchCheckList()
  }, [id])

  useEffect(() => {
    const fetchTradeDetail = async () => {
      const tradeDetail = await getTradeDetailById(id as string)
      setTradeDetail(tradeDetail)
    }
    fetchTradeDetail()
  }, [id])

  useEffect(() => {
    if (checkList) {
      const targets = checkList.map((item) => item.target)
      setTarget(targets)
    }
  }, [checkList])

  const handleImageChange = (value: React.SetStateAction<string>) => {
    setSelectedImage(value as string)
  }

  const queryClient = useQueryClient()
  const tradeStatus = useMutation((formData: ISetTradeStatus) => putSetTradeStatus(formData), {
    onSuccess: (formData) => {
      if (formData) {
        toast({
          title: 'Success',
          description: 'Accept Trade Success!!!',
        })
        queryClient.invalidateQueries()
      } else {
        toast({
          title: 'Failed',
          description: 'Accept Trade Failed!!!',
        })
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error Accept Trade',
        description: error.message,
      })
    },
  })

  const putStatusTrade = async (tradeDetailsId: string, status: number) => {
    const data: ISetTradeStatus = {
      postId: '988d635c-7cb1-40ee-88b8-cb9d6ea9eb69',
      tradeDetailsId: tradeDetailsId,
      updatedStatus: status,
    }
    tradeStatus.mutate(data)
  }

  const handlePutStatusTrade = (newStatus: number) => {
    putStatusTrade(id as string, newStatus)
  }

  return (
    <div>
      <div className="mx-16 flex min-h-[42rem] flex-row items-center justify-start">
        <div>
          <div className="my-4 flex flex-row items-center gap-4 text-lg font-medium">
            <p className="w-48">Target</p>
            <p>Middle</p>
            <p>Trader</p>
          </div>
          <div>
            {targets?.map((target, index) => (
              <div key={index}>
                <CheckListItemForm
                  checkList={checkList?.find((ck) => ck.target == target) as ICheckList}
                  id={id as string}
                  target={target}
                  isStaff={user?.roles?.includes(ROLE.STAFF) || false}
                  onImageChange={handleImageChange}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto flex flex-row">
          <div className="mx-auto">
            {isImage(selectedImage as string) ? (
              <img
                src={selectedImage}
                alt="Selected Image"
                className="max-w-[40rem]  rounded-sm object-cover shadow-md"
              />
            ) : (
              <video
                controls
                src={selectedImage}
                className="w-[40rem] max-w-[40rem] rounded-sm object-cover shadow-md"
              ></video>
            )}
          </div>
        </div>
        {tradeDetail?.details.status && tradeDetail?.details.status < 6 ? (
          <Dialog>
            <DialogTrigger>
              <Button>Accept</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="w-60">
                <DialogTitle>Do you want to accept?</DialogTitle>
                <DialogDescription className="flex flex-row items-center justify-start gap-4">
                  <Button variant="default" className="w-16" onClick={() => handlePutStatusTrade(6)}>
                    Yes
                  </Button>
                  <Button variant="destructive" className="w-16">
                    <Button>
                      <DialogClose>No</DialogClose>
                    </Button>
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ) : (
          'Accepted'
        )}
      </div>
    </div>
  )
}
export default CheckListViewPage
