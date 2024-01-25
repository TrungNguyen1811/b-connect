import * as z from 'zod'

export const CartSchema = z.object({
  pickupLocation: z.string().min(10),
  returnLocation: z.string().min(10),
  rentalDate: z.date(),
  returnDate: z.date(),
  depositType: z.enum(['ONLINE', 'COD']),
})
