import { FORM_ACTION_TYPES } from '../constants/personalRecordsConstants.js'

export const initialFormState = {
  formData: {
    ejercicio: '',
    peso: '',
    repeticiones: '1',
    fecha: new Date().toISOString().split('T')[0],
    categoria: 'Levantamiento de Potencia'
  },
  errors: {},
  customExercise: false,
  hasUnsavedChanges: false
}

export const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_ACTION_TYPES.SET_FORM_DATA:
      return {
        ...state,
        formData: { ...state.formData, ...action.payload }
      }
    case FORM_ACTION_TYPES.SET_ERRORS:
      return {
        ...state,
        errors: action.payload
      }
    case FORM_ACTION_TYPES.SET_CUSTOM_EXERCISE:
      return {
        ...state,
        customExercise: action.payload
      }
    case FORM_ACTION_TYPES.RESET_FORM:
      return {
        ...initialFormState,
        formData: {
          ...initialFormState.formData,
          fecha: new Date().toISOString().split('T')[0]
        }
      }
    case FORM_ACTION_TYPES.SET_UNSAVED_CHANGES:
      return {
        ...state,
        hasUnsavedChanges: action.payload
      }
    default:
      return state
  }
}
