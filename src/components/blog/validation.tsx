import { z } from 'zod'

interface contentBlog {
  id: string
  type: string
  children: {
    text: string
  }[]
}

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
  image: z.any(),
  title: z.string(),
  // category: z.string(),
  // content: contentSchema.array(),
})
