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
  userId: z.string(),
  // authorName: z.string(),
  productImages: z.any(),
  productVideos: z.any(),
  // title: z.string(),
  // listCate: z.string(),
  content: z.string(),
  isTradePost: z.boolean().default(false),
})

export const updateBlogSchema = z.object({
  postId: z.string(),
  userId: z.string(),
  authorName: z.string(),
  productImgs: z.any(),
  title: z.string(),
  listCate: z.string(),
  content: z.string(),
})
