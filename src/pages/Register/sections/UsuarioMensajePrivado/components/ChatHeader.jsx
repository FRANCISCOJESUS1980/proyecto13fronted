import React from 'react'
import { getImageUrl } from '../../../../../pages/Clases/utils/imageUtils'
import { useMensajesPrivadosOptimized } from '../hooks/useMensajesPrivadosOptimized'

const ChatHeader = React.memo(() => {
  const { adminInfo } = useMensajesPrivadosOptimized()

  if (!adminInfo) return null

  return (
    <div className='cf-mensajes-chat-header'>
      <div className='cf-mensajes-avatar-container'>
        <img
          src={getImageUrl(adminInfo) || '/default-avatar.png'}
          alt={adminInfo.nombre}
          className='cf-mensajes-avatar'
        />
        <span className='cf-mensajes-status-indicator'></span>
      </div>
      <div className='cf-mensajes-chat-info'>
        <h2 className='cf-mensajes-chat-name'>{adminInfo.nombre}</h2>
        <p className='cf-mensajes-chat-role'>Administrador</p>
      </div>
    </div>
  )
})

ChatHeader.displayName = 'ChatHeader'

export default ChatHeader
