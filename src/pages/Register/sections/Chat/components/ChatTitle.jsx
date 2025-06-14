import React from 'react'

const ChatTitle = React.memo(() => {
  return (
    <div className='cf-chat-title-container'>
      <div className='cf-chat-icon'></div>
      <h2 className='cf-chat-title'>Chat en Vivo</h2>
    </div>
  )
})

ChatTitle.displayName = 'ChatTitle'

export default ChatTitle
