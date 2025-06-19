import React from 'react'
import CarritoItemsList from './CarritoItemList'
import CarritoResumen from './CarritoResumen'

const CarritoLayout = React.memo(() => {
  return (
    <div className='carrito-layout'>
      <CarritoItemsList />
      <CarritoResumen />
    </div>
  )
})

CarritoLayout.displayName = 'CarritoLayout'

export default CarritoLayout
