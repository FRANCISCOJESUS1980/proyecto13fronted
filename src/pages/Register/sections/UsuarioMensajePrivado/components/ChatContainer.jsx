import React from 'react'
import ChatHeader from './ChatHeader'
import MessagesList from './MessageList'
import MessageForm from './MessageForm'

const ChatContainer = React.memo(() => {
  return (
    <div className='cf-mensajes-chat-container'>
      <ChatHeader />
      <MessagesList />
      <MessageForm />
    </div>
  )
})

ChatContainer.displayName = 'ChatContainer'

export default ChatContainer
