import { User, Activity, AlertCircle, Phone } from 'lucide-react'
import { memo } from 'react'
import { formatDate } from '../utils/formatters'

const UserDetails = memo(({ selectedUser }) => {
  if (!selectedUser) {
    return (
      <div className='cf-medical-info-user-details'>
        <div className='cf-medical-info-select-message'>
          <div className='cf-medical-info-select-icon'></div>
          <h3 className='cf-medical-info-select-title'>
            Selecciona un usuario
          </h3>
          <p className='cf-medical-info-select-text'>
            Haz clic en un usuario de la lista para ver su información médica
            detallada
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='cf-medical-info-user-details'>
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
            Información de {selectedUser.user.nombre || selectedUser.user.email}
          </h2>
        </div>

        <BasicInfoSection selectedUser={selectedUser} />
        <MedicalConditionsSection selectedUser={selectedUser} />
        <EmergencyContactsSection selectedUser={selectedUser} />
      </div>
    </div>
  )
})

const BasicInfoSection = ({ selectedUser }) => (
  <div className='cf-medical-info-section'>
    <div className='cf-medical-info-section-header'>
      <Activity size={18} className='cf-medical-info-section-icon' />
      <h3 className='cf-medical-info-section-title'>Información Básica</h3>
    </div>
    <div className='cf-medical-info-grid'>
      <div className='cf-medical-info-item'>
        <span className='cf-medical-info-label'>Tipo de Sangre:</span>
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
        <span className='cf-medical-info-label'>Último Chequeo:</span>
        <span className='cf-medical-info-value'>
          {formatDate(selectedUser.lastCheckup)}
        </span>
      </div>
    </div>
  </div>
)

const MedicalConditionsSection = ({ selectedUser }) => (
  <div className='cf-medical-info-section'>
    <div className='cf-medical-info-section-header'>
      <AlertCircle size={18} className='cf-medical-info-section-icon' />
      <h3 className='cf-medical-info-section-title'>Condiciones Médicas</h3>
    </div>
    <div className='cf-medical-info-grid'>
      <div className='cf-medical-info-item cf-medical-info-full-width'>
        <span className='cf-medical-info-label'>Alergias:</span>
        <span className='cf-medical-info-value'>
          {selectedUser.allergies || 'Ninguna registrada'}
        </span>
      </div>
      <div className='cf-medical-info-item cf-medical-info-full-width'>
        <span className='cf-medical-info-label'>Condiciones:</span>
        <span className='cf-medical-info-value'>
          {selectedUser.conditions || 'Ninguna registrada'}
        </span>
      </div>
      <div className='cf-medical-info-item cf-medical-info-full-width'>
        <span className='cf-medical-info-label'>Medicamentos:</span>
        <span className='cf-medical-info-value'>
          {selectedUser.medications || 'Ninguno registrado'}
        </span>
      </div>
    </div>
  </div>
)

const EmergencyContactsSection = ({ selectedUser }) => (
  <div className='cf-medical-info-section'>
    <div className='cf-medical-info-section-header'>
      <Phone size={18} className='cf-medical-info-section-icon' />
      <h3 className='cf-medical-info-section-title'>Contactos de Emergencia</h3>
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
        <span className='cf-medical-info-label'>Teléfono Médico:</span>
        <span className='cf-medical-info-value'>
          {selectedUser.doctorPhone || 'No registrado'}
        </span>
      </div>
    </div>
  </div>
)

UserDetails.displayName = 'UserDetails'

export default UserDetails
