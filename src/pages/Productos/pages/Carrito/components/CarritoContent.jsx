import React from 'react'
import CarritoHeader from './CarritoHeader'
import CarritoEmpty from './CarritoEmpty'
import CarritoLayout from './CarritoLayaut'
import PaymentModal from './PaymentModal'
import { useCarritoOptimized } from '../hooks/useCarritoOptimized'

const CarritoContent = React.memo(() => {
  const { carritoData, showPaymentForm } = useCarritoOptimized()
  const { hasItems, isCartLoaded } = carritoData()

  if (!isCartLoaded) {
    return (
      <div className='carrito-loading'>
        <div className='carrito-loading-spinner'></div>
        <p>Cargando carrito...</p>
      </div>
    )
  }

  return (
    <div className='carrito-content'>
      <CarritoHeader />

      {hasItems ? <CarritoLayout /> : <CarritoEmpty />}

      {showPaymentForm && <PaymentModal />}
    </div>
  )
})

CarritoContent.displayName = 'CarritoContent'

export default CarritoContent
