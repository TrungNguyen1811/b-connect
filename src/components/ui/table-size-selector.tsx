import { SelectProps } from '@radix-ui/react-select'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
type Props = {
  defaultSize?: number
  sizes?: number[]
  onChange?: (size: number) => void
  className?: string
} & Omit<SelectProps, 'defaultValue' | 'onValueChange' | 'onChange'>

function TableSizeSelector({ defaultSize = 10, sizes = [10, 15, 20, 25], onChange, className, ...props }: Props) {
  return (
    <Select
      {...props}
      defaultValue={defaultSize.toString()}
      onValueChange={(value) => {
        const changeValue = parseInt(value.toString())
        onChange?.(changeValue)
      }}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={defaultSize} />
      </SelectTrigger>
      <SelectContent>
        {sizes.map((size) => (
          <SelectItem value={size.toString()} key={size}>
            {size}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default TableSizeSelector
