import React, { useEffect } from 'react'
import { X, Download, User, Calendar } from 'lucide-react'

const SignatureModal = React.memo(({ signature, userName, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = signature
    link.download = `firma_${
      userName?.replace(/\s+/g, '_') || 'usuario'
    }_${new Date().getTime()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className='cf-signature-modal-overlay' onClick={handleBackdropClick}>
      <div className='cf-signature-modal'>
        <div className='cf-signature-modal-header'>
          <div className='cf-signature-modal-title'>
            <User size={20} />
            <h3>Firma Digital</h3>
          </div>
          <button className='cf-signature-modal-close' onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className='cf-signature-modal-content'>
          <div className='cf-signature-modal-info'>
            <div className='cf-signature-info-item'>
              <User size={16} />
              <span>{userName || 'Usuario desconocido'}</span>
            </div>
            <div className='cf-signature-info-item'>
              <Calendar size={16} />
              <span>{new Date().toLocaleDateString('es-ES')}</span>
            </div>
          </div>

          <div className='cf-signature-display'>
            <img
              src={signature || '/placeholder.svg'}
              alt={`Firma de ${userName}`}
              className='cf-signature-image'
            />
          </div>

          <div className='cf-signature-modal-actions'>
            <button
              className='cf-signature-download-btn'
              onClick={handleDownload}
            >
              <Download size={16} />
              <span>Descargar Firma</span>
            </button>
            <button className='cf-signature-close-btn' onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})

SignatureModal.displayName = 'SignatureModal'
export default SignatureModal
