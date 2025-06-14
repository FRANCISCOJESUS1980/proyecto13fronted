import React from 'react'
import ConsentHeader from './ConsentHeader'
import ConsentContent from './ConsentContent'
import ConsentFooter from './ConsentFooter'
import { useConsentimientoOptimized } from '../hooks/useConsentimientoOptimized'

const ConsentForm = React.memo(() => {
  const { aceptado } = useConsentimientoOptimized()

  if (aceptado) {
    return null
  }

  return (
    <>
      <ConsentHeader />
      <ConsentContent />
      <ConsentFooter />
    </>
  )
})

ConsentForm.displayName = 'ConsentForm'

export default ConsentForm
