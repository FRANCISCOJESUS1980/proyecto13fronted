import { useCallback } from 'react'
import { useCart } from '../../../context/CartContext'
import alertService from '../../../../../components/sweealert2/sweealert2'

export const useCartIntegration = () => {
  const { addToCart } = useCart()

  const handleAddToCart = useCallback(
    (producto) => {
      addToCart(producto)

      alertService.success(
        '¡Añadido al carrito!',
        `${producto.nombre} ha sido añadido al carrito correctamente`,
        {
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3085d6'
        }
      )
    },
    [addToCart]
  )

  return {
    handleAddToCart
  }
}
