import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query'
import { getAllCategoryNoParam } from 'src/api/categories/get-category'
import { ICategory } from 'src/types/categories'

export default function useGetAllCategory(
  options?: Omit<UseQueryOptions<ICategory[], unknown>, 'queryKey'>,
): UseQueryResult<ICategory[], unknown> {
  return useQuery(['category'], () => getAllCategoryNoParam(), options)
}
