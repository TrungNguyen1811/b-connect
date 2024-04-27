import { z } from 'zod'
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/
export const ChangePasswordSchema = z
  .object({
    password: z.string().min(8),
    newPassword: z
      .string()
      .min(8)
      .regex(passwordRegex, 'Password must contain characters, 1 uppercase, 1 lowercase, 1 number'),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
    }
  })
