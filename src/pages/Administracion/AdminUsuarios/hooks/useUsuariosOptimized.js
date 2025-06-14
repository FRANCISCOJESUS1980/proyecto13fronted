import { useUsuariosContext } from '../context/UsuariosContext'
import { useCallback } from 'react'

export const useUsuariosOptimized = () => {
  const context = useUsuariosContext()

  const usuariosData = useCallback(
    () => ({
      usuarios: context.usuarios,
      filteredUsuarios: context.filteredUsuarios,
      totalUsuarios: context.usuarios.length,
      filteredCount: context.filteredUsuarios.length
    }),
    [context.usuarios, context.filteredUsuarios]
  )

  const uiState = useCallback(
    () => ({
      loading: context.loading,
      error: context.error,
      fadeIn: context.fadeIn,
      searchTerm: context.searchTerm
    }),
    [context.loading, context.error, context.fadeIn, context.searchTerm]
  )

  return {
    usuariosData,
    uiState,
    setSearchTerm: context.setSearchTerm,
    fetchUsuarios: context.fetchUsuarios,
    usuarios: context.usuarios,
    filteredUsuarios: context.filteredUsuarios,
    loading: context.loading,
    error: context.error,
    fadeIn: context.fadeIn,
    searchTerm: context.searchTerm
  }
}
