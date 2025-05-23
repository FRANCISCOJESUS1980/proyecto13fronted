import React from 'react'
import Button from '../../../../../components/Button/Button'

const PausarBonoModal = ({
  show,
  onClose,
  pausarBonoForm,
  onChange,
  onSubmit,
  loading
}) => {
  if (!show) return null

  return (
    <div className='cf-gestion-bonos-modal-overlay'>
      <div className='cf-gestion-bonos-modal'>
        <div className='cf-gestion-bonos-modal-header'>
          <h2>Pausar Bono</h2>
          <button className='cf-gestion-bonos-modal-close' onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className='cf-gestion-bonos-form-group'>
            <label htmlFor='motivo'>Motivo de la Pausa</label>
            <textarea
              id='motivo'
              name='motivo'
              value={pausarBonoForm.motivo}
              onChange={(e) => onChange({ motivo: e.target.value })}
              required
              rows='4'
              placeholder='Ej: Lesión, vacaciones, enfermedad...'
            ></textarea>
          </div>

          <div className='cf-gestion-bonos-form-actions'>
            <Button type='button' variant='secondary' onClick={onClose}>
              Cancelar
            </Button>
            <Button type='submit' variant='primary' disabled={loading}>
              {loading ? 'Pausando...' : 'Pausar Bono'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PausarBonoModal
