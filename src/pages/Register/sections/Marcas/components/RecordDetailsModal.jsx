import { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { getCategoryClass } from '../utils/recordsUtils.js'

const RecordDetailsModal = memo(({ record, onClose, onEdit }) => {
  const handleEdit = useCallback(() => {
    onEdit(record)
    onClose()
  }, [record, onEdit, onClose])

  return (
    <div className='cf-marcas-modal-overlay'>
      <div className='cf-marcas-modal'>
        <div className='cf-pr-overlay cf-pr-active'>
          <div className='cf-pr-container cf-pr-slide-in'>
            <div className='cf-pr-header'>
              <div className='cf-pr-title-container'>
                <div className='cf-pr-form-icon'></div>
                <h3 className='cf-pr-title'>Detalles de la Marca Personal</h3>
              </div>
              <button
                type='button'
                className='cf-pr-close-btn'
                onClick={onClose}
                aria-label='Cerrar detalles'
              >
                <span className='cf-pr-close-icon'></span>
              </button>
            </div>

            <div className='cf-pr-form'>
              <div className='cf-pr-form-group'>
                <label className='cf-pr-label'>
                  <span className='cf-pr-label-icon cf-pr-exercise-icon'></span>
                  Ejercicio
                </label>
                <div className='cf-pr-input-container'>
                  <div className='cf-pr-details-value'>{record.ejercicio}</div>
                </div>
              </div>

              <div className='cf-pr-form-group'>
                <label className='cf-pr-label'>
                  <span className='cf-pr-label-icon cf-pr-category-label-icon'></span>
                  Categoría
                </label>
                <div className='cf-pr-category-preview'>
                  <span
                    className={`record-category ${getCategoryClass(
                      record.categoria
                    )}`}
                  >
                    {record.categoria}
                  </span>
                </div>
              </div>

              <div className='cf-pr-form-row'>
                <div className='cf-pr-form-group'>
                  <label className='cf-pr-label'>
                    <span className='cf-pr-label-icon cf-pr-weight-icon'></span>
                    Peso (kg)
                  </label>
                  <div className='cf-pr-input-wrapper'>
                    <div className='cf-pr-details-value'>{record.peso} kg</div>
                  </div>
                </div>
                <div className='cf-pr-form-group'>
                  <label className='cf-pr-label'>
                    <span className='cf-pr-label-icon cf-pr-reps-icon'></span>
                    Repeticiones
                  </label>
                  <div className='cf-pr-details-value'>
                    {record.repeticiones || '1'}
                  </div>
                </div>
              </div>

              <div className='cf-pr-form-group'>
                <label className='cf-pr-label'>
                  <span className='cf-pr-label-icon cf-pr-date-icon'></span>
                  Fecha
                </label>
                <div className='cf-pr-details-value'>
                  {new Date(record.fecha).toLocaleDateString()}
                </div>
              </div>

              <div className='cf-pr-form-actions'>
                <button
                  type='button'
                  onClick={onClose}
                  className='cf-pr-cancel-btn'
                >
                  <span className='cf-pr-cancel-icon'></span>
                  Cerrar
                </button>
                <button
                  type='button'
                  className='cf-pr-submit-btn'
                  onClick={handleEdit}
                >
                  <span className='cf-pr-edit-icon'></span>
                  Editar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

RecordDetailsModal.displayName = 'RecordDetailsModal'

RecordDetailsModal.propTypes = {
  record: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}

export default RecordDetailsModal
