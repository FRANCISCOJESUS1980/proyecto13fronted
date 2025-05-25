import { useReducer, useEffect, useCallback } from 'react'
import {
  obtenerTodosConsentimientos,
  eliminarConsentimiento,
  obtenerTodosUsuarios
} from '../../../../services/Api/index'
import alertService from '../../../../components/sweealert2/sweealert2'

const initialState = {
  consentimientos: [],
  usuarios: [],
  loading: true,
  error: null,
  deleteLoading: null,
  fadeIn: false
}

const consentimientosReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_DATA':
      return {
        ...state,
        consentimientos: action.payload.consentimientos,
        usuarios: action.payload.usuarios,
        loading: false,
        error: null
      }
    case 'SET_FADE_IN':
      return { ...state, fadeIn: action.payload }
    case 'SET_DELETE_LOADING':
      return { ...state, deleteLoading: action.payload }
    case 'REMOVE_CONSENTIMIENTO':
      return {
        ...state,
        consentimientos: state.consentimientos.filter(
          (c) => c._id !== action.payload
        ),
        deleteLoading: null
      }
    default:
      return state
  }
}

export const useConsentimientos = (token) => {
  const [state, dispatch] = useReducer(consentimientosReducer, initialState)

  const fetchData = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })

      const [consentimientosData, usuariosData] = await Promise.all([
        obtenerTodosConsentimientos(token),
        obtenerTodosUsuarios(token)
      ])

      const consentimientosArray =
        consentimientosData.data || consentimientosData
      const usuariosArray = usuariosData.data || usuariosData

      dispatch({
        type: 'SET_DATA',
        payload: {
          consentimientos: consentimientosArray || [],
          usuarios: usuariosArray || []
        }
      })

      setTimeout(() => dispatch({ type: 'SET_FADE_IN', payload: true }), 100)
    } catch (error) {
      console.error('Error al obtener datos:', error)
      dispatch({
        type: 'SET_ERROR',
        payload: error.message || 'Error en la conexión con el servidor.'
      })
    }
  }, [token])

  const deleteConsentimiento = useCallback(
    async (consentimiento) => {
      if (!consentimiento?._id) return

      dispatch({ type: 'SET_DELETE_LOADING', payload: consentimiento._id })

      try {
        await eliminarConsentimiento(consentimiento._id, token)
        dispatch({ type: 'REMOVE_CONSENTIMIENTO', payload: consentimiento._id })
        alertService.success(
          '¡Éxito!',
          'Consentimiento eliminado correctamente'
        )
      } catch (error) {
        console.error('Error al eliminar consentimiento:', error)
        const errorMessage = error.message || 'Error desconocido'
        alertService.error(
          'Error',
          `Error al eliminar el consentimiento: ${errorMessage}`
        )
        dispatch({
          type: 'SET_ERROR',
          payload: `Error al eliminar el consentimiento: ${errorMessage}`
        })
        dispatch({ type: 'SET_DELETE_LOADING', payload: null })
      }
    },
    [token]
  )

  useEffect(() => {
    if (token) {
      fetchData()
    }
  }, [fetchData, token])

  return {
    ...state,
    deleteConsentimiento,
    refetch: fetchData
  }
}
