import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
  useEffect
} from 'react'
import { useNavigate } from 'react-router-dom'

const initialState = {
  isLoading: true,
  videosReady: false
}

const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_VIDEOS_READY: 'SET_VIDEOS_READY'
}

function videosReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload }

    case ACTIONS.SET_VIDEOS_READY:
      return { ...state, videosReady: action.payload }

    default:
      return state
  }
}

const VideosContext = createContext()

export const useVideosContext = () => {
  const context = useContext(VideosContext)
  if (!context) {
    throw new Error('useVideosContext debe ser usado dentro de VideosProvider')
  }
  return context
}

export const VideosProvider = ({ children }) => {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(videosReducer, initialState)

  const actions = useMemo(
    () => ({
      setLoading: (loading) =>
        dispatch({ type: ACTIONS.SET_LOADING, payload: loading }),
      setVideosReady: (ready) =>
        dispatch({ type: ACTIONS.SET_VIDEOS_READY, payload: ready })
    }),
    []
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      actions.setVideosReady(true)
      actions.setLoading(false)
    }, 0)

    return () => clearTimeout(timer)
  }, [actions])

  const handleBackNavigation = useCallback(() => {
    navigate('/dashboard')
  }, [navigate])

  const contextValue = useMemo(
    () => ({
      ...state,
      ...actions,
      handleBackNavigation
    }),
    [state, actions, handleBackNavigation]
  )

  return (
    <VideosContext.Provider value={contextValue}>
      {children}
    </VideosContext.Provider>
  )
}
