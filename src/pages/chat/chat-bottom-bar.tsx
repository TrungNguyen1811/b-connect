import { faker } from '@faker-js/faker'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FileImage, Paperclip, SendHorizontal } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getUserChat } from 'src/api/chat/get-chat'
import { postChatMessage } from 'src/api/chat/post-chat'
import { buttonVariants } from 'src/components/ui/button'
import { Form, FormControl, FormField, FormItem } from 'src/components/ui/form'
import { Textarea } from 'src/components/ui/text-area'
import { cn } from 'src/lib/utils'
import { Message, UserChat, UserChatReply } from 'src/types/chat'
import { z } from 'zod'

interface ChatBottomBarProps {
  sendMessage: (newMessage: Message) => void
}

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }]
const chatSchema = z.object({
  messageText: z.string(),
})
type FormData = z.infer<typeof chatSchema>
export default function ChatBottomBar({ sendMessage }: ChatBottomBarProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(chatSchema),
  })
  const query = useQueryClient()
  const [userData, setUserData] = useState<UserChat>()

  useEffect(() => {
    const fetchListUser = async () => {
      const listUser = await getUserChat()
      setUserData(listUser)
    }
    fetchListUser()
  }, [])

  const [message, setMessage] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value)
  }

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: faker.string.uuid(),
        name: userData?.name as string,
        avatar: userData?.avatar as string,
        message: message.trim(),
      }
      sendMessage(newMessage)
      setMessage('')

      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }

  const { mutate: postMessage } = useMutation({
    mutationFn: (formData: UserChatReply) => {
      return postChatMessage(userData?.id as string, formData)
    },
    onSuccess: () => {
      query.invalidateQueries()
    },
  })

  const onSubmit = (data: FormData) => {
    const formData: UserChatReply = {
      receiverId: userData?.id as string,
      messageText: data.messageText,
    }
    postMessage(formData)
  }

  return (
    <div className="flex w-full items-center justify-between gap-2 p-2">
      <Form {...form}>
        <form className="flex w-full flex-row items-center justify-between" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="messageText"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="w-full">
                  <Textarea
                    {...field}
                    autoComplete="off"
                    value={message}
                    ref={inputRef}
                    onChange={handleInputChange}
                    name="message"
                    placeholder="Aa"
                    className="min-h-8 flex w-full resize-none items-center overflow-hidden rounded-full border bg-background px-4 py-0 pt-4"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <button
            type="submit"
            onClick={handleSend}
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'icon' }),
              'h-9 w-9',
              'mx-2 shrink-0 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
            )}
          >
            <SendHorizontal size={20} className="text-muted-foreground" />
          </button>
        </form>
      </Form>
    </div>
  )
}
