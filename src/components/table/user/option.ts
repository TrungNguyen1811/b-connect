import { StarIcon } from 'lucide-react'
import { DataTableFacetedFilterOption } from 'src/components/ui/data-table-facet'
import { BOOK_TYPE } from 'src/types/books'
import { ROLE } from 'src/types/user'

export const TABLE_USER_ROLE_FACET_OPTIONS: DataTableFacetedFilterOption[] = Object.values(ROLE).map((role) => ({
  label: role,
  value: role,
}))

export const RATING_OPTIONS: DataTableFacetedFilterOption[] = Object.values([1, 2, 3, 4, 5]).map((star) => ({
  label: star.toString(),
  value: star.toString(),
  icon: StarIcon,
}))

const BooleanValues = [
  {
    label: 'true',
    value: '1',
  },
  {
    label: 'false',
    value: '0',
  },
]

export const BOOLEAN_OPTIONS: DataTableFacetedFilterOption[] = Object.values(BooleanValues).map((bl) => ({
  label: bl.label,
  value: bl.value,
}))

export const RECENT_DAYS_OPTIONS: DataTableFacetedFilterOption[] = Object.values(['7', '30']).map((days) => ({
  label: days,
  value: days,
}))

export const TYPE_OPTIONS: DataTableFacetedFilterOption[] = Object.values(BOOK_TYPE).map((type) => ({
  label: type,
  value: type,
}))
