import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, User } from 'lucide-react'
import Header from '../../../../components/Header/Header'
import CalendarioDias from '../../../Clases/components/CalendarioDias/CalendarioDias'
import ClasesTimeline from '../../../Clases/components/ClaseTimeline/ClasesTimeline'
import MensajeEstado from '../../../Clases/components/MensajeEstado/MensajeEstado'
import { useCalendario } from '../../../Clases/hooks/useCalendario'
import { useUsuarioClases } from '../hooks/useUsuarioClases'
import Button from '../../../../components/Button/Button'
import './AdminUsuarioClases.css'

const AdminUsuarioClases = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const {
    selectedDate,
    visibleDates,
    calendarRef,
    handlePrevWeek,
    handleNextWeek,
    setSelectedDate,
    currentMonth
  } = useCalendario()

  const {
    userInfo,
    clasesOrdenadas,
    loading,
    loadingClases,
    error,
    claseSeleccionada,
    inscripcionExitosa,
    cancelacionExitosa,
    handleInscribir,
    handleCancelar,
    estaInscrito,
    clasesInscritasTotal
  } = useUsuarioClases(userId, selectedDate)

  const puedeInscribirse = () => true
  const puedeCancelar = () => true

  const handleVolver = () => {
    navigate('/administracion/usuarios')
  }

  if (loading && !userInfo) {
    return (
      <div className='cf-admin-usuario-clases-container'>
        <Header />
        <div className='cf-admin-usuario-clases-content'>
          <div className='cf-admin-usuario-clases-loading'>
            <div className='cf-admin-usuario-clases-spinner'></div>
            <p className='cf-admin-usuario-clases-loading-text'>
              Cargando información del usuario...
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (error && !userInfo) {
    return (
      <div className='cf-admin-usuario-clases-container'>
        <Header />
        <div className='cf-admin-usuario-clases-content'>
          <div className='cf-admin-usuario-clases-error'>
            <div className='cf-admin-usuario-clases-error-icon'></div>
            <p>Error: {error}</p>
          </div>
          <Button
            variant='secondary'
            onClick={() => navigate('/administracion')}
            leftIcon={<ArrowLeft size={18} />}
            className='cf-admin-usuarios-back-btn'
          >
            Volver a Administración
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='cf-admin-usuario-clases-container'>
      <Header />
      <div className='cf-admin-usuario-clases-content'>
        <div className='cf-admin-usuario-clases-header'>
          <Button
            variant='secondary'
            size='sm'
            onClick={handleVolver}
            leftIcon={<ArrowLeft size={18} />}
          >
            Volver a AdminUsuarios
          </Button>

          <div className='cf-admin-usuario-clases-info'>
            <div className='cf-admin-usuario-clases-avatar-container'>
              {userInfo?.avatar ? (
                <img
                  src={userInfo.avatar || '/default-avatar.png'}
                  alt={userInfo.nombre}
                  className='cf-admin-usuario-clases-avatar'
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = '/default-avatar.png'
                  }}
                />
              ) : (
                <div className='cf-admin-usuario-clases-avatar-placeholder'>
                  <User size={24} />
                </div>
              )}
            </div>
            <div className='cf-admin-usuario-clases-details'>
              <h1 className='cf-admin-usuario-clases-title'>
                Gestionar clases de {userInfo?.nombre}
              </h1>
              <div className='cf-admin-usuario-clases-stats'>
                <span className='cf-admin-usuario-clases-stat'>
                  <span className='cf-admin-usuario-clases-stat-value'>
                    {clasesInscritasTotal}
                  </span>
                  <span className='cf-admin-usuario-clases-stat-label'>
                    clases inscritas
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='cf-admin-usuario-clases-notifications'>
          {inscripcionExitosa && (
            <MensajeEstado tipo='exito' mensaje={inscripcionExitosa} />
          )}
          {cancelacionExitosa && (
            <MensajeEstado tipo='info' mensaje={cancelacionExitosa} />
          )}
        </div>

        <div className='cf-admin-usuario-clases-calendar-section'>
          <div className='cf-admin-usuario-clases-calendar-header'>
            <h2 className='cf-admin-usuario-clases-calendar-title'>
              Calendario de {currentMonth}
            </h2>
          </div>

          <CalendarioDias
            selectedDate={selectedDate}
            visibleDates={visibleDates}
            calendarRef={calendarRef}
            handlePrevWeek={handlePrevWeek}
            handleNextWeek={handleNextWeek}
            setSelectedDate={setSelectedDate}
          />
        </div>

        {loadingClases && !claseSeleccionada && (
          <div className='cf-admin-usuario-clases-loading'>
            <div className='cf-admin-usuario-clases-spinner'></div>
            <p className='cf-admin-usuario-clases-loading-text'>
              Cargando clases...
            </p>
          </div>
        )}

        {error ? (
          <MensajeEstado tipo='error' mensaje={error} />
        ) : (
          <div className='cf-admin-usuario-clases-timeline-section'>
            <ClasesTimeline
              selectedDate={selectedDate}
              clasesOrdenadas={clasesOrdenadas}
              handleInscribir={handleInscribir}
              handleCancelar={handleCancelar}
              estaInscrito={estaInscrito}
              loading={loadingClases}
              claseSeleccionada={claseSeleccionada}
              puedeInscribirse={puedeInscribirse}
              puedeCancelar={puedeCancelar}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminUsuarioClases
