import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCheckList } from 'src/api/blog/interested'
import { Button } from 'src/components/ui/button'
import { useAuth } from 'src/hooks/useAuth'
import { ICheckList } from 'src/types/advertisement'
import { ROLE } from 'src/types/user'

function CheckListItemForm({
  id,
  target,
  checkList,
  isStaff,
}: {
  id: string
  target: string
  isStaff: boolean
  checkList: ICheckList
}) {
  return (
    <>
      <div className="my-4 flex flex-row items-center gap-4">
        <div className="text-md w-48 font-semibold">Target: {target}</div>
        <div className="flex flex-row items-center gap-4">
          <p className="text-md font-semibold">MiddleUploadDir:</p>
          <img src={checkList.middleUploadDir as string} className="h-16" />
        </div>
        <div className="flex flex-row items-center gap-4">
          <p className="text-md font-semibold">UploadDir:</p>
          <img src={checkList.bookOwnerUploadDir as string} className="h-16" />
        </div>
        <Button type="submit">Request new image</Button>
      </div>
    </>
  )
}

function CheckListViewPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [checkList, setCheckList] = useState<ICheckList[]>()
  const [targets, setTarget] = useState<string[]>()

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

  return (
    <div className="mx-32 min-h-[42rem]">
      <div>
        {targets?.map((target, index) => (
          <div key={index}>
            <CheckListItemForm
              checkList={checkList?.find((ck) => ck.target == target) as ICheckList}
              id={id as string}
              target={target}
              isStaff={user?.roles?.includes(ROLE.STAFF) || false}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
export default CheckListViewPage
