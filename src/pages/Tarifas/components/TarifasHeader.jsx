import React from 'react'
import Button from '../../../components/Button/Button'
import { useTarifasOptimized } from '../hooks/useTarifasOptimized'

const TarifasHeader = React.memo(() => {
  const { handleBackNavigation } = useTarifasOptimized()

  return (
    <div className='precios-back-button'>
      <Button
        variant='secondary'
        onClick={handleBackNavigation}
        leftIcon={<span>←</span>}
      >
        Volver al Dashboard
      </Button>
    </div>
  )
})

TarifasHeader.displayName = 'TarifasHeader'

export default TarifasHeader
