import { useReducer, useCallback, useMemo } from 'react'
import { getAllMedicalInfo } from '../../../../services/Api/index'

const ACTIONS = {
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
  SET_SELECTED_USER: 'SET_SELECTED_USER',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_FILTER_TYPE: 'SET_FILTER_TYPE',
  SET_BLOOD_TYPE_FILTER: 'SET_BLOOD_TYPE_FILTER',
  TOGGLE_ADVANCED_SEARCH: 'TOGGLE_ADVANCED_SEARCH',
  CLEAR_FILTERS: 'CLEAR_FILTERS',
  SET_FADE_IN: 'SET_FADE_IN'
}

const initialState = {
  loading: true,
  medicalInfoList: [],
  error: '',
  selectedUser: null,
  fadeIn: false,
  searchTerm: '',
  filterType: 'all',
  isAdvancedSearch: false,
  bloodTypeFilter: ''
}

const medicalInfoReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_START:
      return { ...state, loading: true, error: '' }
    case ACTIONS.FETCH_SUCCESS:
      return { ...state, loading: false, medicalInfoList: action.payload }
    case ACTIONS.FETCH_ERROR:
      return { ...state, loading: false, error: action.payload }
    case ACTIONS.SET_SELECTED_USER:
      return { ...state, selectedUser: action.payload }
    case ACTIONS.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload }
    case ACTIONS.SET_FILTER_TYPE:
      return { ...state, filterType: action.payload }
    case ACTIONS.SET_BLOOD_TYPE_FILTER:
      return { ...state, bloodTypeFilter: action.payload }
    case ACTIONS.TOGGLE_ADVANCED_SEARCH:
      return { ...state, isAdvancedSearch: !state.isAdvancedSearch }
    case ACTIONS.CLEAR_FILTERS:
      return {
        ...state,
        searchTerm: '',
        filterType: 'all',
        bloodTypeFilter: ''
      }
    case ACTIONS.SET_FADE_IN:
      return { ...state, fadeIn: action.payload }
    default:
      return state
  }
}

export const useMedicalInfoState = () => {
  const [state, dispatch] = useReducer(medicalInfoReducer, initialState)

  const fetchMedicalInfo = useCallback(async () => {
    try {
      dispatch({ type: ACTIONS.FETCH_START })
      const token = localStorage.getItem('token')
      const rol = localStorage.getItem('rol')?.toLowerCase().trim()

      if (rol !== 'admin' && rol !== 'administrador' && rol !== 'creador') {
        dispatch({
          type: ACTIONS.FETCH_ERROR,
          payload: 'No tienes permisos para acceder a esta información'
        })
        return
      }

      const data = await getAllMedicalInfo(token)
      dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: data })

      setTimeout(
        () => dispatch({ type: ACTIONS.SET_FADE_IN, payload: true }),
        100
      )
    } catch (error) {
      console.error('Error al obtener información médica:', error)
      dispatch({
        type: ACTIONS.FETCH_ERROR,
        payload:
          'Error al cargar la información médica. Verifica que tengas permisos de administrador.'
      })
    }
  }, [])

  const handleUserSelect = useCallback(
    (userId) => {
      if (!userId) {
        console.error('ID de usuario no válido')
        return
      }

      const user = state.medicalInfoList.find(
        (info) => info.user && info.user._id === userId
      )

      if (!user) {
        console.error(
          `No se encontró información médica para el usuario con ID: ${userId}`
        )
        return
      }

      dispatch({ type: ACTIONS.SET_SELECTED_USER, payload: user })
    },
    [state.medicalInfoList]
  )

  const setSearchTerm = useCallback((term) => {
    dispatch({ type: ACTIONS.SET_SEARCH_TERM, payload: term })
  }, [])

  const setFilterType = useCallback((filterType) => {
    dispatch({ type: ACTIONS.SET_FILTER_TYPE, payload: filterType })
  }, [])

  const setBloodTypeFilter = useCallback((bloodType) => {
    dispatch({ type: ACTIONS.SET_BLOOD_TYPE_FILTER, payload: bloodType })
  }, [])

  const toggleAdvancedSearch = useCallback(() => {
    dispatch({ type: ACTIONS.TOGGLE_ADVANCED_SEARCH })
  }, [])

  const clearFilters = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_FILTERS })
  }, [])

  const filteredUsers = useMemo(() => {
    if (!state.medicalInfoList.length) return []

    return state.medicalInfoList.filter((info) => {
      if (!info.user) return false

      const userName = info.user.nombre ? info.user.nombre.toLowerCase() : ''
      const userEmail = info.user.email ? info.user.email.toLowerCase() : ''
      const searchLower = state.searchTerm.toLowerCase()

      const matchesSearch =
        (userName && userName.includes(searchLower)) ||
        (userEmail && userEmail.includes(searchLower))

      if (!state.searchTerm && !state.bloodTypeFilter) return true

      const matchesBloodType =
        !state.bloodTypeFilter || info.bloodType === state.bloodTypeFilter

      if (state.filterType === 'name') {
        return userName && userName.includes(searchLower) && matchesBloodType
      } else if (state.filterType === 'email') {
        return userEmail && userEmail.includes(searchLower) && matchesBloodType
      } else {
        return matchesSearch && matchesBloodType
      }
    })
  }, [
    state.medicalInfoList,
    state.searchTerm,
    state.filterType,
    state.bloodTypeFilter
  ])

  return {
    state: {
      ...state,
      filteredUsers
    },
    actions: {
      fetchMedicalInfo,
      handleUserSelect,
      setSearchTerm,
      setFilterType,
      setBloodTypeFilter,
      toggleAdvancedSearch,
      clearFilters
    }
  }
}
