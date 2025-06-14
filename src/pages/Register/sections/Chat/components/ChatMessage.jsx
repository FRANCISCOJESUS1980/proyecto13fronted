import React from 'react'
import { useChatOptimized } from '../hooks/useChatOptimized'
import ChatMessageEdit from './ChatMessageEdit'
import ChatMessageActions from './ChatMessageActions'

const ChatMessage = React.memo(({ message, index }) => {
  const { formatDate, canModifyMessage, editingMessageId, currentUserId } =
    useChatOptimized()
  const { date, time } = formatDate(message.createdAt)
  const displayName = message.userName || 'Usuario'
  const isEditing = editingMessageId === message._id
  const isOwnMessage = message.userId === currentUserId
  const isAdmin = message.userRole === 'admin'
  const canModify = canModifyMessage(message)

  return (
    <div
      className={`cf-chat-message-wrapper ${
        isOwnMessage ? 'cf-chat-own-message' : ''
      } ${isAdmin ? 'cf-chat-admin-message' : ''}`}
    >
      <div className='cf-chat-message'>
        <div className='cf-chat-message-header'>
          <span className='cf-chat-message-username'>
            {isAdmin && <span className='cf-chat-admin-badge'>Admin</span>}
            {displayName}
          </span>
          <span className='cf-chat-message-date'>{date}</span>
        </div>

        {isEditing ? (
          <ChatMessageEdit />
        ) : (
          <>
            <div className='cf-chat-message-body'>{message.text}</div>
            <div className='cf-chat-message-footer'>
              <span className='cf-chat-message-time'>{time}</span>
              {canModify && <ChatMessageActions message={message} />}
            </div>
          </>
        )}
      </div>
    </div>
  )
})

ChatMessage.displayName = 'ChatMessage'

export default ChatMessage
