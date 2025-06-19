import React from 'react'
import { Search, X } from 'lucide-react'
import { useProductosOptimized } from '../hooks/useProductosOptimized'

const ProductosSearch = React.memo(() => {
  const { searchTerm, setSearchTerm } = useProductosOptimized()

  const handleSearchChange = React.useCallback(
    (e) => {
      setSearchTerm(e.target.value)
    },
    [setSearchTerm]
  )

  const handleClearSearch = React.useCallback(() => {
    setSearchTerm('')
  }, [setSearchTerm])

  return (
    <div className='cf-productos-search-box'>
      <div className='cf-productos-search-input-container'>
        <Search size={20} className='cf-productos-search-icon' />
        <input
          type='text'
          placeholder='Buscar productos por nombre, marca o categoría...'
          value={searchTerm}
          onChange={handleSearchChange}
          className='cf-productos-search-input'
        />
        {searchTerm && (
          <button
            type='button'
            onClick={handleClearSearch}
            className='cf-productos-search-clear'
            aria-label='Limpiar búsqueda'
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  )
})

ProductosSearch.displayName = 'ProductosSearch'

export default ProductosSearch
