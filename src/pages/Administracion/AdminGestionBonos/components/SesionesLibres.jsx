import { memo } from 'react'
import { Gift, Plus, Minus, Clock, User } from 'lucide-react'
import Button from '../../../../components/Button/Button'

const SesionesLibres = memo(
  ({
    usuario,
    sesionesLibres,
    historialSesionesLibres,
    loading,
    onAñadirSesiones,
    onQuitarSesiones,
    formatFecha
  }) => {
    if (!usuario) {
      return null
    }

    return (
      <div className='cf-gestion-bonos-card'>
        <div className='cf-gestion-bonos-card-header'>
          <h3 className='cf-gestion-bonos-card-title'>
            <Gift size={20} />
            Sesiones Libres
          </h3>
          <span
            className={`cf-gestion-bonos-badge ${
              sesionesLibres > 0 ? 'activo' : 'inactivo'
            }`}
          >
            {sesionesLibres} sesiones
          </span>
        </div>

        <div className='cf-gestion-bonos-card-content'>
          <div className='cf-gestion-bonos-info-row'>
            <div className='cf-gestion-bonos-info-item'>
              <Clock size={16} />
              <span>Sesiones disponibles: </span>
              <strong>{sesionesLibres}</strong>
            </div>

            <div className='cf-gestion-bonos-info-item'>
              <User size={16} />
              <span>Usuario: </span>
              <strong>
                {usuario.nombre} {usuario.apellidos}
              </strong>
            </div>
          </div>

          {sesionesLibres > 0 && (
            <div className='cf-gestion-bonos-sesiones-info'>
              <p className='cf-gestion-bonos-sesiones-descripcion'>
                El usuario puede usar estas sesiones para reservar clases sin
                necesidad de un bono activo.
              </p>
            </div>
          )}

          {historialSesionesLibres && historialSesionesLibres.length > 0 && (
            <div className='cf-gestion-bonos-historial-sesiones'>
              <h4>Historial de Sesiones Libres</h4>
              <div className='cf-gestion-bonos-historial-lista'>
                {historialSesionesLibres
                  .slice(-9)
                  .reverse()
                  .map((entrada, index) => (
                    <div
                      key={index}
                      className={`cf-gestion-bonos-historial-item ${entrada.tipo}`}
                    >
                      <div className='cf-gestion-bonos-historial-info'>
                        <span className='cf-gestion-bonos-historial-tipo'>
                          {entrada.tipo === 'añadido' && '+'}
                          {entrada.tipo === 'usado' && '-'}
                          {entrada.tipo === 'expirado' && '-'}
                          {entrada.cantidad}
                        </span>
                        <span className='cf-gestion-bonos-historial-motivo'>
                          {entrada.motivo}
                        </span>
                      </div>
                      <span className='cf-gestion-bonos-historial-fecha'>
                        {formatFecha(entrada.fecha)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        <div className='cf-gestion-bonos-card-actions'>
          <Button
            variant='primary'
            onClick={onAñadirSesiones}
            leftIcon={<Plus size={16} />}
            disabled={loading}
          >
            Añadir Sesiones
          </Button>

          {sesionesLibres > 0 && (
            <Button
              variant='secondary'
              onClick={onQuitarSesiones}
              leftIcon={<Minus size={16} />}
              disabled={loading}
            >
              Quitar Sesiones
            </Button>
          )}
        </div>
      </div>
    )
  }
)

SesionesLibres.displayName = 'SesionesLibres'

export default SesionesLibres
