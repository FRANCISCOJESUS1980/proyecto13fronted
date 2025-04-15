import { useState, useEffect } from 'react'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'
import './MensajeEstado.css'

const MensajeEstado = ({ tipo, mensaje }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [mensaje])

  if (!visible) return null

  const getIcon = () => {
    switch (tipo) {
      case 'exito':
        return <CheckCircle size={20} className='cf-mensaje-estado-icon' />
      case 'error':
        return <AlertCircle size={20} className='cf-mensaje-estado-icon' />
      case 'info':
        return <Info size={20} className='cf-mensaje-estado-icon' />
      default:
        return <Info size={20} className='cf-mensaje-estado-icon' />
    }
  }

  return (
    <div className={`cf-mensaje-estado cf-mensaje-estado-${tipo}`}>
      <div className='cf-mensaje-estado-content'>
        {getIcon()}
        <p className='cf-mensaje-estado-text'>{mensaje}</p>
      </div>
      <button
        className='cf-mensaje-estado-close'
        onClick={() => setVisible(false)}
      >
        <X size={16} />
      </button>
    </div>
  )
}

export default MensajeEstado
