import { Skeleton } from '../ui/skeleton'

type Props = {
  pageSize: number
} & React.HTMLAttributes<HTMLDivElement>

function BlockGridLoading({ pageSize, ...props }: Props) {
  return (
    <div {...props}>
      {Array.from({ length: pageSize }).map((_, index) => {
        return (
          <div key={index} className="w-full">
            <Skeleton className="aspect-[5/7] w-full" />
          </div>
        )
      })}
    </div>
  )
}

export default BlockGridLoading
