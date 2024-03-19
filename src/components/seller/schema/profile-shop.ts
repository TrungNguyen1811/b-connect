import { z } from 'zod'

export const ProfileShopSchema = z.object({
  agencyId: z.string(),
  ownerId: z.string(),
  agencyName: z.string(),
  postAddress: z.string(),
  businessType: z.enum(['Individual', 'Company']),
  logoImg: z.any(),
})
