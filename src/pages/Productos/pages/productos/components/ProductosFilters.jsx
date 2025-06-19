import React from 'react'
import { Filter } from 'lucide-react'
import { useProductosOptimized } from '../hooks/useProductosOptimized'
import {
  CATEGORIAS,
  OPCIONES_ORDENAR,
  formatCategoria
} from '../data/categoriasData'

const ProductosFilters = React.memo(() => {
  const { categoriaFiltro, ordenar, setCategoriaFiltro, setOrdenar } =
    useProductosOptimized()

  const handleCategoriaChange = React.useCallback(
    (e) => {
      setCategoriaFiltro(e.target.value)
    },
    [setCategoriaFiltro]
  )

  const handleOrdenarChange = React.useCallback(
    (e) => {
      setOrdenar(e.target.value)
    },
    [setOrdenar]
  )

  return (
    <div className='cf-productos-filter-group'>
      <div className='cf-productos-category-filter'>
        <div className='cf-productos-filter-icon-container'>
          <Filter size={18} className='cf-productos-filter-icon' />
        </div>
        <div className='cf-productos-select-container'>
          <select
            value={categoriaFiltro}
            onChange={handleCategoriaChange}
            className='cf-productos-select'
          >
            <option value=''>Todas las categorías</option>
            {CATEGORIAS.map((cat) => (
              <option key={cat} value={cat}>
                {formatCategoria(cat)}
              </option>
            ))}
          </select>
          <div className='cf-productos-select-arrow'></div>
        </div>
      </div>

      <div className='cf-productos-sort-filter'>
        <div className='cf-productos-select-container'>
          <select
            value={ordenar}
            onChange={handleOrdenarChange}
            className='cf-productos-select'
          >
            {OPCIONES_ORDENAR.map((opcion) => (
              <option key={opcion.value} value={opcion.value}>
                {opcion.label}
              </option>
            ))}
          </select>
          <div className='cf-productos-select-arrow'></div>
        </div>
      </div>
    </div>
  )
})

ProductosFilters.displayName = 'ProductosFilters'

export default ProductosFilters
