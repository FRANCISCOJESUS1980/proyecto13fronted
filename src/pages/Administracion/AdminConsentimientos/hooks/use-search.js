import { useState, useMemo, useEffect } from 'react'

export const useSearch = (items, searchFields, onSearchChange) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items

    return items.filter((item) =>
      searchFields.some((field) => {
        const value = field.split('.').reduce((obj, key) => obj?.[key], item)
        return value
          ?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      })
    )
  }, [items, searchTerm, searchFields])

  useEffect(() => {
    if (onSearchChange) {
      onSearchChange()
    }
  }, [searchTerm, onSearchChange])

  return {
    searchTerm,
    setSearchTerm,
    filteredItems
  }
}
