import { RECORDS_ACTION_TYPES } from '../constants/personalRecordsConstants.js'

export const initialRecordsState = {
  records: [],
  selectedRecord: null,
  uniqueExercises: [],
  loading: false,
  error: null
}

export const recordsReducer = (state, action) => {
  switch (action.type) {
    case RECORDS_ACTION_TYPES.FETCH_START:
      return {
        ...state,
        loading: true,
        error: null
      }
    case RECORDS_ACTION_TYPES.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        records: action.payload.records,
        uniqueExercises: action.payload.uniqueExercises || state.uniqueExercises
      }
    case RECORDS_ACTION_TYPES.FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case RECORDS_ACTION_TYPES.ADD_RECORD:
      return {
        ...state,
        records: [action.payload, ...state.records],
        uniqueExercises: state.uniqueExercises.includes(
          action.payload.ejercicio
        )
          ? state.uniqueExercises
          : [...state.uniqueExercises, action.payload.ejercicio]
      }
    case RECORDS_ACTION_TYPES.UPDATE_RECORD:
      return {
        ...state,
        records: state.records.map((record) =>
          record._id === action.payload.id ? action.payload.record : record
        ),
        selectedRecord: null
      }
    case RECORDS_ACTION_TYPES.DELETE_RECORD:
      return {
        ...state,
        records: state.records.filter((record) => record._id !== action.payload)
      }
    case RECORDS_ACTION_TYPES.SET_SELECTED_RECORD:
      return {
        ...state,
        selectedRecord: action.payload
      }
    case RECORDS_ACTION_TYPES.CLEAR_SELECTED_RECORD:
      return {
        ...state,
        selectedRecord: null
      }
    default:
      return state
  }
}
