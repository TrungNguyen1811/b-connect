import React from 'react'
import Select, { SingleValue } from 'react-select'

interface Props {
  suggestions: string[]
  onSuggestionSelected: (selectedSuggestion: string) => void
}

const SearchSuggestions: React.FC<Props> = ({ suggestions, onSuggestionSelected }) => {
  const handleChange = (selectedOption: SingleValue<{ value: number; label: string }>) => {
    if (selectedOption) {
      onSuggestionSelected(selectedOption.label)
    }
  }

  const options = suggestions.map((suggestion, index) => ({
    value: index,
    label: suggestion,
  }))

  return <Select options={options} onChange={handleChange} />
}

export default SearchSuggestions
