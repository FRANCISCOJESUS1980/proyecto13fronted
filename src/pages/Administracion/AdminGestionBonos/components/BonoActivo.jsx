import { memo } from 'react'
import {
  Clock,
  Calendar,
  Pause,
  Play,
  Plus,
  Info,
  AlertTriangle
} from 'lucide-react'
import Button from '../../../../components/Button/Button'

const BonoActivo = memo(
  ({
    bonoActivo,
    loading,
    formatFecha,
    onPausar,
    onReactivar,
    onAñadirSesiones,
    obtenerInfoPausa,
    calcularDiasPausa
  }) => {
    if (!bonoActivo) {
      return (
        <div className='cf-gestion-bonos-empty'>
          <p>El usuario no tiene ningún bono activo.</p>
          <Button
            variant='primary'
            onClick={onAñadirSesiones}
            leftIcon={<Plus size={18} />}
          >
            Añadir Sesion
          </Button>
        </div>
      )
    }

    const isActivo = bonoActivo.estado === 'activo'
    const isPausado = bonoActivo.estado === 'pausado'
    const isAgotado = bonoActivo.estado === 'agotado'
    const isExpirado = bonoActivo.estado === 'expirado'
    const infoPausa = obtenerInfoPausa()

    console.log('=== BONO ACTIVO COMPONENT ===')
    console.log('Estado del bono:', bonoActivo.estado)
    console.log('Es activo:', isActivo)
    console.log('Es pausado:', isPausado)
    console.log('Es agotado:', isAgotado)
    console.log('Es expirado:', isExpirado)

    return (
      <div className='cf-gestion-bonos-card'>
        <div className='cf-gestion-bonos-card-header'>
          <h3 className='cf-gestion-bonos-card-title'>{bonoActivo.tipo}</h3>
          <span
            className={`cf-gestion-bonos-badge ${
              isActivo
                ? 'activo'
                : isPausado
                ? 'pausado'
                : isAgotado
                ? 'agotado'
                : isExpirado
                ? 'expirado'
                : 'inactivo'
            }`}
          >
            {isActivo
              ? 'Activo'
              : isPausado
              ? 'Pausado'
              : isAgotado
              ? 'Agotado'
              : isExpirado
              ? 'Expirado'
              : bonoActivo.estado}
          </span>
        </div>

        <div className='cf-gestion-bonos-card-content'>
          <div className='cf-gestion-bonos-info-row'>
            <div className='cf-gestion-bonos-info-item'>
              <Clock size={16} />
              <span>Sesiones: </span>
              <strong>
                {bonoActivo.tipo === 'Ilimitado'
                  ? 'Ilimitadas'
                  : `${bonoActivo.sesionesRestantes}/${bonoActivo.sesionesTotal}`}
              </strong>
            </div>

            <div className='cf-gestion-bonos-info-item'>
              <Calendar size={16} />
              <span>Validez: </span>
              <strong>
                {formatFecha(bonoActivo.fechaInicio)} -{' '}
                {formatFecha(bonoActivo.fechaFin)}
              </strong>
            </div>
          </div>

          {isPausado && infoPausa && (
            <div className='cf-gestion-bonos-pausa-info'>
              <div className='cf-gestion-bonos-pausa-header'>
                <Info size={16} />
                <strong>Información de Pausa</strong>
              </div>

              <div className='cf-gestion-bonos-pausa-details'>
                <p>
                  <strong>Motivo:</strong> {infoPausa.motivoPausa}
                </p>
                <p>
                  <strong>Fecha de pausa:</strong>{' '}
                  {formatFecha(infoPausa.fechaPausa)}
                </p>
                <p>
                  <strong>Días pausado:</strong>{' '}
                  <span className='cf-gestion-bonos-dias-pausado'>
                    {infoPausa.diasPausado} días
                  </span>
                </p>
                <p className='cf-gestion-bonos-extension-info'>
                  <strong>Extensión al reactivar:</strong> +
                  {infoPausa.diasPausado} días
                </p>
              </div>
            </div>
          )}

          {isAgotado && (
            <div className='cf-gestion-bonos-agotado-info'>
              <div className='cf-gestion-bonos-agotado-header'>
                <AlertTriangle size={16} />
                <strong>Bono Agotado</strong>
              </div>
              <div className='cf-gestion-bonos-agotado-details'>
                <p>
                  El bono se ha quedado sin sesiones, pero aún está dentro del
                  período de validez.
                </p>
                <p>
                  Puedes añadir más sesiones para reactivarlo automáticamente.
                </p>
              </div>
            </div>
          )}

          {isExpirado && (
            <div className='cf-gestion-bonos-expirado-info'>
              <div className='cf-gestion-bonos-expirado-header'>
                <AlertTriangle size={16} />
                <strong>Bono Expirado</strong>
              </div>
              <div className='cf-gestion-bonos-expirado-details'>
                <p>
                  El bono ha superado su fecha de validez y no puede ser
                  utilizado.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className='cf-gestion-bonos-card-actions'>
          {isActivo ? (
            <>
              <Button
                variant='secondary'
                onClick={onPausar}
                leftIcon={<Pause size={16} />}
                disabled={loading}
              >
                Pausar Bono
              </Button>

              {bonoActivo.tipo !== 'Ilimitado' && (
                <Button
                  variant='secondary'
                  onClick={onAñadirSesiones}
                  leftIcon={<Plus size={16} />}
                  disabled={loading}
                >
                  Añadir Sesiones
                </Button>
              )}
            </>
          ) : isPausado ? (
            <Button
              variant='primary'
              onClick={onReactivar}
              leftIcon={<Play size={16} />}
              disabled={loading}
              title={
                infoPausa ? `Se extenderá ${infoPausa.diasPausado} días` : ''
              }
            >
              {loading
                ? 'Reactivando...'
                : `Reactivar (+${infoPausa?.diasPausado || 0} días)`}
            </Button>
          ) : isAgotado ? (
            <Button
              variant='primary'
              onClick={onAñadirSesiones}
              leftIcon={<Plus size={16} />}
              disabled={loading}
            >
              Añadir Sesiones para Reactivar
            </Button>
          ) : isExpirado ? (
            <div className='cf-gestion-bonos-estado-info'>
              <p>Bono expirado. No se pueden realizar acciones.</p>
            </div>
          ) : (
            <div className='cf-gestion-bonos-estado-info'>
              <p>Estado: {bonoActivo.estado}. Contacta con administración.</p>
            </div>
          )}
        </div>
      </div>
    )
  }
)

BonoActivo.displayName = 'BonoActivo'

export default BonoActivo
