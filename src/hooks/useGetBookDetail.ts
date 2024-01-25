import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query'
import { getBookById } from 'src/api/books/get-book'
import { IBook } from 'src/types/books'

export default function useGetBookDetails(
  id: string,
  options?: Omit<UseQueryOptions<IBook, unknown>, 'queryKey'>,
): UseQueryResult<IBook, unknown> {
  return useQuery(['book', id], () => getBookById(id), options)
}
