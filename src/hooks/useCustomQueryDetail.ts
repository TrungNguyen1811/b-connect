import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'

type ApiFunction<T> = () => Promise<T>

export function useCustomQueryDetail<T>(
  apiFunction: ApiFunction<T | undefined>,
  options?: Omit<UseQueryOptions<T | undefined, unknown>, 'queryKey'>,
): UseQueryResult<T | undefined, unknown> {
  return useQuery(['customQuery'], apiFunction, options)
}
