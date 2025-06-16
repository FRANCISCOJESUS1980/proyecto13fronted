import React from 'react'
import { useMensajesPrivadosOptimized } from '../hooks/useMensajesPrivadosOptimized'

const MessageActions = React.memo(({ mensaje }) => {
  const { setEditingMessage, handleDeleteMessage } =
    useMensajesPrivadosOptimized()

  const handleEdit = React.useCallback(() => {
    setEditingMessage(mensaje._id)
  }, [setEditingMessage, mensaje._id])

  const handleDelete = React.useCallback(() => {
    handleDeleteMessage(mensaje._id)
  }, [handleDeleteMessage, mensaje._id])

  return (
    <div className='cf-mensajes-message-actions'>
      <button
        onClick={handleEdit}
        className='cf-mensajes-message-action-btn cf-mensajes-edit-btn'
        title='Editar mensaje'
      >
        <span className='cf-mensajes-edit-icon'></span>
      </button>
      <button
        onClick={handleDelete}
        className='cf-mensajes-message-action-btn cf-mensajes-delete-btn'
        title='Eliminar mensaje'
      >
        <span className='cf-mensajes-delete-icon'></span>
      </button>
    </div>
  )
})

MessageActions.displayName = 'MessageActions'

export default MessageActions
