import { useProductosContext } from '../context/ProductosContext'
import { useCallback } from 'react'

export const useProductosOptimized = () => {
  const context = useProductosContext()

  const productosData = useCallback(
    () => ({
      productos: context.productos,
      allProductos: context.allProductos,
      totalPages: context.totalPages,
      currentPage: context.currentPage,
      hasProducts: context.productos.length > 0,
      totalProductos: context.productos.length,
      totalAllProductos: context.allProductos.length
    }),
    [
      context.productos,
      context.allProductos,
      context.totalPages,
      context.currentPage
    ]
  )

  const filtrosData = useCallback(
    () => ({
      searchTerm: context.searchTerm,
      categoriaFiltro: context.categoriaFiltro,
      ordenar: context.ordenar,
      hasActiveFilters: context.searchTerm.trim() || context.categoriaFiltro
    }),
    [context.searchTerm, context.categoriaFiltro, context.ordenar]
  )

  const uiState = useCallback(
    () => ({
      loading: context.loading,
      fadeIn: context.fadeIn,
      isSearching: context.isSearching,
      showPagination: context.totalPages > 1
    }),
    [context.loading, context.fadeIn, context.isSearching, context.totalPages]
  )

  return {
    productosData,
    filtrosData,
    uiState,
    setSearchTerm: context.setSearchTerm,
    setCategoriaFiltro: context.setCategoriaFiltro,
    setOrdenar: context.setOrdenar,
    handlePageChange: context.handlePageChange,
    handleBackNavigation: context.handleBackNavigation,
    productos: context.productos,
    loading: context.loading,
    fadeIn: context.fadeIn,
    searchTerm: context.searchTerm,
    categoriaFiltro: context.categoriaFiltro,
    ordenar: context.ordenar,
    currentPage: context.currentPage,
    totalPages: context.totalPages
  }
}
