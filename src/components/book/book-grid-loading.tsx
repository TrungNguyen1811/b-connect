import { Skeleton } from '../ui/skeleton'

type Props = {
  pageSize: number
} & React.HTMLAttributes<HTMLDivElement>

function BookGridLoading({ pageSize, ...props }: Props) {
  return (
    <div {...props}>
      {Array.from({ length: pageSize }).map((_, index) => {
        return (
          <div key={index} className="w-full">
            <Skeleton className="aspect-[5/7] w-full" />
            <Skeleton className="mt-1 h-5 w-4/5 " />
            <Skeleton className="mt-1 h-3 w-2/3" />
          </div>
        )
      })}
    </div>
  )
}

export default BookGridLoading
