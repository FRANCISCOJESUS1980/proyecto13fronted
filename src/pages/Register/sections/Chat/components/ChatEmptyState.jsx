import React from 'react'

const ChatEmptyState = React.memo(() => {
  return (
    <div className='cf-chat-no-messages'>
      <div className='cf-chat-empty-icon'></div>
      <p>No hay mensajes aún</p>
      <p>¡Sé el primero en enviar un mensaje!</p>
    </div>
  )
})

ChatEmptyState.displayName = 'ChatEmptyState'

export default ChatEmptyState
