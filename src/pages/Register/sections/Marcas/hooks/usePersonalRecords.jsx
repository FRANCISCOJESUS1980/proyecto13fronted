import { useReducer, useEffect, useCallback } from 'react'
import {
  recordsReducer,
  initialRecordsState
} from '../reducers/recordsReducer.js'
import { RECORDS_ACTION_TYPES } from '../constants/personalRecordsConstants.js'
import { processApiRecords, processRecordData } from '../utils/recordsUtils.js'
import {
  fetchPersonalRecordsApi,
  fetchUniqueExercisesApi,
  addPersonalRecordApi,
  updatePersonalRecordApi,
  deletePersonalRecordApi
} from '../../../../../services/Api/index'
import alertService from '../../../../../components/sweealert2/sweealert2'

export const usePersonalRecords = () => {
  const [state, dispatch] = useReducer(recordsReducer, initialRecordsState)

  const fetchRecords = useCallback(async () => {
    dispatch({ type: RECORDS_ACTION_TYPES.FETCH_START })
    try {
      const [recordsData, exercisesData] = await Promise.all([
        fetchPersonalRecordsApi(),
        fetchUniqueExercisesApi()
      ])

      const processedRecords = processApiRecords(recordsData)

      dispatch({
        type: RECORDS_ACTION_TYPES.FETCH_SUCCESS,
        payload: {
          records: processedRecords,
          uniqueExercises: exercisesData
        }
      })
    } catch (error) {
      dispatch({
        type: RECORDS_ACTION_TYPES.FETCH_ERROR,
        payload: error.message
      })
      alertService.error('Error', 'Error al cargar las marcas personales')
    }
  }, [])

  const addRecord = useCallback(async (record) => {
    try {
      const result = await addPersonalRecordApi(record)
      const newRecord = processRecordData(result.data)

      dispatch({
        type: RECORDS_ACTION_TYPES.ADD_RECORD,
        payload: newRecord
      })

      alertService.success('¡Éxito!', '¡Marca personal guardada con éxito!')
      return newRecord
    } catch (error) {
      alertService.error('Error', error.message)
      throw error
    }
  }, [])

  const updateRecord = useCallback(async (id, updatedRecord) => {
    try {
      const result = await updatePersonalRecordApi(id, updatedRecord)
      const processedRecord = processRecordData({ ...result.data, _id: id })

      dispatch({
        type: RECORDS_ACTION_TYPES.UPDATE_RECORD,
        payload: { id, record: processedRecord }
      })

      alertService.success(
        '¡Éxito!',
        'Marca personal actualizada correctamente'
      )
      return processedRecord
    } catch (error) {
      alertService.error('Error', error.message)
      throw error
    }
  }, [])

  const deleteRecord = useCallback(async (id) => {
    try {
      await deletePersonalRecordApi(id)
      dispatch({
        type: RECORDS_ACTION_TYPES.DELETE_RECORD,
        payload: id
      })
      alertService.success('¡Éxito!', 'Marca personal eliminada correctamente')
    } catch (error) {
      alertService.error('Error', error.message)
      throw error
    }
  }, [])

  const setSelectedRecord = useCallback((record) => {
    dispatch({
      type: RECORDS_ACTION_TYPES.SET_SELECTED_RECORD,
      payload: record
    })
  }, [])

  const clearSelectedRecord = useCallback(() => {
    dispatch({ type: RECORDS_ACTION_TYPES.CLEAR_SELECTED_RECORD })
  }, [])

  useEffect(() => {
    fetchRecords()
  }, [fetchRecords])

  return {
    ...state,
    fetchRecords,
    addRecord,
    updateRecord,
    deleteRecord,
    setSelectedRecord,
    clearSelectedRecord
  }
}
