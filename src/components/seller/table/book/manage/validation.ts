import { z } from 'zod'

export const bookSchema = z.object({
  name: z.string(),
  author: z.string(),
  description: z.string(),
  price: z.coerce.number().min(0),
  publishDate: z.date(),
  category: z.array(z.string()),
  type: z.enum(['New', 'Old']),
  bookImg: z.array(z.any()).max(6),
  backgroundImg: z.any(),
  quantity: z.coerce.number().min(0),
})
export const updateBookSchema = z.object({
  name: z.string(),
  author: z.string(),
  description: z.string(),
  price: z.coerce.number().min(0),
  publishDate: z.date(),
  category: z.array(z.string()),
  type: z.enum(['New', 'Old']),
  bookImg: z.array(z.any()).max(6),
  backgroundImg: z.any(),
  quantity: z.coerce.number().min(0),
})
