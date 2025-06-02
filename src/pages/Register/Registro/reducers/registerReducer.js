export const initialState = {
  formData: {
    nombre: '',
    email: '',
    password: '',
    rol: 'usuario',
    codigoAutorizacion: ''
  },
  selectedImage: null,
  previewUrl: null,
  registroExitoso: false,
  isLoading: false,
  animationComplete: false,
  isVerifyingCode: false
}

export const registerReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FORM':
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload
        }
      }
    case 'SET_SELECTED_IMAGE':
      return {
        ...state,
        selectedImage: action.payload
      }
    case 'SET_PREVIEW_URL':
      return {
        ...state,
        previewUrl: action.payload
      }
    case 'SET_REGISTRO_EXITOSO':
      return {
        ...state,
        registroExitoso: action.payload
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    case 'SET_ANIMATION_COMPLETE':
      return {
        ...state,
        animationComplete: action.payload
      }
    case 'SET_VERIFYING_CODE':
      return {
        ...state,
        isVerifyingCode: action.payload
      }
    default:
      return state
  }
}
