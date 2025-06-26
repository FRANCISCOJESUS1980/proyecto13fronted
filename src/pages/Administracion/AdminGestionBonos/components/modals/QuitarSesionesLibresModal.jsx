import { useState } from 'react'
import Button from '../../../../../components/Button/Button'

const QuitarSesionesLibresModal = ({
  show,
  onClose,
  onSubmit,
  loading,
  usuario,
  sesionesLibres
}) => {
  const [formData, setFormData] = useState({
    cantidad: 1,
    motivo: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'cantidad' ? Number.parseInt(value) || 1 : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({ cantidad: 1, motivo: '' })
  }

  if (!show) return null

  return (
    <div className='cf-gestion-bonos-modal-overlay'>
      <div className='cf-gestion-bonos-modal'>
        <div className='cf-gestion-bonos-modal-header'>
          <h2>Quitar Sesiones Libres</h2>
          <button className='cf-gestion-bonos-modal-close' onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='cf-gestion-bonos-form-group'>
            <label htmlFor='usuario'>Usuario</label>
            <input
              type='text'
              value={`${usuario?.nombre || ''} ${usuario?.apellidos || ''}`}
              disabled
            />
          </div>

          <div className='cf-gestion-bonos-form-group'>
            <label htmlFor='sesionesActuales'>Sesiones Libres Actuales</label>
            <input type='text' value={sesionesLibres} disabled />
          </div>

          <div className='cf-gestion-bonos-form-group'>
            <label htmlFor='cantidad'>Cantidad a Quitar</label>
            <input
              type='number'
              id='cantidad'
              name='cantidad'
              value={formData.cantidad}
              onChange={handleChange}
              min='1'
              max={sesionesLibres}
              required
            />
            <small>Máximo: {sesionesLibres} sesiones</small>
          </div>

          <div className='cf-gestion-bonos-form-group'>
            <label htmlFor='motivo'>Motivo *</label>
            <select
              id='motivo'
              name='motivo'
              value={formData.motivo}
              onChange={handleChange}
              required
            >
              <option value=''>Selecciona un motivo</option>
              <option value='Error en asignación'>Error en asignación</option>
              <option value='Corrección administrativa'>
                Corrección administrativa
              </option>
              <option value='Solicitud del usuario'>
                Solicitud del usuario
              </option>
              <option value='Sesiones expiradas'>Sesiones expiradas</option>
              <option value='Otro'>Otro</option>
            </select>
          </div>

          <div className='cf-gestion-bonos-form-actions'>
            <Button type='button' variant='secondary' onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type='submit'
              variant='danger'
              disabled={loading || formData.cantidad > sesionesLibres}
            >
              {loading ? 'Quitando...' : 'Quitar Sesiones'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default QuitarSesionesLibresModal
