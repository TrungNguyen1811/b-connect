import { z } from 'zod'

export const ProfileShopSchema = z.object({
  name: z.string(),
  image: z.any(),
  description: z.string(),
})
