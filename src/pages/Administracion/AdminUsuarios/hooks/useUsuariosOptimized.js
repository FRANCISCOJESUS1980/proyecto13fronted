import { useUsuariosContext } from '../context/UsuariosContext'
import { useCallback } from 'react'

export const useUsuariosOptimized = () => {
  const context = useUsuariosContext()

  const usuariosData = useCallback(
    () => ({
      usuarios: context.usuarios,
      filteredUsuarios: context.filteredUsuarios,
      paginatedUsers: context.paginatedUsers,
      totalUsuarios: context.usuarios.length,
      filteredCount: context.filteredUsuarios.length
    }),
    [context.usuarios, context.filteredUsuarios, context.paginatedUsers]
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

  const paginationData = useCallback(
    () => ({
      currentPage: context.currentPage,
      totalPages: context.totalPages
    }),
    [context.currentPage, context.totalPages]
  )

  const handlePageChange = useCallback(
    (newPage) => {
      if (newPage >= 1 && newPage <= context.totalPages) {
        context.setCurrentPage(newPage)
      }
    },
    [context.setCurrentPage, context.totalPages]
  )

  return {
    usuariosData,
    uiState,
    paginationData,
    handlePageChange,
    setSearchTerm: context.setSearchTerm,
    fetchUsuarios: context.fetchUsuarios,
    usuarios: context.usuarios,
    filteredUsuarios: context.filteredUsuarios,
    paginatedUsers: context.paginatedUsers,
    loading: context.loading,
    error: context.error,
    fadeIn: context.fadeIn,
    searchTerm: context.searchTerm,
    currentPage: context.currentPage,
    totalPages: context.totalPages
  }
}
