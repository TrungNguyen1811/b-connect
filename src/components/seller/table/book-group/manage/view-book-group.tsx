import { useEffect, useState } from 'react'
import { IResponseBookGroup } from 'src/types'
import { toast } from 'src/components/ui/use-toast'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from 'src/components/ui/dialog'
import { Button } from 'src/components/ui/button'
import { Card, CardContent } from 'src/components/ui/card'
import { Label } from '@radix-ui/react-label'
import { getBookGroupById } from 'src/api/books/get-book'

export function ViewBookGroupDetail({ bookGroupId }: { bookGroupId: string }) {
  const [bookGroup, setBookGroup] = useState<IResponseBookGroup | undefined>(undefined)
  const fetchDataAndUpdateForm = async () => {
    try {
      const fetchedBookGroup: IResponseBookGroup = await getBookGroupById(bookGroupId)
      if (fetchedBookGroup && fetchedBookGroup.bookGroupId) {
        setBookGroup(fetchedBookGroup)
      } else {
        toast({
          title: 'Invalid bookGroup response',
          description: 'No bookGroup ID in the response.',
        })
      }
    } catch (error) {
      toast({
        title: 'Error bookGroup detail',
      })
    }
  }

  useEffect(() => {
    fetchDataAndUpdateForm()
  }, [bookGroupId]) // Add key as dependency

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Detail</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>BookGroup Detail</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Card className="py-4">
              <CardContent>
                <div>
                  <Label>
                    <strong>Name</strong>
                  </Label>
                  <p>{bookGroup?.bookGroupName}</p>
                </div>
                <div className="py-4">
                  <Label>
                    <strong>Description</strong>
                  </Label>
                  <p>{bookGroup?.description}</p>
                </div>
                <div>
                  <Label>
                    <strong>Image</strong>
                  </Label>
                  <img className="w-16" src={bookGroup?.imgDir as string} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
