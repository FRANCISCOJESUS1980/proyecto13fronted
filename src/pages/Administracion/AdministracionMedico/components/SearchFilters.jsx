import { Search, Filter, X } from 'lucide-react'

const SearchFilters = ({
  searchTerm,
  filterType,
  isAdvancedSearch,
  bloodTypeFilter,
  filteredUsers,
  onSearchTermChange,
  onFilterTypeChange,
  onBloodTypeFilterChange,
  onToggleAdvancedSearch,
  onClearFilters
}) => {
  return (
    <>
      <div className='cf-medical-info-search-container'>
        <div className='cf-medical-info-search-box'>
          <div className='cf-medical-info-search-input-container'>
            <Search size={18} className='cf-medical-info-search-icon' />
            <input
              type='text'
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              placeholder='Buscar por nombre o email...'
              className='cf-medical-info-search-input'
            />
            {searchTerm && (
              <button
                className='cf-medical-info-search-clear'
                onClick={() => onSearchTermChange('')}
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button
            className='cf-medical-info-search-toggle'
            onClick={onToggleAdvancedSearch}
            aria-label={
              isAdvancedSearch
                ? 'Ocultar búsqueda avanzada'
                : 'Mostrar búsqueda avanzada'
            }
          >
            <Filter size={18} />
            <span>{isAdvancedSearch ? 'Ocultar filtros' : 'Filtros'}</span>
          </button>
        </div>

        {isAdvancedSearch && (
          <div className='cf-medical-info-advanced-search'>
            <div className='cf-medical-info-filter-group'>
              <label className='cf-medical-info-filter-label'>Buscar en:</label>
              <div className='cf-medical-info-filter-options'>
                <button
                  className={`cf-medical-info-filter-btn ${
                    filterType === 'all' ? 'active' : ''
                  }`}
                  onClick={() => onFilterTypeChange('all')}
                >
                  Todos
                </button>
                <button
                  className={`cf-medical-info-filter-btn ${
                    filterType === 'name' ? 'active' : ''
                  }`}
                  onClick={() => onFilterTypeChange('name')}
                >
                  Nombre
                </button>
                <button
                  className={`cf-medical-info-filter-btn ${
                    filterType === 'email' ? 'active' : ''
                  }`}
                  onClick={() => onFilterTypeChange('email')}
                >
                  Email
                </button>
              </div>
            </div>

            <div className='cf-medical-info-filter-group'>
              <label className='cf-medical-info-filter-label'>
                Tipo de sangre:
              </label>
              <div className='cf-medical-info-select-container'>
                <select
                  value={bloodTypeFilter}
                  onChange={(e) => onBloodTypeFilterChange(e.target.value)}
                  className='cf-medical-info-blood-type-select'
                >
                  <option value=''>Todos</option>
                  <option value='A+'>A+</option>
                  <option value='A-'>A-</option>
                  <option value='B+'>B+</option>
                  <option value='B-'>B-</option>
                  <option value='AB+'>AB+</option>
                  <option value='AB-'>AB-</option>
                  <option value='O+'>O+</option>
                  <option value='O-'>O-</option>
                </select>
                <div className='cf-medical-info-select-arrow'></div>
              </div>
            </div>

            <button
              className='cf-medical-info-clear-filters'
              onClick={onClearFilters}
            >
              <X size={16} />
              <span>Limpiar filtros</span>
            </button>
          </div>
        )}

        <div className='cf-medical-info-search-results'>
          <span className='cf-medical-info-results-count'>
            {filteredUsers.length}{' '}
            {filteredUsers.length === 1
              ? 'usuario encontrado'
              : 'usuarios encontrados'}
          </span>
        </div>
      </div>
    </>
  )
}

export default SearchFilters
