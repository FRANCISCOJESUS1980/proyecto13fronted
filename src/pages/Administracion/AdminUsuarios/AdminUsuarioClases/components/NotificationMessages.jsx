import MensajeEstado from '../../../../Clases/components/MensajeEstado/MensajeEstado'

const NotificationMessages = ({ inscripcionExitosa, cancelacionExitosa }) => {
  if (!inscripcionExitosa && !cancelacionExitosa) {
    return null
  }

  return (
    <div className='cf-notifications'>
      {inscripcionExitosa && (
        <MensajeEstado tipo='exito' mensaje={inscripcionExitosa} />
      )}
      {cancelacionExitosa && (
        <MensajeEstado tipo='info' mensaje={cancelacionExitosa} />
      )}
    </div>
  )
}

export default NotificationMessages
