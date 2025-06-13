import { createContext, useContext, useMemo, useReducer } from 'react'

const initialState = {
  activeSection: null,
  notifications: []
}

const ACTIONS = {
  SET_ACTIVE_SECTION: 'SET_ACTIVE_SECTION',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  CLEAR_NOTIFICATION: 'CLEAR_NOTIFICATION'
}

function adminReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_ACTIVE_SECTION:
      return { ...state, activeSection: action.payload }
    case ACTIONS.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      }
    case ACTIONS.CLEAR_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (n) => n.id !== action.payload
        )
      }
    default:
      return state
  }
}

const AdminContext = createContext()

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin debe ser usado dentro de un AdminProvider')
  }
  return context
}

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState)

  const actions = useMemo(
    () => ({
      setActiveSection: (section) =>
        dispatch({ type: ACTIONS.SET_ACTIVE_SECTION, payload: section }),
      addNotification: (notification) =>
        dispatch({
          type: ACTIONS.ADD_NOTIFICATION,
          payload: { ...notification, id: Date.now() }
        }),
      clearNotification: (id) =>
        dispatch({ type: ACTIONS.CLEAR_NOTIFICATION, payload: id })
    }),
    []
  )

  const value = useMemo(
    () => ({
      ...state,
      ...actions
    }),
    [state, actions]
  )

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}
