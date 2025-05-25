import React from 'react'
import { Search, X } from 'lucide-react'

const ConsentimientosSearch = React.memo(({ searchTerm, onSearchChange }) => {
  return (
    <div className='cf-consentimientos-search-container'>
      <div className='cf-consentimientos-search-box'>
        <Search size={18} className='cf-consentimientos-search-icon' />
        <input
          type='text'
          placeholder='Buscar por nombre o email...'
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className='cf-consentimientos-search-input'
        />
        {searchTerm && (
          <button
            className='cf-consentimientos-search-clear'
            onClick={() => onSearchChange('')}
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  )
})

ConsentimientosSearch.displayName = 'ConsentimientosSearch'

export default ConsentimientosSearch
