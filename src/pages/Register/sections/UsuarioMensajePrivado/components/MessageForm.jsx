import React from 'react'
import { useMensajesPrivadosOptimized } from '../hooks/useMensajesPrivadosOptimized'

const MessageForm = React.memo(() => {
  const {
    nuevoMensaje,
    setNuevoMensaje,
    enviando,
    adminInfo,
    handleEnviarMensaje
  } = useMensajesPrivadosOptimized()

  const canSend = nuevoMensaje.trim() && adminInfo && !enviando

  return (
    <form className='cf-mensajes-form' onSubmit={handleEnviarMensaje}>
      <div className='cf-mensajes-input-container'>
        <textarea
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
          placeholder='Escribe un mensaje...'
          disabled={enviando || !adminInfo}
          className='cf-mensajes-textarea'
        />
        <button
          type='submit'
          className='cf-mensajes-send-button'
          disabled={!canSend}
        >
          {enviando ? (
            <div className='cf-mensajes-spinner-small'></div>
          ) : (
            <span className='cf-mensajes-send-icon'></span>
          )}
        </button>
      </div>
    </form>
  )
})

MessageForm.displayName = 'MessageForm'

export default MessageForm
