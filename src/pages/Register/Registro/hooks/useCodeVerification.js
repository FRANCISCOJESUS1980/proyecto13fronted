import { useEffect, useRef } from 'react'
import { verificarCodigoAutorizacion } from '../../../../services/Api/index'
import alertService from '../../../../components/sweealert2/sweealert2'

export const useCodeVerification = (
  codigoAutorizacion,
  isVerifyingCode,
  dispatch
) => {
  const verifiedCodesRef = useRef(new Set())
  const timeoutRef = useRef(null)
  const lastCodeRef = useRef('')

  useEffect(() => {
    if (lastCodeRef.current === codigoAutorizacion) {
      return
    }

    lastCodeRef.current = codigoAutorizacion

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (!codigoAutorizacion || codigoAutorizacion.trim() === '') {
      dispatch({ type: 'UPDATE_FORM', payload: { rol: 'usuario' } })
      return
    }

    if (verifiedCodesRef.current.has(codigoAutorizacion)) {
      return
    }

    if (isVerifyingCode) {
      return
    }

    timeoutRef.current = setTimeout(async () => {
      dispatch({ type: 'SET_VERIFYING_CODE', payload: true })

      try {
        const data = await verificarCodigoAutorizacion(codigoAutorizacion)

        if (data && data.success) {
          const nuevoRol = data.rol

          verifiedCodesRef.current.add(codigoAutorizacion)

          dispatch({ type: 'UPDATE_FORM', payload: { rol: nuevoRol } })

          const roleDisplayName =
            nuevoRol === 'admin'
              ? 'Administrador'
              : nuevoRol === 'monitor'
              ? 'Entrenador'
              : nuevoRol === 'entrenador'
              ? 'Entrenador'
              : 'Usuario'

          alertService.success(
            'Código válido',
            `Rol asignado: ${roleDisplayName}`
          )
        } else {
          dispatch({ type: 'UPDATE_FORM', payload: { rol: 'usuario' } })
          alertService.error(
            'Código no válido',
            'Se te asignará el rol de usuario'
          )
        }
      } catch (error) {
        console.error('Error al verificar código:', error)
        dispatch({ type: 'UPDATE_FORM', payload: { rol: 'usuario' } })
        alertService.error(
          'Error',
          'Error al verificar código. Se te asignará el rol de usuario'
        )
      } finally {
        dispatch({ type: 'SET_VERIFYING_CODE', payload: false })
      }
    }, 2000)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [codigoAutorizacion])

  useEffect(() => {
    if (!codigoAutorizacion || codigoAutorizacion.trim() === '') {
      verifiedCodesRef.current.clear()
    }
  }, [codigoAutorizacion])
}
