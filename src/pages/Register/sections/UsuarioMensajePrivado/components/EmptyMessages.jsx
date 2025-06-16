import React from 'react'

const EmptyMessages = React.memo(() => {
  return (
    <div className='cf-mensajes-empty'>
      <div className='cf-mensajes-empty-icon'></div>
      <p>No hay mensajes previos.</p>
      <p>
        Envía un mensaje para comenzar una conversación con el administrador.
      </p>
    </div>
  )
})

EmptyMessages.displayName = 'EmptyMessages'

export default EmptyMessages
