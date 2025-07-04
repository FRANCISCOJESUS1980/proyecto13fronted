import { useReducer, useEffect } from 'react'
import { fetchTrendsApi } from '../../../../../../../../../services/Api/index.js'
import { trendsReducer, initialTrendsState } from '../reducers/trendsReducer.js'
import { TRENDS_ACTION_TYPES } from '../constants/progressConstants.js'

export const useTrends = (selectedMedida) => {
  const [state, dispatch] = useReducer(trendsReducer, initialTrendsState)

  useEffect(() => {
    const loadTrends = async () => {
      if (!selectedMedida) {
        dispatch({ type: TRENDS_ACTION_TYPES.RESET })
        return
      }

      dispatch({ type: TRENDS_ACTION_TYPES.FETCH_START })

      try {
        const data = await fetchTrendsApi(selectedMedida)
        dispatch({
          type: TRENDS_ACTION_TYPES.FETCH_SUCCESS,
          payload: data
        })
      } catch (error) {
        console.error('Error al cargar tendencias:', error)
        dispatch({
          type: TRENDS_ACTION_TYPES.FETCH_ERROR,
          payload: error.message || 'Error al cargar tendencias'
        })
      }
    }

    loadTrends()
  }, [selectedMedida])

  return {
    trendsData: state.data,
    loadingTrends: state.loading,
    error: state.error
  }
}
