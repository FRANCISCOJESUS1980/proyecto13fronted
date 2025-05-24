import { useReducer, useCallback } from 'react'

const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ANIMATION_COMPLETE: 'SET_ANIMATION_COMPLETE',
  SET_ACTIVE_TAB: 'SET_ACTIVE_TAB'
}

const initialState = {
  loading: true,
  animationComplete: false,
  activeTab: 'instagram'
}

const socialMediaReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload }
    case ACTIONS.SET_ANIMATION_COMPLETE:
      return { ...state, animationComplete: action.payload }
    case ACTIONS.SET_ACTIVE_TAB:
      return { ...state, activeTab: action.payload }
    default:
      return state
  }
}

export const useSocialMediaState = () => {
  const [state, dispatch] = useReducer(socialMediaReducer, initialState)

  const setLoading = useCallback((value) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: value })
  }, [])

  const setAnimationComplete = useCallback((value) => {
    dispatch({ type: ACTIONS.SET_ANIMATION_COMPLETE, payload: value })
  }, [])

  const setActiveTab = useCallback((tab) => {
    dispatch({ type: ACTIONS.SET_ACTIVE_TAB, payload: tab })
  }, [])

  return {
    state,
    actions: {
      setLoading,
      setAnimationComplete,
      setActiveTab
    }
  }
}
