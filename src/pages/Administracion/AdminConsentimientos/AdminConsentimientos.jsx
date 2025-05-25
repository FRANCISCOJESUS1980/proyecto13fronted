import { useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './Adminconsentimientos.css'
import Header from '../../../components/Header/Header'
import Button from '../../../components/Button/Button'
import { useAuthGuard } from './hooks/use-auth-guard'
import { useConsentimientos } from './hooks/use-consentimientos'
import { useSearch } from './hooks/use-search'
import { usePagination } from './hooks/use-pagination'
import {
  enrichConsentimientosWithUsers,
  calculateStats
} from './utils/consentimientos-utils'
import ConsentimientosSearch from './components/ConsentimientosSearch'
import ConsentimientosStats from './components/ConsentimientosStats'
import ConsentimientosTable from './components/ConsentimientosTable'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'

const ITEMS_PER_PAGE = 5

const AdminConsentimientos = () => {
  const navigate = useNavigate()

  const { token } = useAuthGuard(['administrador', 'admin', 'creador'])

  const {
    consentimientos,
    usuarios,
    loading,
    error,
    deleteLoading,
    fadeIn,
    deleteConsentimiento
  } = useConsentimientos(token)

  const enrichedConsentimientos = useMemo(
    () => enrichConsentimientosWithUsers(consentimientos, usuarios),
    [consentimientos, usuarios]
  )

  const handleSearchChange = useCallback(() => {
    resetPagination()
  }, [])

  const {
    searchTerm,
    setSearchTerm,
    filteredItems: filteredConsentimientos
  } = useSearch(
    enrichedConsentimientos,
    ['nombreUsuario', 'email'],
    handleSearchChange
  )

  const {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    resetPagination,
    totalItems,
    startIndex,
    endIndex
  } = usePagination(filteredConsentimientos, ITEMS_PER_PAGE)

  const stats = useMemo(
    () => calculateStats(filteredConsentimientos),
    [filteredConsentimientos]
  )

  const paginationInfo = {
    currentPage,
    totalPages,
    totalItems,
    startIndex,
    endIndex
  }

  return (
    <div
      className={`cf-consentimientos-container ${
        fadeIn ? 'cf-consentimientos-fade-in' : ''
      }`}
    >
      <Header />
      <div className='cf-consentimientos-content'>
        <div className='cf-consentimientos-header'>
          <Button
            variant='secondary'
            onClick={() => navigate('/administracion')}
          >
            Volver a Administración
          </Button>
          <h1 className='cf-consentimientos-title'>
            Gestión de Consentimientos
          </h1>
        </div>

        <ErrorMessage error={error} />

        <ConsentimientosSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <ConsentimientosStats
              stats={stats}
              paginationInfo={paginationInfo}
            />
            <ConsentimientosTable
              consentimientos={paginatedItems}
              deleteLoading={deleteLoading}
              onDelete={deleteConsentimiento}
              paginationInfo={paginationInfo}
              onPageChange={goToPage}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default AdminConsentimientos
