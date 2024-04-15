import * as React from 'react'

import { cn } from 'src/lib/utils'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandSeparator } from './command'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Separator } from './separator'
import { Button } from './button'
import { CheckCheckIcon, PlusIcon } from 'lucide-react'
import { toCapitalize } from 'src/lib/stringUtil'
import { Badge } from './badge'

export interface DataTableFacetedFilterOption {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}
export interface DataTableFacetedFilterProps {
  title?: string
  options: DataTableFacetedFilterOption[]
  onOptionsChange?: (options: DataTableFacetedFilterOption[]) => void
  defaultOptions?: DataTableFacetedFilterOption[]
}

export function DataTableRadioFacetedFilter({
  title,
  options,
  defaultOptions,
  onOptionsChange,
}: DataTableFacetedFilterProps) {
  const [selectedOption, setSelectedOption] = React.useState<string | null>(defaultOptions?.[0]?.value || null)

  const onSelectedOptionChange = React.useCallback(
    (value: string | null) => {
      setSelectedOption(value)
      const selectedOption: DataTableFacetedFilterOption[] = []
      options.forEach((option) => {
        if (option.value === value) {
          selectedOption.push(option)
        }
      })
      onOptionsChange?.(selectedOption)
    },
    [onOptionsChange, options],
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusIcon className="mr-2 h-4 w-4" />
          {title}
          {selectedOption && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge variant="default" className="rounded-sm px-1 font-normal lg:hidden">
                1
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                <Badge variant="outline" className="line-clamp-1 rounded-sm px-1 font-normal">
                  {options.find((option) => option.value === selectedOption)?.label}
                </Badge>
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = option.value === selectedOption
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        onSelectedOptionChange(null)
                      } else {
                        onSelectedOptionChange(option.value)
                      }
                    }}
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-full border border-primary',
                        isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible',
                      )}
                    >
                      <CheckCheckIcon className={cn('h-3 w-3')} />
                    </div>
                    <span>{toCapitalize(option.label)}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedOption && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      onSelectedOptionChange(null)
                    }}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
