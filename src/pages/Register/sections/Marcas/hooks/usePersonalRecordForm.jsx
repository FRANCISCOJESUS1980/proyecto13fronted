import { useReducer, useEffect, useRef, useCallback } from 'react'
import { formReducer, initialFormState } from '../reducers/formReducer.js'
import {
  FORM_ACTION_TYPES,
  EJERCICIOS_COMUNES
} from '../constants/personalRecordsConstants.js'
import { validateFormData } from '../utils/recordsUtils.js'
import alertService from '../../../../../components/sweealert2/sweealert2'

export const usePersonalRecordForm = (
  record,
  onSubmit,
  onCancel,
  isEditing = false
) => {
  const [state, dispatch] = useReducer(formReducer, initialFormState)
  const originalDataRef = useRef(null)

  useEffect(() => {
    window.personalRecordHasUnsavedChanges = false
    return () => {
      window.personalRecordHasUnsavedChanges = false
    }
  }, [])

  useEffect(() => {
    if (record) {
      const recordData = {
        ejercicio: record.ejercicio || '',
        peso: record.peso || '',
        repeticiones: record.repeticiones || '1',
        fecha: record.fecha
          ? new Date(record.fecha).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        categoria: record.categoria || 'Levantamiento de Potencia'
      }

      dispatch({ type: FORM_ACTION_TYPES.SET_FORM_DATA, payload: recordData })
      dispatch({
        type: FORM_ACTION_TYPES.SET_CUSTOM_EXERCISE,
        payload: !EJERCICIOS_COMUNES.includes(record.ejercicio)
      })

      originalDataRef.current = JSON.stringify(recordData)
      window.personalRecordHasUnsavedChanges = false
    } else {
      originalDataRef.current = JSON.stringify(state.formData)
    }
  }, [record])

  const handleChange = useCallback(
    (name, value) => {
      dispatch({
        type: FORM_ACTION_TYPES.SET_FORM_DATA,
        payload: { [name]: value }
      })

      if (state.errors[name]) {
        dispatch({
          type: FORM_ACTION_TYPES.SET_ERRORS,
          payload: { ...state.errors, [name]: null }
        })
      }

      const updatedData = { ...state.formData, [name]: value }
      const currentData = JSON.stringify(updatedData)
      const hasChanges = originalDataRef.current !== currentData

      window.personalRecordHasUnsavedChanges = hasChanges
      dispatch({
        type: FORM_ACTION_TYPES.SET_UNSAVED_CHANGES,
        payload: hasChanges
      })
    },
    [state.formData, state.errors]
  )

  const handleExerciseChange = useCallback(
    (value) => {
      if (value === 'custom') {
        dispatch({ type: FORM_ACTION_TYPES.SET_CUSTOM_EXERCISE, payload: true })
        handleChange('ejercicio', '')
      } else {
        dispatch({
          type: FORM_ACTION_TYPES.SET_CUSTOM_EXERCISE,
          payload: false
        })
        handleChange('ejercicio', value)
      }
    },
    [handleChange]
  )

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      const errors = validateFormData(state.formData)

      if (Object.keys(errors).length === 0) {
        window.personalRecordHasUnsavedChanges = false
        onSubmit(state.formData)
      } else {
        dispatch({ type: FORM_ACTION_TYPES.SET_ERRORS, payload: errors })
        alertService.error(
          'Error de validación',
          'Por favor, corrige los errores en el formulario'
        )
      }
    },
    [state.formData, onSubmit]
  )

  const handleCancel = useCallback(() => {
    if (window.personalRecordHasUnsavedChanges) {
      alertService.clearAlerts()
      alertService
        .confirm(
          '¿Estás seguro?',
          'Tienes cambios sin guardar. ¿Deseas salir sin guardar?',
          {
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'No, continuar editando',
            allowOutsideClick: false,
            customClass: {
              container: 'swal2-container-top-layer',
              popup: 'swal2-popup-top-layer'
            },
            target: document.body
          }
        )
        .then((result) => {
          if (result.isConfirmed) {
            window.personalRecordHasUnsavedChanges = false
            onCancel()
          }
        })
    } else {
      onCancel()
    }
  }, [onCancel])

  return {
    formData: state.formData,
    errors: state.errors,
    customExercise: state.customExercise,
    hasUnsavedChanges: state.hasUnsavedChanges,
    handleChange,
    handleExerciseChange,
    handleSubmit,
    handleCancel
  }
}
