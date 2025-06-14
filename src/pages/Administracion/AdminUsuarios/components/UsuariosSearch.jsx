import React from 'react'
import { Search } from 'lucide-react'
import { useUsuariosOptimized } from '../hooks/useUsuariosOptimized'

const UsuariosSearch = React.memo(() => {
  const { searchTerm, setSearchTerm, usuariosData } = useUsuariosOptimized()
  const { filteredCount, totalUsuarios } = usuariosData()

  const handleSearchChange = React.useCallback(
    (e) => {
      setSearchTerm(e.target.value)
    },
    [setSearchTerm]
  )

  return (
    <div className='cf-admin-usuarios-search-container'>
      <div className='cf-admin-usuarios-search'>
        <input
          type='text'
          placeholder='Buscar por nombre o email...'
          value={searchTerm}
          onChange={handleSearchChange}
          className='cf-admin-usuarios-search-input'
        />
        <div className='cf-admin-usuarios-search-icon'>
          <Search size={18} />
        </div>
      </div>
      <div className='cf-admin-usuarios-search-stats'>
        Mostrando {filteredCount} de {totalUsuarios} usuarios
      </div>
    </div>
  )
})

UsuariosSearch.displayName = 'UsuariosSearch'

export default UsuariosSearch
