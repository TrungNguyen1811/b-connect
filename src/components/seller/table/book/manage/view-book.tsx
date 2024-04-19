import { useEffect, useState } from 'react'
import { IBook } from 'src/types'
import { toast } from 'src/components/ui/use-toast'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from 'src/components/ui/dialog'
import { Button } from 'src/components/ui/button'
import { Card, CardContent } from 'src/components/ui/card'
import { Label } from '@radix-ui/react-label'
import { getBookById } from 'src/api/books/get-book'

export function ViewBookDetail({ bookId }: { bookId: string }) {
  const [book, setBook] = useState<IBook | undefined>(undefined)
  console.log(book)
  const fetchDataAndUpdateForm = async () => {
    try {
      const fetchedBook: IBook = await getBookById(bookId)
      if (fetchedBook && fetchedBook.productId) {
        setBook(fetchedBook)
      } else {
        toast({
          title: 'Invalid book response',
          description: 'No book ID in the response.',
        })
      }
    } catch (error) {
      toast({
        title: 'Error book detail',
      })
    }
  }

  useEffect(() => {
    fetchDataAndUpdateForm()
  }, [bookId]) // Add key as dependency

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Detail</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book Detail</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Card className="py-4">
              <CardContent>
                <div>
                  <Label>
                    <strong>Name</strong>
                  </Label>
                  <p>{book?.name}</p>
                </div>
                <div className="py-4">
                  <Label>
                    <strong>Description</strong>
                  </Label>
                  <p>{book?.description}</p>
                </div>
                <div>
                  <Label>
                    <strong>Image</strong>
                  </Label>
                  <img className="w-16" src={book?.bookImg as string} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
