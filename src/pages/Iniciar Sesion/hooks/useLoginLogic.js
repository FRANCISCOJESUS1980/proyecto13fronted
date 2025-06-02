import { useReducer, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import handleSubmitHelper from '../../../utils/HandleSubmit'
import alertService from '../../../components/sweealert2/sweealert2'
import { loginReducer, initialState } from '../reducers/loginReducer'
import { useSessionCheck } from './useSessionCheck'
import { useFormValidation } from './useFormValidation'

export const useLoginLogic = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState)
  const navigate = useNavigate()
  const { validateForm } = useFormValidation()

  useSessionCheck(navigate)

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: 'SET_ANIMATION_COMPLETE', payload: true })
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    dispatch({ type: 'UPDATE_FORM', payload: { [name]: value } })
  }, [])

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()

      if (!validateForm(state.formData)) {
        return
      }

      try {
        await handleSubmitHelper(e, 'login', {
          formData: state.formData,
          setIsLoading: (loading) =>
            dispatch({ type: 'SET_LOADING', payload: loading }),
          navigate,
          onError: () => {
            dispatch({ type: 'INCREMENT_FAILED_ATTEMPTS' })

            if (state.intentosFallidos + 1 >= 3) {
              alertService.warning(
                'Demasiados intentos fallidos',
                '¿Has olvidado tu contraseña? Contacta con el administrador para restablecerla.'
              )
            }
          }
        })
      } catch (error) {
        console.error('Error en inicio de sesión:', error)
        alertService.error(
          'Error de conexión',
          'No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.'
        )
      }
    },
    [state.formData, state.intentosFallidos, navigate, validateForm]
  )

  const handleRegisterClick = useCallback(() => {
    if (state.formData.email || state.formData.password) {
      alertService
        .confirm(
          '¿Ir a registro?',
          'Perderás los datos introducidos. ¿Quieres ir a la página de registro?',
          {
            confirmButtonText: 'Sí, ir a registro',
            cancelButtonText: 'No, continuar aquí'
          }
        )
        .then((result) => {
          if (result.isConfirmed) {
            navigate('/registro')
          }
        })
    } else {
      navigate('/registro')
    }
  }, [state.formData.email, state.formData.password, navigate])

  const mostrarAyuda = useCallback(() => {
    alertService.info(
      'Ayuda de inicio de sesión',
      `
      <div style="text-align: left;">
        <p><strong>¿No puedes iniciar sesión?</strong></p>
        <ul>
          <li>Verifica que tu email esté escrito correctamente</li>
          <li>Asegúrate de que tu contraseña sea la correcta</li>
          <li>Si olvidaste tu contraseña, contacta con el administrador</li>
          <li>Si no tienes una cuenta, regístrate primero</li>
        </ul>
      </div>
      `
    )
  }, [])

  return {
    ...state,
    handleChange,
    handleSubmit,
    handleRegisterClick,
    mostrarAyuda
  }
}
