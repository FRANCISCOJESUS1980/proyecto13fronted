import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Search,
  X,
  AlertTriangle,
  Check,
  XCircle
} from 'lucide-react'
import './Adminconsentimientos.css'
import Header from '../../../components/Header/Header'
import Button from '../../../components/Button/Button'
import {
  obtenerTodosConsentimientos,
  eliminarConsentimiento,
  obtenerTodosUsuarios
} from '../../../services/Api'

const AdminConsentimientos = () => {
  const navigate = useNavigate()
  const [consentimientos, setConsentimientos] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredConsentimientos, setFilteredConsentimientos] = useState([])
  const [deleteLoading, setDeleteLoading] = useState(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [consentimientoToDelete, setConsentimientoToDelete] = useState(null)
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('rol')?.toLowerCase().trim()

    if (
      !token ||
      !(role === 'administrador' || role === 'admin' || role === 'creador')
    ) {
      console.error('Acceso denegado: no tienes permisos.')
      navigate('/')
      return
    }

    const fetchData = async () => {
      try {
        setLoading(true)

        const [consentimientosData, usuariosData] = await Promise.all([
          obtenerTodosConsentimientos(token),
          obtenerTodosUsuarios(token)
        ])

        console.log('Consentimientos obtenidos:', consentimientosData)
        console.log('Usuarios obtenidos:', usuariosData)

        const consentimientosArray =
          consentimientosData.data || consentimientosData
        const usuariosArray = usuariosData.data || usuariosData

        setConsentimientos(consentimientosArray || [])
        setUsuarios(usuariosArray || [])
      } catch (error) {
        console.error('Error al obtener datos:', error)
        setError(error.message || 'Error en la conexión con el servidor.')
      } finally {
        setLoading(false)

        setTimeout(() => setFadeIn(true), 100)
      }
    }

    fetchData()
  }, [navigate])

  useEffect(() => {
    const consentimientosConUsuarios = consentimientos.map((consentimiento) => {
      const usuario = usuarios.find((u) => u._id === consentimiento.userId)
      return {
        ...consentimiento,
        nombreUsuario: usuario
          ? `${usuario.nombre || ''} ${usuario.apellidos || ''}`.trim()
          : 'Usuario desconocido',
        email: usuario ? usuario.email : 'Email no disponible'
      }
    })

    const filtered =
      searchTerm.trim() === ''
        ? consentimientosConUsuarios
        : consentimientosConUsuarios.filter(
            (item) =>
              (item.nombreUsuario &&
                item.nombreUsuario
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())) ||
              (item.email &&
                item.email.toLowerCase().includes(searchTerm.toLowerCase()))
          )

    setFilteredConsentimientos(filtered)
  }, [consentimientos, usuarios, searchTerm])

  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha no disponible'

    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (error) {
      console.error('Error al formatear fecha:', error)
      return 'Fecha inválida'
    }
  }

  const handleDeleteClick = (consentimiento) => {
    setConsentimientoToDelete(consentimiento)
    setShowConfirmDialog(true)
  }

  const handleCancelDelete = () => {
    setShowConfirmDialog(false)
    setConsentimientoToDelete(null)
  }

  const handleConfirmDelete = async () => {
    if (!consentimientoToDelete || !consentimientoToDelete._id) return

    setDeleteLoading(consentimientoToDelete._id)

    try {
      const token = localStorage.getItem('token')
      await eliminarConsentimiento(consentimientoToDelete._id, token)

      setConsentimientos((prevConsentimientos) =>
        prevConsentimientos.filter((c) => c._id !== consentimientoToDelete._id)
      )

      setShowConfirmDialog(false)
      setConsentimientoToDelete(null)
    } catch (error) {
      console.error('Error al eliminar consentimiento:', error)
      setError(
        'Error al eliminar el consentimiento: ' +
          (error.message || 'Error desconocido')
      )
    } finally {
      setDeleteLoading(null)
    }
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

        {error && (
          <div className='cf-consentimientos-error'>
            <div className='cf-consentimientos-error-icon'></div>
            <p>{error}</p>
          </div>
        )}

        <div className='cf-consentimientos-search-container'>
          <div className='cf-consentimientos-search-box'>
            <Search size={18} className='cf-consentimientos-search-icon' />
            <input
              type='text'
              placeholder='Buscar por nombre o email...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='cf-consentimientos-search-input'
            />
            {searchTerm && (
              <button
                className='cf-consentimientos-search-clear'
                onClick={() => setSearchTerm('')}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className='cf-consentimientos-loading'>
            <div className='cf-consentimientos-spinner'></div>
            <p className='cf-consentimientos-loading-text'>
              Cargando consentimientos...
            </p>
          </div>
        ) : (
          <>
            <div className='cf-consentimientos-stats'>
              <div className='cf-consentimientos-stat-card'>
                <div className='cf-consentimientos-stat-icon cf-consentimientos-stat-icon-total'></div>
                <div className='cf-consentimientos-stat-content'>
                  <span className='cf-consentimientos-stat-value'>
                    {filteredConsentimientos.length}
                  </span>
                  <span className='cf-consentimientos-stat-label'>
                    Total consentimientos
                  </span>
                </div>
              </div>

              <div className='cf-consentimientos-stat-card'>
                <div className='cf-consentimientos-stat-icon cf-consentimientos-stat-icon-autoriza'></div>
                <div className='cf-consentimientos-stat-content'>
                  <span className='cf-consentimientos-stat-value'>
                    {
                      filteredConsentimientos.filter((c) => c.autorizaImagen)
                        .length
                    }
                  </span>
                  <span className='cf-consentimientos-stat-label'>
                    Autorizan imagen
                  </span>
                </div>
              </div>

              <div className='cf-consentimientos-stat-card'>
                <div className='cf-consentimientos-stat-icon cf-consentimientos-stat-icon-no-autoriza'></div>
                <div className='cf-consentimientos-stat-content'>
                  <span className='cf-consentimientos-stat-value'>
                    {
                      filteredConsentimientos.filter(
                        (c) => c.autorizaImagen === false
                      ).length
                    }
                  </span>
                  <span className='cf-consentimientos-stat-label'>
                    No autorizan imagen
                  </span>
                </div>
              </div>
            </div>

            <div className='cf-consentimientos-table-container'>
              {filteredConsentimientos.length > 0 ? (
                <table className='cf-consentimientos-table'>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Autoriza Imagen</th>
                      <th>Fecha de Aceptación</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredConsentimientos.map((item) => (
                      <tr key={item._id}>
                        <td className='cf-consentimientos-nombre-cell'>
                          {item.nombreUsuario}
                        </td>
                        <td className='cf-consentimientos-email-cell'>
                          {item.email}
                        </td>
                        <td className='cf-consentimientos-autoriza-cell'>
                          <span
                            className={`cf-consentimientos-autoriza-badge ${
                              item.autorizaImagen
                                ? 'cf-consentimientos-autoriza'
                                : 'cf-consentimientos-no-autoriza'
                            }`}
                          >
                            {item.autorizaImagen ? (
                              <>
                                <Check size={14} />
                                <span>SÍ</span>
                              </>
                            ) : (
                              <>
                                <XCircle size={14} />
                                <span>NO</span>
                              </>
                            )}
                          </span>
                        </td>
                        <td className='cf-consentimientos-fecha-cell'>
                          {formatDate(item.fechaAceptacion)}
                        </td>
                        <td className='cf-consentimientos-acciones-cell'>
                          <button
                            className='cf-consentimientos-delete-btn'
                            onClick={() => handleDeleteClick(item)}
                            disabled={deleteLoading === item._id}
                          >
                            {deleteLoading === item._id ? (
                              <div className='cf-consentimientos-btn-spinner'></div>
                            ) : (
                              <>
                                <div className='cf-consentimientos-delete-icon'></div>
                                <span>Eliminar</span>
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className='cf-consentimientos-no-results'>
                  <div className='cf-consentimientos-no-results-icon'></div>
                  <h3 className='cf-consentimientos-no-results-title'>
                    No se encontraron consentimientos
                  </h3>
                  <p className='cf-consentimientos-no-results-text'>
                    No hay consentimientos que coincidan con tu búsqueda.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {showConfirmDialog && (
        <div className='cf-consentimientos-dialog-overlay'>
          <div className='cf-consentimientos-dialog'>
            <div className='cf-consentimientos-dialog-header'>
              <AlertTriangle
                size={24}
                className='cf-consentimientos-dialog-icon'
              />
              <h3 className='cf-consentimientos-dialog-title'>
                Confirmar eliminación
              </h3>
            </div>
            <div className='cf-consentimientos-dialog-content'>
              <p>
                ¿Estás seguro de que deseas eliminar el consentimiento de{' '}
                <strong>{consentimientoToDelete?.nombreUsuario}</strong>?
              </p>
              <p className='cf-consentimientos-dialog-warning'>
                Esta acción no se puede deshacer.
              </p>
            </div>
            <div className='cf-consentimientos-dialog-actions'>
              <button
                className='cf-consentimientos-dialog-cancel'
                onClick={handleCancelDelete}
                disabled={deleteLoading}
              >
                Cancelar
              </button>
              <button
                className='cf-consentimientos-dialog-confirm'
                onClick={handleConfirmDelete}
                disabled={deleteLoading}
              >
                {deleteLoading ? (
                  <>
                    <div className='cf-consentimientos-btn-spinner'></div>
                    <span>Eliminando...</span>
                  </>
                ) : (
                  'Eliminar'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminConsentimientos
