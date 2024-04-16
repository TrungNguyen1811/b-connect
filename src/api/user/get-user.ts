import { authAxiosClient } from 'src/lib/axios'
import { User } from 'src/types/user'

export async function getUserById(userId: string) {
  return authAxiosClient.get(`/user/get-user-by-userId?userId=${userId}`).then((res) => {
    const data: User = res.data
    return data
  })
}

export async function getUserByUserName(username: string) {
  return authAxiosClient.get(`/user/get-user-by-username?username=${username}`).then((res) => {
    const data: User = res.data
    return data
  })
}

export async function getTotalSpend(data: { year: string; month: string; customerId: string }) {
  const setData = {
    ...data,
    month: parseInt(data.month),
    year: parseInt(data.year),
  }
  return authAxiosClient
    .get(`/Order/total-spend?Year=${setData.year}&Month=${setData.month}&customerId=${setData.customerId}`)
    .then((res) => {
      const data = res.data
      return data
    })
}

export async function getCompareMonth(customerId: string) {
  return authAxiosClient.get(`/Order/compare-spend-this-month-to-last-month?customerId=${customerId}`).then((res) => {
    const data = res.data
    return data
  })
}
