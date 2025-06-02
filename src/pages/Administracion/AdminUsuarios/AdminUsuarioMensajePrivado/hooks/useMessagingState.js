import { useReducer } from 'react'

const initialState = {
  userInfo: null,
  mensajes: [],
  conversacionActual: null,
  nuevoMensaje: '',
  loading: true,
  enviando: false,
  error: '',
  fadeIn: false,
  editingMessageId: null,
  editText: ''
}

function messagingReducer(state, action) {
  switch (action.type) {
    case 'SET_USER_INFO':
      return { ...state, userInfo: action.payload }
    case 'SET_MENSAJES':
      return { ...state, mensajes: action.payload }
    case 'ADD_MENSAJE':
      return { ...state, mensajes: [...state.mensajes, action.payload] }
    case 'UPDATE_MENSAJE':
      return {
        ...state,
        mensajes: state.mensajes.map((msg) =>
          msg._id === action.payload.id
            ? { ...msg, mensaje: action.payload.mensaje }
            : msg
        )
      }
    case 'DELETE_MENSAJE':
      return {
        ...state,
        mensajes: state.mensajes.filter((msg) => msg._id !== action.payload)
      }
    case 'SET_CONVERSACION':
      return { ...state, conversacionActual: action.payload }
    case 'SET_NUEVO_MENSAJE':
      return { ...state, nuevoMensaje: action.payload }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ENVIANDO':
      return { ...state, enviando: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_FADE_IN':
      return { ...state, fadeIn: action.payload }
    case 'SET_EDITING':
      return {
        ...state,
        editingMessageId: action.payload.id,
        editText: action.payload.text
      }
    case 'CLEAR_EDITING':
      return {
        ...state,
        editingMessageId: null,
        editText: ''
      }
    case 'SET_EDIT_TEXT':
      return { ...state, editText: action.payload }
    default:
      return state
  }
}

export function useMessagingState() {
  return useReducer(messagingReducer, initialState)
}
