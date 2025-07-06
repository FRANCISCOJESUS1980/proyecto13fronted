import {
  CHART_ACTION_TYPES,
  CHART_TYPES
} from '../constants/personalRecordsConstants.js'

export const initialChartState = {
  selectedExercise: '',
  chartType: CHART_TYPES.LINE,
  loading: false,
  error: null
}

export const chartReducer = (state, action) => {
  switch (action.type) {
    case CHART_ACTION_TYPES.SET_SELECTED_EXERCISE:
      return {
        ...state,
        selectedExercise: action.payload
      }
    case CHART_ACTION_TYPES.SET_CHART_TYPE:
      return {
        ...state,
        chartType: action.payload
      }
    case CHART_ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case CHART_ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
