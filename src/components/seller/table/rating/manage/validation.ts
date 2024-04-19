import { z } from 'zod'

export const replySchema = z.object({
  ReplyText: z.string(),
})
