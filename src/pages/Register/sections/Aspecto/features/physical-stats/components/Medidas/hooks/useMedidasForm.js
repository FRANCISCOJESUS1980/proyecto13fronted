import { useReducer, useCallback } from 'react'
import { FORM_ACTIONS } from '../constants/formActions'

const INITIAL_FORM_DATA = {
  altura: '',
  peso: '',
  grasa: '',
  musculo: '',
  pecho: '',
  cintura: '',
  cadera: '',
  biceps: '',
  muslos: ''
}

const INITIAL_STATE = {
  formData: INITIAL_FORM_DATA,
  originalData: null,
  hasUnsavedChanges: false,
  isInitialized: false
}

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_ACTIONS.INITIALIZE_FORM: {
      const newFormData = {
        altura: action.payload.altura || '',
        peso: action.payload.peso || '',
        grasa: action.payload.grasa || '',
        musculo: action.payload.musculo || '',
        pecho: action.payload.pecho || '',
        cintura: action.payload.cintura || '',
        cadera: action.payload.cadera || '',
        biceps: action.payload.biceps || '',
        muslos: action.payload.muslos || ''
      }

      return {
        ...state,
        formData: newFormData,
        originalData: JSON.stringify(newFormData),
        hasUnsavedChanges: false,
        isInitialized: true
      }
    }

    case FORM_ACTIONS.UPDATE_FIELD: {
      const { name, value } = action.payload
      const updatedFormData = {
        ...state.formData,
        [name]: value
      }

      const currentDataString = JSON.stringify(updatedFormData)
      const hasChanges = state.originalData !== currentDataString

      window.medidasHasUnsavedChanges = hasChanges

      return {
        ...state,
        formData: updatedFormData,
        hasUnsavedChanges: hasChanges
      }
    }

    case FORM_ACTIONS.RESET_UNSAVED_CHANGES: {
      const currentDataString = JSON.stringify(state.formData)

      window.medidasHasUnsavedChanges = false

      return {
        ...state,
        originalData: currentDataString,
        hasUnsavedChanges: false
      }
    }

    case FORM_ACTIONS.RESET_FORM: {
      window.medidasHasUnsavedChanges = false

      return INITIAL_STATE
    }

    default:
      throw new Error(`Acción no reconocida: ${action.type}`)
  }
}

const useMedidasForm = () => {
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE)

  const initializeForm = useCallback((stats) => {
    dispatch({
      type: FORM_ACTIONS.INITIALIZE_FORM,
      payload: stats
    })
  }, [])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    dispatch({
      type: FORM_ACTIONS.UPDATE_FIELD,
      payload: { name, value }
    })
  }, [])

  const resetUnsavedChanges = useCallback(() => {
    dispatch({
      type: FORM_ACTIONS.RESET_UNSAVED_CHANGES
    })
  }, [])

  const resetForm = useCallback(() => {
    dispatch({
      type: FORM_ACTIONS.RESET_FORM
    })
  }, [])

  const getFormDataAsNumbers = useCallback(() => {
    return Object.entries(state.formData).reduce((acc, [key, value]) => {
      acc[key] = value === '' ? '' : Number(value)
      return acc
    }, {})
  }, [state.formData])

  return {
    formData: state.formData,
    hasUnsavedChanges: state.hasUnsavedChanges,
    isInitialized: state.isInitialized,

    initializeForm,
    handleChange,
    resetUnsavedChanges,
    resetForm,

    getFormDataAsNumbers
  }
}

export default useMedidasForm
