import React from 'react'
import { useMensajesPrivadosOptimized } from '../hooks/useMensajesPrivadosOptimized'

const MessageEdit = React.memo(() => {
  const { editText, setEditText, saveEdit, cancelEditing } =
    useMensajesPrivadosOptimized()

  return (
    <div className='cf-mensajes-message-edit'>
      <textarea
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        className='cf-mensajes-edit-textarea'
        autoFocus
      />
      <div className='cf-mensajes-edit-buttons'>
        <button onClick={saveEdit} className='cf-mensajes-edit-save-btn'>
          <span className='cf-mensajes-save-icon'></span>
          Guardar
        </button>
        <button onClick={cancelEditing} className='cf-mensajes-edit-cancel-btn'>
          <span className='cf-mensajes-cancel-icon'></span>
          Cancelar
        </button>
      </div>
    </div>
  )
})

MessageEdit.displayName = 'MessageEdit'

export default MessageEdit
