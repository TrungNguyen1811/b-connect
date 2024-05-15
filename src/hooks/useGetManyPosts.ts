import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getAllPosts, GetManyPostsParams } from 'src/api/blog/get-blog'
import { IResponsePost } from 'src/types/blog'
import { IResponse } from 'src/types/response'
// import { getManyBooks, GetManyBooksParams } from 'src/api/books/get-book'

export default function useGetManyPosts(
  params: GetManyPostsParams,
  // options?: Omit<UseQueryOptions<IResponse<IResponsePost[]>, unknown>, 'queryKey'>,
): UseQueryResult<IResponse<IResponsePost[]>> {
  return useQuery(['posts', params], () => getAllPosts(params))
}
