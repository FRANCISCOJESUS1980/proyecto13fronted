import { Search, Filter } from 'lucide-react'
import './ProductoFilters.css'

const CATEGORIAS = [
  'suplementos',
  'ropa',
  'equipamiento',
  'accesorios',
  'otros'
]

const ProductoFilters = ({
  searchTerm,
  categoriaFiltro,
  onSearchChange,
  onCategoriaChange,
  onSearch
}) => {
  return (
    <div className='cf-producto-filters-container'>
      <div className='cf-producto-filters-search'>
        <input
          className='cf-producto-filters-input'
          type='text'
          placeholder='Buscar productos...'
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSearch()}
        />
        <button
          className='cf-producto-filters-search-btn'
          onClick={onSearch}
          aria-label='Buscar'
        >
          <Search size={18} className='cf-producto-filters-search-icon' />
        </button>
      </div>

      <div className='cf-producto-filters-category'>
        <div className='cf-producto-filters-category-icon'>
          <Filter size={18} />
        </div>
        <div className='cf-producto-filters-select-container'>
          <select
            className='cf-producto-filters-select'
            value={categoriaFiltro}
            onChange={(e) => onCategoriaChange(e.target.value)}
          >
            <option value=''>Todas las categorías</option>
            {CATEGORIAS.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          <div className='cf-producto-filters-select-arrow'></div>
        </div>
      </div>
    </div>
  )
}

export default ProductoFilters
