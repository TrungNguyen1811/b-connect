import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCheckList } from 'src/api/blog/interested'
import { Button } from 'src/components/ui/button'
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
        <div className="text-md w-48 font-semibold">Target: {target}</div>
        <div className="flex flex-row items-center gap-4">
          <p className="text-md font-semibold">MiddleUploadDir:</p>
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
        <div className="flex flex-row items-center gap-4">
          <p className="text-md font-semibold">UploadDir:</p>
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
        <Button type="submit">Request new image</Button>
      </div>
    </div>
  )
}

function CheckListViewPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [checkList, setCheckList] = useState<ICheckList[]>()
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
    if (checkList) {
      const targets = checkList.map((item) => item.target)
      setTarget(targets)
    }
  }, [checkList])

  const handleImageChange = (value: React.SetStateAction<string>) => {
    setSelectedImage(value as string)
  }

  return (
    <div className="mx-16 flex min-h-[42rem] flex-row items-center justify-start">
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
      <div className="mx-auto">
        {isImage(selectedImage as string) ? (
          <img src={selectedImage} alt="Selected Image" className="max-w-[32rem]  rounded-sm object-cover shadow-md" />
        ) : (
          <video
            controls
            src={selectedImage}
            className="w-[32rem] max-w-[32rem] rounded-sm object-cover shadow-md"
          ></video>
        )}
      </div>
    </div>
  )
}
export default CheckListViewPage
