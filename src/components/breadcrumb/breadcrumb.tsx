import React from 'react'
import { Link } from 'react-router-dom'
import { IBreadcrumb } from './type'
import { cn } from 'src/lib/utils'
import { ChevronRight } from 'lucide-react'
import { Icons } from '../icons/icon'

type Props = {
  items: Array<IBreadcrumb>
} & React.HTMLAttributes<HTMLDivElement>

function Breadcrumb({ items, className, ...props }: Props) {
  delete props.children
  return (
    <nav aria-label="breadcrumb" className={cn('flex', className)} {...props}>
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => {
          return <BreadCrumbItem key={item.label} item={item} isLast={index === items.length - 1} />
        })}
      </ol>
    </nav>
  )
}
type BreadCrumbItemProps = {
  item: IBreadcrumb
  isLast?: boolean
} & React.HTMLAttributes<HTMLLIElement>
function BreadCrumbItem({ item, className, isLast, ...props }: BreadCrumbItemProps) {
  delete props.children
  const Icon = React.useMemo(() => {
    const { icon } = item
    if (!icon) return null
    return Icons[icon]
  }, [item])
  return (
    <li className={cn('inline-flex items-center', className)} {...props}>
      <Link
        to={isLast ? '#' : item.href || '#'}
        className={cn(
          'inline-flex items-center text-ellipsis text-sm font-medium text-orange-500 dark:text-gray-400 dark:hover:text-white',
          {
            'text-primary': isLast,
            'hover:text-orange-700': !isLast,
          },
        )}
      >
        {Icon && <Icon className="mr-1" size={16} />}
        {item.label}
      </Link>
      {isLast || <ChevronRight className="ml-1 inline-block" />}
    </li>
  )
}

export default Breadcrumb
