import { useState, useEffect } from 'react'
import { obtenerBonoActivo } from '../services/bonosService'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const BonoInfo = ({ userId }) => {
  const [bono, setBono] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const userRole = localStorage.getItem('rol')
    const isAdminUser =
      userRole === 'admin' || userRole === 'monitor' || userRole === 'creador'
    setIsAdmin(isAdminUser)

    if (!isAdminUser) {
      fetchBonoInfo()
    } else {
      setLoading(false)
    }
  }, [userId])

  const fetchBonoInfo = async () => {
    try {
      setLoading(true)
      const data = await obtenerBonoActivo()
      setBono(data)
      setError(null)
    } catch (err) {
      console.error('Error al obtener información del bono:', err)
      setError('No se pudo cargar la información de tu bono')
      setBono(null)
    } finally {
      setLoading(false)
    }
  }

  const formatFecha = (fechaStr) => {
    if (!fechaStr) return 'No disponible'
    try {
      const fecha = new Date(fechaStr)

      return format(fecha, 'dd MMM yyyy', { locale: es })
    } catch (error) {
      console.error('Error al formatear fecha:', error)
      return 'Fecha inválida'
    }
  }

  if (isAdmin) {
    return (
      <div className='bono-admin-message'>
        <p>
          Como administrador, no necesitas un bono para acceder a las clases.
        </p>
        <p>
          Puedes gestionar los bonos de los usuarios desde el panel de
          administración.
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className='bono-loading'>
        <div className='bono-spinner'></div>
        <p>Cargando información de tu bono...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='bono-error'>
        <p>{error}</p>
        <p>Contacta con administración para más información.</p>
      </div>
    )
  }

  if (!bono) {
    return (
      <div className='bono-no-data'>
        <p>No tienes un bono activo actualmente.</p>
        <p>Contacta con administración para adquirir un bono.</p>
      </div>
    )
  }

  return (
    <div className='bono-info-container'>
      <div className='bono-header'>
        <h3 className='bono-tipo'>{bono.tipo}</h3>
        <span className={`bono-estado bono-estado-${bono.estado}`}>
          {bono.estado === 'activo'
            ? 'Activo'
            : bono.estado === 'pausado'
            ? 'Pausado'
            : bono.estado === 'expirado'
            ? 'Expirado'
            : bono.estado}
        </span>
      </div>

      <div className='bono-details'>
        {bono.tipo !== 'Ilimitado' && (
          <div className='bono-sesiones'>
            <div className='bono-sesiones-info'>
              <span className='bono-label'>Sesiones:</span>
              <span className='bono-value'>
                {bono.sesionesRestantes} / {bono.sesionesTotal}
              </span>
            </div>
            <div className='bono-progress-bar'>
              <div
                className='bono-progress'
                style={{
                  width: `${
                    (bono.sesionesRestantes / bono.sesionesTotal) * 100
                  }%`
                }}
              ></div>
            </div>
          </div>
        )}

        <div className='bono-fechas'>
          <div className='bono-fecha'>
            <span className='bono-label'>Inicio:</span>
            <span className='bono-value'>{formatFecha(bono.fechaInicio)}</span>
          </div>
          <div className='bono-fecha'>
            <span className='bono-label'>Fin:</span>
            <span className='bono-value'>{formatFecha(bono.fechaFin)}</span>
          </div>
        </div>

        {bono.estado === 'pausado' && bono.motivoPausa && (
          <div className='bono-pausa'>
            <span className='bono-label'>Motivo de pausa:</span>
            <span className='bono-value'>{bono.motivoPausa}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default BonoInfo
