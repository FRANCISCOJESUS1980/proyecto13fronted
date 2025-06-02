import { forwardRef } from 'react'

const MessageList = forwardRef(
  (
    {
      mensajes,
      userId,
      editingMessageId,
      editText,
      onStartEditing,
      onCancelEditing,
      onSaveEdit,
      onDeleteMessage,
      onSetEditText,
      formatearFecha,
      canModifyMessage
    },
    ref
  ) => {
    if (mensajes.length === 0) {
      return (
        <div className='cf-admin-mensajes-chat' ref={ref}>
          <div className='cf-admin-mensajes-empty'>
            <div className='cf-admin-mensajes-empty-icon'></div>
            <h3 className='cf-admin-mensajes-empty-title'>
              No hay mensajes previos
            </h3>
            <p className='cf-admin-mensajes-empty-text'>
              No hay mensajes previos con este usuario.
              <br />
              Envía un mensaje para iniciar la conversación.
            </p>
          </div>
        </div>
      )
    }

    return (
      <div className='cf-admin-mensajes-chat' ref={ref}>
        {mensajes.map((mensaje, index) => {
          const esAdmin = mensaje.remitente._id !== userId
          const mostrarFecha =
            index === 0 ||
            new Date(mensaje.fecha).toDateString() !==
              new Date(mensajes[index - 1].fecha).toDateString()
          const isEditing = editingMessageId === mensaje._id

          return (
            <div
              key={mensaje._id}
              className='cf-admin-mensajes-mensaje-wrapper'
            >
              {mostrarFecha && (
                <div className='cf-admin-mensajes-fecha-separador'>
                  <span>{new Date(mensaje.fecha).toLocaleDateString()}</span>
                </div>
              )}
              <div
                className={`cf-admin-mensajes-mensaje ${
                  esAdmin ? 'enviado' : 'recibido'
                }`}
              >
                <div className='cf-admin-mensajes-mensaje-contenido'>
                  {isEditing ? (
                    <div className='cf-admin-mensajes-mensaje-edit'>
                      <textarea
                        value={editText}
                        onChange={(e) => onSetEditText(e.target.value)}
                        className='cf-admin-mensajes-edit-textarea'
                        autoFocus
                      />
                      <div className='cf-admin-mensajes-edit-buttons'>
                        <button
                          onClick={onSaveEdit}
                          className='cf-admin-mensajes-edit-save-btn'
                        >
                          <span className='cf-admin-mensajes-save-icon'></span>
                          Guardar
                        </button>
                        <button
                          onClick={() => onCancelEditing()}
                          className='cf-admin-mensajes-edit-cancel-btn'
                        >
                          <span className='cf-admin-mensajes-cancel-icon'></span>
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p>{mensaje.mensaje}</p>
                      <span className='cf-admin-mensajes-mensaje-fecha'>
                        {formatearFecha(mensaje.fecha)}
                      </span>

                      {canModifyMessage(mensaje) && (
                        <div className='cf-admin-mensajes-mensaje-actions'>
                          <button
                            onClick={() => onStartEditing(mensaje)}
                            className='cf-admin-mensajes-mensaje-action-btn cf-admin-mensajes-edit-btn'
                            title='Editar mensaje'
                          >
                            <span className='cf-admin-mensajes-edit-icon'></span>
                          </button>
                          <button
                            onClick={() => onDeleteMessage(mensaje._id)}
                            className='cf-admin-mensajes-mensaje-action-btn cf-admin-mensajes-delete-btn'
                            title='Eliminar mensaje'
                          >
                            <span className='cf-admin-mensajes-delete-icon'></span>
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
)

MessageList.displayName = 'MessageList'

export default MessageList
