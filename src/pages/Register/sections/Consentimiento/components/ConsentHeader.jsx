import React from 'react'

const ConsentHeader = React.memo(() => {
  return (
    <div className='consent-header'>
      <h2 className='consent-title'>CONSENTIMIENTO INFORMADO</h2>
      <div className='progress-indicator'>
        <div className='progress-bar' style={{ width: `` }}></div>
      </div>
    </div>
  )
})

ConsentHeader.displayName = 'ConsentHeader'

export default ConsentHeader
