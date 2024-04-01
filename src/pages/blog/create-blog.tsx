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
} from '../../components/ui/dialog'
import { Separator } from '../../components/ui/separator'
import { Button } from '../../components/ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createBlogSchema } from '../../components/blog/validation'
import { useEffect, useState } from 'react'
import { Form, FormField, FormItem, FormControl, FormLabel } from '../../components/ui/form'
import { ScrollArea } from '../../components/ui/scroll-area'
import { Input } from '../../components/ui/input'
import { ICategory } from 'src/types'
import { getAllCategoryNoParam } from 'src/api/categories/get-category'
import { toast } from '../../components/ui/use-toast'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from 'src/lib/query'
import { postBlogApi } from 'src/api/blog/post-blog'
import { useAuth } from 'src/hooks/useAuth'
import { Checkbox } from 'src/components/ui/check-box'
import { PlateEditor } from 'src/components/ui/plate-editor'
import { Value } from '@udecode/plate-common'

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

  const { user } = useAuth()

  // const [categories, setCategories] = useState<ICategory[]>()
  const [options, setOptions] = useState<readonly Options[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const selectedCategoriesString = selectedCategories.join(',')
  // form.setValue('listCate', selectedCategoriesString)

  useEffect(() => {
    // Gọi hàm API trong useEffect
    getAllCategoryNoParam()
      .then((category: ICategory[]) => {
        if (category) {
          const validCategories = category.filter((cat) => cat.cateId !== undefined)
          const categoryOptions: Options[] = validCategories.map((cat) => ({
            value: cat.cateId!,
            label: cat.cateName,
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
  useEffect(() => {
    form.setValue('content', JSON.stringify(content))
  }, [content, form])

  // Hàm xử lý khi submit form
  const onSubmit = async (data: FormData) => {
    console.log('Form data:')

    if (user) {
      const dataBlog: FormData = {
        ...(data as FormData),
        // authorName: user.username as string,
        // listCate: data.listCate as string,
        productImages: data.productImages,
        productVideos: data.productVideos,
        isTradePost: data.isTradePost,
        title: data.title,
        content: data.content,
      }
      console.log('Form data:', dataBlog)

      // console.log('Form data:', dataBlog)
      postBlog.mutate(dataBlog)
    }
  }

  const postBlog = useMutation((data: FormData) => postBlogApi(data), {
    onSuccess: (status) => {
      if (status === 200) {
        console.log('Successful!!!')
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
        title: 'Error submitting post',
        description: error.message,
      })
    },
  })

  return (
    <div className="h-screen bg-slate-100">
      <div className="mx-32 flex flex-row justify-between px-4 py-2">
        <div className="flex flex-row items-center">
          <p className="text-black-100 xs:text-2xl mr-4 justify-center font-extrabold lg:text-3xl">
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ScrollArea className="ml-52 flex h-[35rem] w-[50rem] flex-row justify-between rounded-lg border-2 bg-white px-4 py-2">
              <div className="rounded-lg border-gray-400 px-12 py-6">
                <FormField
                  control={form.control}
                  name="isTradePost"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>This post is a trade post</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productImages"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center">
                      <FormLabel className="mr-10 text-lg">Add a cover image</FormLabel>
                      <FormControl>
                        <Input
                          className="ml-8 w-[27rem]"
                          type="file"
                          onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productVideos"
                  render={({ field }) => (
                    <FormItem className="mb-4 flex flex-row items-center">
                      <FormLabel className="mr-10 text-lg">Add a Video Introduce</FormLabel>
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
                {/* <Select
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
                /> */}
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
