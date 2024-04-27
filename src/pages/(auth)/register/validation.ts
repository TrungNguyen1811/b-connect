import * as z from 'zod'
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/
export const phoneRegex =
  /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .min(3)
      .refine((value) => emailRegex.test(value), {
        message: 'Invalid email format',
      }),
    username: z.string().min(6),
    // phone: z.string().regex(phoneRegex, {
    //   message: 'Invalid phone number',
    // }),
    password: z
      .string()
      .min(8)
      .regex(passwordRegex, 'Password must contain characters, 1 uppercase, 1 lowercase, 1 number'),
    confirmPassword: z.string().min(8),
    // fullName: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
    }
  })
