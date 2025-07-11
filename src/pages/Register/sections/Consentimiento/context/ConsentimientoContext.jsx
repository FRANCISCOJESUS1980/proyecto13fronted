import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
  useEffect
} from 'react'
import { guardarConsentimiento } from '../../../../../services/Api/index'

const initialState = {
  aceptado: false,
  autorizaImagen: null,
  nombreCompleto: '',
  dni: '',
  firmaDigital: '',
  userId: null,
  loading: false,
  error: null
}

const ACTIONS = {
  SET_ACEPTADO: 'SET_ACEPTADO',
  SET_AUTORIZA_IMAGEN: 'SET_AUTORIZA_IMAGEN',
  SET_NOMBRE_COMPLETO: 'SET_NOMBRE_COMPLETO',
  SET_DNI: 'SET_DNI',
  SET_FIRMA_DIGITAL: 'SET_FIRMA_DIGITAL',
  SET_USER_ID: 'SET_USER_ID',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  RESET_ERROR: 'RESET_ERROR'
}

function consentimientoReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_ACEPTADO:
      return { ...state, aceptado: action.payload }
    case ACTIONS.SET_AUTORIZA_IMAGEN:
      return { ...state, autorizaImagen: action.payload, error: null }
    case ACTIONS.SET_NOMBRE_COMPLETO:
      return { ...state, nombreCompleto: action.payload, error: null }
    case ACTIONS.SET_DNI:
      return { ...state, dni: action.payload, error: null }
    case ACTIONS.SET_FIRMA_DIGITAL:
      return { ...state, firmaDigital: action.payload, error: null }
    case ACTIONS.SET_USER_ID:
      return { ...state, userId: action.payload }
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload }
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload }
    case ACTIONS.RESET_ERROR:
      return { ...state, error: null }
    default:
      return state
  }
}

const ConsentimientoContext = createContext()

export const useConsentimientoContext = () => {
  const context = useContext(ConsentimientoContext)
  if (!context) {
    throw new Error(
      'useConsentimientoContext debe ser usado dentro de ConsentimientoProvider'
    )
  }
  return context
}

export const ConsentimientoProvider = ({ children, onConsentAccepted }) => {
  const [state, dispatch] = useReducer(consentimientoReducer, initialState)

  const actions = useMemo(
    () => ({
      setAceptado: (aceptado) =>
        dispatch({ type: ACTIONS.SET_ACEPTADO, payload: aceptado }),
      setAutorizaImagen: (autoriza) =>
        dispatch({ type: ACTIONS.SET_AUTORIZA_IMAGEN, payload: autoriza }),
      setNombreCompleto: (nombre) =>
        dispatch({ type: ACTIONS.SET_NOMBRE_COMPLETO, payload: nombre }),
      setDni: (dni) => dispatch({ type: ACTIONS.SET_DNI, payload: dni }),
      setFirmaDigital: (firma) =>
        dispatch({ type: ACTIONS.SET_FIRMA_DIGITAL, payload: firma }),
      setUserId: (userId) =>
        dispatch({ type: ACTIONS.SET_USER_ID, payload: userId }),
      setLoading: (loading) =>
        dispatch({ type: ACTIONS.SET_LOADING, payload: loading }),
      setError: (error) =>
        dispatch({ type: ACTIONS.SET_ERROR, payload: error }),
      resetError: () => dispatch({ type: ACTIONS.RESET_ERROR })
    }),
    []
  )

  useEffect(() => {
    try {
      const userString = localStorage.getItem('user')
      if (userString) {
        const user = JSON.parse(userString)
        if (user && user._id) {
          actions.setUserId(user._id)
          return
        }
      }
      const storedUserId = localStorage.getItem('userId')
      if (storedUserId) {
        actions.setUserId(storedUserId)
        return
      }
      console.error('No se encontró userId en localStorage')
      actions.setError(
        'No se pudo identificar al usuario. Por favor, inicie sesión nuevamente.'
      )
    } catch (err) {
      console.error('Error al obtener userId del localStorage:', err)
      actions.setError(
        'Error al identificar al usuario. Por favor, inicie sesión nuevamente.'
      )
    }
  }, [actions])

  const handleAccept = useCallback(async () => {
    if (!state.nombreCompleto || !state.nombreCompleto.trim()) {
      actions.setError('El nombre completo es requerido')
      return
    }

    if (!state.dni || !state.dni.trim()) {
      actions.setError('El DNI es requerido')
      return
    }

    const dniRegex = /^[0-9]{8}[A-Z]$/
    if (!dniRegex.test(state.dni)) {
      actions.setError(
        'El formato del DNI no es válido (debe ser 8 números seguidos de una letra)'
      )
      return
    }

    if (!state.firmaDigital) {
      actions.setError('La firma digital es requerida')
      return
    }

    if (state.autorizaImagen === null) {
      actions.setError(
        'Por favor, seleccione si autoriza o no el uso de su imagen'
      )
      return
    }

    if (!state.userId) {
      actions.setError(
        'Error: No se pudo identificar al usuario. Por favor, inicie sesión nuevamente.'
      )
      console.error('Error: userId no disponible')
      return
    }

    actions.resetError()
    actions.setLoading(true)

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error(
          'No hay token disponible. Por favor, inicie sesión nuevamente.'
        )
      }

      const response = await guardarConsentimiento(
        {
          userId: state.userId,
          nombreCompleto: state.nombreCompleto.trim(),
          dni: state.dni.toUpperCase().trim(),
          firmaDigital: state.firmaDigital,
          aceptado: true,
          autorizaImagen: state.autorizaImagen,
          fechaAceptacion: new Date()
        },
        token
      )

      if (response && response.success) {
        actions.setAceptado(true)
        localStorage.setItem('consentimientoFirmado', 'true')
        onConsentAccepted()
      } else {
        throw new Error(
          response?.message || 'Error al guardar el consentimiento'
        )
      }
    } catch (err) {
      console.error('Error al guardar el consentimiento:', err)
      actions.setError(
        'Hubo un error al guardar su consentimiento. Por favor, inténtelo de nuevo.'
      )
    } finally {
      actions.setLoading(false)
    }
  }, [
    state.autorizaImagen,
    state.userId,
    state.nombreCompleto,
    state.dni,
    state.firmaDigital,
    actions,
    onConsentAccepted
  ])

  const contextValue = useMemo(
    () => ({
      ...state,
      ...actions,
      handleAccept
    }),
    [state, actions, handleAccept]
  )

  return (
    <ConsentimientoContext.Provider value={contextValue}>
      {children}
    </ConsentimientoContext.Provider>
  )
}
