import { useReducer, useEffect, useCallback } from 'react'
import { uiReducer, initialUIState } from '../reducers/uiReducer.js'
import { UI_ACTION_TYPES } from '../constants/personalRecordsConstants.js'

export const useUI = () => {
  const [state, dispatch] = useReducer(uiReducer, initialUIState)

  const setActiveTab = useCallback((tab) => {
    dispatch({
      type: UI_ACTION_TYPES.SET_ACTIVE_TAB,
      payload: tab
    })
  }, [])

  const toggleForm = useCallback((show) => {
    dispatch({
      type: UI_ACTION_TYPES.TOGGLE_FORM,
      payload: show
    })
  }, [])

  const setViewDetails = useCallback((record) => {
    dispatch({
      type: UI_ACTION_TYPES.SET_VIEW_DETAILS,
      payload: record
    })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({
        type: UI_ACTION_TYPES.SET_ANIMATION_COMPLETE,
        payload: true
      })
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return {
    ...state,
    setActiveTab,
    toggleForm,
    setViewDetails
  }
}
