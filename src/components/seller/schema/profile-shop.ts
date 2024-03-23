import { z } from 'zod'

export const ProfileShopSchema = z.object({
  agencyName: z.string(),
  postAddress: z.string(),
  businessType: z.enum(['Individual', 'Company']),
  logoImg: z.any(),
})
