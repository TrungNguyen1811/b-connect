import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { getManyBooks } from 'src/api/books/get-book'
// import { getManyBooks, GetManyBooksParams } from 'src/api/books/get-book'
import { IBook } from 'src/types/books'

// export default function useGetManyBooks(
//   params?: GetManyBooksParams,
//   options?: Omit<UseQueryOptions<IResponse<IBook[]>, unknown>, 'queryKey'>,
// ): UseQueryResult<IResponse<IBook[]>, unknown> {
//   return useQuery(['books', params], () => getManyBooks(params), options)
// }

export default function useGetManyBooks(
  options?: Omit<UseQueryOptions<IBook[], unknown>, 'queryKey'>,
): UseQueryResult<IBook[], unknown> {
  return useQuery(['category'], () => getManyBooks(), options)
}
