import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
  useEffect
} from 'react'
import { obtenerTodosUsuarios } from '../../../../services/Api/index'

const initialState = {
  usuarios: [],
  filteredUsuarios: [],
  searchTerm: '',
  loading: true,
  error: '',
  fadeIn: false
}

const ACTIONS = {
  SET_USUARIOS: 'SET_USUARIOS',
  SET_FILTERED_USUARIOS: 'SET_FILTERED_USUARIOS',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_FADE_IN: 'SET_FADE_IN',
  FILTER_USUARIOS: 'FILTER_USUARIOS'
}

function usuariosReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_USUARIOS:
      return {
        ...state,
        usuarios: action.payload,
        filteredUsuarios: action.payload
      }

    case ACTIONS.SET_FILTERED_USUARIOS:
      return { ...state, filteredUsuarios: action.payload }

    case ACTIONS.SET_SEARCH_TERM: {
      const searchTerm = action.payload
      let filteredUsuarios = state.usuarios

      if (searchTerm.trim() !== '') {
        filteredUsuarios = state.usuarios.filter(
          (usuario) =>
            usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }

      return {
        ...state,
        searchTerm,
        filteredUsuarios
      }
    }

    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload }

    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload }

    case ACTIONS.SET_FADE_IN:
      return { ...state, fadeIn: action.payload }

    default:
      return state
  }
}

const UsuariosContext = createContext()

export const useUsuariosContext = () => {
  const context = useContext(UsuariosContext)
  if (!context) {
    throw new Error(
      'useUsuariosContext debe ser usado dentro de UsuariosProvider'
    )
  }
  return context
}

export const UsuariosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usuariosReducer, initialState)

  const actions = useMemo(
    () => ({
      setUsuarios: (usuarios) =>
        dispatch({ type: ACTIONS.SET_USUARIOS, payload: usuarios }),
      setFilteredUsuarios: (usuarios) =>
        dispatch({ type: ACTIONS.SET_FILTERED_USUARIOS, payload: usuarios }),
      setSearchTerm: (term) =>
        dispatch({ type: ACTIONS.SET_SEARCH_TERM, payload: term }),
      setLoading: (loading) =>
        dispatch({ type: ACTIONS.SET_LOADING, payload: loading }),
      setError: (error) =>
        dispatch({ type: ACTIONS.SET_ERROR, payload: error }),
      setFadeIn: (fadeIn) =>
        dispatch({ type: ACTIONS.SET_FADE_IN, payload: fadeIn })
    }),
    []
  )

  const fetchUsuarios = useCallback(async () => {
    try {
      actions.setLoading(true)
      actions.setError('')

      const token = localStorage.getItem('token')
      if (!token) throw new Error('No hay token de autenticación')

      const data = await obtenerTodosUsuarios(token)
      actions.setUsuarios(data)
    } catch (error) {
      console.error('Error al obtener usuarios:', error)
      actions.setError(error.message)
    } finally {
      actions.setLoading(false)
      setTimeout(() => actions.setFadeIn(true), 100)
    }
  }, [actions])

  useEffect(() => {
    fetchUsuarios()
  }, [fetchUsuarios])

  const contextValue = useMemo(
    () => ({
      ...state,
      ...actions,
      fetchUsuarios
    }),
    [state, actions, fetchUsuarios]
  )

  return (
    <UsuariosContext.Provider value={contextValue}>
      {children}
    </UsuariosContext.Provider>
  )
}
