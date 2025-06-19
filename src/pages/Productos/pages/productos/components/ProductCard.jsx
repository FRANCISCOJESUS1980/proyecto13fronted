import React from 'react'
import { ShoppingCart } from 'lucide-react'
import { useCartIntegration } from '../hooks/useCartintegration'

const ProductCard = React.memo(({ producto, index }) => {
  const { handleAddToCart } = useCartIntegration()

  const getAnimationDelay = React.useCallback((index) => {
    return `${index * 0.05}s`
  }, [])

  const handleImageError = React.useCallback((e) => {
    e.target.onerror = null
    e.target.src = '/placeholder.svg'
  }, [])

  const onAddToCart = React.useCallback(() => {
    handleAddToCart(producto)
  }, [handleAddToCart, producto])

  return (
    <div
      className='cf-productos-card'
      style={{ animationDelay: getAnimationDelay(index) }}
    >
      <div className='cf-productos-imagen-container'>
        <img
          src={producto.imagen || '/placeholder.svg'}
          alt={producto.nombre}
          className='cf-productos-imagen'
          onError={handleImageError}
        />
        {producto.destacado && (
          <span className='cf-productos-destacado'>Destacado</span>
        )}
      </div>
      <div className='cf-productos-info'>
        <h3 className='cf-productos-nombre'>{producto.nombre}</h3>
        <p className='cf-productos-marca'>{producto.marca}</p>
        <div className='cf-productos-precio-container'>
          <span className='cf-productos-precio'>
            ${producto.precio.toFixed(2)}
          </span>
          {producto.stock > 0 ? (
            <button className='cf-productos-btn-agregar' onClick={onAddToCart}>
              <ShoppingCart size={16} />
              <span>Agregar</span>
            </button>
          ) : (
            <span className='cf-productos-agotado'>Agotado</span>
          )}
        </div>
      </div>
    </div>
  )
})

ProductCard.displayName = 'ProductCard'

export default ProductCard
