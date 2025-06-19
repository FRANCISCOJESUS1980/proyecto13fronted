import React from 'react'
import ProductosSearch from './ProductosSearch'
import ProductosFilters from './ProductosFilters'
import { useProductosOptimized } from '../hooks/useProductosOptimized'

const ProductosStats = React.memo(() => {
  const { productosData, filtrosData } = useProductosOptimized()
  const { totalProductos, totalAllProductos } = productosData()
  const { hasActiveFilters } = filtrosData()

  return (
    <div className='cf-productos-stats'>
      <span className='cf-productos-count'>
        {hasActiveFilters ? (
          <>
            Mostrando {totalProductos} de {totalAllProductos} productos
          </>
        ) : (
          <>
            {totalProductos} producto{totalProductos !== 1 ? 's' : ''}{' '}
            disponible{totalProductos !== 1 ? 's' : ''}
          </>
        )}
      </span>
    </div>
  )
})

ProductosStats.displayName = 'ProductosStats'

const ProductosFiltersContainer = React.memo(() => {
  return (
    <div className='cf-productos-filters-container'>
      <ProductosSearch />
      <ProductosFilters />
      <ProductosStats />
    </div>
  )
})

ProductosFiltersContainer.displayName = 'ProductosFiltersContainer'

export default ProductosFiltersContainer
