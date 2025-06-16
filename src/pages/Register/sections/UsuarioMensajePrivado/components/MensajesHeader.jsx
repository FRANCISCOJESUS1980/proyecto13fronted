import React from 'react'
import Button from '../../../../../components/Button/Button'
import { useMensajesPrivadosOptimized } from '../hooks/useMensajesPrivadosOptimized'

const MensajesHeader = React.memo(() => {
  const { handleVolver } = useMensajesPrivadosOptimized()

  return (
    <>
      <div className='cf-mensajes-back-button'>
        <Button variant='secondary' size='sm' onClick={handleVolver}>
          <span className='cf-mensajes-back-icon'></span>
          Volver al dashboard
        </Button>
      </div>

      <div className='cf-mensajes-header'>
        <div className='cf-mensajes-title-container'>
          <div className='cf-mensajes-logo-wrapper'>
            <div className='cf-mensajes-chat-logo'></div>
          </div>
          <h1 className='cf-mensajes-heading'>Mensajes con Administración</h1>
        </div>
      </div>
    </>
  )
})

MensajesHeader.displayName = 'MensajesHeader'

export default MensajesHeader
