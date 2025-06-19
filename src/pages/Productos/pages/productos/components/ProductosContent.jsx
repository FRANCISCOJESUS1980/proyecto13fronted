import React from 'react'
import ProductosHeader from './ProductosHeader'
import ProductosFiltersContainer from './ProductosFiltersContainer'
import ProductosGrid from './ProductosGrid'
import ProductosPagination from './ProductosPagination'

const ProductosContent = React.memo(() => {
  return (
    <div className='cf-productos-content'>
      <ProductosHeader />
      <ProductosFiltersContainer />
      <ProductosGrid />
      <ProductosPagination />
    </div>
  )
})

ProductosContent.displayName = 'ProductosContent'

export default ProductosContent
