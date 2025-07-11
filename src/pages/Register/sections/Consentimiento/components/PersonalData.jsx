import React from 'react'
import { useConsentimientoOptimized } from '../hooks/useConsentimientoOptimized'

const PersonalData = React.memo(() => {
  const { nombreCompleto, dni, setNombreCompleto, setDni } =
    useConsentimientoOptimized()

  const handleNombreChange = React.useCallback(
    (e) => {
      setNombreCompleto(e.target.value)
    },
    [setNombreCompleto]
  )

  const handleDniChange = React.useCallback(
    (e) => {
      const value = e.target.value.toUpperCase()
      if (/^[0-9A-Z]*$/.test(value) && value.length <= 9) {
        setDni(value)
      }
    },
    [setDni]
  )

  return (
    <div className='consent-section'>
      <h4>DATOS PERSONALES</h4>
      <div className='personal-data-form'>
        <div className='form-group'>
          <label htmlFor='nombreCompleto' className='form-label'>
            Nombre completo *
          </label>
          <input
            type='text'
            id='nombreCompleto'
            className='form-input'
            value={nombreCompleto || ''}
            onChange={handleNombreChange}
            placeholder='Introduce tu nombre completo'
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='dni' className='form-label'>
            DNI *
          </label>
          <input
            type='text'
            id='dni'
            className='form-input'
            value={dni || ''}
            onChange={handleDniChange}
            placeholder='12345678A'
            maxLength={9}
            required
          />
          <small className='form-help'>
            Formato: 8 números seguidos de una letra (ej: 12345678A)
          </small>
        </div>
      </div>
    </div>
  )
})

PersonalData.displayName = 'PersonalData'
export default PersonalData
