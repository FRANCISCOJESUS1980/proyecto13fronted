import React from 'react'
import './AdminUsuarios.css'
import Header from '../../../../components/Header/page/Header'
import Loading from '../../../../components/Loading/loading'
import UsuariosHeader from '../components/UsuariosHeader'
import UsuariosSearch from '../components/UsuariosSearch'
import UsuariosGrid from '../components/UsuariosGrid'
import ErrorState from '../components/ErrorState'
import Pagination from '../../../../components/Pagination/Pagination'
import { UsuariosProvider } from '../context/UsuariosContext'
import { useUsuariosOptimized } from '../hooks/useUsuariosOptimized'

const AdminUsuariosContent = React.memo(() => {
  const {
    loading,
    error,
    fadeIn,
    currentPage,
    totalPages,
    handlePageChange,
    paginatedUsers
  } = useUsuariosOptimized()

  if (loading) {
    return (
      <Loading
        isVisible={loading}
        loadingText='CARGANDO ADMINISTRACIÓN DE USUARIOS...'
        onComplete={() => {}}
      />
    )
  }

  if (error) {
    return <ErrorState error={error} />
  }

  return (
    <div
      className={`cf-admin-usuarios-container ${
        fadeIn ? 'cf-admin-usuarios-fade-in' : ''
      }`}
    >
      <Header />
      <div className='cf-admin-usuarios-content'>
        <UsuariosHeader />
        <UsuariosSearch />
        <UsuariosGrid />
        <div className='cf-admin-usuarios-pagination-container'>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            showPagination={paginatedUsers.length > 0}
            className='cf-pagination'
          />
        </div>
      </div>
    </div>
  )
})

AdminUsuariosContent.displayName = 'AdminUsuariosContent'

const AdminUsuarios = () => {
  return (
    <UsuariosProvider>
      <AdminUsuariosContent />
    </UsuariosProvider>
  )
}

export default AdminUsuarios
