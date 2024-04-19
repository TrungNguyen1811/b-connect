import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { IResponse } from 'src/types/response'

type ApiFunction<T> = () => Promise<IResponse<T>>

export function useCustomQuery<T>(
  apiFunction: ApiFunction<T>,
  options?: Omit<UseQueryOptions<IResponse<T>, unknown>, 'queryKey'>,
): UseQueryResult<IResponse<T>, unknown> {
  return useQuery(['customQuery'], apiFunction, options)
}
