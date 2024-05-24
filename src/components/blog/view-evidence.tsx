import { Dialog, DialogContent, DialogTrigger } from 'src/components/ui/dialog'
import { Button } from '../ui/button'
import { useState, useCallback } from 'react'
import { getEvidence } from 'src/api/blog/interested'

function ViewEvidence({ tradeDetailsId }: { tradeDetailsId: string }) {
  const [open, setOpen] = useState<boolean>(false)
  const [video, setVideo] = useState('')

  const fetchData = useCallback(async () => {
    const evidence = await getEvidence(tradeDetailsId, true)
    setVideo(evidence)
  }, [tradeDetailsId])

  // Call fetchData when the dialog is opened
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (isOpen) {
      fetchData()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger className="flex justify-center">
        <Button>View evidence</Button>
      </DialogTrigger>
      <DialogContent className="min-h-[20rem] w-[36rem]">
        <video src={video as string} className="max-h-[24rem] w-full rounded-md" controls></video>
      </DialogContent>
    </Dialog>
  )
}
export default ViewEvidence
