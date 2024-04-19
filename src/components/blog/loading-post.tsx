import { Skeleton } from '../ui/skeleton'

type Props = {
  pageSize: number
} & React.HTMLAttributes<HTMLDivElement>

function PostGridLoading({ pageSize, ...props }: Props) {
  return (
    <div {...props}>
      {Array.from({ length: pageSize }).map((_, index) => {
        return (
          <div key={index} className="mb-8 mt-2 h-96">
            <div className="border-1 rounded-lg border bg-orange-50">
              <Skeleton className="aspect-[5/7] h-56 w-full rounded-b-none rounded-t-lg" />
              <div className="mb-8">
                <div className="ml-12 mt-4 flex h-16 flex-row items-center">
                  <Skeleton className="h-12 w-12 rounded-[50%]" />
                  <Skeleton className="ml-2 h-8 w-1/3 rounded-xl" />
                </div>
                <Skeleton className="ml-24 mt-2 h-8 w-3/5 rounded-xl" />
                <Skeleton className="ml-24 mt-1 h-6 w-1/3 rounded-xl" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default PostGridLoading
