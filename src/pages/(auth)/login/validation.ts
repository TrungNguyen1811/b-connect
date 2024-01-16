import * as z from 'zod'

export const LoginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  remember: z.boolean(),
})
