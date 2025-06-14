import React from 'react'
import Button from '../../../../../components/Button/Button'
import { useChatOptimized } from '../hooks/useChatOptimized'

const ChatInput = React.memo(() => {
  const { message, setMessage, sendMessage } = useChatOptimized()

  const handleChange = React.useCallback(
    (e) => {
      setMessage(e.target.value)
    },
    [setMessage]
  )

  return (
    <form onSubmit={sendMessage} className='cf-chat-input-container'>
      <div className='cf-chat-input-wrapper'>
        <input
          className='cf-chat-input'
          type='text'
          placeholder='Escribe un mensaje...'
          value={message}
          onChange={handleChange}
        />
        <Button
          type='submit'
          variant='primary'
          size='md'
          className='cf-chat-send-button'
          disabled={!message.trim()}
        >
          <span className='cf-chat-send-icon'></span>
          <span className='cf-chat-send-text'>Enviar</span>
        </Button>
      </div>
    </form>
  )
})

ChatInput.displayName = 'ChatInput'

export default ChatInput
