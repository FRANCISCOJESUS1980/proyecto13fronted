import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Search,
  Filter,
  X,
  User,
  Activity,
  AlertCircle,
  Phone
} from 'lucide-react'
import { getAllMedicalInfo } from '../../../services/Api/index'
import Header from '../../../components/Header/Header'
import Button from '../../../components/Button/Button'
import './MedicalinfoList.css'

const MedicalInfoList = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [medicalInfoList, setMedicalInfoList] = useState([])
  const [error, setError] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [fadeIn, setFadeIn] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false)
  const [bloodTypeFilter, setBloodTypeFilter] = useState('')

  useEffect(() => {
    const fetchMedicalInfo = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')
        const rol = localStorage.getItem('rol')?.toLowerCase().trim()

        if (rol !== 'admin' && rol !== 'administrador' && rol !== 'creador') {
          setError('No tienes permisos para acceder a esta información')
          setLoading(false)
          return
        }

        const data = await getAllMedicalInfo(token)
        setMedicalInfoList(data)
      } catch (error) {
        console.error('Error al obtener información médica:', error)
        setError(
          'Error al cargar la información médica. Verifica que tengas permisos de administrador.'
        )
      } finally {
        setLoading(false)

        setTimeout(() => setFadeIn(true), 100)
      }
    }

    fetchMedicalInfo()
  }, [])

  const filteredUsers = useMemo(() => {
    if (!medicalInfoList.length) return []

    return medicalInfoList.filter((info) => {
      if (!info.user) return false

      const userName = info.user.nombre ? info.user.nombre.toLowerCase() : ''
      const userEmail = info.user.email ? info.user.email.toLowerCase() : ''
      const searchLower = searchTerm.toLowerCase()

      const matchesSearch =
        (userName && userName.includes(searchLower)) ||
        (userEmail && userEmail.includes(searchLower))

      if (!searchTerm && !bloodTypeFilter) return true

      const matchesBloodType =
        !bloodTypeFilter || info.bloodType === bloodTypeFilter

      if (filterType === 'name') {
        return userName && userName.includes(searchLower) && matchesBloodType
      } else if (filterType === 'email') {
        return userEmail && userEmail.includes(searchLower) && matchesBloodType
      } else {
        return matchesSearch && matchesBloodType
      }
    })
  }, [medicalInfoList, searchTerm, filterType, bloodTypeFilter])

  const handleUserSelect = (userId) => {
    if (!userId) {
      console.error('ID de usuario no válido')
      return
    }

    const user = medicalInfoList.find(
      (info) => info.user && info.user._id === userId
    )

    if (!user) {
      console.error(
        `No se encontró información médica para el usuario con ID: ${userId}`
      )
      return
    }

    setSelectedUser(user)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'No registrado'
    return new Date(dateString).toLocaleDateString()
  }

  const clearFilters = () => {
    setSearchTerm('')
    setFilterType('all')
    setBloodTypeFilter('')
  }

  return (
    <div
      className={`cf-medical-info-container ${
        fadeIn ? 'cf-medical-info-fade-in' : ''
      }`}
    >
      <Header />
      <div className='cf-medical-info-content'>
        <div className='cf-medical-info-header'>
          <Button
            variant='secondary'
            onClick={() => navigate('/administracion')}
            leftIcon={<span>←</span>}
          >
            Volver a Administracion
          </Button>
          <h1 className='cf-medical-info-title'>
            Información Médica de Usuarios
          </h1>
        </div>

        {error && (
          <div className='cf-medical-info-error'>
            <div className='cf-medical-info-error-icon'></div>
            <p>{error}</p>
          </div>
        )}

        <div className='cf-medical-info-search-container'>
          <div className='cf-medical-info-search-box'>
            <div className='cf-medical-info-search-input-container'>
              <Search size={18} className='cf-medical-info-search-icon' />
              <input
                type='text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Buscar por nombre o email...'
                className='cf-medical-info-search-input'
              />
              {searchTerm && (
                <button
                  className='cf-medical-info-search-clear'
                  onClick={() => setSearchTerm('')}
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <button
              className='cf-medical-info-search-toggle'
              onClick={() => setIsAdvancedSearch(!isAdvancedSearch)}
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
                <label className='cf-medical-info-filter-label'>
                  Buscar en:
                </label>
                <div className='cf-medical-info-filter-options'>
                  <button
                    className={`cf-medical-info-filter-btn ${
                      filterType === 'all' ? 'active' : ''
                    }`}
                    onClick={() => setFilterType('all')}
                  >
                    Todos
                  </button>
                  <button
                    className={`cf-medical-info-filter-btn ${
                      filterType === 'name' ? 'active' : ''
                    }`}
                    onClick={() => setFilterType('name')}
                  >
                    Nombre
                  </button>
                  <button
                    className={`cf-medical-info-filter-btn ${
                      filterType === 'email' ? 'active' : ''
                    }`}
                    onClick={() => setFilterType('email')}
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
                    onChange={(e) => setBloodTypeFilter(e.target.value)}
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
                onClick={clearFilters}
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

        {loading ? (
          <div className='cf-medical-info-loading'>
            <div className='cf-medical-info-spinner'></div>
            <p className='cf-medical-info-loading-text'>
              Cargando información médica...
            </p>
          </div>
        ) : (
          <div className='cf-medical-info-grid'>
            <div className='cf-medical-info-users-list'>
              <h2 className='cf-medical-info-section-title'>Usuarios</h2>
              {filteredUsers.length === 0 ? (
                <div className='cf-medical-info-no-results'>
                  <div className='cf-medical-info-no-results-icon'></div>
                  <p className='cf-medical-info-no-results-text'>
                    No se encontraron usuarios con esos criterios
                  </p>
                </div>
              ) : (
                <ul className='cf-medical-info-users-ul'>
                  {filteredUsers.map((info) => (
                    <li
                      key={info._id}
                      className={`cf-medical-info-user-item ${
                        selectedUser && selectedUser._id === info._id
                          ? 'cf-medical-info-selected'
                          : ''
                      }`}
                      onClick={() =>
                        info.user && info.user._id
                          ? handleUserSelect(info.user._id)
                          : null
                      }
                    >
                      <div className='cf-medical-info-user-list-item'>
                        <div className='cf-medical-info-user-avatar-container'>
                          {info.user.avatar ? (
                            <img
                              src={info.user.avatar || '/placeholder.svg'}
                              alt={info.user.nombre || 'Usuario'}
                              className='cf-medical-info-user-avatar'
                              onError={(e) => {
                                e.target.onerror = null
                                e.target.src = '/default-avatar.png'
                              }}
                            />
                          ) : (
                            <div className='cf-medical-info-user-avatar-placeholder'>
                              <User size={20} />
                            </div>
                          )}
                        </div>
                        <div className='cf-medical-info-user-info'>
                          <span className='cf-medical-info-user-name'>
                            {info.user.nombre || 'Sin nombre'}
                          </span>
                          <span className='cf-medical-info-user-email'>
                            {info.user.email}
                          </span>
                        </div>
                        {info.bloodType && (
                          <span className='cf-medical-info-blood-type-badge'>
                            {info.bloodType}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className='cf-medical-info-user-details'>
              {selectedUser ? (
                <div className='cf-medical-info-card'>
                  <div className='cf-medical-info-user-header'>
                    <div className='cf-medical-info-detail-avatar-container'>
                      {selectedUser.user.avatar ? (
                        <img
                          src={selectedUser.user.avatar || '/placeholder.svg'}
                          alt={selectedUser.user.nombre || 'Usuario'}
                          className='cf-medical-info-detail-avatar'
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src = '/default-avatar.png'
                          }}
                        />
                      ) : (
                        <div className='cf-medical-info-detail-avatar-placeholder'>
                          <User size={32} />
                        </div>
                      )}
                    </div>
                    <h2 className='cf-medical-info-user-title'>
                      Información de{' '}
                      {selectedUser.user.nombre || selectedUser.user.email}
                    </h2>
                  </div>

                  <div className='cf-medical-info-section'>
                    <div className='cf-medical-info-section-header'>
                      <Activity
                        size={18}
                        className='cf-medical-info-section-icon'
                      />
                      <h3 className='cf-medical-info-section-title'>
                        Información Básica
                      </h3>
                    </div>
                    <div className='cf-medical-info-grid'>
                      <div className='cf-medical-info-item'>
                        <span className='cf-medical-info-label'>
                          Tipo de Sangre:
                        </span>
                        <span className='cf-medical-info-value'>
                          {selectedUser.bloodType ? (
                            <span className='cf-medical-info-blood-badge'>
                              {selectedUser.bloodType}
                            </span>
                          ) : (
                            'No registrado'
                          )}
                        </span>
                      </div>
                      <div className='cf-medical-info-item'>
                        <span className='cf-medical-info-label'>
                          Último Chequeo:
                        </span>
                        <span className='cf-medical-info-value'>
                          {formatDate(selectedUser.lastCheckup)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className='cf-medical-info-section'>
                    <div className='cf-medical-info-section-header'>
                      <AlertCircle
                        size={18}
                        className='cf-medical-info-section-icon'
                      />
                      <h3 className='cf-medical-info-section-title'>
                        Condiciones Médicas
                      </h3>
                    </div>
                    <div className='cf-medical-info-grid'>
                      <div className='cf-medical-info-item cf-medical-info-full-width'>
                        <span className='cf-medical-info-label'>Alergias:</span>
                        <span className='cf-medical-info-value'>
                          {selectedUser.allergies || 'Ninguna registrada'}
                        </span>
                      </div>
                      <div className='cf-medical-info-item cf-medical-info-full-width'>
                        <span className='cf-medical-info-label'>
                          Condiciones:
                        </span>
                        <span className='cf-medical-info-value'>
                          {selectedUser.conditions || 'Ninguna registrada'}
                        </span>
                      </div>
                      <div className='cf-medical-info-item cf-medical-info-full-width'>
                        <span className='cf-medical-info-label'>
                          Medicamentos:
                        </span>
                        <span className='cf-medical-info-value'>
                          {selectedUser.medications || 'Ninguno registrado'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className='cf-medical-info-section'>
                    <div className='cf-medical-info-section-header'>
                      <Phone
                        size={18}
                        className='cf-medical-info-section-icon'
                      />
                      <h3 className='cf-medical-info-section-title'>
                        Contactos de Emergencia
                      </h3>
                    </div>
                    <div className='cf-medical-info-grid'>
                      <div className='cf-medical-info-item'>
                        <span className='cf-medical-info-label'>Contacto:</span>
                        <span className='cf-medical-info-value'>
                          {selectedUser.emergencyContact || 'No registrado'}
                        </span>
                      </div>
                      <div className='cf-medical-info-item'>
                        <span className='cf-medical-info-label'>Teléfono:</span>
                        <span className='cf-medical-info-value'>
                          {selectedUser.emergencyPhone || 'No registrado'}
                        </span>
                      </div>
                      <div className='cf-medical-info-item'>
                        <span className='cf-medical-info-label'>Médico:</span>
                        <span className='cf-medical-info-value'>
                          {selectedUser.doctorName || 'No registrado'}
                        </span>
                      </div>
                      <div className='cf-medical-info-item'>
                        <span className='cf-medical-info-label'>
                          Teléfono Médico:
                        </span>
                        <span className='cf-medical-info-value'>
                          {selectedUser.doctorPhone || 'No registrado'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='cf-medical-info-select-message'>
                  <div className='cf-medical-info-select-icon'></div>
                  <h3 className='cf-medical-info-select-title'>
                    Selecciona un usuario
                  </h3>
                  <p className='cf-medical-info-select-text'>
                    Haz clic en un usuario de la lista para ver su información
                    médica detallada
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MedicalInfoList
