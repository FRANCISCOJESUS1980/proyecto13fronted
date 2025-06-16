import React from 'react'
import MessageItem from './MessageItem'
import EmptyMessages from './EmptyMessages'
import { useMensajesPrivadosOptimized } from '../hooks/useMensajesPrivadosOptimized'

const MessagesList = React.memo(() => {
  const { mensajes, mensajesRef } = useMensajesPrivadosOptimized()

  return (
    <div className='cf-mensajes-messages-container' ref={mensajesRef}>
      {mensajes.length === 0 ? (
        <EmptyMessages />
      ) : (
        <div className='cf-mensajes-messages-list'>
          {mensajes.map((mensaje) => (
            <MessageItem key={mensaje._id} mensaje={mensaje} />
          ))}
        </div>
      )}
    </div>
  )
})

MessagesList.displayName = 'MessagesList'

export default MessagesList
