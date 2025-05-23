import React from 'react'
import Button from '../../../../../components/Button/Button'

const AñadirSesionesModal = ({
  show,
  onClose,
  sesionesForm,
  onChange,
  onSubmit,
  loading
}) => {
  if (!show) return null

  return (
    <div className='cf-gestion-bonos-modal-overlay'>
      <div className='cf-gestion-bonos-modal'>
        <div className='cf-gestion-bonos-modal-header'>
          <h2>Añadir Sesiones</h2>
          <button className='cf-gestion-bonos-modal-close' onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className='cf-gestion-bonos-form-group'>
            <label htmlFor='sesionesAdicionales'>Número de Sesiones</label>
            <input
              type='number'
              id='sesionesAdicionales'
              name='sesionesAdicionales'
              value={sesionesForm.sesionesAdicionales}
              onChange={(e) =>
                onChange({
                  sesionesAdicionales: parseInt(e.target.value)
                })
              }
              min='1'
              required
            />
          </div>

          <div className='cf-gestion-bonos-form-actions'>
            <Button type='button' variant='secondary' onClick={onClose}>
              Cancelar
            </Button>
            <Button type='submit' variant='primary' disabled={loading}>
              {loading ? 'Añadiendo...' : 'Añadir Sesiones'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AñadirSesionesModal
