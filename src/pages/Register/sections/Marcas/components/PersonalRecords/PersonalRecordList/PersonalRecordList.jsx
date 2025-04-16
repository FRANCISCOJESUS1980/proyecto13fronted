import { useState } from 'react'
import PropTypes from 'prop-types'
import './PersonalRecordList.css'

const PersonalRecordsList = ({ records, onDelete, onEdit }) => {
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [viewDetails, setViewDetails] = useState(null)

  const getCategoryClass = (category) => {
    const classes = {
      'Levantamiento Olímpico': 'category-olympic',
      'Levantamiento de Potencia': 'category-power',
      Gimnástico: 'category-gymnastic',
      Cardio: 'category-cardio',
      Otro: 'category-other'
    }
    return classes[category] || 'category-other'
  }

  const handleDelete = (id) => {
    setConfirmDelete(null)
    onDelete(id)
  }

  const handleViewDetails = (record) => {
    const recordCopy = {
      _id: record._id,
      ejercicio: record.ejercicio,
      categoria: record.categoria,
      peso: record.peso,
      repeticiones: record.repeticiones || '1',
      fecha: record.fecha
    }
    setViewDetails(recordCopy)
  }

  if (records.length === 0) {
    return (
      <div className='no-records'>
        <div className='no-records-icon'>🏋️‍♂️</div>
        <h3>No hay marcas personales registradas aún</h3>
        <p>
          Comienza a registrar tus logros para hacer seguimiento de tu progreso.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className='records-list'>
        {records.map((record) => (
          <div key={record._id} className='record-card'>
            <div className='record-info'>
              <div className='record-header'>
                <h3>{record.ejercicio}</h3>
                <span
                  className={`record-category ${getCategoryClass(
                    record.categoria
                  )}`}
                >
                  {record.categoria}
                </span>
              </div>
              <p className='record-details'>
                <span className='record-weight'>{record.peso}kg</span>
                {record.repeticiones && record.repeticiones !== '1' && (
                  <span className='record-reps'>
                    x {record.repeticiones} rep
                  </span>
                )}
                <span className='record-date'>
                  {new Date(record.fecha).toLocaleDateString()}
                </span>
              </p>
            </div>
            <div className='record-actions'>
              <button
                className='view-btn'
                onClick={() => handleViewDetails(record)}
                title='Ver detalles'
              >
                👁️
              </button>
              <button
                className='edit-btn'
                onClick={() => onEdit(record)}
                title='Editar'
              >
                ✏️
              </button>
              <button
                className='delete-btn'
                onClick={() => setConfirmDelete(record._id)}
                title='Eliminar'
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      {confirmDelete && (
        <div className='confirm-modal-overlay'>
          <div className='confirm-modal'>
            <h4>Confirmar eliminación</h4>
            <p>
              ¿Estás seguro de que quieres eliminar esta marca personal? Esta
              acción no se puede deshacer.
            </p>
            <div className='confirm-actions'>
              <button
                className='cancel-btn'
                onClick={() => setConfirmDelete(null)}
              >
                Cancelar
              </button>
              <button
                className='delete-confirm-btn'
                onClick={() => handleDelete(confirmDelete)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {viewDetails && (
        <div className='cf-marcas-modal-overlay'>
          <div className='cf-marcas-modal'>
            <div className='cf-pr-overlay cf-pr-active'>
              <div className='cf-pr-container cf-pr-slide-in'>
                <div className='cf-pr-header'>
                  <div className='cf-pr-title-container'>
                    <div className='cf-pr-form-icon'></div>
                    <h3 className='cf-pr-title'>
                      Detalles de la Marca Personal
                    </h3>
                  </div>
                  <button
                    type='button'
                    className='cf-pr-close-btn'
                    onClick={() => setViewDetails(null)}
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
                      <div className='cf-pr-details-value'>
                        {viewDetails.ejercicio}
                      </div>
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
                          viewDetails.categoria
                        )}`}
                      >
                        {viewDetails.categoria}
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
                        <div className='cf-pr-details-value'>
                          {viewDetails.peso} kg
                        </div>
                      </div>
                    </div>

                    <div className='cf-pr-form-group'>
                      <label className='cf-pr-label'>
                        <span className='cf-pr-label-icon cf-pr-reps-icon'></span>
                        Repeticiones
                      </label>
                      <div className='cf-pr-details-value'>
                        {viewDetails.repeticiones || '1'}
                      </div>
                    </div>
                  </div>

                  <div className='cf-pr-form-group'>
                    <label className='cf-pr-label'>
                      <span className='cf-pr-label-icon cf-pr-date-icon'></span>
                      Fecha
                    </label>
                    <div className='cf-pr-details-value'>
                      {new Date(viewDetails.fecha).toLocaleDateString()}
                    </div>
                  </div>

                  <div className='cf-pr-form-actions'>
                    <button
                      type='button'
                      onClick={() => setViewDetails(null)}
                      className='cf-pr-cancel-btn'
                    >
                      <span className='cf-pr-cancel-icon'></span>
                      Cerrar
                    </button>
                    <button
                      type='button'
                      className='cf-pr-submit-btn'
                      onClick={() => {
                        onEdit(viewDetails)
                        setViewDetails(null)
                      }}
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
      )}
    </>
  )
}

PersonalRecordsList.propTypes = {
  records: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}

export default PersonalRecordsList
