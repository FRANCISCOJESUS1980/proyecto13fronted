import React from 'react'
import Button from '../../../../../components/Button/Button'
import { useNavigationChat } from '../hooks/useNavigationChat'
import { useChatOptimized } from '../hooks/useChatOptimized'

const ChatHeader = React.memo(() => {
  const { goToDashboard } = useNavigationChat()
  const { userData, handleDeleteAllMessages } = useChatOptimized()
  const { isAdmin } = userData()

  return (
    <div className='cf-chat-header-actions'>
      <Button
        variant='secondary'
        onClick={goToDashboard}
        leftIcon={<span className='cf-chat-back-icon'></span>}
        className='cf-chat-back-button'
      >
        Volver al Dashboard
      </Button>

      {isAdmin && (
        <Button
          variant='secondary'
          onClick={handleDeleteAllMessages}
          className='cf-chat-delete-all-button'
        >
          <span className='cf-chat-delete-all-icon'></span>
          Eliminar Todos los Mensajes
        </Button>
      )}
    </div>
  )
})

ChatHeader.displayName = 'ChatHeader'

export default ChatHeader
