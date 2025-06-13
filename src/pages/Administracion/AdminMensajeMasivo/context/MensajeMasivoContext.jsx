import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback
} from 'react'
import { enviarMensajeMasivo } from '../../../../services/Api/index'
import alertService from '../../../../components/sweealert2/sweealert2'

const initialState = {
  mensaje: '',
  asunto: '',
  enviarEmail: true,

  enviando: false,
  error: '',
  animationComplete: false,

  hasUnsavedChanges: false,
  isFormValid: false
}

const ACTIONS = {
  SET_MENSAJE: 'SET_MENSAJE',
  SET_ASUNTO: 'SET_ASUNTO',
  SET_ENVIAR_EMAIL: 'SET_ENVIAR_EMAIL',
  SET_ENVIANDO: 'SET_ENVIANDO',
  SET_ERROR: 'SET_ERROR',
  SET_ANIMATION_COMPLETE: 'SET_ANIMATION_COMPLETE',
  RESET_FORM: 'RESET_FORM',
  UPDATE_DERIVED_STATE: 'UPDATE_DERIVED_STATE'
}

function mensajeMasivoReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_MENSAJE: {
      const newState = { ...state, mensaje: action.payload }
      return updateDerivedState(newState)
    }

    case ACTIONS.SET_ASUNTO: {
      const newState = { ...state, asunto: action.payload }
      return updateDerivedState(newState)
    }

    case ACTIONS.SET_ENVIAR_EMAIL:
      return { ...state, enviarEmail: action.payload }

    case ACTIONS.SET_ENVIANDO:
      return { ...state, enviando: action.payload }

    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload }

    case ACTIONS.SET_ANIMATION_COMPLETE:
      return { ...state, animationComplete: action.payload }

    case ACTIONS.RESET_FORM: {
      const resetState = {
        ...state,
        mensaje: '',
        asunto: '',
        enviarEmail: true,
        error: ''
      }
      return updateDerivedState(resetState)
    }

    default:
      return state
  }
}

function updateDerivedState(state) {
  return {
    ...state,
    hasUnsavedChanges: state.mensaje.trim() || state.asunto.trim(),
    isFormValid: state.mensaje.trim() && state.asunto.trim()
  }
}

const MensajeMasivoContext = createContext()

export const useMensajeMasivoContext = () => {
  const context = useContext(MensajeMasivoContext)
  if (!context) {
    throw new Error(
      'useMensajeMasivoContext debe ser usado dentro de MensajeMasivoProvider'
    )
  }
  return context
}

export const MensajeMasivoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mensajeMasivoReducer, initialState)

  const actions = useMemo(
    () => ({
      setMensaje: (mensaje) =>
        dispatch({ type: ACTIONS.SET_MENSAJE, payload: mensaje }),
      setAsunto: (asunto) =>
        dispatch({ type: ACTIONS.SET_ASUNTO, payload: asunto }),
      setEnviarEmail: (enviarEmail) =>
        dispatch({ type: ACTIONS.SET_ENVIAR_EMAIL, payload: enviarEmail }),
      setEnviando: (enviando) =>
        dispatch({ type: ACTIONS.SET_ENVIANDO, payload: enviando }),
      setError: (error) =>
        dispatch({ type: ACTIONS.SET_ERROR, payload: error }),
      setAnimationComplete: (complete) =>
        dispatch({ type: ACTIONS.SET_ANIMATION_COMPLETE, payload: complete }),
      resetForm: () => dispatch({ type: ACTIONS.RESET_FORM })
    }),
    []
  )

  const enviarMensaje = useCallback(async () => {
    if (!state.isFormValid) {
      alertService.error('Error', 'El asunto y el mensaje son obligatorios')
      return false
    }

    try {
      actions.setEnviando(true)
      actions.setError('')

      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Token no encontrado')
      }

      const resultado = await enviarMensajeMasivo(token, {
        asunto: state.asunto,
        mensaje: state.mensaje,
        enviarEmail: state.enviarEmail
      })

      if (resultado && resultado.success) {
        actions.resetForm()
        alertService.success(
          '¡Mensaje enviado!',
          'El mensaje ha sido enviado a todos los usuarios'
        )
        return true
      } else {
        const errorMessage =
          resultado.message || 'No se pudo enviar el mensaje masivo'
        actions.setError(errorMessage)
        alertService.error('Error', errorMessage)
        return false
      }
    } catch (error) {
      console.error('Error al enviar mensaje masivo:', error)
      const errorMessage = error.message || 'Error al enviar el mensaje masivo'
      actions.setError(errorMessage)
      alertService.error('Error', errorMessage)
      return false
    } finally {
      actions.setEnviando(false)
    }
  }, [
    state.isFormValid,
    state.asunto,
    state.mensaje,
    state.enviarEmail,
    actions
  ])

  const contextValue = useMemo(
    () => ({
      ...state,
      ...actions,
      enviarMensaje
    }),
    [state, actions, enviarMensaje]
  )

  return (
    <MensajeMasivoContext.Provider value={contextValue}>
      {children}
    </MensajeMasivoContext.Provider>
  )
}
