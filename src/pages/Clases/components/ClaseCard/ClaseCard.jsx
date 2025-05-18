import { Clock, Users } from 'lucide-react'
import MonitorInfo from '../Monitorinfo/Monitorinfo'
import { getNivelBadgeClass } from '../../utils/formatters'
import { getImageUrl } from '../../utils/imageUtils'
import './ClaseCard.css'

const ClaseCard = ({
  clase,
  handleInscribir,
  handleCancelar,
  estaInscrito,
  loading,
  claseSeleccionada,
  puedeInscribirse,
  puedeCancelar
}) => {
  const inscrito = estaInscrito(clase)
  const completa = clase.inscritos.length >= clase.capacidadMaxima
  const porcentajeOcupacion =
    (clase.inscritos.length / clase.capacidadMaxima) * 100

  const puedeInscribirseEnEstaClase = puedeInscribirse(clase)
  const puedeCancelarEstaClase = puedeCancelar(clase)

  return (
    <div
      className={`cf-clase-card ${inscrito ? 'cf-clase-card-inscrito' : ''}`}
    >
      <div className='cf-clase-card-header'>
        <h3 className='cf-clase-card-nombre'>{clase.nombre}</h3>
        <div className='cf-clase-card-detalles'>
          <span
            className={`cf-clase-card-nivel ${getNivelBadgeClass(clase.nivel)}`}
          >
            {clase.nivel.charAt(0).toUpperCase() + clase.nivel.slice(1)}
          </span>
          <span className='cf-clase-card-duracion'>
            <Clock size={14} />
            {clase.duracion} min
          </span>
          {clase.esFechaEspecifica && (
            <span className='cf-clase-card-unica'>Clase única</span>
          )}
        </div>
      </div>

      <div className='cf-clase-card-content'>
        <div className='cf-clase-card-ocupacion'>
          <div className='cf-clase-card-ocupacion-header'>
            <div className='cf-clase-card-ocupacion-label'>
              <Users size={16} />
              <span>Ocupación:</span>
            </div>
            <span className='cf-clase-card-ocupacion-contador'>
              {clase.inscritos.length}/{clase.capacidadMaxima}
            </span>
          </div>

          <div className='cf-clase-card-progress-container'>
            <div
              className='cf-clase-card-progress-bar'
              style={{ width: `${porcentajeOcupacion}%` }}
            ></div>
          </div>

          <OcupacionVisual clase={clase} estaInscrito={estaInscrito} />
        </div>

        {clase.entrenador && <MonitorInfo monitor={clase.entrenador} />}
      </div>

      <div className='cf-clase-card-actions'>
        {inscrito ? (
          puedeCancelarEstaClase ? (
            <button
              className='cf-clase-card-btn cf-clase-card-btn-cancelar'
              onClick={() => handleCancelar(clase._id)}
              disabled={loading || claseSeleccionada === clase._id}
            >
              {loading && claseSeleccionada === clase._id ? (
                <div className='cf-clase-card-spinner'></div>
              ) : (
                'Cancelar reserva'
              )}
            </button>
          ) : (
            <div className='cf-clase-card-restriction-message'>
              No puedes cancelar con menos de 2 horas de antelación
            </div>
          )
        ) : completa ? (
          <button
            className='cf-clase-card-btn cf-clase-card-btn-completo'
            disabled
          >
            Clase completa
          </button>
        ) : puedeInscribirseEnEstaClase ? (
          <button
            className='cf-clase-card-btn cf-clase-card-btn-inscribir'
            onClick={() => handleInscribir(clase._id)}
            disabled={loading || claseSeleccionada === clase._id}
          >
            {loading && claseSeleccionada === clase._id ? (
              <div className='cf-clase-card-spinner'></div>
            ) : (
              'Reservar plaza'
            )}
          </button>
        ) : (
          <div className='cf-clase-card-restriction-message'>
            Ya no puedes inscribirte a esta clase
          </div>
        )}
      </div>
    </div>
  )
}

const OcupacionVisual = ({ clase, estaInscrito }) => {
  return (
    <div className='cf-clase-card-huecos-container'>
      <div className='cf-clase-card-huecos'>
        {Array.from({ length: clase.capacidadMaxima }).map((_, index) => {
          const inscrito =
            index < clase.inscritos.length ? clase.inscritos[index] : null
          const isCurrentUser =
            inscrito && estaInscrito({ inscritos: [inscrito] })

          return (
            <div
              key={index}
              className={`cf-clase-card-hueco ${
                inscrito ? 'cf-clase-card-hueco-ocupado' : ''
              } ${isCurrentUser ? 'cf-clase-card-hueco-usuario' : ''}`}
            >
              {inscrito ? (
                <div className='cf-clase-card-avatar-container'>
                  <img
                    src={getImageUrl(inscrito) || '/default-avatar.jpg'}
                    alt={inscrito.nombre || 'Usuario inscrito'}
                    onError={(e) => {
                      e.target.src = '/default-avatar.jpg'
                    }}
                  />
                  {isCurrentUser && (
                    <div className='cf-clase-card-usuario-indicador'>Tú</div>
                  )}
                </div>
              ) : (
                <div className='cf-clase-card-hueco-vacio'></div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ClaseCard
