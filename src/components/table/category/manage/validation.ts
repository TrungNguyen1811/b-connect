import { z } from 'zod'

export const CategorySchema = z.object({
  cateName: z.string(),
  description: z.string(),
  image: z.any(),
})
