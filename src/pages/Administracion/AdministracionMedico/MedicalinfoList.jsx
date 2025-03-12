import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllMedicalInfo } from '../../../services/Api/index'
import './MedicalInfoList.css'
import Header from '../../../components/Header/Header'

const MedicalInfoList = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [medicalInfoList, setMedicalInfoList] = useState([])
  const [error, setError] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    const fetchMedicalInfo = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')

        const data = await getAllMedicalInfo(token)
        setMedicalInfoList(data)
      } catch (error) {
        console.error('Error al obtener información médica:', error)
        setError(
          'Error al cargar la información médica. Verifica que tengas permisos de administrador.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchMedicalInfo()
  }, [])

  const handleUserSelect = (userId) => {
    const user = medicalInfoList.find((info) => info.user._id === userId)
    setSelectedUser(user)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'No registrado'
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className='medical-info-admin-container'>
      <Header />
      <div className='admin-header'>
        <button
          className='back-button'
          onClick={() => navigate('/administracion')}
        >
          ← Volver a Administracion
        </button>
        <h1>Información Médica de Usuarios</h1>
      </div>

      {error && <div className='error-message'>{error}</div>}

      {loading ? (
        <div className='loading'>Cargando información médica...</div>
      ) : (
        <div className='medical-info-grid'>
          <div className='users-list'>
            <h2>Usuarios</h2>
            {medicalInfoList.length === 0 ? (
              <p>No hay información médica registrada</p>
            ) : (
              <ul>
                {medicalInfoList.map((info) => (
                  <li
                    key={info._id}
                    className={
                      selectedUser && selectedUser._id === info._id
                        ? 'selected'
                        : ''
                    }
                    onClick={() => handleUserSelect(info.user._id)}
                  >
                    {info.user.name || 'Usuario'} - {info.user.email}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className='user-details'>
            {selectedUser ? (
              <div className='medical-card'>
                <h2>Información de {selectedUser.user.name || 'Usuario'}</h2>

                <div className='info-section'>
                  <h3>Información Básica</h3>
                  <div className='info-grid'>
                    <div className='info-item'>
                      <span className='label'>Tipo de Sangre:</span>
                      <span className='value'>
                        {selectedUser.bloodType || 'No registrado'}
                      </span>
                    </div>
                    <div className='info-item'>
                      <span className='label'>Último Chequeo:</span>
                      <span className='value'>
                        {formatDate(selectedUser.lastCheckup)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className='info-section'>
                  <h3>Condiciones Médicas</h3>
                  <div className='info-grid'>
                    <div className='info-item full-width'>
                      <span className='label'>Alergias:</span>
                      <span className='value'>
                        {selectedUser.allergies || 'Ninguna registrada'}
                      </span>
                    </div>
                    <div className='info-item full-width'>
                      <span className='label'>Condiciones:</span>
                      <span className='value'>
                        {selectedUser.conditions || 'Ninguna registrada'}
                      </span>
                    </div>
                    <div className='info-item full-width'>
                      <span className='label'>Medicamentos:</span>
                      <span className='value'>
                        {selectedUser.medications || 'Ninguno registrado'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className='info-section'>
                  <h3>Contactos de Emergencia</h3>
                  <div className='info-grid'>
                    <div className='info-item'>
                      <span className='label'>Contacto:</span>
                      <span className='value'>
                        {selectedUser.emergencyContact || 'No registrado'}
                      </span>
                    </div>
                    <div className='info-item'>
                      <span className='label'>Teléfono:</span>
                      <span className='value'>
                        {selectedUser.emergencyPhone || 'No registrado'}
                      </span>
                    </div>
                    <div className='info-item'>
                      <span className='label'>Médico:</span>
                      <span className='value'>
                        {selectedUser.doctorName || 'No registrado'}
                      </span>
                    </div>
                    <div className='info-item'>
                      <span className='label'>Teléfono Médico:</span>
                      <span className='value'>
                        {selectedUser.doctorPhone || 'No registrado'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className='select-user-message'>
                Selecciona un usuario para ver su información médica
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default MedicalInfoList
