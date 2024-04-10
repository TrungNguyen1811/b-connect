import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { GetManyBooksParams, getTopBooks } from 'src/api/books/get-book'
import { IBook } from 'src/types/books'
import { IResponse } from 'src/types/response'

export default function useGetTopBooks(
  params: GetManyBooksParams,
  options?: Omit<UseQueryOptions<IResponse<IBook[]>, unknown>, 'queryKey'>,
): UseQueryResult<IResponse<IBook[]>, unknown> {
  return useQuery(['top-books', params], () => getTopBooks(params), options)
}
