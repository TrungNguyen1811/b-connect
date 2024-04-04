import { z } from 'zod'

export const bookGroupSchema = z.object({
  productId: z.string(),
  bookGroupIds: z.array(z.string()),
})
