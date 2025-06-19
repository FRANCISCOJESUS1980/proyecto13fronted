import React from 'react'
import ProductCard from './ProductCard'
import { useProductosOptimized } from '../hooks/useProductosOptimized'

const EmptyState = React.memo(() => (
  <div className='cf-productos-empty'>
    <div className='cf-productos-empty-icon'></div>
    <h3 className='cf-productos-empty-title'>No se encontraron productos</h3>
    <p className='cf-productos-empty-text'>
      No hay productos que coincidan con tu búsqueda. Intenta con otros términos
      o categorías.
    </p>
  </div>
))

EmptyState.displayName = 'EmptyState'

const ProductosGrid = React.memo(() => {
  const { productosData } = useProductosOptimized()
  const { productos, hasProducts } = productosData()

  if (!hasProducts) {
    return <EmptyState />
  }

  return (
    <div className='cf-productos-grid'>
      {productos.map((producto, index) => (
        <ProductCard key={producto._id} producto={producto} index={index} />
      ))}
    </div>
  )
})

ProductosGrid.displayName = 'ProductosGrid'

export default ProductosGrid
