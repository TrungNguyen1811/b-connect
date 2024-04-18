import { z } from 'zod'

export const ImgSchema = z.object({
  fileName: z.string(),
  name: z.string(),
  fileSize: z.coerce.number().min(0),
  size: z.coerce.number().min(0),
  fileKey: z.string(),
  key: z.string(),
  fileUrl: z.string(),
  url: z.string(),
})
