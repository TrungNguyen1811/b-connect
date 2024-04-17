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

import { addDays, addHours, addMinutes, addSeconds, format } from 'date-fns'

export function formatDuration(days: number, hours: number, minutes: number, seconds: number): string {
  let date = new Date(0)
  date = addDays(date, days)
  date = addHours(date, hours)
  date = addMinutes(date, minutes)
  date = addSeconds(date, seconds)
  date = new Date(date.getTime()) // Add milliseconds

  return format(date, 'D.HH:mm:ss')
}

export function formatDate(formDate: Date) {
  return (
    formDate.getFullYear() +
    '/' +
    ('0' + (formDate.getMonth() + 1)).slice(-2) +
    '/' +
    ('0' + formDate.getDate()).slice(-2)
  )
}
