import { Loader2, XIcon } from 'lucide-react'
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
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Form, FormField, FormItem, FormControl, FormLabel } from '../../components/ui/form'
import { ScrollArea } from '../../components/ui/scroll-area'
import { Input } from '../../components/ui/input'
import { toast } from '../../components/ui/use-toast'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from 'src/lib/query'
import { addSocialTag, postBlogApi } from 'src/api/blog/post-blog'
import { useAuth } from 'src/hooks/useAuth'
import { PlateEditor } from 'src/components/ui/plate-editor'
import { Value } from '@udecode/plate-common'
import { ReactTags, Tag } from 'react-tag-autocomplete'
import { getAllCategoryNoParam } from 'src/api/categories/get-category'
import { ICategory } from 'src/types/categories'
import './style.css'

type FormData = z.infer<typeof createBlogSchema>
interface createPost {
  productImages: File | null
  productVideos: File | null
  title: string
  content: string
  isTradePost: boolean
}
export default function CreateBlog() {
  const form = useForm<FormData>({
    resolver: zodResolver(createBlogSchema),
  })
  const navigate = useNavigate()
  const { user } = useAuth()

  interface Options {
    readonly value: string
    readonly label: string
  }

  //Tag
  const [selected, setSelected] = useState<Tag[]>([])
  const reactTags = useRef(null)
  const [options, setOptions] = useState<Options[]>([])

  const onAdd = useCallback(
    (newTag: Tag) => {
      if (selected.length > 4) {
        toast({
          title: 'The limit for a post is 4 tags',
        })
      } else setSelected([...selected, newTag])
    },
    [selected],
  )

  const onDelete = useCallback(
    (tagIndex: number) => {
      setSelected(selected.filter((_, i) => i !== tagIndex))
    },
    [selected],
  )

  const listTags = useMemo(() => {
    if (!selected) return
    else return selected.map((ct) => ct.label)
  }, [selected])

  useEffect(() => {
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

  //Dialog
  const [open, setOpenDialog] = useState<boolean>(false)

  //Close
  const Close = () => {
    return (
      <Dialog>
        <DialogTrigger className="flex">
          <XIcon size={24} />
          <DialogClose />
        </DialogTrigger>
        <DialogContent className="w-[32rem]">
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

  // Set agree
  const [agree, setAgree] = useState<boolean>(false)
  const handleAgree = () => {
    if (agree) {
      setAgree(false)
    } else setAgree(true)
  }
  //Set checkbox
  const [isChecked, setIsChecked] = useState<boolean>()

  const handleChecked = () => {
    if (!user?.isValidated) {
      setIsChecked(false)
      setOpenDialog(true)
    } else setIsChecked(!isChecked)
  }

  //Set content
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
      const dataBlog: createPost = {
        ...(data as FormData),
        productImages: data.productImages,
        productVideos: data.productVideos,
        isTradePost: isChecked ? isChecked : false,
        title: data.title,
        content: data.content,
      }
      // console.log('Form data:', dataBlog)
      postBlog.mutate(dataBlog)
    }
  }

  const postBlog = useMutation((data: createPost) => postBlogApi(data), {
    onSuccess: (res) => {
      if (res) {
        queryClient.invalidateQueries()
        const postId: string = res
        const data = {
          tagNames: listTags!,
          postId: postId,
        }
        postTags.mutate(data)
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

  const postTags = useMutation((data: { tagNames: string[]; postId: string }) => addSocialTag(data), {
    onSuccess: (status) => {
      if (status) {
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
    <div className="mt-4 h-screen bg-slate-100">
      {/* <div className="mx-32 flex flex-row justify-between px-4 py-2">
        <div className="flex flex-row items-center">
          <p className="text-black-100 xs:text-2xl mr-4 justify-center font-extrabold lg:text-3xl">
            <Link to="/blog">BSocial</Link>
          </p>
          <p className="text-md font-semibold">Create Post</p>
        </div>
        <div>
          <Close />
        </div>
      </div> */}
      <div className="absolute right-10 top-20">
        <Close />
      </div>
      <div className="flex flex-row">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ScrollArea className="ml-52 flex h-[35rem] w-[50rem] flex-row justify-between rounded-lg border-2 bg-white px-4 py-2">
              <div className="rounded-lg border-gray-400 px-12 py-6">
                <div className="flex flex-row items-center justify-stretch">
                  <FormField
                    control={form.control}
                    name="productImages"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center">
                        {field.value ? (
                          <FormLabel className="mr-10 rounded-md border-2 px-2 py-1 text-base">
                            <FormControl>
                              <Input
                                className="screen-reader-only"
                                type="file"
                                onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                              />
                            </FormControl>
                            Change a cover image
                          </FormLabel>
                        ) : (
                          <FormLabel className="mr-10 rounded-md border-2 px-2 py-1 text-base">
                            <FormControl>
                              <Input
                                className="screen-reader-only"
                                type="file"
                                onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                              />
                            </FormControl>
                            Add a cover image
                          </FormLabel>
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="productVideos"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center">
                        {field.value ? (
                          <FormLabel className="mr-10 rounded-md border-2 px-2 py-1 text-base">
                            <FormControl>
                              <Input
                                className="screen-reader-only"
                                type="file"
                                onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                              />
                            </FormControl>
                            Change a video introduce
                          </FormLabel>
                        ) : (
                          <FormLabel className="mr-10 rounded-md border-2 px-2 py-1 text-base">
                            <FormControl>
                              <Input
                                className="screen-reader-only"
                                type="file"
                                onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                              />
                            </FormControl>
                            Add a video introduce
                          </FormLabel>
                        )}
                      </FormItem>
                    )}
                  />
                  <div className="flex-grow" />
                  <div className="flex flex-row items-center gap-1 space-y-1 leading-none">
                    <p>Trade post</p>
                    <input type="checkbox" checked={isChecked} onChange={handleChecked} />
                  </div>
                  <Dialog open={open} onOpenChange={setOpenDialog}>
                    <DialogContent className="w-[32rem]">
                      <DialogHeader>
                        <DialogTitle className="pb-4 text-xl font-bold">
                          You don&apos;t have permission to do this
                        </DialogTitle>
                        <Separator />
                        <p className="py-2">
                          You must authenticate your account to be able to perform this action. Do you want to update
                          national identify card?
                        </p>
                        <DialogDescription className="flex flex-row">
                          <Button className="mr-4 bg-red-600" onClick={() => navigate('/user/account/identify')}>
                            Yes, I do.
                          </Button>
                          <Button>
                            <DialogClose>No, keep editing.</DialogClose>
                          </Button>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormControl>
                      <Input
                        {...field}
                        className="focus-visible my-2 h-16 border-none font-bold outline-none hover:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-offset-ring sm:text-4xl md:text-4xl lg:text-5xl"
                        placeholder="New a post title here..."
                      />
                    </FormControl>
                  )}
                />
                <div className="mb-4">
                  <ReactTags
                    labelText="Add up to 4 tags"
                    selected={selected}
                    suggestions={options}
                    onAdd={onAdd}
                    onDelete={onDelete}
                    noOptionsText="No matching countries"
                    delimiterKeys={[',', 'Enter']}
                    allowNew={true}
                    ref={reactTags}
                  />
                </div>
                <PlateEditor setContentValue={setContent} content={content} />
              </div>
            </ScrollArea>
            {isChecked ? (
              <div className="ml-52 flex flex-row gap-1">
                <input type="checkbox" checked={agree} onChange={handleAgree} />
                <p>
                  I have read and agree to the website{' '}
                  <Link to={'/policy'} className="text-orange-500">
                    privacy policy
                  </Link>
                </p>
              </div>
            ) : (
              ''
            )}
            <div className="mx-52 flex flex-row justify-between py-6">
              <Button disabled={postBlog.isLoading || isChecked ? !agree : agree} type="submit">
                {postBlog.isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ''}Publish
              </Button>
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
