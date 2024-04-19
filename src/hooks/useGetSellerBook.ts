import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { getAllBookInInventory, GetManyBooksParams } from 'src/api/books/get-book'
import { IBook } from 'src/types/books'
import { IResponse } from 'src/types/response'

export default function useGetSellerBook(
  params: GetManyBooksParams,
  options?: Omit<UseQueryOptions<IResponse<IBook[]>, unknown>, 'queryKey'>,
): UseQueryResult<IResponse<IBook[]>, unknown> {
  return useQuery(['inventory', params], () => getAllBookInInventory(params), options)
}
