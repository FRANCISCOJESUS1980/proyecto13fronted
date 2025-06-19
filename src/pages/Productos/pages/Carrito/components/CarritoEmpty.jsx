import React from 'react'
import { Link } from 'react-router-dom'

const CarritoEmpty = React.memo(() => {
  return (
    <div className='carrito-empty'>
      <div className='carrito-empty-icon'></div>
      <h3 className='carrito-empty-title'>Tu carrito está vacío</h3>
      <p className='carrito-empty-text'>
        Parece que aún no has añadido productos a tu carrito.
      </p>
      <Link to='/productos' className='carrito-empty-btn'>
        Ver productos
      </Link>
    </div>
  )
})

CarritoEmpty.displayName = 'CarritoEmpty'

export default CarritoEmpty
