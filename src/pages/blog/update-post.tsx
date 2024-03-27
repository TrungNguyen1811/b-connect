import { XIcon } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
import { updateBlogSchema } from '../../components/blog/validation'
import { useEffect, useState } from 'react'
import { Form, FormField, FormItem, FormControl, FormLabel } from '../../components/ui/form'
import { ScrollArea } from '../../components/ui/scroll-area'
import { Input } from '../../components/ui/input'
import { PlateEditor } from '../../components/ui/plate-editor'
import { Value } from '@udecode/plate-common'
import { ICategory } from 'src/types'
import { getAllCategories } from 'src/api/categories/get-category'
import { toast } from '../../components/ui/use-toast'
import Select from 'react-select'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from 'src/lib/query'
import { IBlog, IBlogResponse, IResponsePost } from 'src/types/blog'
import { updateBlogApi } from 'src/api/blog/post-blog'
import { getPostByIdApi } from 'src/api/blog/get-blog'

type FormData = z.infer<typeof updateBlogSchema>

export default function UpdateBlog() {
  const [blogData, setBlogData] = useState<IBlogResponse | null>(null)
  const initialValue = [
    {
      id: '1',
      type: 'p',
      children: [{ text: 'Hello, World!!!' }],
    },
  ]
  const form = useForm<FormData>({
    resolver: zodResolver(updateBlogSchema),
    defaultValues: {
      userId: blogData?.userId,
      postId: blogData?.postId,
      authorName: blogData?.authorName,
      productImgs: blogData?.imageDir || '',
      title: blogData?.title || '',
      listCate: JSON.stringify(blogData?.listCate) || '',
      content: blogData?.content || '',
    },
  })
  const navigate = useNavigate()
  const param = useParams()
  const id: string = param['id'] as string

  useEffect(() => {
    if (blogData?.content) {
      try {
        const parsedData: Value = JSON.parse(blogData.content)
        setContent(parsedData)
        console.log('p', parsedData)
      } catch (error) {
        console.error('Error parsing blog data content:', error)
      }
    }
  }, [blogData])

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const currentBlogData: IResponsePost = await getPostByIdApi(id)
        setBlogData(currentBlogData.postData)
      } catch (error) {
        console.error('Error fetching blog data:', error)
      }
    }

    fetchBlogData()
  }, [id])

  interface Options {
    readonly value: string
    readonly label: string
  }

  const [options, setOptions] = useState<readonly Options[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const selectedCategoriesString = selectedCategories.join(',')
  form.setValue('listCate', selectedCategoriesString)

  useEffect(() => {
    getAllCategories()
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

  const [content, setContent] = useState<Value>(initialValue)
  form.setValue('content', JSON.stringify(content))
  useEffect(() => {
    setContent(content)
  }, [content])

  const onsubmit = async (data: FormData) => {
    const dataBlog: FormData = {
      ...(data as FormData),
      userId: blogData?.userId as string,
      postId: blogData?.postId as string,
      authorName: blogData?.authorName as string,
      listCate: data.listCate,
      productImgs: data.productImgs,
      content: data.content,
    }
    console.log('Form data:', dataBlog)

    updateBlog.mutate(dataBlog)
  }

  const updateBlog = useMutation((data: FormData) => updateBlogApi(data), {
    onSuccess: (blog: IBlog) => {
      if (blog && blog.postId) {
        console.log('Blog ID:', blog.postId)
        toast({
          title: 'Successful!!!',
          description: 'Update Blog Success!',
        })
        queryClient.invalidateQueries()
        navigate(`/blog/${blog.postId}`)
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
          <form onSubmit={form.handleSubmit(onsubmit)}>
            <ScrollArea className="ml-52 flex h-[35rem] w-[50rem] flex-row justify-between rounded-lg border-2 bg-white px-4 py-2">
              <div className="rounded-lg border-gray-400 px-12 py-6">
                <FormField
                  control={form.control}
                  name="productImgs"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center">
                      <FormLabel className="mr-10 text-lg">Add a cover image</FormLabel>
                      <FormControl>
                        <Input
                          className="w-[27rem]"
                          type="file"
                          onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                          defaultValue={form.getValues('productImgs')}
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
                        defaultValue={blogData?.title}
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
                        target.value = ''
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
