import React from 'react'
import { CreditCard } from 'lucide-react'
import Button from '../../../../../components/Button/Button'
import { useCarritoOptimized } from '../hooks/useCarritoOptimized'
import { formatPrice } from '../utils/paymentUtils'

const CarritoResumen = React.memo(() => {
  const { carritoData, handleCheckout } = useCarritoOptimized()
  const { cartTotal, hasItems } = carritoData()

  return (
    <div className='carrito-resumen'>
      <h2 className='carrito-resumen-titulo'>Resumen de compra</h2>

      <div className='carrito-resumen-detalles'>
        <div className='carrito-resumen-fila'>
          <span>Subtotal</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>
        <div className='carrito-resumen-fila'>
          <span>Envío</span>
          <span>Gratis</span>
        </div>
        <div className='carrito-resumen-total'>
          <span>Total</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>
      </div>

      <Button
        onClick={handleCheckout}
        disabled={!hasItems}
        variant='primary'
        size='lg'
        leftIcon={<CreditCard size={18} />}
      >
        Proceder al pago
      </Button>
    </div>
  )
})

CarritoResumen.displayName = 'CarritoResumen'

export default CarritoResumen
