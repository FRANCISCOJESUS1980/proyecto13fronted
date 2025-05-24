import { useReducer, useCallback } from 'react'
import handleSubmitHelper from '../../../utils/HandleSubmit'

const ACTIONS = {
  SET_MENSAJE_ENVIADO: 'SET_MENSAJE_ENVIADO',
  SET_FAQ_ACTIVO: 'SET_FAQ_ACTIVO',
  SET_FADE_IN: 'SET_FADE_IN'
}

const initialState = {
  mensajeEnviado: false,
  faqActivo: null,
  fadeIn: false
}

const contactReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_MENSAJE_ENVIADO:
      return { ...state, mensajeEnviado: action.payload }
    case ACTIONS.SET_FAQ_ACTIVO:
      return { ...state, faqActivo: action.payload }
    case ACTIONS.SET_FADE_IN:
      return { ...state, fadeIn: action.payload }
    default:
      return state
  }
}

export const useContactState = () => {
  const [state, dispatch] = useReducer(contactReducer, initialState)

  const handleSubmit = useCallback((e) => {
    handleSubmitHelper(e, 'contacto', {
      setMensajeEnviado: (value) =>
        dispatch({ type: ACTIONS.SET_MENSAJE_ENVIADO, payload: value })
    })
  }, [])

  const handleNuevoMensaje = useCallback(() => {
    dispatch({ type: ACTIONS.SET_MENSAJE_ENVIADO, payload: false })
  }, [])

  const toggleFAQ = useCallback(
    (index) => {
      const newIndex = state.faqActivo === index ? null : index
      dispatch({ type: ACTIONS.SET_FAQ_ACTIVO, payload: newIndex })
    },
    [state.faqActivo]
  )

  const setFadeIn = useCallback((value) => {
    dispatch({ type: ACTIONS.SET_FADE_IN, payload: value })
  }, [])

  return {
    state,
    actions: {
      handleSubmit,
      handleNuevoMensaje,
      toggleFAQ,
      setFadeIn
    }
  }
}
