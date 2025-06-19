import React from 'react'
import Button from '../../../../../components/Button/Button'
import { useProductosOptimized } from '../hooks/useProductosOptimized'

const ProductosHeader = React.memo(() => {
  const { handleBackNavigation } = useProductosOptimized()

  return (
    <>
      <div className='cf-productos-back-button'>
        <Button
          variant='secondary'
          onClick={handleBackNavigation}
          leftIcon={<span>←</span>}
        >
          Volver al Dashboard
        </Button>
      </div>

      <div className='cf-productos-header'>
        <h1 className='cf-productos-title'>Nuestros Productos</h1>
        <p className='cf-productos-subtitle'>
          Encuentra todo lo que necesitas para tu entrenamiento
        </p>
      </div>
    </>
  )
})

ProductosHeader.displayName = 'ProductosHeader'

export default ProductosHeader
