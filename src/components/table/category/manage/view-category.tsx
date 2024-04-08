import { useEffect, useState } from 'react'
import { ICategory } from 'src/types'
import { toast } from 'src/components/ui/use-toast'
import { getCategoryById } from 'src/api/categories/get-category'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from 'src/components/ui/dialog'
import { Button } from 'src/components/ui/button'
import { Card, CardContent } from 'src/components/ui/card'
import { Label } from '@radix-ui/react-label'

export function ViewCategoryDetail({ categoryId }: { categoryId: string }) {
  const [category, setCategory] = useState<ICategory | undefined>(undefined)
  console.log(category)
  const fetchDataAndUpdateForm = async () => {
    try {
      const fetchedCategory: ICategory = await getCategoryById(categoryId)
      if (fetchedCategory && fetchedCategory.cateId) {
        setCategory(fetchedCategory)
      } else {
        toast({
          title: 'Invalid category response',
          description: 'No category ID in the response.',
        })
      }
    } catch (error) {
      toast({
        title: 'Error category detail',
      })
    }
  }

  useEffect(() => {
    fetchDataAndUpdateForm()
  }, [categoryId]) // Add key as dependency

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Detail</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Category Detail</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Card className="py-4">
              <CardContent>
                <div>
                  <Label>
                    <strong>Name</strong>
                  </Label>
                  <p>{category?.cateName}</p>
                </div>
                <div className="py-4">
                  <Label>
                    <strong>Description</strong>
                  </Label>
                  <p>{category?.description}</p>
                </div>
                <div>
                  <Label>
                    <strong>Image</strong>
                  </Label>
                  <img className="w-16" src={category?.imageDir as string} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
