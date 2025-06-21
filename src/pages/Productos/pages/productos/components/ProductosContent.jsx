import React from 'react'
import ProductosHeader from './ProductosHeader'
import ProductosFiltersContainer from './ProductosFiltersContainer'
import ProductosGrid from './ProductosGrid'
import Pagination from '../../../../../components/Pagination/Pagination'
import { useProductosOptimized } from '../hooks/useProductosOptimized'

const ProductosContent = React.memo(() => {
  const { currentPage, totalPages, handlePageChange, productos } =
    useProductosOptimized()

  return (
    <div className='cf-productos-content'>
      <ProductosHeader />
      <ProductosFiltersContainer />
      <ProductosGrid />
      <div className='cf-productos-pagination-container'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          showPagination={productos.length > 0 && totalPages > 1}
          className='cf-pagination'
        />
      </div>
    </div>
  )
})

ProductosContent.displayName = 'ProductosContent'

export default ProductosContent
