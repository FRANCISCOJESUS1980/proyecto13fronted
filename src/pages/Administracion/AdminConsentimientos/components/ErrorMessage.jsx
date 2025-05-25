import React from 'react'

const ErrorMessage = React.memo(({ error }) => {
  if (!error) return null

  return (
    <div className='cf-consentimientos-error'>
      <div className='cf-consentimientos-error-icon'></div>
      <p>{error}</p>
    </div>
  )
})

ErrorMessage.displayName = 'ErrorMessage'

export default ErrorMessage
