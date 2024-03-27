import * as React from 'react'

import { cn } from 'src/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './command'
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

export function DataTableFacetedFilter({
  title,
  options,
  defaultOptions,
  onOptionsChange,
}: DataTableFacetedFilterProps) {
  const [selectedOption, setSelectedOption] = React.useState<Set<string>>(
    new Set(defaultOptions?.map((option) => option.value)),
  )

  const onSelectedOptionChange = React.useCallback(
    (value: Set<string>) => {
      setSelectedOption(value)
      const selectedOption: DataTableFacetedFilterOption[] = []
      options.forEach((option) => value.has(option.value) && selectedOption.push(option))
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
          {selectedOption.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge variant="default" className="rounded-sm px-1 font-normal lg:hidden">
                {selectedOption.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedOption.size > 2 ? (
                  <Badge variant="outline" className="rounded-sm px-1 font-normal">
                    {selectedOption.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedOption.has(option.value))
                    .map((option) => (
                      <Badge variant="outline" key={option.value} className="line-clamp-1 rounded-sm px-1 font-normal">
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedOption.has(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        onSelectedOptionChange(
                          new Set(Array.from(selectedOption).filter((value) => value !== option.value)),
                        )
                      } else {
                        onSelectedOptionChange(new Set(Array.from(selectedOption).concat(option.value)))
                      }
                    }}
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible',
                      )}
                    >
                      <CheckCheckIcon className={cn('h-4 w-4')} />
                    </div>
                    {option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                    <span>{toCapitalize(option.label)}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedOption.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      onSelectedOptionChange(new Set())
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
