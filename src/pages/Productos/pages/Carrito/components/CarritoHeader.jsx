import React from 'react'
import { ArrowLeft } from 'lucide-react'
import Button from '../../../../../components/Button/Button'
import { useCarritoOptimized } from '../hooks/useCarritoOptimized'

const CarritoHeader = React.memo(() => {
  const { handleContinueShopping } = useCarritoOptimized()

  return (
    <div className='carrito-header'>
      <h1 className='carrito-title'>Tu Carrito</h1>
      <Button
        onClick={handleContinueShopping}
        variant='secondary'
        size='md'
        leftIcon={<ArrowLeft size={16} />}
      >
        Continuar comprando
      </Button>
    </div>
  )
})

CarritoHeader.displayName = 'CarritoHeader'

export default CarritoHeader
