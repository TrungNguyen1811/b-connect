import { axiosClient } from 'src/lib/axios'

export async function deleteCategory(id: string) {
  return await axiosClient.delete(`/Category/delete-category?cateId=${id}`).then((res) => res.data)
}
