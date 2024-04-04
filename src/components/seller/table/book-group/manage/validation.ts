import { z } from 'zod'

export const bookGroupSchema = z.object({
  bookGroupName: z.string(),
  bookGroupImg: z.any(),
  description: z.string(),
})
