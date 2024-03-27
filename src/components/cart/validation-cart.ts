import * as z from 'zod'

export const CartSchema = z.object({
  city_Province: z.string(),
  district: z.string() || null,
  subDistrict: z.string() || null,
  rendezvous: z.string(),
  paymentMethod: z.enum(['VnPay', 'COD']),
})
