import React from 'react'
import MensajesHeader from './MensajesHeader'
import ErrorMessage from './ErrorMessage'
import ChatContainer from './ChatContainer'
import { useMensajesPrivadosOptimized } from '../hooks/useMensajesPrivadosOptimized'

const MensajesContent = React.memo(() => {
  const { animationComplete } = useMensajesPrivadosOptimized()

  return (
    <div
      className={`cf-mensajes-content-wrapper ${
        animationComplete ? 'cf-mensajes-content-visible' : ''
      }`}
    >
      <MensajesHeader />
      <ErrorMessage />
      <ChatContainer />
    </div>
  )
})

MensajesContent.displayName = 'MensajesContent'

export default MensajesContent
