import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
  useEffect
} from 'react'
import { obtenerTodosUsuarios } from '../../../../services/Api/index'

const USERS_PER_PAGE = 10

const initialState = {
  usuarios: [],
  filteredUsuarios: [],
  paginatedUsers: [],
  searchTerm: '',
  loading: true,
  error: '',
  fadeIn: false,
  currentPage: 1,
  totalPages: 1
}

const ACTIONS = {
  SET_USUARIOS: 'SET_USUARIOS',
  SET_FILTERED_USUARIOS: 'SET_FILTERED_USUARIOS',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_FADE_IN: 'SET_FADE_IN',
  FILTER_USUARIOS: 'FILTER_USUARIOS',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  UPDATE_PAGINATION: 'UPDATE_PAGINATION'
}

function usuariosReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_USUARIOS: {
      const usuarios = action.payload
      const totalPages = Math.ceil(usuarios.length / USERS_PER_PAGE)
      const paginatedUsers = usuarios.slice(0, USERS_PER_PAGE)

      return {
        ...state,
        usuarios,
        filteredUsuarios: usuarios,
        paginatedUsers,
        totalPages,
        currentPage: 1
      }
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

      const totalPages = Math.ceil(filteredUsuarios.length / USERS_PER_PAGE)
      const paginatedUsers = filteredUsuarios.slice(0, USERS_PER_PAGE)

      return {
        ...state,
        searchTerm,
        filteredUsuarios,
        paginatedUsers,
        totalPages,
        currentPage: 1
      }
    }

    case ACTIONS.SET_CURRENT_PAGE: {
      const newPage = action.payload
      const startIndex = (newPage - 1) * USERS_PER_PAGE
      const endIndex = startIndex + USERS_PER_PAGE
      const paginatedUsers = state.filteredUsuarios.slice(startIndex, endIndex)

      return {
        ...state,
        currentPage: newPage,
        paginatedUsers
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
        dispatch({ type: ACTIONS.SET_FADE_IN, payload: fadeIn }),
      setCurrentPage: (page) =>
        dispatch({ type: ACTIONS.SET_CURRENT_PAGE, payload: page })
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
