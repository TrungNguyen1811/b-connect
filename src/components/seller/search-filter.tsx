// import * as React from 'react'
// import { Check, ChevronsUpDown, LoaderIcon, Menu } from 'lucide-react'
// import { cn } from 'src/lib/utils'
// import { Command, CommandGroup, CommandInput, CommandItem } from '../ui/command'
// import { Button } from '../ui/button'
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

// export interface IComboboxData {
//   value: string
//   label: string
// }

// interface ChildProps {
//   data: IComboboxData[]
//   isLoading: boolean
//   onSelection: (value: string) => void
//   defaultValue?: string
//   clear: boolean
// }

// export const SearchCategory: React.FC<ChildProps> = ({ data, isLoading, onSelection, defaultValue, clear }) => {
//   const [value, setValue] = React.useState('')
//   React.useEffect(() => {
//     setValue(defaultValue || '')
//   }, [data, defaultValue, clear])

//   const renderItem = React.useMemo(() => {
//     if (isLoading) return <LoaderIcon className="mx-auto animate-spin text-primary ease-out" />
//     return data.map((framework) => (
//       <CommandItem
//         key={framework.value}
//         value={framework.value}
//         onSelect={(currentValue) => {
//           setValue(currentValue === value ? '' : currentValue)
//           onSelection(currentValue)
//         }}
//       >
//         <Check className={cn('mr-2 h-4 w-4', value === framework.value ? 'opacity-100' : 'opacity-0')} />
//         {framework.label}
//       </CommandItem>
//     ))
//   }, [isLoading, data, value, onSelection])

//   return (
//     <div>
//       <div className="flex flex-row items-center">
//         <Menu size={24} />
//         <p>Category</p>
//       </div>
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             variant="outline"
//             role="combobox"
//             aria-expanded={open}
//             className={cn('w-[100%] bg-card', {
//               'justify-between': value,
//               'justify-end': !value,
//             })}
//           >
//             {value ? data.find((framework) => framework.value === value)?.label : ''}
//             <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="flex w-60 p-0">
//           <Command>
//             <CommandInput />
//             <CommandGroup defaultValue={value}>
//               <div className="h-64">{renderItem}</div>
//             </CommandGroup>
//           </Command>
//         </PopoverContent>
//       </Popover>
//     </div>
//   )
// }
