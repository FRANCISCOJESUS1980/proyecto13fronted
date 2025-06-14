import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
  useEffect
} from 'react'
import { useNavigate } from 'react-router-dom'
import { obtenerPerfilUsuario } from '../../../../../services/Api/index'
import { obtenerMensajesNoLeidos } from '../../../../../services/Api/index'

const initialState = {
  userName: 'Usuario',
  userId: null,
  userRole: null,
  loading: true,
  animationComplete: false,
  unreadMessages: 0,
  isAdmin: false,
  showBonoSection: false
}

const ACTIONS = {
  SET_USER_DATA: 'SET_USER_DATA',
  SET_USER_NAME: 'SET_USER_NAME',
  SET_USER_ID: 'SET_USER_ID',
  SET_USER_ROLE: 'SET_USER_ROLE',
  SET_LOADING: 'SET_LOADING',
  SET_ANIMATION_COMPLETE: 'SET_ANIMATION_COMPLETE',
  SET_UNREAD_MESSAGES: 'SET_UNREAD_MESSAGES',
  UPDATE_DERIVED_STATE: 'UPDATE_DERIVED_STATE'
}

function dashboardReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_USER_DATA: {
      const newState = {
        ...state,
        userName: action.payload.name || state.userName,
        userId: action.payload.id || state.userId,
        userRole: action.payload.role || state.userRole
      }
      return updateDerivedState(newState)
    }

    case ACTIONS.SET_USER_NAME:
      return { ...state, userName: action.payload }

    case ACTIONS.SET_USER_ID:
      return { ...state, userId: action.payload }

    case ACTIONS.SET_USER_ROLE: {
      const newState = { ...state, userRole: action.payload }
      return updateDerivedState(newState)
    }

    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload }

    case ACTIONS.SET_ANIMATION_COMPLETE:
      return { ...state, animationComplete: action.payload }

    case ACTIONS.SET_UNREAD_MESSAGES:
      return { ...state, unreadMessages: action.payload }

    default:
      return state
  }
}

function updateDerivedState(state) {
  const adminRoles = ['admin', 'monitor', 'creador']
  const isAdmin = adminRoles.includes(state.userRole)

  return {
    ...state,
    isAdmin,
    showBonoSection: !isAdmin
  }
}

const DashboardContext = createContext()

export const useDashboardContext = () => {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error(
      'useDashboardContext debe ser usado dentro de DashboardProvider'
    )
  }
  return context
}

export const DashboardProvider = ({ children }) => {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(dashboardReducer, initialState)

  const actions = useMemo(
    () => ({
      setUserData: (userData) =>
        dispatch({ type: ACTIONS.SET_USER_DATA, payload: userData }),
      setUserName: (name) =>
        dispatch({ type: ACTIONS.SET_USER_NAME, payload: name }),
      setUserId: (id) => dispatch({ type: ACTIONS.SET_USER_ID, payload: id }),
      setUserRole: (role) =>
        dispatch({ type: ACTIONS.SET_USER_ROLE, payload: role }),
      setLoading: (loading) =>
        dispatch({ type: ACTIONS.SET_LOADING, payload: loading }),
      setAnimationComplete: (complete) =>
        dispatch({ type: ACTIONS.SET_ANIMATION_COMPLETE, payload: complete }),
      setUnreadMessages: (count) =>
        dispatch({ type: ACTIONS.SET_UNREAD_MESSAGES, payload: count })
    }),
    []
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      actions.setAnimationComplete(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [actions])

  const checkUnreadMessages = useCallback(async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await obtenerMensajesNoLeidos(token)

      if (response.success) {
        actions.setUnreadMessages(response.cantidad)
      } else {
        console.error('Error al obtener mensajes no leídos:', response.message)
        actions.setUnreadMessages(0)
      }
    } catch (error) {
      console.error('Error al verificar mensajes no leídos:', error)
      actions.setUnreadMessages(0)
    }
  }, [actions])

  const fetchUserData = useCallback(async () => {
    try {
      actions.setLoading(true)

      const token = localStorage.getItem('token')
      const storedUserId = localStorage.getItem('userId')
      const storedName = localStorage.getItem('nombre')
      const storedRole = localStorage.getItem('rol')

      if (!token) {
        navigate('/')
        return
      }

      if (storedUserId) actions.setUserId(storedUserId)
      if (storedName) actions.setUserName(storedName)
      if (storedRole) actions.setUserRole(storedRole)

      try {
        const response = await obtenerPerfilUsuario(token)

        if (response.success && response.data) {
          const userData = response.data

          actions.setUserData({
            name: userData.nombre,
            id: userData._id,
            role: storedRole
          })

          if (userData.nombre) localStorage.setItem('nombre', userData.nombre)
          if (userData._id) localStorage.setItem('userId', userData._id)
        }
      } catch (apiError) {
        console.error('Error al obtener datos del usuario desde API:', apiError)
      }

      await checkUnreadMessages()

      setTimeout(() => {
        actions.setLoading(false)
      }, 0)
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error)
      setTimeout(() => {
        actions.setLoading(false)
      }, 0)
    }
  }, [navigate, actions, checkUnreadMessages])

  useEffect(() => {
    fetchUserData()

    const intervalId = setInterval(checkUnreadMessages, 60000)

    return () => clearInterval(intervalId)
  }, [fetchUserData, checkUnreadMessages])

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('nombre')
    localStorage.removeItem('userId')
    localStorage.removeItem('rol')
    navigate('/')
  }, [navigate])

  const contextValue = useMemo(
    () => ({
      ...state,
      ...actions,
      handleLogout,
      checkUnreadMessages,
      fetchUserData
    }),
    [state, actions, handleLogout, checkUnreadMessages, fetchUserData]
  )

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  )
}
