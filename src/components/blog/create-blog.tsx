import { XIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createBlogSchema } from './validation'
import { useEffect, useState } from 'react'
import { Form, FormField, FormItem, FormControl, FormLabel } from '../ui/form'
import { ScrollArea } from '../ui/scroll-area'
import { Input } from '../ui/input'
import { PlateEditor } from '../ui/plate-editor'
import { Value } from '@udecode/plate-common'
import { ICategory } from 'src/types'
import { getAllCategories } from 'src/api/categories/get-category'
import { toast } from '../ui/use-toast'
import Select from 'react-select'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from 'src/lib/query'
import { IBlog } from 'src/types/blog'
import { postBlogApi } from 'src/api/blog/post-blog'

type FormData = z.infer<typeof createBlogSchema>

export default function CreateBlog() {
  const form = useForm<FormData>({
    resolver: zodResolver(createBlogSchema),
  })
  const navigate = useNavigate()

  interface Options {
    readonly value: string
    readonly label: string
  }

  // const [categories, setCategories] = useState<ICategory[]>()
  const [options, setOptions] = useState<readonly Options[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const selectedCategoriesString = selectedCategories.join(',')

  useEffect(() => {
    getAllCategories()
      .then((category: ICategory[]) => {
        if (category) {
          // setCategories(category)
          const validCategories = category.filter((cat) => cat._id !== undefined)
          const categoryOptions: Options[] = validCategories.map((cat) => ({
            value: cat._id!,
            label: cat.name,
          }))
          setOptions(categoryOptions)
        } else {
          toast({
            title: 'Invalid category response',
            description: 'No category ID in the response.',
          })
        }
      })
      .catch((error: Error) => {
        toast({
          title: 'Error category detail',
          description: error.message,
        })
      })
  }, [])

  const Close = () => {
    return (
      <Dialog>
        <DialogTrigger className="flex">
          <XIcon size={24} />
          <DialogClose />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="pb-4 text-xl font-bold">You have unsaved changes</DialogTitle>
            <Separator />
            <p className="py-2">You{"'"}ve made changes to your post. Do you want to navigate to leave this page?</p>
            <DialogDescription className="flex flex-row">
              <Button className="mr-4 bg-red-600" onClick={() => navigate('/blog')}>
                Yes, leave the page
              </Button>
              <Button>
                <DialogClose>No, keep editing</DialogClose>
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }
  const initialValue = [
    {
      id: '1',
      type: 'p',
      children: [{ text: 'Hello, World!' }],
    },
  ]
  const [content, setContent] = useState<Value>(initialValue)

  // Hàm xử lý khi submit form
  const onsubmit = async (data: FormData) => {
    const dataBlog = {
      ...(data as FormData),
      category: selectedCategoriesString,
      image: data.image,
      content: JSON.stringify(content),
    }
    console.log('Form data:', dataBlog)

    // console.log('Form data:', dataBlog)
    postBlog.mutate(dataBlog)
  }

  const postBlog = useMutation((data: IBlog) => postBlogApi(data, data.image as string), {
    onSuccess: (blog: IBlog) => {
      if (blog && blog._id) {
        console.log('Blog ID:', blog._id)
        toast({
          title: 'Successful!!!',
          description: 'Add Blog Success!',
        })
        queryClient.invalidateQueries()
        navigate('/blog')
      } else {
        toast({
          title: 'Invalid Blog response',
          description: 'No Blog ID in the response.',
        })
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error submitting book',
        description: error.message,
      })
    },
  })

  return (
    <div className="h-screen bg-slate-100">
      <div className="mx-32 flex flex-row justify-between px-4 py-2">
        <div className="flex flex-row items-center">
          <p className="text-black-100 xs:text-2xl mr-4 cursor-pointer justify-center font-extrabold lg:text-3xl">
            <Link to="/blog">BSocial</Link>
          </p>
          <p className="text-md font-semibold">Create Post</p>
        </div>
        <div>
          <Close />
        </div>
      </div>
      <div className="flex flex-row">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)}>
            <ScrollArea className="ml-52 flex h-[35rem] w-[50rem] flex-row justify-between rounded-lg border-2 bg-white px-4 py-2">
              <div className="rounded-lg border-gray-400 px-12 py-6">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center">
                      <FormLabel className="mr-10 text-lg">Add a cover image</FormLabel>
                      <FormControl>
                        <Input
                          className="w-[27rem]"
                          type="file"
                          onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormControl>
                      <Input
                        {...field}
                        className="sm:text3-xl focus-visible my-2 h-16 border-none font-bold outline-none hover:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-offset-ring md:text-4xl lg:text-5xl"
                        placeholder="New a post title here..."
                      />
                    </FormControl>
                  )}
                />
                <Select
                  value={selectedCategories.map((value) => ({
                    value,
                    label: options.find((option) => option.value === value)?.label,
                  }))}
                  onChange={(selectedOptions: any) => {
                    const selectedValues = selectedOptions.map((option: any) => option.value)
                    setSelectedCategories(selectedValues)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const target = e.target as HTMLInputElement
                      if (target.value) {
                        const newCategory = { value: target.value, label: target.value }
                        setSelectedCategories([...selectedCategories, target.value])
                        target.value = '' // Xóa giá trị trường nhập sau khi thêm vào danh sách đã chọn
                      }
                    }
                  }}
                  isMulti
                  placeholder="Add categories"
                  name="categories"
                  options={options}
                  className="basic-multi-select z-20 my-2 mb-4"
                  classNamePrefix="select"
                />
                <PlateEditor setContentValue={setContent} content={content} />
              </div>
            </ScrollArea>
            <div className="mx-52 flex flex-row justify-between py-6">
              <Button type="submit">Publish</Button>
            </div>
          </form>
        </Form>
        <div>
          <div className="w-[28rem] p-5 pt-36">
            <p className="py-2">
              <strong>Writing a Great Post</strong>
            </p>
            <div className="pl-5">
              <p>
                Title Think of your post title as a super short (but compelling!) description — like an overview of the
                actual post in one short sentence.
              </p>
              <br></br>
              <p>Use keywords where appropriate to help ensure people can find your post by search.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
