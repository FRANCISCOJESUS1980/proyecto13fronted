import React from 'react'
import CarritoItemsHeader from './CarritoItemsHeader'
import CarritoItem from './CarritoItem'
import Button from '../../../../../components/Button/Button'
import { useCarritoOptimized } from '../hooks/useCarritoOptimized'

const CarritoItemsList = React.memo(() => {
  const { carritoData, clearCart } = useCarritoOptimized()
  const { cartItems } = carritoData()

  return (
    <div className='carrito-items-container'>
      <CarritoItemsHeader />

      {cartItems.map((item) => (
        <CarritoItem key={item._id} item={item} />
      ))}

      <div className='carrito-actions'>
        <Button onClick={clearCart} variant='secondary' size='md'>
          Vaciar carrito
        </Button>
      </div>
    </div>
  )
})

CarritoItemsList.displayName = 'CarritoItemsList'

export default CarritoItemsList
