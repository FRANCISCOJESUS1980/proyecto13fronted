import React from 'react'
import './Carrito.css'
import Header from '../../../../../components/Header/page/Header'
import CarritoContent from '../components/CarritoContent'
import { CarritoProvider } from '../context/CarritoContext'
import { useCarritoOptimized } from '../hooks/useCarritoOptimized'

const CarritoInner = React.memo(() => {
  const { fadeIn } = useCarritoOptimized()

  return (
    <div className={`carrito-container ${fadeIn ? 'carrito-fade-in' : ''}`}>
      <Header />
      <CarritoContent />
    </div>
  )
})

CarritoInner.displayName = 'CarritoInner'

const Carrito = () => {
  return (
    <CarritoProvider>
      <CarritoInner />
    </CarritoProvider>
  )
}

export default Carrito
