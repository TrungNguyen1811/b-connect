import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from 'src/lib/utils'
import { Icons } from '../icons/icon'
import { IMenuItem } from '../breadcrumb'

type Props = {
  items: Array<IMenuItem>
} & React.HTMLAttributes<HTMLDivElement>

function MenuSideBar({ items, className, ...props }: Props) {
  delete props.children
  return (
    <nav aria-label="menu-items" className={cn('flex', className)} {...props}>
      <ol className="flex w-full flex-col rounded-md text-left font-medium">
        {items.map((item, index) => {
          return <MenuItem key={item.title} item={item} />
        })}
      </ol>
    </nav>
  )
}
type MenuItemProps = {
  item: IMenuItem
} & React.HTMLAttributes<HTMLLIElement>
function MenuItem({ item, className, ...props }: MenuItemProps) {
  delete props.children
  const Icon = React.useMemo(() => {
    const { icon } = item
    if (!icon) return null
    return Icons[icon]
  }, [item])
  return (
    <li
      className={cn(
        'hover-underline-animation hover:hover-underline-animation flex flex-col rounded-md p-2 hover:bg-orange-300',
        className,
      )}
      {...props}
    >
      <Link to={item.href || '#'} className={cn('inline-flex items-center')}>
        {Icon && <Icon className="mr-1" size={16} />}
        {item.title}
      </Link>
    </li>
  )
}

export default MenuSideBar
