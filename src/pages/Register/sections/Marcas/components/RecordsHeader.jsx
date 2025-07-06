import { memo } from 'react'
import Button from '../../../../../components/Button/Button'

const RecordsHeader = memo(({ onAddRecord, onBackNavigation }) => {
  return (
    <>
      <div className='cf-marcas-back-button'>
        <Button
          variant='secondary'
          onClick={onBackNavigation}
          leftIcon={<span>←</span>}
        >
          Volver al Dashboard
        </Button>
      </div>

      <div className='cf-marcas-header'>
        <div className='cf-marcas-title-container'>
          <div className='cf-marcas-logo-wrapper'>
            <div className='cf-marcas-trophy-logo'></div>
          </div>
          <h2 className='cf-marcas-heading'>Marcas Personales</h2>
        </div>
        <button className='cf-marcas-add-button' onClick={onAddRecord}>
          <span className='cf-marcas-add-icon'></span>
          Nueva Marca
        </button>
      </div>
    </>
  )
})

RecordsHeader.displayName = 'RecordsHeader'

export default RecordsHeader
