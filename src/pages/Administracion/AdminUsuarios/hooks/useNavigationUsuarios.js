import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'

export const useNavigationUsuarios = () => {
  const navigate = useNavigate()

  const goBack = useCallback(() => {
    navigate('/administracion')
  }, [navigate])

  const goToMensajeMasivo = useCallback(() => {
    navigate('/administracion/mensaje-masivo')
  }, [navigate])

  const goToGestionarUsuario = useCallback(
    (userId) => {
      navigate(`/admin/usuario/${userId}/clases`)
    },
    [navigate]
  )

  const goToMensajePrivado = useCallback(
    (userId) => {
      navigate(`/admin/usuario/${userId}/mensajes`)
    },
    [navigate]
  )

  const goToGestionarBonos = useCallback(
    (userId) => {
      navigate(`/admin/usuario/${userId}/bonos`)
    },
    [navigate]
  )

  return {
    navigate,
    goBack,
    goToMensajeMasivo,
    goToGestionarUsuario,
    goToMensajePrivado,
    goToGestionarBonos
  }
}
