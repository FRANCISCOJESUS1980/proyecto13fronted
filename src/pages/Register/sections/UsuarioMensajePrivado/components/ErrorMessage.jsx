import React from 'react'
import { useMensajesPrivadosOptimized } from '../hooks/useMensajesPrivadosOptimized'

const ErrorMessage = React.memo(() => {
  const { error } = useMensajesPrivadosOptimized()

  if (!error) return null

  return (
    <div className='cf-mensajes-error'>
      <span className='cf-mensajes-error-icon'></span>
      {error}
    </div>
  )
})

ErrorMessage.displayName = 'ErrorMessage'

export default ErrorMessage
