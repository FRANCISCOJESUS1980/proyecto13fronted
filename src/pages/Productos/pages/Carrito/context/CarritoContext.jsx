import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
  useEffect
} from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../../context/CartContext'
import alertService from '../../../../../components/sweealert2/sweealert2'

const initialState = {
  loading: false,
  error: null,
  success: false,
  showPaymentForm: false,
  fadeIn: false,

  paymentInfo: {
    cardNumber: '',
    cardName: '',
    expMonth: '',
    expYear: '',
    cvc: ''
  },

  isProcessingPayment: false,
  canProceedToPayment: false
}

const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_SUCCESS: 'SET_SUCCESS',
  SET_SHOW_PAYMENT_FORM: 'SET_SHOW_PAYMENT_FORM',
  SET_FADE_IN: 'SET_FADE_IN',
  SET_PAYMENT_INFO: 'SET_PAYMENT_INFO',
  UPDATE_PAYMENT_FIELD: 'UPDATE_PAYMENT_FIELD',
  RESET_PAYMENT_STATE: 'RESET_PAYMENT_STATE'
}

function carritoReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload }

    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload }

    case ACTIONS.SET_SUCCESS:
      return { ...state, success: action.payload }

    case ACTIONS.SET_SHOW_PAYMENT_FORM:
      return { ...state, showPaymentForm: action.payload }

    case ACTIONS.SET_FADE_IN:
      return { ...state, fadeIn: action.payload }

    case ACTIONS.SET_PAYMENT_INFO:
      return { ...state, paymentInfo: action.payload }

    case ACTIONS.UPDATE_PAYMENT_FIELD: {
      const newPaymentInfo = {
        ...state.paymentInfo,
        [action.payload.field]: action.payload.value
      }
      return updateDerivedState({ ...state, paymentInfo: newPaymentInfo })
    }

    case ACTIONS.RESET_PAYMENT_STATE:
      return {
        ...state,
        loading: false,
        error: null,
        success: false,
        showPaymentForm: false,
        paymentInfo: {
          cardNumber: '',
          cardName: '',
          expMonth: '',
          expYear: '',
          cvc: ''
        },
        isProcessingPayment: false,
        canProceedToPayment: false
      }

    default:
      return state
  }
}

function updateDerivedState(state) {
  const { cardNumber, cardName, expMonth, expYear, cvc } = state.paymentInfo
  const canProceedToPayment =
    cardNumber && cardName && expMonth && expYear && cvc

  return {
    ...state,
    isProcessingPayment: state.loading,
    canProceedToPayment: !!canProceedToPayment
  }
}

const CarritoContext = createContext()

export const useCarritoContext = () => {
  const context = useContext(CarritoContext)
  if (!context) {
    throw new Error(
      'useCarritoContext debe ser usado dentro de CarritoProvider'
    )
  }
  return context
}

export const CarritoProvider = ({ children }) => {
  const navigate = useNavigate()
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    isLoaded
  } = useCart()
  const [state, dispatch] = useReducer(carritoReducer, initialState)

  const actions = useMemo(
    () => ({
      setLoading: (loading) =>
        dispatch({ type: ACTIONS.SET_LOADING, payload: loading }),
      setError: (error) =>
        dispatch({ type: ACTIONS.SET_ERROR, payload: error }),
      setSuccess: (success) =>
        dispatch({ type: ACTIONS.SET_SUCCESS, payload: success }),
      setShowPaymentForm: (show) =>
        dispatch({ type: ACTIONS.SET_SHOW_PAYMENT_FORM, payload: show }),
      setFadeIn: (fadeIn) =>
        dispatch({ type: ACTIONS.SET_FADE_IN, payload: fadeIn }),
      setPaymentInfo: (info) =>
        dispatch({ type: ACTIONS.SET_PAYMENT_INFO, payload: info }),
      updatePaymentField: (field, value) =>
        dispatch({
          type: ACTIONS.UPDATE_PAYMENT_FIELD,
          payload: { field, value }
        }),
      resetPaymentState: () => dispatch({ type: ACTIONS.RESET_PAYMENT_STATE })
    }),
    []
  )

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        actions.setFadeIn(true)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [isLoaded, actions])

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target
      let formattedValue = value

      if (name === 'cardNumber') {
        formattedValue = value
          .replace(/\D/g, '')
          .replace(/(\d{4})(?=\d)/g, '$1 ')
        if (formattedValue.length > 19)
          formattedValue = formattedValue.slice(0, 19)
      }

      if (name === 'cvc') {
        formattedValue = value.replace(/\D/g, '')
        if (formattedValue.length > 4)
          formattedValue = formattedValue.slice(0, 4)
      }

      actions.updatePaymentField(name, formattedValue)
    },
    [actions]
  )

  const handleCheckout = useCallback(() => {
    if (cartItems.length === 0) {
      alertService.error('Error', 'Tu carrito está vacío')
      return
    }
    actions.setShowPaymentForm(true)
    actions.setError(null)
  }, [cartItems.length, actions])

  const handleClosePaymentForm = useCallback(() => {
    actions.setShowPaymentForm(false)
    actions.setError(null)
  }, [actions])

  const handlePayment = useCallback(
    async (e) => {
      e.preventDefault()

      if (!state.canProceedToPayment) {
        actions.setError('Por favor complete todos los campos de pago')
        return
      }

      if (cartItems.length === 0) {
        actions.setError('Tu carrito está vacío')
        return
      }

      try {
        actions.setLoading(true)
        actions.setError(null)

        const orderData = {
          items: cartItems.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
            price: item.precio,
            name: item.nombre
          })),
          total: getCartTotal(),
          payment: {
            cardName: state.paymentInfo.cardName,
            cardNumber: state.paymentInfo.cardNumber.replace(
              /\d(?=\d{4})/g,
              '*'
            ),
            expMonth: state.paymentInfo.expMonth,
            expYear: state.paymentInfo.expYear
          }
        }

        await new Promise((resolve) => setTimeout(resolve, 2000))

        actions.setSuccess(true)
        alertService.success(
          '¡Pago exitoso!',
          'Tu pedido ha sido procesado correctamente'
        )

        clearCart()

        setTimeout(() => {
          actions.resetPaymentState()
          navigate('/productos')
        }, 3000)
      } catch (error) {
        console.error('Error al procesar el pago:', error)
        const errorMessage =
          error.message || 'Hubo un error al procesar el pago'
        actions.setError(errorMessage)
        alertService.error('Error en el pago', errorMessage)
      } finally {
        actions.setLoading(false)
      }
    },
    [
      state.canProceedToPayment,
      state.paymentInfo,
      cartItems,
      getCartTotal,
      clearCart,
      actions,
      navigate
    ]
  )

  const handleContinueShopping = useCallback(() => {
    navigate('/productos')
  }, [navigate])

  const contextValue = useMemo(
    () => ({
      ...state,
      cartItems,
      cartTotal: getCartTotal(),
      hasItems: cartItems.length > 0,
      isCartLoaded: isLoaded,
      removeFromCart,
      updateQuantity,
      clearCart,
      ...actions,
      handleInputChange,
      handleCheckout,
      handleClosePaymentForm,
      handlePayment,
      handleContinueShopping
    }),
    [
      state,
      cartItems,
      getCartTotal,
      isLoaded,
      removeFromCart,
      updateQuantity,
      clearCart,
      actions,
      handleInputChange,
      handleCheckout,
      handleClosePaymentForm,
      handlePayment,
      handleContinueShopping
    ]
  )

  return (
    <CarritoContext.Provider value={contextValue}>
      {children}
    </CarritoContext.Provider>
  )
}
