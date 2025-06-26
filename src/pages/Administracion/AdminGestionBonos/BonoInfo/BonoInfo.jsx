import { useState, useEffect, useCallback } from 'react'
import {
  obtenerBonoActivo,
  obtenerMisSesiones
} from '../../../../services/Api/index'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import './BonoInfo.css'

const BonoInfo = ({ userId }) => {
  const [bono, setBono] = useState(null)
  const [sesionesLibres, setSesionesLibres] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  const fetchBonoInfo = useCallback(async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')

      if (!token) {
        setError('No hay sesión activa')
        setLoading(false)
        return
      }

      console.log('=== BONO INFO: Cargando información ===')

      try {
        const data = await obtenerBonoActivo()
        setBono(data)
        console.log('=== BONO INFO: Bono cargado ===', data)
      } catch (err) {
        console.error('=== BONO INFO: Error al obtener bono ===', err)
        setBono(null)
      }

      try {
        const sesionesData = await obtenerMisSesiones(token)
        setSesionesLibres(sesionesData.data.sesionesLibres || 0)
        console.log(
          '=== BONO INFO: Sesiones libres cargadas ===',
          sesionesData.data.sesionesLibres
        )
      } catch (err) {
        console.error('=== BONO INFO: Error al cargar sesiones libres ===', err)
        setSesionesLibres(0)
      }

      setError(null)
    } catch (err) {
      console.error('=== BONO INFO: Error general ===', err)
      setError('No se pudo cargar la información de tu bono')
      setBono(null)
    } finally {
      setLoading(false)
    }
  }, [])

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
  }, [fetchBonoInfo])

  useEffect(() => {
    window.updateBonoInfo = () => {
      console.log('=== BONO INFO: Actualización solicitada externamente ===')
      fetchBonoInfo()
    }
    return () => {
      delete window.updateBonoInfo
    }
  }, [fetchBonoInfo])

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
        {sesionesLibres > 0 && (
          <div className='bono-sesiones-libres'>
            <span className='bono-label'>Sesiones libres:</span>
            <span className='bono-value'>{sesionesLibres}</span>
          </div>
        )}
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
            : bono.estado === 'agotado'
            ? 'Agotado'
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

        <div className='bono-sesiones-libres'>
          <span className='bono-label'>Sesiones libres:</span>
          <span className='bono-value'>{sesionesLibres}</span>
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
