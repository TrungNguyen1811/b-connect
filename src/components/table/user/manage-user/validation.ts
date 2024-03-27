import { z } from 'zod'

export const UserSchema = z.object({
  username: z.string(),
  email: z.string(),
  role: z.enum(['ADMIN', 'MANAGER', 'CUSTOMER', 'Agency', 'BaseUser']),
  address: z.string(),
  blocked: z.boolean(),
})
