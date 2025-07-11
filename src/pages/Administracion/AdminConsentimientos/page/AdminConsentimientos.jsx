import { useMemo, useCallback, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Adminconsentimientos.css'
import Header from '../../../../components/Header/page/Header'
import Button from '../../../../components/Button/Button'
import Loading from '../../../../components/Loading/loading'
import Pagination from '../../../../components/Pagination/Pagination'
import { useAuthGuard } from '../hooks/use-auth-guard'
import { useConsentimientos } from '../hooks/use-consentimientos'
import { useSearch } from '../hooks/use-search'
import {
  enrichConsentimientosWithUsers,
  calculateStats
} from '../utils/consentimientos-utils'
import ConsentimientosSearch from '../components/ConsentimientosSearch'
import ConsentimientosStats from '../components/ConsentimientosStats'
import ConsentimientosTable from '../components/ConsentimientosTable'
import ErrorMessage from '../components/ErrorMessage'

const ITEMS_PER_PAGE = 10

const AdminConsentimientos = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
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
    setCurrentPage(1)
  }, [])

  const {
    searchTerm,
    setSearchTerm,
    filteredItems: filteredConsentimientos
  } = useSearch(
    enrichedConsentimientos,
    ['nombreCompleto', 'dni', 'email', 'nombreUsuario'],
    handleSearchChange
  )

  const totalPages = Math.ceil(filteredConsentimientos.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedItems = filteredConsentimientos.slice(startIndex, endIndex)

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }
  }, [currentPage, totalPages])

  const handlePageChange = useCallback(
    (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page)
      }
    },
    [totalPages]
  )

  const stats = useMemo(
    () => calculateStats(filteredConsentimientos),
    [filteredConsentimientos]
  )

  const paginationInfo = {
    currentPage,
    totalPages,
    totalItems: filteredConsentimientos.length,
    startIndex: startIndex + 1,
    endIndex: Math.min(endIndex, filteredConsentimientos.length)
  }

  if (loading) {
    return <Loading isVisible={loading} />
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
          <p className='cf-consentimientos-subtitle'>
            Administra todos los consentimientos firmados digitalmente por los
            usuarios
          </p>
        </div>

        <ErrorMessage error={error} />

        <ConsentimientosSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <ConsentimientosStats stats={stats} paginationInfo={paginationInfo} />

        <ConsentimientosTable
          consentimientos={paginatedItems}
          deleteLoading={deleteLoading}
          onDelete={deleteConsentimiento}
          totalItems={filteredConsentimientos.length}
        />

        <div className='cf-consentimientos-pagination-container'>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            showPagination={paginatedItems.length > 0}
            className='cf-pagination'
          />
        </div>
      </div>
    </div>
  )
}

export default AdminConsentimientos
