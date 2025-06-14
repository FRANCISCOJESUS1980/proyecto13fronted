import React from 'react'
import ChatTitle from './ChatTitle'
import ChatMessages from './ChatMessages'
import ChatInput from './Chatinput'

const ChatContent = React.memo(() => {
  return (
    <div className='cf-chat-content'>
      <ChatTitle />
      <ChatMessages />
      <ChatInput />
    </div>
  )
})

ChatContent.displayName = 'ChatContent'

export default ChatContent
