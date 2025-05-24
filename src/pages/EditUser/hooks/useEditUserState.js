import { useReducer, useCallback, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { obtenerPerfilUsuario } from '../../../services/Api/index'
import handleSubmitHelper from '../../../utils/HandleSubmit'
import alertService from '../../../components/sweealert2/sweealert2'

const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_USER: 'SET_USER',
  SET_AVATAR_FILE: 'SET_AVATAR_FILE',
  SET_AVATAR_PREVIEW: 'SET_AVATAR_PREVIEW',
  SET_IS_SUBMITTING: 'SET_IS_SUBMITTING',
  SET_ANIMATION_COMPLETE: 'SET_ANIMATION_COMPLETE',
  SET_HAS_UNSAVED_CHANGES: 'SET_HAS_UNSAVED_CHANGES',
  UPDATE_USER_FIELD: 'UPDATE_USER_FIELD',
  UPDATE_ADDRESS_FIELD: 'UPDATE_ADDRESS_FIELD'
}

const initialState = {
  loading: true,
  user: {
    nombre: '',
    email: '',
    telefono: '',
    direccion: { calle: '', ciudad: '', codigoPostal: '', pais: '' },
    avatar: ''
  },
  avatarFile: null,
  avatarPreview: null,
  isSubmitting: false,
  animationComplete: false,
  hasUnsavedChanges: false
}

const editUserReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload }
    case ACTIONS.SET_USER:
      return { ...state, user: action.payload }
    case ACTIONS.SET_AVATAR_FILE:
      return { ...state, avatarFile: action.payload }
    case ACTIONS.SET_AVATAR_PREVIEW:
      return { ...state, avatarPreview: action.payload }
    case ACTIONS.SET_IS_SUBMITTING:
      return { ...state, isSubmitting: action.payload }
    case ACTIONS.SET_ANIMATION_COMPLETE:
      return { ...state, animationComplete: action.payload }
    case ACTIONS.SET_HAS_UNSAVED_CHANGES:
      return { ...state, hasUnsavedChanges: action.payload }
    case ACTIONS.UPDATE_USER_FIELD:
      return {
        ...state,
        user: { ...state.user, [action.payload.name]: action.payload.value }
      }
    case ACTIONS.UPDATE_ADDRESS_FIELD:
      return {
        ...state,
        user: {
          ...state.user,
          direccion: {
            ...state.user.direccion,
            [action.payload.name]: action.payload.value
          }
        }
      }
    default:
      return state
  }
}

export const useEditUserState = () => {
  const [state, dispatch] = useReducer(editUserReducer, initialState)
  const navigate = useNavigate()
  const originalUserRef = useRef(null)

  const fetchUser = useCallback(async () => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true })
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/iniciar-sesion')
        return
      }

      const response = await obtenerPerfilUsuario(token)
      const userData = response.data

      if (!userData.direccion) {
        userData.direccion = {
          calle: '',
          ciudad: '',
          codigoPostal: '',
          pais: ''
        }
      }

      if (userData.avatar) {
        const avatarUrl = userData.avatar.startsWith('http')
          ? userData.avatar
          : `http://localhost:5000/${userData.avatar}`
        dispatch({ type: ACTIONS.SET_AVATAR_PREVIEW, payload: avatarUrl })
      }

      dispatch({ type: ACTIONS.SET_USER, payload: userData })
      originalUserRef.current = JSON.stringify(userData)
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })

      checkUnsavedChanges(userData, state.avatarFile)
    } catch (error) {
      console.error('Error fetching user:', error)
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }, [navigate, state.avatarFile])

  const checkUnsavedChanges = useCallback((currentUser, currentAvatarFile) => {
    if (originalUserRef.current) {
      const currentData = JSON.stringify(currentUser)
      const hasChanges =
        originalUserRef.current !== currentData || currentAvatarFile !== null
      dispatch({ type: ACTIONS.SET_HAS_UNSAVED_CHANGES, payload: hasChanges })
    }
  }, [])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    dispatch({ type: ACTIONS.UPDATE_USER_FIELD, payload: { name, value } })
  }, [])

  const handleAddressChange = useCallback((e) => {
    const { name, value } = e.target
    dispatch({ type: ACTIONS.UPDATE_ADDRESS_FIELD, payload: { name, value } })
  }, [])

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0]
    if (file) {
      dispatch({ type: ACTIONS.SET_AVATAR_FILE, payload: file })
      const previewUrl = URL.createObjectURL(file)
      dispatch({ type: ACTIONS.SET_AVATAR_PREVIEW, payload: previewUrl })
    }
  }, [])

  const handleSubmit = useCallback(
    (e) => {
      handleSubmitHelper(e, 'editarUsuario', {
        user: state.user,
        avatarFile: state.avatarFile,
        isSubmitting: state.isSubmitting,
        setIsSubmitting: (value) =>
          dispatch({ type: ACTIONS.SET_IS_SUBMITTING, payload: value }),
        navigate,
        onSuccess: () => {
          originalUserRef.current = JSON.stringify(state.user)
          dispatch({ type: ACTIONS.SET_HAS_UNSAVED_CHANGES, payload: false })
          alertService.success('¡Éxito!', 'Perfil actualizado correctamente')
        },
        onError: (error) => {
          alertService.error(
            'Error',
            error.message || 'Error al actualizar el perfil'
          )
        }
      })
    },
    [state.user, state.avatarFile, state.isSubmitting, navigate]
  )

  const handleNavigateAway = useCallback(
    (destination) => {
      if (state.hasUnsavedChanges) {
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
              dispatch({
                type: ACTIONS.SET_HAS_UNSAVED_CHANGES,
                payload: false
              })
              navigate(destination)
            }
          })
      } else {
        navigate(destination)
      }
    },
    [state.hasUnsavedChanges, navigate]
  )

  const setAnimationComplete = useCallback((value) => {
    dispatch({ type: ACTIONS.SET_ANIMATION_COMPLETE, payload: value })
  }, [])

  useEffect(() => {
    if (originalUserRef.current) {
      checkUnsavedChanges(state.user, state.avatarFile)
    }
  }, [state.user, state.avatarFile, checkUnsavedChanges])

  return {
    state,
    actions: {
      fetchUser,
      handleChange,
      handleAddressChange,
      handleFileChange,
      handleSubmit,
      handleNavigateAway,
      setAnimationComplete
    }
  }
}
