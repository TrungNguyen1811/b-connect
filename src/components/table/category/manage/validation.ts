import { z } from 'zod'

export const CategorySchema = z.object({
  cateName: z.string(),
  description: z.string(),
  imageDir: z.any(),
})

export const UpdateCategorySchema = z.object({
  cateName: z.string(),
  description: z.string(),
  image: z.any(),
})
