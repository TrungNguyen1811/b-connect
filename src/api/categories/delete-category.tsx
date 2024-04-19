import { authAxiosClient } from 'src/lib/axios'

export async function deleteCategory(id: string) {
  return await authAxiosClient.delete(`/Category/delete-category?cateId=${id}`).then((res) => res.data)
}
