export interface ICategory {
  cateId?: string
  cateName: string
  imageDir?: File | null | string
  isSocialTag?: boolean
  description?: string
  createDate?: Date
}
