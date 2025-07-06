export const CATEGORIAS = [
  'Levantamiento Olímpico',
  'Levantamiento de Potencia',
  'Gimnástico',
  'Cardio',
  'Otro'
]

export const EJERCICIOS_COMUNES = [
  'Sentadilla (Back Squat)',
  'Press de Banca',
  'Peso Muerto',
  'Clean & Jerk',
  'Snatch',
  'Overhead Squat',
  'Front Squat',
  'Thruster',
  'Pull-up',
  'Muscle-up'
]

export const CHART_COLORS = {
  weight: '#3366cc',
  reps: '#ff9933',
  avgLine: '#e53935',
  grid: '#e0e0e0',
  axis: '#9e9e9e'
}

export const CHART_TYPES = {
  LINE: 'line',
  BAR: 'bar'
}

export const TABS = {
  ALL: 'all',
  CHART: 'chart'
}

export const RECORDS_ACTION_TYPES = {
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
  ADD_RECORD: 'ADD_RECORD',
  UPDATE_RECORD: 'UPDATE_RECORD',
  DELETE_RECORD: 'DELETE_RECORD',
  SET_SELECTED_RECORD: 'SET_SELECTED_RECORD',
  CLEAR_SELECTED_RECORD: 'CLEAR_SELECTED_RECORD'
}

export const UI_ACTION_TYPES = {
  SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
  TOGGLE_FORM: 'TOGGLE_FORM',
  SET_ANIMATION_COMPLETE: 'SET_ANIMATION_COMPLETE',
  SET_VIEW_DETAILS: 'SET_VIEW_DETAILS'
}

export const FORM_ACTION_TYPES = {
  SET_FORM_DATA: 'SET_FORM_DATA',
  SET_ERRORS: 'SET_ERRORS',
  SET_CUSTOM_EXERCISE: 'SET_CUSTOM_EXERCISE',
  RESET_FORM: 'RESET_FORM',
  SET_UNSAVED_CHANGES: 'SET_UNSAVED_CHANGES'
}

export const CHART_ACTION_TYPES = {
  SET_SELECTED_EXERCISE: 'SET_SELECTED_EXERCISE',
  SET_CHART_TYPE: 'SET_CHART_TYPE',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR'
}
