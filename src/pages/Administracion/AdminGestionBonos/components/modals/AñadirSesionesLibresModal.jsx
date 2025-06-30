import { useState } from 'react'
import Button from '../../../../../components/Button/Button'

const AñadirSesionesLibresModal = ({
  show,
  onClose,
  onSubmit,
  loading,
  usuario
}) => {
  const [formData, setFormData] = useState({
    cantidad: 1,
    motivo: '',
    detalles: ''
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
    setFormData({ cantidad: 1, motivo: '', detalles: '' })
  }

  const getUserDisplayName = () => {
    if (!usuario) return 'Cargando usuario...'

    const userData = usuario.data || usuario

    const nombre = userData.nombre || ''
    const apellidos = userData.apellidos || ''

    const fullName = `${nombre} ${apellidos}`.trim()

    return fullName || userData.email || 'Usuario sin nombre'
  }

  if (!show) return null

  return (
    <div className='cf-gestion-bonos-modal-overlay'>
      <div className='cf-gestion-bonos-modal'>
        <div className='cf-gestion-bonos-modal-header'>
          <h2>Añadir Sesiones Libres</h2>
          <button className='cf-gestion-bonos-modal-close' onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='cf-gestion-bonos-form-group'>
            <label htmlFor='usuario'>Usuario</label>
            <input type='text' value={getUserDisplayName()} disabled />
          </div>

          <div className='cf-gestion-bonos-form-group'>
            <label htmlFor='cantidad'>Cantidad de Sesiones</label>
            <input
              type='number'
              id='cantidad'
              name='cantidad'
              value={formData.cantidad}
              onChange={handleChange}
              min='1'
              max='50'
              required
            />
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
              <option value='Promoción de bienvenida'>
                Promoción de bienvenida
              </option>
              <option value='Compensación por problema'>
                Compensación por problema
              </option>
              <option value='Regalo promocional'>Regalo promocional</option>
              <option value='Clase de prueba'>Clase de prueba</option>
              <option value='Fidelización'>Fidelización</option>
              <option value='Otro'>Otro</option>
            </select>
          </div>

          <div className='cf-gestion-bonos-form-group'>
            <label htmlFor='detalles'>Detalles adicionales</label>
            <textarea
              id='detalles'
              name='detalles'
              value={formData.detalles}
              onChange={handleChange}
              rows='3'
              placeholder='Información adicional sobre el motivo...'
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

export default AñadirSesionesLibresModal
