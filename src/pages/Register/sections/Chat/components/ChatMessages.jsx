import React from 'react'
import { useChatOptimized } from '../hooks/useChatOptimized'
import ChatEmptyState from './ChatEmptyState'
import ChatMessage from './ChatMessage'

const ChatMessages = React.memo(() => {
  const { messages, messagesEndRef } = useChatOptimized()
  const chatBoxRef = React.useRef(null)

  return (
    <div className='cf-chat-box' ref={chatBoxRef}>
      {messages.length === 0 ? (
        <ChatEmptyState />
      ) : (
        <div className='cf-chat-messages-container'>
          {messages.map((msg, index) => (
            <ChatMessage key={msg._id || index} message={msg} index={index} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  )
})

ChatMessages.displayName = 'ChatMessages'

export default ChatMessages
