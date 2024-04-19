import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'

type ApiFunction<T> = () => Promise<T>

export function useCustomQueryDetail<T>(
  apiFunction: ApiFunction<T>,
  options?: Omit<UseQueryOptions<T, unknown>, 'queryKey'>,
): UseQueryResult<T, unknown> {
  return useQuery(['customQuery'], apiFunction, options)
}
