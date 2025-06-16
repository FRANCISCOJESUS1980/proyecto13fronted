import React from 'react'
import MessageEdit from './MessageEdit'
import MessageActions from './MessageActions'
import { useMensajesPrivadosOptimized } from '../hooks/useMensajesPrivadosOptimized'
import { useMessageUtils } from '../hooks/useMessageUtils'

const MessageItem = React.memo(({ mensaje }) => {
  const { editingMessageId, userId } = useMensajesPrivadosOptimized()
  const { formatDate, isOwnMessage } = useMessageUtils()

  const esUsuarioActual = isOwnMessage(mensaje, userId)
  const isEditing = editingMessageId === mensaje._id

  return (
    <div
      className={`cf-mensajes-message ${
        esUsuarioActual ? 'cf-mensajes-sent' : 'cf-mensajes-received'
      }`}
    >
      <div className='cf-mensajes-message-content'>
        {isEditing ? (
          <MessageEdit />
        ) : (
          <>
            <p>{mensaje.mensaje}</p>
            <span className='cf-mensajes-message-time'>
              {formatDate(mensaje.fecha)}
            </span>

            {esUsuarioActual && <MessageActions mensaje={mensaje} />}
          </>
        )}
      </div>
    </div>
  )
})

MessageItem.displayName = 'MessageItem'

export default MessageItem
