import React, { memo } from 'react'
import Button from '../../../../../components/Button/Button'

const OPCIONES_BONOS = [
  { value: '8 Sesiones', label: '8 Sesiones (40€)' },
  { value: '10 Sesiones', label: '10 Sesiones (45€)' },
  { value: '12 Sesiones', label: '12 Sesiones (50€)' },
  { value: '16 Sesiones', label: '16 Sesiones (55€)' },
  { value: '20 Sesiones', label: '20 Sesiones (60€)' },
  { value: 'Ilimitado', label: 'Ilimitado (65€)' },
  { value: 'Bono 5 sesiones', label: 'Bono 5 sesiones (40€)' },
  {
    value: 'Curso de iniciación + 2 meses',
    label: 'Curso de iniciación + 2 meses (80€)'
  },
  { value: 'Drop in', label: 'Drop in (10€)' }
]

const NuevoBonoModal = memo(
  ({ show, onClose, nuevoBonoForm, onChange, onSubmit, loading }) => {
    if (!show) return null

    return (
      <div className='cf-gestion-bonos-modal-overlay'>
        <div className='cf-gestion-bonos-modal'>
          <div className='cf-gestion-bonos-modal-header'>
            <h2>Asignar Nuevo Bono</h2>
            <button
              className='cf-gestion-bonos-modal-close'
              onClick={onClose}
              type='button'
            >
              &times;
            </button>
          </div>

          <form onSubmit={onSubmit}>
            <div className='cf-gestion-bonos-form-group'>
              <label htmlFor='tipo'>Tipo de Bono</label>
              <select
                id='tipo'
                name='tipo'
                value={nuevoBonoForm.tipo}
                onChange={onChange}
                required
              >
                {OPCIONES_BONOS.map((opcion) => (
                  <option key={opcion.value} value={opcion.value}>
                    {opcion.label}
                  </option>
                ))}
              </select>
            </div>

            <div className='cf-gestion-bonos-form-group'>
              <label htmlFor='sesionesTotal'>Número de Sesiones</label>
              <input
                type='number'
                id='sesionesTotal'
                name='sesionesTotal'
                value={nuevoBonoForm.sesionesTotal}
                onChange={onChange}
                min='1'
                required
              />
            </div>

            <div className='cf-gestion-bonos-form-group'>
              <label htmlFor='precio'>Precio (€)</label>
              <input
                type='number'
                id='precio'
                name='precio'
                value={nuevoBonoForm.precio}
                onChange={onChange}
                min='0'
                required
              />
            </div>

            <div className='cf-gestion-bonos-form-group'>
              <label htmlFor='duracionMeses'>Duración (meses)</label>
              <input
                type='number'
                id='duracionMeses'
                name='duracionMeses'
                value={nuevoBonoForm.duracionMeses}
                onChange={onChange}
                min='1'
                required
              />
            </div>

            <div className='cf-gestion-bonos-form-actions'>
              <Button type='button' variant='secondary' onClick={onClose}>
                Cancelar
              </Button>
              <Button type='submit' variant='primary' disabled={loading}>
                {loading ? 'Creando...' : 'Crear Bono'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
)

NuevoBonoModal.displayName = 'NuevoBonoModal'

export default NuevoBonoModal
