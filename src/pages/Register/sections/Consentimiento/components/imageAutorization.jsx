import React from 'react'
import { useConsentimientoOptimized } from '../hooks/useConsentimientoOptimized'

const ImageAuthorization = React.memo(() => {
  const { autorizaImagen, error, setAutorizaImagen } =
    useConsentimientoOptimized()

  const handleAutorizaImagen = React.useCallback(
    (value) => {
      setAutorizaImagen(value)
    },
    [setAutorizaImagen]
  )

  return (
    <div className='consent-section'>
      <h4>AUTORIZACIÓN DE IMAGEN</h4>
      <div className='consent-text'>
        <p>
          Estoy de acuerdo en permitir al centro, filmaciones en video, y/o
          imagen de mí con fines publicitarios. En caso de no permitir el uso de
          lo antes mencionado, estoy de acuerdo que debo informar al CENTRO de
          ello de forma expresamente escrita.
        </p>

        <div className='authorization-options'>
          <div
            className={`option ${autorizaImagen === true ? 'selected' : ''}`}
            onClick={() => handleAutorizaImagen(true)}
          >
            <div className='checkbox'>{autorizaImagen === true && '✓'}</div>
            <span>Sí autorizo</span>
          </div>
          <div
            className={`option ${autorizaImagen === false ? 'selected' : ''}`}
            onClick={() => handleAutorizaImagen(false)}
          >
            <div className='checkbox'>{autorizaImagen === false && '✓'}</div>
            <span>NO autorizo</span>
          </div>
        </div>

        {error && <p className='error-message'>{error}</p>}
      </div>
    </div>
  )
})

ImageAuthorization.displayName = 'ImageAuthorization'

export default ImageAuthorization
