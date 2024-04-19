import { authAxiosClient } from 'src/lib/axios'

export async function deleteBook(id: string) {
  return await authAxiosClient.delete(`/products/DeleteBook?productId=${id}`).then((res) => res.data)
}

export async function deleteBookGroup(id: string) {
  return await authAxiosClient.delete(`/BookGroup/DeleteBookGroup?bookGroupId=${id}`).then((res) => res.data)
}

export async function removeBookFromBookGroup(productId: string, bookGroupId: string) {
  return await authAxiosClient
    .delete(`/products/BookGroup/RemoveBookFromBookGroup?productId=${productId}&bookGroupId=${bookGroupId}`)
    .then((res) => res.data)
}
