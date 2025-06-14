import React from 'react'
import { useConsentimientoOptimized } from '../hooks/useConsentimientoOptimized'

const ConsentFooter = React.memo(() => {
  const { loading, uiState, handleAccept } = useConsentimientoOptimized()
  const { canSubmit } = uiState()

  return (
    <div className='consent-footer'>
      <button
        className={`accept-button ${!canSubmit ? 'disabled' : ''}`}
        disabled={!canSubmit}
        onClick={handleAccept}
      >
        {loading ? 'PROCESANDO...' : 'ACEPTAR'}
      </button>
    </div>
  )
})

ConsentFooter.displayName = 'ConsentFooter'

export default ConsentFooter
