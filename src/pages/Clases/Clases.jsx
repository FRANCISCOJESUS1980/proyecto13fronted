import { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import CalendarioDias from './components/CalendarioDias/CalendarioDias'
import ClasesTimeline from './components/ClaseTimeline/ClasesTimeline'
import MensajeEstado from './components/MensajeEstado/MensajeEstado'
import { useUsuario } from './hooks/useUsuario'
import { useClasesUsuario } from './hooks/useClasesUsuario'
import { useCalendario } from './hooks/useCalendario'
import { Calendar, Clock, Users } from 'lucide-react'
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'

import './Clases.css'

const Clases = () => {
  const navigate = useNavigate()
  const [claseSeleccionada, setClaseSeleccionada] = useState(null)
  const [inscripcionExitosa, setInscripcionExitosa] = useState(null)
  const [cancelacionExitosa, setCancelacionExitosa] = useState(null)
  const [fadeIn, setFadeIn] = useState(false)

  const { userId, userInfo } = useUsuario()

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
    clases,
    clasesOrdenadas,
    loading,
    error,
    handleInscribir,
    handleCancelar,
    estaInscrito,
    clasesDisponiblesHoy,
    clasesInscritasHoy,
    totalClasesDisponibles,
    puedeInscribirse,
    puedeCancelar
  } = useClasesUsuario({
    userId,
    selectedDate,
    setInscripcionExitosa,
    setCancelacionExitosa,
    claseSeleccionada,
    setClaseSeleccionada
  })

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100)
  }, [])

  return (
    <div className={`cf-clases-container ${fadeIn ? 'cf-clases-fade-in' : ''}`}>
      <Header />
      <Button
        variant='secondary'
        onClick={() => navigate('/dashboard')}
        leftIcon={<span className='cf-clases-back-icon'></span>}
        className='cf-clases-back-button'
      >
        Volver al Dashboard
      </Button>
      <div className='cf-clases-content'>
        <div className='cf-clases-header'>
          <div className='cf-clases-header-title'>
            <h1 className='cf-clases-title'>Reserva tu Clase</h1>
            <p className='cf-clases-subtitle'>
              Selecciona el día y la hora que prefieras
            </p>
          </div>

          <div className='cf-clases-stats'>
            <div className='cf-clases-stat-card'>
              <div className='cf-clases-stat-icon'>
                <Calendar size={20} />
              </div>
              <div className='cf-clases-stat-content'>
                <span className='cf-clases-stat-value'>
                  {totalClasesDisponibles}
                </span>
                <span className='cf-clases-stat-label'>Clases disponibles</span>
              </div>
            </div>

            <div className='cf-clases-stat-card'>
              <div className='cf-clases-stat-icon'>
                <Clock size={20} />
              </div>
              <div className='cf-clases-stat-content'>
                <span className='cf-clases-stat-value'>
                  {clasesDisponiblesHoy}
                </span>
                <span className='cf-clases-stat-label'>Clases hoy</span>
              </div>
            </div>

            <div className='cf-clases-stat-card'>
              <div className='cf-clases-stat-icon'>
                <Users size={20} />
              </div>
              <div className='cf-clases-stat-content'>
                <span className='cf-clases-stat-value'>
                  {clasesInscritasHoy}
                </span>
                <span className='cf-clases-stat-label'>Tus reservas hoy</span>
              </div>
            </div>
          </div>
        </div>

        <div className='cf-clases-notifications'>
          {inscripcionExitosa && (
            <MensajeEstado tipo='exito' mensaje={inscripcionExitosa} />
          )}
          {cancelacionExitosa && (
            <MensajeEstado tipo='info' mensaje={cancelacionExitosa} />
          )}
        </div>

        <div className='cf-clases-calendar-section'>
          <div className='cf-clases-calendar-header'>
            <h2 className='cf-clases-calendar-title'>
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

        {loading && !claseSeleccionada && (
          <div className='cf-clases-loading'>
            <div className='cf-clases-spinner'></div>
            <p className='cf-clases-loading-text'>Cargando clases...</p>
          </div>
        )}

        {error ? (
          <MensajeEstado tipo='error' mensaje={error} />
        ) : (
          <div className='cf-clases-timeline-section'>
            <ClasesTimeline
              selectedDate={selectedDate}
              clasesOrdenadas={clasesOrdenadas}
              handleInscribir={handleInscribir}
              handleCancelar={handleCancelar}
              estaInscrito={estaInscrito}
              loading={loading}
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

export default Clases
