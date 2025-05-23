import React, { memo } from 'react'
import { Clock, Calendar, Pause, Play, Plus } from 'lucide-react'
import Button from '../../../../components/Button/Button'

const BonoActivo = memo(
  ({
    bonoActivo,
    loading,
    formatFecha,
    onPausar,
    onReactivar,
    onAñadirSesiones
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
            Asignar Bono
          </Button>
        </div>
      )
    }

    const isActivo = bonoActivo.estado === 'activo'

    return (
      <div className='cf-gestion-bonos-card'>
        <div className='cf-gestion-bonos-card-header'>
          <h3 className='cf-gestion-bonos-card-title'>{bonoActivo.tipo}</h3>
          <span
            className={`cf-gestion-bonos-badge ${
              isActivo ? 'activo' : 'pausado'
            }`}
          >
            {isActivo ? 'Activo' : 'Pausado'}
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

          {!isActivo && bonoActivo.motivoPausa && (
            <div className='cf-gestion-bonos-pausa-info'>
              <p>
                <strong>Motivo de pausa:</strong> {bonoActivo.motivoPausa}
              </p>
              {bonoActivo.fechaPausa && (
                <p>
                  <strong>Fecha de pausa:</strong>{' '}
                  {formatFecha(bonoActivo.fechaPausa)}
                </p>
              )}
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
              >
                Pausar Bono
              </Button>

              {bonoActivo.tipo !== 'Ilimitado' && (
                <Button
                  variant='secondary'
                  onClick={onAñadirSesiones}
                  leftIcon={<Plus size={16} />}
                >
                  Añadir Sesiones
                </Button>
              )}
            </>
          ) : (
            <Button
              variant='primary'
              onClick={onReactivar}
              leftIcon={<Play size={16} />}
              disabled={loading}
            >
              {loading ? 'Reactivando...' : 'Reactivar Bono'}
            </Button>
          )}
        </div>
      </div>
    )
  }
)

BonoActivo.displayName = 'BonoActivo'

export default BonoActivo
