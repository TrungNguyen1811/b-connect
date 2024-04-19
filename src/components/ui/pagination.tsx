import React from 'react'
import { Button } from './button'
import { cn } from 'src/lib/utils'
import { ArrowLeftToLineIcon, ArrowRightToLineIcon, ChevronLeft, ChevronRight } from 'lucide-react'

type Props = {
  currentPage: number
  totalPage: number
  onPageChange: (page: number) => void
  onFirstPage: () => void
  onPreviousPage: () => void
  onNextPage: () => void
  onLastPage: () => void
  itemRender?: (page: number) => React.ReactNode
  hideOnSinglePage?: boolean
  total?: number
} & React.HTMLAttributes<HTMLDivElement>

function Pagination({
  currentPage,
  totalPage,
  onPageChange,
  onFirstPage,
  onPreviousPage,
  onNextPage,
  onLastPage,
  itemRender,
  hideOnSinglePage = false,
  className,
  ...props
}: Props) {
  const renderItems = React.useMemo(() => {
    if (itemRender) {
      return Array.from({ length: totalPage }, (_, index) => index + 1).map((page) => (
        <Button
          key={page}
          className={cn(
            'h-8 w-8 rounded-full hover:bg-primary/60 hover:text-white',
            page === currentPage ? 'bg-primary text-white ' : 'bg-orange-50 text-primary',
          )}
          onClick={() => onPageChange(page)}
        >
          {itemRender(page)}
        </Button>
      ))
    }
    //If total page is less than 5, render all page
    if (totalPage <= 5) {
      return Array.from({ length: totalPage }, (_, index) => index + 1).map((page) => (
        <Button
          key={page}
          className={cn(
            'h-8 w-8 rounded-full hover:bg-primary/60 hover:text-white',
            page === currentPage ? 'bg-primary text-white ' : 'bg-orange-50 text-primary',
          )}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))
    }
    //If current page is less than 3, render 1,2,3,4,5
    if (currentPage <= 3) {
      return Array.from({ length: 5 }, (_, index) => index + 1).map((page) => (
        <Button
          key={page}
          className={cn(
            'h-8 w-8 rounded-full hover:bg-primary/60 hover:text-white',
            page === currentPage ? 'bg-primary text-white' : 'bg-orange-50 text-primary',
          )}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))
    }

    if (currentPage + 1 === totalPage) {
      return [1, currentPage - 1, currentPage, totalPage].map((page) => (
        <Button
          key={page}
          className={cn(
            'h-8 w-8 rounded-full hover:bg-primary/60 hover:text-white',
            page === currentPage ? 'bg-primary text-white' : 'bg-orange-50 text-primary',
          )}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))
    } else if (currentPage + 1 > totalPage) {
      return [1, currentPage - 1, currentPage].map((page) => (
        <Button
          key={page}
          className={cn(
            'h-8 w-8 rounded-full hover:bg-primary/60 hover:text-white',
            page === currentPage ? 'bg-primary text-white' : 'bg-orange-50 text-primary',
          )}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))
    } else {
      //Else, render first page, current page - 1, current page, current page + 1, last page
      return [1, currentPage - 1, currentPage, currentPage + 1, totalPage].map((page) => (
        <Button
          key={page}
          className={cn(
            'h-8 w-8 rounded-full hover:bg-primary/60 hover:text-white',
            page === currentPage ? 'bg-primary text-white' : 'bg-orange-50 text-primary',
          )}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))
    }
  }, [currentPage, itemRender, onPageChange, totalPage])

  if (hideOnSinglePage && totalPage <= 1) return null

  const canPreviousPage = currentPage === 1
  const canNextPage = currentPage === totalPage
  const canFirstPage = currentPage === 1
  const canLastPage = currentPage === totalPage - 1
  return (
    <div className={cn('space-x-3', className)} {...props}>
      <Button aria-label="Go to last page" variant="outline" onClick={onFirstPage} disabled={canFirstPage}>
        <ArrowLeftToLineIcon className="h-4 w-4" aria-hidden="true" />
      </Button>
      <Button variant={'outline'} className="px-2" onClick={onPreviousPage} disabled={canPreviousPage}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {renderItems}
      <Button disabled={canNextPage} variant={'outline'} onClick={onNextPage} className="px-2">
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button aria-label="Go to last page" variant="outline" onClick={onLastPage} disabled={canLastPage}>
        <ArrowRightToLineIcon className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  )
}

export default Pagination
