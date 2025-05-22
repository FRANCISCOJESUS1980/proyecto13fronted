import React from 'react'

export const LoadingSpinner = React.memo(() => {
  return (
    <div className='cf-admin-facturacion-loading'>
      <div className='cf-admin-facturacion-spinner'></div>
      <p>Cargando datos de facturación...</p>
    </div>
  )
})
