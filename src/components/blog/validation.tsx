import { z } from 'zod'

const contentSchema = z.object({
  id: z.string(),
  type: z.string(),
  children: z.array(
    z.object({
      text: z.string(),
    }),
  ),
})

export const createBlogSchema = z.object({
  productImages: z.any(),
  productVideos: z.any(),
  title: z.string(),
  content: z.string(),
  isTradePost: z.boolean().optional().default(false),
})

export const updateBlogSchema = z.object({
  productImages: z.any(),
  productVideos: z.any(),
  title: z.string(),
  content: z.string(),
  isLock: z.boolean(),
})
