import { TRENDS_ACTION_TYPES } from '../constants/progressConstants.js'

export const initialTrendsState = {
  data: null,
  loading: false,
  error: null
}

export const trendsReducer = (state, action) => {
  switch (action.type) {
    case TRENDS_ACTION_TYPES.FETCH_START:
      return {
        ...state,
        loading: true,
        error: null
      }
    case TRENDS_ACTION_TYPES.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      }
    case TRENDS_ACTION_TYPES.FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: null
      }
    case TRENDS_ACTION_TYPES.RESET:
      return initialTrendsState
    default:
      return state
  }
}
