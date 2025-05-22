import React from 'react'

export const ErrorMessage = React.memo(({ message }) => {
  return (
    <div className='cf-admin-facturacion-error'>
      <div className='cf-admin-facturacion-error-icon'></div>
      <p>{message}</p>
    </div>
  )
})
