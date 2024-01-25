import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { getManyBooks, GetManyBooksParams } from 'src/api/books/get-book'
import { IBook } from 'src/types/books'
import { IResponse } from 'src/types/response'

export default function useGetManyBooks(
  params: GetManyBooksParams,
  options?: Omit<UseQueryOptions<IResponse<IBook[]>, unknown>, 'queryKey'>,
): UseQueryResult<IResponse<IBook[]>, unknown> {
  return useQuery(['books', params], () => getManyBooks(params), options)
}
