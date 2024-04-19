import { z } from 'zod'

export const ProfileShopSchema = z.object({
  agencyName: z.string(),
  postAddress: z.string().optional(),
  businessType: z.enum(['Individual', 'Company']),
  logoImg: z.any(),
  city_Province: z.string(),
  district: z.string() || null,
  subDistrict: z.string() || null,
  rendezvous: z.string(),
})
