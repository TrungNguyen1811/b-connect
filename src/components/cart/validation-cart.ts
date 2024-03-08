import * as z from 'zod'

export const CartSchema = z.object({
  address: z.string().min(10),
  paymentMethod: z.enum(['VnPay', 'COD']),
})
