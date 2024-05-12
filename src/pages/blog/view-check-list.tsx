import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowLeftIcon } from 'lucide-react'
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
import { Table, TableBody, TableCell, TableHeader, TableRow } from 'src/components/ui/table'
import { toast } from 'src/components/ui/use-toast'
import { useAuth } from 'src/hooks/useAuth'
import { ICheckList } from 'src/types/advertisement'
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
  onImageMiddleChange,
  onImagePartnerChange,
}: {
  id: string
  target: string
  isStaff: boolean
  checkList: ICheckList
  onImageMiddleChange: (value: React.SetStateAction<string>) => void
  onImagePartnerChange: (value: React.SetStateAction<string>) => void
}) {
  return (
    <div className="flex flex-row items-center justify-center">
      <div className="flex flex-row items-center gap-4">
        {isStaff ? (
          <div className="flex flex-col items-center gap-4">
            {checkList.middleUploadDir &&
              (isImage(checkList.middleUploadDir as string) ? (
                <img
                  src={checkList.middleUploadDir as string}
                  className="h-12 w-full"
                  onClick={() => onImageMiddleChange(checkList.middleUploadDir as string)}
                  onMouseEnter={() => onImageMiddleChange(checkList.middleUploadDir as string)}
                />
              ) : (
                <video
                  src={checkList.middleUploadDir as string}
                  className="h-12 w-full rounded-md"
                  onClick={() => onImageMiddleChange(checkList.middleUploadDir as string)}
                  onMouseEnter={() => onImageMiddleChange(checkList.middleUploadDir as string)}
                  controls
                ></video>
              ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            {checkList.bookOwnerUploadDir &&
              (isImage(checkList.bookOwnerUploadDir as string) ? (
                <img
                  src={checkList.bookOwnerUploadDir as string}
                  className="h-12 w-full"
                  onClick={() => onImagePartnerChange(checkList.bookOwnerUploadDir as string)}
                  onMouseEnter={() => onImagePartnerChange(checkList.bookOwnerUploadDir as string)}
                />
              ) : (
                <video
                  src={checkList.bookOwnerUploadDir as string}
                  className="h-12 w-full rounded-md"
                  onClick={() => onImagePartnerChange(checkList.bookOwnerUploadDir as string)}
                  onMouseEnter={() => onImagePartnerChange(checkList.bookOwnerUploadDir as string)}
                  controls
                ></video>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

function CheckListViewPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [open, setOpen] = useState<boolean>(false)
  const [checkList, setCheckList] = useState<ICheckList[]>()
  const [tradeDetail, setTradeDetail] = useState<ITradeDetail>()
  const [targets, setTarget] = useState<string[]>()
  const [selectedMiddleImage, setSelectedMiddleImage] = useState<string>()
  const [selectedPartnerImage, setSelectedPartnerImage] = useState<string>()

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

  const handleMiddleImageChange = (value: React.SetStateAction<string>) => {
    setSelectedMiddleImage(value as string)
  }
  const handlePartnerImageChange = (value: React.SetStateAction<string>) => {
    setSelectedPartnerImage(value as string)
  }

  const compare = (targets: string) => {
    const checklistImage = checkList?.find((cl) => cl.target == targets)
    setSelectedMiddleImage(checklistImage?.middleUploadDir as string)
    setSelectedPartnerImage(checklistImage?.bookOwnerUploadDir as string)
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
        setOpen(true)
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
      <button className="ml-4 mt-4 " onClick={() => window.history.back()}>
        <p className="flex flex-row items-center gap-1 text-orange-400 underline">
          <ArrowLeftIcon size={16} /> Go back
        </p>
      </button>
      {checkList && checkList.length > 0 ? (
        <div className="flex min-h-[36rem] flex-col items-center justify-center">
          <div className="mx-auto flex flex-row items-center">
            <Table className="m-4 w-[90vw] border">
              <TableHeader>
                <TableRow className="bg-orange-300 hover:bg-orange-300">
                  <TableCell className="font-medium">Target</TableCell>
                  {targets?.map((target, index) => (
                    <TableCell
                      key={index}
                      onClick={() => compare(target)}
                      className="w-16 text-center font-medium hover:bg-orange-400 "
                    >
                      {target}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white">
                <TableRow>
                  <TableCell className="font-medium">Middle</TableCell>
                  {targets?.map((target, index) => (
                    <TableCell key={index} className="justify-center hover:bg-slate-200">
                      <CheckListItemForm
                        checkList={checkList?.find((ck) => ck.target == target) as ICheckList}
                        id={id as string}
                        target={target}
                        isStaff={true}
                        onImageMiddleChange={handleMiddleImageChange}
                        onImagePartnerChange={handlePartnerImageChange}
                      />
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Partner</TableCell>
                  {targets?.map((target, index) => (
                    <TableCell key={index} className="items-center justify-center hover:bg-slate-200">
                      <CheckListItemForm
                        checkList={checkList?.find((ck) => ck.target == target) as ICheckList}
                        id={id as string}
                        target={target}
                        isStaff={false}
                        onImagePartnerChange={handlePartnerImageChange}
                        onImageMiddleChange={handleMiddleImageChange}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
            {tradeDetail!.details.status < 6 && tradeDetail!.details.status > 3 ? (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                  <Button>Accept</Button>
                </DialogTrigger>
                <DialogContent className="h-32 w-72">
                  <DialogHeader>
                    <DialogTitle className="mx-auto mb-2">Do you want to accept?</DialogTitle>
                    <DialogDescription className="mx-auto flex flex-row items-center justify-start gap-4">
                      <Button variant="default" className="w-16" onClick={() => handlePutStatusTrade(6)}>
                        Yes
                      </Button>
                      <Button variant="destructive" className="w-16">
                        <DialogClose>No</DialogClose>
                      </Button>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            ) : (
              'Accepted'
            )}
          </div>
          <div className="mx-auto flex flex-row gap-4">
            <div className="">
              <p className="text-center font-medium">Middle</p>
              {selectedMiddleImage ? (
                isImage(selectedMiddleImage as string) ? (
                  <img
                    src={selectedMiddleImage}
                    alt="Selected Image"
                    className="max-w-[40rem]  rounded-sm object-cover shadow-md"
                  />
                ) : (
                  <video
                    controls
                    src={selectedMiddleImage}
                    className="w-[40rem] max-w-[40rem] rounded-sm object-cover shadow-md"
                  ></video>
                )
              ) : (
                ''
              )}
            </div>
            <div className="">
              <p className="text-center font-medium">Partner</p>
              {selectedPartnerImage ? (
                isImage(selectedPartnerImage as string) ? (
                  <img
                    src={selectedPartnerImage}
                    alt="Selected Image"
                    className="max-w-[40rem]  rounded-sm object-cover shadow-md"
                  />
                ) : (
                  <video
                    controls
                    src={selectedPartnerImage}
                    className="w-[40rem] max-w-[40rem] rounded-sm object-cover shadow-md"
                  ></video>
                )
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center  px-32 py-16 opacity-90">
          <div className="flex flex-row items-center">
            <img
              className="mr-8 w-[50vw] rounded-sm"
              src="https://res.cloudinary.com/dbpvdxzvi/image/upload/v1715537416/UserProfile/user02/Image/khsvggcunpq1pl6nwwka.png"
              alt="Something went wrong ;v"
            />
            <div className="mb-32">
              <p className="py-4 text-3xl font-bold">Whoops! Looks like you haven&apos;t updated your target ;v</p>
              <p className="mb-6 w-[27vw]">
                You must update the target to require your partner to provide complete information.
              </p>
              <Button onClick={() => window.history.back()}>Go back</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default CheckListViewPage
