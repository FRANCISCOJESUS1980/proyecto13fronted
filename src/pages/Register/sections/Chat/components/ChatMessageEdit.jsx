import React from 'react'
import { useChatOptimized } from '../hooks/useChatOptimized'

const ChatMessageEdit = React.memo(() => {
  const { editText, setEditText, saveEdit, cancelEditing } = useChatOptimized()

  return (
    <div className='cf-chat-message-edit'>
      <textarea
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        className='cf-chat-edit-textarea'
        autoFocus
      />
      <div className='cf-chat-edit-buttons'>
        <button onClick={saveEdit} className='cf-chat-edit-save-btn'>
          <span className='cf-chat-save-icon'></span>
          Guardar
        </button>
        <button onClick={cancelEditing} className='cf-chat-edit-cancel-btn'>
          <span className='cf-chat-cancel-icon'></span>
          Cancelar
        </button>
      </div>
    </div>
  )
})

ChatMessageEdit.displayName = 'ChatMessageEdit'

export default ChatMessageEdit
