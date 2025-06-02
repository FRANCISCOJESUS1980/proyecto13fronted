import { useReducer, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import handleSubmitHelper from '../../../../utils/HandleSubmit'
import alertService from '../../../../components/sweealert2/sweealert2'
import { registerReducer, initialState } from '../reducers/registerReducer'
import { useCodeVerification } from './useCodeVerification'
import { useImageUpload } from './useImageUpload'
import { useFormValidation } from './useFormValidation'

export const useRegisterLogic = () => {
  const [state, dispatch] = useReducer(registerReducer, initialState)
  const navigate = useNavigate()
  const { validateForm } = useFormValidation()
  const { handleImageChange } = useImageUpload(dispatch)

  useCodeVerification(
    state.formData.codigoAutorizacion,
    state.isVerifyingCode,
    dispatch
  )

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

      await handleSubmitHelper(e, 'registro', {
        formData: state.formData,
        selectedImage: state.selectedImage,
        setIsLoading: (loading) =>
          dispatch({ type: 'SET_LOADING', payload: loading }),
        setRegistroExitoso: (success) =>
          dispatch({ type: 'SET_REGISTRO_EXITOSO', payload: success })
      })
    },
    [state.formData, state.selectedImage, validateForm]
  )

  const handleLoginClick = useCallback(() => {
    const hasData =
      state.formData.nombre ||
      state.formData.email ||
      state.formData.password ||
      state.selectedImage

    if (hasData) {
      alertService
        .confirm(
          '¿Abandonar registro?',
          'Perderás los datos que has introducido. ¿Quieres ir a la página de inicio de sesión?',
          {
            confirmButtonText: 'Sí, ir a iniciar sesión',
            cancelButtonText: 'No, continuar con el registro'
          }
        )
        .then((result) => {
          if (result.isConfirmed) {
            navigate('/iniciar-sesion')
          }
        })
    } else {
      navigate('/iniciar-sesion')
    }
  }, [state.formData, state.selectedImage, navigate])

  const handleConsentAccepted = useCallback(() => {
    navigate('/dashboard')
  }, [navigate])

  return {
    ...state,
    handleChange,
    handleImageChange,
    handleSubmit,
    handleLoginClick,
    handleConsentAccepted
  }
}
