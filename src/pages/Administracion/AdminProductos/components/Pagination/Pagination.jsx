import { ChevronLeft, ChevronRight } from 'lucide-react'
import './Pagination.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className='pagination'>
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className='pagination-button'
      >
        <ChevronLeft size={20} />
      </button>
      <span>
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className='pagination-button'
      >
        <ChevronRight size={20} />
      </button>
    </div>
  )
}

export default Pagination
