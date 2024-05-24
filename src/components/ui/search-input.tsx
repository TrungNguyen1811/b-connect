import { useEffect, useState } from 'react'
import { Input, InputProps } from './input'
import { useDebounce } from 'src/hooks/useDebounce'
import { useTranslation } from 'react-i18next'

type Props = {
  value: string
  onChange: (value: string) => void
} & Omit<InputProps, 'value' | 'onChange'>

function SearchInput({ value, onChange, ...props }: Props) {
  const { t } = useTranslation('translation')
  const [search, setSearch] = useState<string>(value)
  const debouncedValue = useDebounce<string>(search, 500)

  useEffect(() => {
    onChange(debouncedValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue])
  return <Input placeholder={t('search...')} {...props} value={search} onChange={(e) => setSearch(e.target.value)} />
}

export default SearchInput
