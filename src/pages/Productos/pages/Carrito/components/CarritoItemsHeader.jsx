import React from 'react'

const CarritoItemsHeader = React.memo(() => {
  return (
    <div className='carrito-items-header'>
      <span className='carrito-header-producto'>Producto</span>
      <span className='carrito-header-precio'>Precio</span>
      <span className='carrito-header-cantidad'>Cantidad</span>
      <span className='carrito-header-total'>Total</span>
      <span className='carrito-header-acciones'></span>
    </div>
  )
})

CarritoItemsHeader.displayName = 'CarritoItemsHeader'

export default CarritoItemsHeader
