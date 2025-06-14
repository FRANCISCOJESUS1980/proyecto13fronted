import React from 'react'
import { useChatOptimized } from '../hooks/useChatOptimized'

const ChatMessageActions = React.memo(({ message }) => {
  const { setEditingMessage, handleDeleteMessage } = useChatOptimized()

  const onEdit = React.useCallback(() => {
    setEditingMessage(message._id)
  }, [message._id, setEditingMessage])

  const onDelete = React.useCallback(() => {
    handleDeleteMessage(message._id)
  }, [message._id, handleDeleteMessage])

  return (
    <div className='cf-chat-message-actions'>
      <button
        onClick={onEdit}
        className='cf-chat-message-action-btn cf-chat-edit-btn'
        title='Editar mensaje'
      >
        <span className='cf-chat-edit-icon'></span>
      </button>
      <button
        onClick={onDelete}
        className='cf-chat-message-action-btn cf-chat-delete-btn'
        title='Eliminar mensaje'
      >
        <span className='cf-chat-delete-icon'></span>
      </button>
    </div>
  )
})

ChatMessageActions.displayName = 'ChatMessageActions'

export default ChatMessageActions
