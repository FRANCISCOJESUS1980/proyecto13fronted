import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './Pagination.css'

const Pagination = React.memo(
  ({
    currentPage,
    totalPages,
    onPageChange,
    showPagination = true,
    className = 'cf-pagination'
  }) => {
    const handlePrevPage = React.useCallback(() => {
      onPageChange(currentPage - 1)
    }, [onPageChange, currentPage])

    const handleNextPage = React.useCallback(() => {
      onPageChange(currentPage + 1)
    }, [onPageChange, currentPage])

    const handlePageClick = React.useCallback(
      (page) => {
        onPageChange(page)
      },
      [onPageChange]
    )

    if (!showPagination || totalPages <= 1) {
      return null
    }

    return (
      <div className={className}>
        <button
          className={`${className}-arrow`}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          aria-label='Página anterior'
        >
          <ChevronLeft size={20} />
        </button>

        <div className={`${className}-numbers`}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`${className}-number ${
                currentPage === page ? `${className}-active` : ''
              }`}
              aria-label={`Ir a página ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          className={`${className}-arrow`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          aria-label='Página siguiente'
        >
          <ChevronRight size={20} />
        </button>
      </div>
    )
  }
)

Pagination.displayName = 'Pagination'

export default Pagination
