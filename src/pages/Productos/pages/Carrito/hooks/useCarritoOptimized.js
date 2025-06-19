import { useCarritoContext } from '../context/CarritoContext'
import { useCallback } from 'react'

export const useCarritoOptimized = () => {
  const context = useCarritoContext()

  const carritoData = useCallback(
    () => ({
      cartItems: context.cartItems,
      cartTotal: context.cartTotal,
      hasItems: context.hasItems,
      itemCount: context.cartItems.length,
      isCartLoaded: context.isCartLoaded
    }),
    [
      context.cartItems,
      context.cartTotal,
      context.hasItems,
      context.isCartLoaded
    ]
  )

  const paymentData = useCallback(
    () => ({
      paymentInfo: context.paymentInfo,
      showPaymentForm: context.showPaymentForm,
      canProceedToPayment: context.canProceedToPayment,
      isProcessingPayment: context.isProcessingPayment
    }),
    [
      context.paymentInfo,
      context.showPaymentForm,
      context.canProceedToPayment,
      context.isProcessingPayment
    ]
  )

  const uiState = useCallback(
    () => ({
      loading: context.loading,
      error: context.error,
      success: context.success,
      fadeIn: context.fadeIn
    }),
    [context.loading, context.error, context.success, context.fadeIn]
  )

  return {
    carritoData,
    paymentData,
    uiState,
    removeFromCart: context.removeFromCart,
    updateQuantity: context.updateQuantity,
    clearCart: context.clearCart,
    handleInputChange: context.handleInputChange,
    handleCheckout: context.handleCheckout,
    handleClosePaymentForm: context.handleClosePaymentForm,
    handlePayment: context.handlePayment,
    handleContinueShopping: context.handleContinueShopping,
    cartItems: context.cartItems,
    cartTotal: context.cartTotal,
    hasItems: context.hasItems,
    loading: context.loading,
    error: context.error,
    success: context.success,
    showPaymentForm: context.showPaymentForm,
    paymentInfo: context.paymentInfo,
    fadeIn: context.fadeIn,
    isCartLoaded: context.isCartLoaded
  }
}
