import React from 'react'
import UsuarioCard from './UsuarioCard'
import { useUsuariosOptimized } from '../hooks/useUsuariosOptimized'

const EmptyState = React.memo(() => (
  <div className='cf-admin-usuarios-empty'>
    <div className='cf-admin-usuarios-empty-icon'></div>
    <h3 className='cf-admin-usuarios-empty-title'>
      No se encontraron usuarios
    </h3>
    <p className='cf-admin-usuarios-empty-text'>
      No hay usuarios que coincidan con tu búsqueda.
    </p>
  </div>
))

EmptyState.displayName = 'EmptyState'

const UsuariosGrid = React.memo(() => {
  const { paginatedUsers, filteredUsuarios } = useUsuariosOptimized()

  return (
    <div className='cf-admin-usuarios-grid'>
      {paginatedUsers.length > 0 ? (
        paginatedUsers.map((usuario, index) => (
          <UsuarioCard key={usuario._id} usuario={usuario} index={index} />
        ))
      ) : filteredUsuarios.length === 0 ? (
        <EmptyState />
      ) : null}
    </div>
  )
})

UsuariosGrid.displayName = 'UsuariosGrid'

export default UsuariosGrid
