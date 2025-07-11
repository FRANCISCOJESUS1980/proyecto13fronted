import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Consentimiento from '../../pages/Register/sections/Consentimiento/page/Consentimiento'
import { verificarConsentimiento } from '../../services/Api/index'

const PendingTasksChecker = ({ children }) => {
  const [needsConsent, setNeedsConsent] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showConsent, setShowConsent] = useState(false)
  const location = useLocation()

  const excludedRoutes = [
    '/iniciar-sesion',
    '/registro',
    '/recuperar-password',
    '/administracion',
    '/administracion/consentimientos',
    '/administracion/usuarios',
    '/administracion/clases',
    '/administracion/productos',
    '/admin'
  ]

  const dashboardRoutes = [
    '/dashboard',
    '/dashboard/medico',
    '/dashboard/aspecto',
    '/dashboard/marcas',
    '/dashboard/chat',
    '/dashboard/mensajes',
    '/dashboard/clases',
    '/contacto',
    '/tarifas',
    '/redessociales'
  ]

  const isExcludedRoute = () => {
    return excludedRoutes.some(
      (route) =>
        location.pathname === route || location.pathname.startsWith(route + '/')
    )
  }

  const isDashboardRoute = () => {
    return dashboardRoutes.some(
      (route) =>
        location.pathname === route || location.pathname.startsWith(route + '/')
    )
  }

  const checkConsentStatus = async () => {
    setIsLoading(true)

    try {
      if (isExcludedRoute()) {
        setIsLoading(false)
        return
      }

      const localStorageConsent = localStorage.getItem('consentimientoFirmado')
      if (localStorageConsent === 'true' && !isDashboardRoute()) {
        setNeedsConsent(false)
        setIsLoading(false)
        return
      }

      let userId = null
      const userString = localStorage.getItem('user')

      if (userString) {
        try {
          const user = JSON.parse(userString)
          if (user && user._id) userId = user._id
        } catch (error) {
          console.error('Error al parsear user del localStorage:', error)
        }
      }

      if (!userId) {
        const storedUserId = localStorage.getItem('userId')
        if (storedUserId) userId = storedUserId
      }

      const token = localStorage.getItem('token')
      if (!userId || !token) {
        setIsLoading(false)
        return
      }

      const response = await verificarConsentimiento(userId, token)

      if (response?.success) {
        const firmado = response.consentimientoFirmado
        setNeedsConsent(!firmado)
        localStorage.setItem(
          'consentimientoFirmado',
          firmado ? 'true' : 'false'
        )
      } else {
        setNeedsConsent(false)
      }
    } catch (error) {
      console.error('Error al verificar el consentimiento:', error)

      if (error.response?.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('userId')
        localStorage.removeItem('consentimientoFirmado')
        window.location.href = '/iniciar-sesion'
        return
      }

      const backupConsent = localStorage.getItem('consentimientoFirmado')
      if (backupConsent === 'true') {
        setNeedsConsent(false)
      } else {
        setNeedsConsent(false)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkConsentStatus()
  }, [location.pathname])

  useEffect(() => {
    if (!isExcludedRoute() && needsConsent && !isLoading) {
      setShowConsent(true)
    } else {
      setShowConsent(false)
    }
  }, [needsConsent, isLoading, location.pathname])

  const handleConsentAccepted = () => {
    setNeedsConsent(false)
    setShowConsent(false)
    localStorage.setItem('consentimientoFirmado', 'true')
  }

  if (isLoading) {
    return children
  }

  return (
    <>
      {showConsent ? (
        <div className='consent-modal-overlay'>
          <div className='consent-modal'>
            <Consentimiento onConsentAccepted={handleConsentAccepted} />
          </div>
        </div>
      ) : (
        children
      )}
    </>
  )
}

export default PendingTasksChecker
