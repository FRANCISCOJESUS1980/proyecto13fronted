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
  selectedPlan: 'mensual',
  loading: true,
  fadeIn: false
}

const ACTIONS = {
  SET_SELECTED_PLAN: 'SET_SELECTED_PLAN',
  SET_LOADING: 'SET_LOADING',
  SET_FADE_IN: 'SET_FADE_IN'
}

function tarifasReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_SELECTED_PLAN:
      return { ...state, selectedPlan: action.payload }

    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload }

    case ACTIONS.SET_FADE_IN:
      return { ...state, fadeIn: action.payload }

    default:
      return state
  }
}

const TarifasContext = createContext()

export const useTarifasContext = () => {
  const context = useContext(TarifasContext)
  if (!context) {
    throw new Error(
      'useTarifasContext debe ser usado dentro de TarifasProvider'
    )
  }
  return context
}

export const TarifasProvider = ({ children }) => {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(tarifasReducer, initialState)

  const actions = useMemo(
    () => ({
      setSelectedPlan: (plan) =>
        dispatch({ type: ACTIONS.SET_SELECTED_PLAN, payload: plan }),
      setLoading: (loading) =>
        dispatch({ type: ACTIONS.SET_LOADING, payload: loading }),
      setFadeIn: (fadeIn) =>
        dispatch({ type: ACTIONS.SET_FADE_IN, payload: fadeIn })
    }),
    []
  )

  const loadTarifasData = useCallback(async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 0))

      actions.setLoading(false)
      setTimeout(() => actions.setFadeIn(true), 100)
    } catch (error) {
      console.error('Error al cargar datos de tarifas:', error)
      actions.setLoading(false)
      setTimeout(() => actions.setFadeIn(true), 100)
    }
  }, [actions])

  useEffect(() => {
    loadTarifasData()
  }, [loadTarifasData])

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
    <TarifasContext.Provider value={contextValue}>
      {children}
    </TarifasContext.Provider>
  )
}
