import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Clock, Calendar } from 'lucide-react'
import ClaseCard from '../ClaseCard/ClaseCard'
import './ClasesTimeline.css'

const ClasesTimeline = ({
  selectedDate,
  clasesOrdenadas,
  handleInscribir,
  handleCancelar,
  estaInscrito,
  loading,
  claseSeleccionada,
  puedeInscribirse,
  puedeCancelar
}) => {
  const formattedDate = format(selectedDate, "EEEE d 'de' MMMM", { locale: es })

  return (
    <div className='cf-clases-timeline'>
      <div className='cf-clases-timeline-header'>
        <div className='cf-clases-timeline-date'>
          <Calendar size={20} className='cf-clases-timeline-icon' />
          <h2 className='cf-clases-timeline-title'>{formattedDate}</h2>
        </div>
        <div className='cf-clases-timeline-count'>
          <span>{clasesOrdenadas.length} clases disponibles</span>
        </div>
      </div>

      {clasesOrdenadas.length > 0 ? (
        <div className='cf-clases-timeline-content'>
          {clasesOrdenadas.map((clase) => (
            <div key={clase._id} className='cf-clases-timeline-item'>
              <div className='cf-clases-timeline-hora'>
                <Clock size={16} className='cf-clases-timeline-hora-icon' />
                <span>{clase.horario}</span>
              </div>
              <div className='cf-clases-timeline-card'>
                <ClaseCard
                  clase={clase}
                  handleInscribir={handleInscribir}
                  handleCancelar={handleCancelar}
                  estaInscrito={estaInscrito}
                  loading={loading}
                  claseSeleccionada={claseSeleccionada}
                  puedeInscribirse={puedeInscribirse}
                  puedeCancelar={puedeCancelar}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='cf-clases-timeline-empty'>
          <div className='cf-clases-timeline-empty-icon'></div>
          <h3 className='cf-clases-timeline-empty-title'>
            No hay clases disponibles
          </h3>
          <p className='cf-clases-timeline-empty-text'>
            No hay clases programadas para {formattedDate}.
            <br />
            Por favor, selecciona otro día o consulta más tarde.
          </p>
        </div>
      )}
    </div>
  )
}

export default ClasesTimeline
