import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLabelByFullname(fullName?: string): string | undefined {
  if (!fullName) {
    return fullName
  }
  const split = fullName.split(' ')
  const firstLetter = split.map((word) => word.charAt(0).toUpperCase())

  return firstLetter.join('')
}

export function formatPrice(price: number | undefined = 0) {
  return price.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })
}
