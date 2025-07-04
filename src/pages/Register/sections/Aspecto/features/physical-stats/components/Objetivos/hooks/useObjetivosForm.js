import { useReducer, useCallback } from 'react'

const INITIAL_FORM_DATA = {
  tipo: 'peso',
  medida: 'peso',
  valorObjetivo: '',
  fechaObjetivo: ''
}

const INITIAL_STATE = {
  showForm: false,
  formData: INITIAL_FORM_DATA,
  originalData: null,
  hasUnsavedChanges: false
}

const ACTIONS = {
  TOGGLE_FORM: 'TOGGLE_FORM',
  UPDATE_FIELD: 'UPDATE_FIELD',
  RESET_FORM: 'RESET_FORM',
  RESET_ALL: 'RESET_ALL'
}

const objetivosFormReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.TOGGLE_FORM: {
      const newShowForm = !state.showForm

      if (newShowForm) {
        const originalData = JSON.stringify(INITIAL_FORM_DATA)
        window.objetivosHasUnsavedChanges = false

        return {
          ...state,
          showForm: true,
          formData: INITIAL_FORM_DATA,
          originalData,
          hasUnsavedChanges: false
        }
      } else {
        window.objetivosHasUnsavedChanges = false

        return {
          ...state,
          showForm: false,
          formData: INITIAL_FORM_DATA,
          originalData: null,
          hasUnsavedChanges: false
        }
      }
    }

    case ACTIONS.UPDATE_FIELD: {
      const { name, value } = action.payload
      const updatedFormData = {
        ...state.formData,
        [name]: value
      }

      let hasChanges = false
      if (state.showForm && state.originalData) {
        const currentDataString = JSON.stringify(updatedFormData)
        hasChanges = state.originalData !== currentDataString
      }

      window.objetivosHasUnsavedChanges = hasChanges

      return {
        ...state,
        formData: updatedFormData,
        hasUnsavedChanges: hasChanges
      }
    }

    case ACTIONS.RESET_FORM: {
      window.objetivosHasUnsavedChanges = false

      return {
        ...state,
        formData: INITIAL_FORM_DATA,
        originalData: JSON.stringify(INITIAL_FORM_DATA),
        hasUnsavedChanges: false
      }
    }

    case ACTIONS.RESET_ALL: {
      window.objetivosHasUnsavedChanges = false
      return INITIAL_STATE
    }

    default:
      throw new Error(`Acción no reconocida: ${action.type}`)
  }
}

const useObjetivosForm = () => {
  const [state, dispatch] = useReducer(objetivosFormReducer, INITIAL_STATE)

  const handleToggleForm = useCallback(() => {
    dispatch({
      type: ACTIONS.TOGGLE_FORM
    })
  }, [])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    dispatch({
      type: ACTIONS.UPDATE_FIELD,
      payload: { name, value }
    })
  }, [])

  const resetForm = useCallback(() => {
    dispatch({
      type: ACTIONS.RESET_FORM
    })
  }, [])

  const resetAll = useCallback(() => {
    dispatch({
      type: ACTIONS.RESET_ALL
    })
  }, [])

  const getFormDataAsNumbers = useCallback(() => {
    return {
      ...state.formData,
      valorObjetivo: Number(state.formData.valorObjetivo)
    }
  }, [state.formData])

  return {
    showForm: state.showForm,
    formData: state.formData,
    hasUnsavedChanges: state.hasUnsavedChanges,
    handleToggleForm,
    handleChange,
    resetForm,
    resetAll,
    getFormDataAsNumbers
  }
}

export default useObjetivosForm
