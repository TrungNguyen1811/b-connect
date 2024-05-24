import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getRelevantPosts } from 'src/api/blog/get-blog'
import { IResponsePost } from 'src/types/blog'
import { IResponse } from 'src/types/response'
// import { getManyBooks, GetManyBooksParams } from 'src/api/books/get-book'

export default function useGetManyPosts(): UseQueryResult<IResponse<IResponsePost[]>> {
  return useQuery(['posts'], () => getRelevantPosts())
}
