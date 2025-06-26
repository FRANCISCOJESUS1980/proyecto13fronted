import { useState, useEffect } from 'react'
import { Gift, AlertCircle } from 'lucide-react'
import { obtenerMisSesiones } from '../../../../../services/Api/index'
import './SesionesLibresInfo.css'

const SesionesLibresInfo = ({ showFullInfo = false }) => {
  const [sesionesInfo, setSesionesInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const cargarSesionesInfo = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          setLoading(false)
          return
        }

        const response = await obtenerMisSesiones(token)
        setSesionesInfo(response.data)
        setError(null)
      } catch (err) {
        console.error('Error al cargar sesiones libres:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    cargarSesionesInfo()
  }, [])

  if (loading) {
    return (
      <div className='bono-loading'>
        <div className='bono-spinner'></div>
        <span>Cargando sesiones...</span>
      </div>
    )
  }

  if (error || !sesionesInfo) {
    return null
  }

  const { sesionesLibres, resumen, puedeReservar } = sesionesInfo

  if (!showFullInfo) {
    return null
  }

  if (
    sesionesLibres === 0 &&
    (!resumen.bono || resumen.bono.sesionesRestantes === 0)
  ) {
    return null
  }

  return (
    <div className='bono-info-container'>
      {sesionesLibres > 0 && (
        <div className='bono-details'>
          <div className='bono-header'>
            <h3 className='bono-tipo'>
              <Gift size={18} style={{ marginRight: '8px' }} />
              Sesiones Libres
            </h3>
            <span className='bono-estado bono-estado-activo'>
              {sesionesLibres} disponibles
            </span>
          </div>

          <div className='bono-sesiones-libres'>
            <span className='bono-label'>Sesiones disponibles:</span>
            <span className='bono-value'>{sesionesLibres}</span>
          </div>

          <div className='bono-pausa'>
            <span className='bono-label'>Descripción:</span>
            <span className='bono-value' style={{ fontSize: '14px' }}>
              Puedes usar estas sesiones para reservar clases sin necesidad de
              un bono activo.
            </span>
          </div>
        </div>
      )}

      <div className='bono-details' style={{ marginTop: '16px' }}>
        <div className='bono-header'>
          <h3 className='bono-tipo'>Resumen de Sesiones</h3>
          {puedeReservar.puede ? (
            <span className='bono-estado bono-estado-activo'>
              ✓ Puedes reservar
            </span>
          ) : (
            <span className='bono-estado bono-estado-expirado'>
              <AlertCircle size={14} style={{ marginRight: '4px' }} />
              Sin sesiones
            </span>
          )}
        </div>

        <div className='bono-fechas'>
          {resumen.bono && (
            <div className='bono-fecha'>
              <span className='bono-label'>Bono {resumen.bono.tipo}:</span>
              <span className='bono-value'>
                {resumen.bono.tipo === 'Ilimitado'
                  ? 'Ilimitadas'
                  : `${resumen.bono.sesionesRestantes} sesiones`}
              </span>
            </div>
          )}

          {sesionesLibres > 0 && (
            <div className='bono-fecha'>
              <span className='bono-label'>Sesiones libres:</span>
              <span className='bono-value'>{sesionesLibres} sesiones</span>
            </div>
          )}
        </div>

        <div className='bono-sesiones-libres'>
          <span className='bono-label'>Total disponible:</span>
          <span
            className='bono-value'
            style={{ color: '#007bff', fontWeight: '600' }}
          >
            {resumen.totalSesionesDisponibles === 'Ilimitadas'
              ? 'Ilimitadas'
              : `${resumen.totalSesionesDisponibles} sesiones`}
          </span>
        </div>
      </div>
    </div>
  )
}

export default SesionesLibresInfo
