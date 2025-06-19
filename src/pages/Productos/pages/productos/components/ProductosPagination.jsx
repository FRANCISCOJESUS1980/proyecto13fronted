import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useProductosOptimized } from '../hooks/useProductosOptimized'

const ProductosPagination = React.memo(() => {
  const { currentPage, totalPages, handlePageChange, uiState } =
    useProductosOptimized()
  const { showPagination } = uiState()

  const handlePrevPage = React.useCallback(() => {
    handlePageChange(currentPage - 1)
  }, [handlePageChange, currentPage])

  const handleNextPage = React.useCallback(() => {
    handlePageChange(currentPage + 1)
  }, [handlePageChange, currentPage])

  const handlePageClick = React.useCallback(
    (page) => {
      handlePageChange(page)
    },
    [handlePageChange]
  )

  if (!showPagination) {
    return null
  }

  return (
    <div className='cf-productos-pagination'>
      <button
        className='cf-productos-pagination-arrow'
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        aria-label='Página anterior'
      >
        <ChevronLeft size={20} />
      </button>

      <div className='cf-productos-pagination-numbers'>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`cf-productos-pagination-number ${
              currentPage === page ? 'cf-productos-pagination-active' : ''
            }`}
            aria-label={`Ir a página ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className='cf-productos-pagination-arrow'
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        aria-label='Página siguiente'
      >
        <ChevronRight size={20} />
      </button>
    </div>
  )
})

ProductosPagination.displayName = 'ProductosPagination'

export default ProductosPagination
