import { z } from 'zod'

export const ChangePasswordSchema = z.object({
  password: z.string().min(6),
  newPassword: z.string().min(6),
  confirmPassword: z.string().min(6),
})
