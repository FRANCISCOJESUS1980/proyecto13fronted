import React from 'react'
import Header from '../../../../components/Header/page/Header'

const ErrorState = React.memo(({ error }) => {
  return (
    <div className='cf-admin-usuarios-container'>
      <Header />
      <div className='cf-admin-usuarios-content'>
        <div className='cf-admin-usuarios-error'>
          <div className='cf-admin-usuarios-error-icon'></div>
          <p>Error: {error}</p>
        </div>
      </div>
    </div>
  )
})

ErrorState.displayName = 'ErrorState'

export default ErrorState
