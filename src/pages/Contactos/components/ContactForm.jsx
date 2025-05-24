import { MessageSquare, Send } from 'lucide-react'
import { memo } from 'react'

const ContactForm = memo(({ mensajeEnviado, onSubmit, onNuevoMensaje }) => {
  return (
    <div className='cf-contacto-formulario-container'>
      {!mensajeEnviado ? (
        <ContactFormContent onSubmit={onSubmit} />
      ) : (
        <SuccessMessage onNuevoMensaje={onNuevoMensaje} />
      )}
    </div>
  )
})

const ContactFormContent = ({ onSubmit }) => (
  <div className='cf-contacto-formulario'>
    <div className='cf-contacto-formulario-header'>
      <div className='cf-contacto-formulario-icon'>
        <MessageSquare size={24} />
      </div>
      <h2 className='cf-contacto-formulario-title'>Envíanos un Mensaje</h2>
    </div>

    <form onSubmit={onSubmit} className='cf-contacto-form'>
      <FormField
        id='nombre'
        label='Nombre'
        type='text'
        placeholder='Tu nombre'
      />
      <FormField
        id='email'
        label='Email'
        type='email'
        placeholder='Tu correo electrónico'
      />
      <FormField
        id='mensaje'
        label='Mensaje'
        type='textarea'
        placeholder='Escribe tu mensaje'
        rows={4}
      />

      <button type='submit' className='cf-contacto-form-submit'>
        <Send size={18} />
        <span>Enviar mensaje</span>
      </button>
    </form>
  </div>
)

const FormField = ({ id, label, type, placeholder, rows }) => (
  <div className='cf-contacto-form-group'>
    <label htmlFor={id} className='cf-contacto-form-label'>
      {label}
    </label>
    {type === 'textarea' ? (
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        required
        className='cf-contacto-form-textarea'
      />
    ) : (
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        required
        className='cf-contacto-form-input'
      />
    )}
  </div>
)

const SuccessMessage = ({ onNuevoMensaje }) => (
  <div className='cf-contacto-mensaje-exito'>
    <div className='cf-contacto-mensaje-exito-icon'></div>
    <h3 className='cf-contacto-mensaje-exito-title'>
      ¡Gracias por tu mensaje!
    </h3>
    <p className='cf-contacto-mensaje-exito-text'>Te contactaremos pronto.</p>
    <button onClick={onNuevoMensaje} className='cf-contacto-mensaje-exito-btn'>
      Enviar otro mensaje
    </button>
  </div>
)

ContactForm.displayName = 'ContactForm'

export default ContactForm
