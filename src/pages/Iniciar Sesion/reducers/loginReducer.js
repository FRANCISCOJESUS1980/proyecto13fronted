export const initialState = {
  formData: {
    email: '',
    password: ''
  },
  isLoading: false,
  animationComplete: false,
  intentosFallidos: 0
}

export const loginReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FORM':
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload
        }
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
    case 'INCREMENT_FAILED_ATTEMPTS':
      return {
        ...state,
        intentosFallidos: state.intentosFallidos + 1
      }
    default:
      return state
  }
}
