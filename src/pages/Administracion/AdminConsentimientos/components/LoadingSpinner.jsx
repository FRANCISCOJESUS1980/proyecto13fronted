import React from 'react'

const LoadingSpinner = React.memo(() => (
  <div className='cf-consentimientos-loading'>
    <div className='cf-consentimientos-spinner'></div>
    <p className='cf-consentimientos-loading-text'>
      Cargando consentimientos...
    </p>
  </div>
))

LoadingSpinner.displayName = 'LoadingSpinner'

export default LoadingSpinner
