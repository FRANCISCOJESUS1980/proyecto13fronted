import React from 'react'
import { useTextareaAutoResize } from '../hooks/useTextareaAutoResize'
import { useMensajeMasivoOptimized } from '../hooks/useMensajeMasivoOptimized'

const FormFields = React.memo(() => {
  const {
    mensaje,
    asunto,
    enviarEmail,
    setMensaje,
    setAsunto,
    setEnviarEmail
  } = useMensajeMasivoOptimized()
  const textareaRef = useTextareaAutoResize(mensaje)

  return (
    <div className='cf-input-wrapper'>
      <div className='cf-input-field'>
        <span className='cf-input-icon cf-mail-icon'></span>
        <input
          type='text'
          name='asunto'
          placeholder='Asunto del mensaje'
          value={asunto}
          onChange={(e) => setAsunto(e.target.value)}
          required
          className='cf-text-input'
          autoComplete='off'
        />
      </div>

      <div className='cf-input-field'>
        <span className='cf-input-icon cf-message-icon'></span>
        <textarea
          ref={textareaRef}
          name='mensaje'
          placeholder='Escribe el mensaje para todos los usuarios...'
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
          className='cf-text-input'
          rows={6}
        />
      </div>

      <div className='cf-admin-mensaje-masivo-checkbox-container'>
        <input
          type='checkbox'
          id='enviarEmail'
          checked={enviarEmail}
          onChange={(e) => setEnviarEmail(e.target.checked)}
          className='cf-admin-mensaje-masivo-checkbox'
        />
        <label
          htmlFor='enviarEmail'
          className='cf-admin-mensaje-masivo-checkbox-label'
        >
          Enviar notificación por email a los usuarios
        </label>
      </div>
    </div>
  )
})

FormFields.displayName = 'FormFields'

export default FormFields
