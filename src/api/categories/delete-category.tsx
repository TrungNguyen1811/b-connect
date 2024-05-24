import { authAxiosClient } from 'src/lib/axios'

export async function deleteCategory(id: string) {
  return await authAxiosClient.delete(`/category/delete-category?cateId=${id}`).then((res) => res.data)
}
