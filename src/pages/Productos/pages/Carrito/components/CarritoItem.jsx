import React from 'react'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useCarritoOptimized } from '../hooks/useCarritoOptimized'
import { formatPrice } from '../utils/paymentUtils'

const CarritoItem = React.memo(({ item }) => {
  const { removeFromCart, updateQuantity } = useCarritoOptimized()

  const handleImageError = React.useCallback((e) => {
    e.target.onerror = null
    e.target.src = '/placeholder.svg'
  }, [])

  const handleDecrease = React.useCallback(() => {
    updateQuantity(item._id, item.quantity - 1)
  }, [updateQuantity, item._id, item.quantity])

  const handleIncrease = React.useCallback(() => {
    updateQuantity(item._id, item.quantity + 1)
  }, [updateQuantity, item._id, item.quantity])

  const handleRemove = React.useCallback(() => {
    removeFromCart(item._id)
  }, [removeFromCart, item._id])

  return (
    <div className='carrito-item'>
      <div className='carrito-item-producto'>
        <img
          src={item.imagen || '/placeholder.svg'}
          alt={item.nombre}
          className='carrito-item-imagen'
          onError={handleImageError}
        />
        <div className='carrito-item-detalles'>
          <h3 className='carrito-item-nombre'>{item.nombre}</h3>
          <p className='carrito-item-marca'>{item.marca}</p>
        </div>
      </div>

      <div className='carrito-item-precio'>{formatPrice(item.precio)}</div>

      <div className='carrito-item-cantidad'>
        <button
          className='carrito-cantidad-btn'
          onClick={handleDecrease}
          aria-label='Disminuir cantidad'
        >
          <Minus size={16} />
        </button>
        <span className='carrito-cantidad-valor'>{item.quantity}</span>
        <button
          className='carrito-cantidad-btn'
          onClick={handleIncrease}
          aria-label='Aumentar cantidad'
        >
          <Plus size={16} />
        </button>
      </div>

      <div className='carrito-item-total'>
        {formatPrice(item.precio * item.quantity)}
      </div>

      <div className='carrito-item-acciones'>
        <button
          className='carrito-eliminar-btn'
          onClick={handleRemove}
          aria-label='Eliminar producto'
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
})

CarritoItem.displayName = 'CarritoItem'

export default CarritoItem
