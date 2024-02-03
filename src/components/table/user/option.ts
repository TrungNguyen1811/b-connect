import { DataTableFacetedFilterOption } from 'src/components/ui/data-table-facet'
import { ROLE } from 'src/types/user'

export const TABLE_USER_ROLE_FACET_OPTIONS: DataTableFacetedFilterOption[] = Object.values(ROLE).map((role) => ({
  label: role,
  value: role,
}))
