import { authAxiosClient } from 'src/lib/axios'

export async function deleteBook(id: string) {
  return await authAxiosClient.delete(`/book/delete-book?productId=${id}`).then((res) => res.data)
}

export async function deleteBookGroup(id: string) {
  return await authAxiosClient.delete(`/book-group/delete-book-group?bookGroupId=${id}`).then((res) => res.data)
}

export async function removeBookFromBookGroup(productId: string, bookGroupId: string) {
  return await authAxiosClient
    .delete(`/book/book-group/remove-book-from-book-group?productId=${productId}&bookGroupId=${bookGroupId}`)
    .then((res) => res.data)
}
