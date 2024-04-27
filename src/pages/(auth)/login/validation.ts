import * as z from 'zod'
const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const LoginSchema = z.object({
  email: z
    .string()
    .min(3)
    .refine((value) => emailRegex.test(value), {
      message: 'Invalid email format',
    }),
  password: z.string().refine((value) => passwordRegex.test(value), {
    message: 'Password must less contain characters, 1 uppercase, 1 lowercase, 1 number',
  }),
  remember: z.boolean(),
})
