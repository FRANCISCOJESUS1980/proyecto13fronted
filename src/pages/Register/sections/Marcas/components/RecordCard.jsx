import { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { getCategoryClass } from '../utils/recordsUtils.js'
import alertService from '../../../../../components/sweealert2/sweealert2'

const RecordCard = memo(({ record, onDelete, onEdit, onViewDetails }) => {
  const handleDeleteClick = useCallback(() => {
    alertService.clearAlerts()
    alertService
      .confirm(
        '¿Estás seguro?',
        `La marca personal de "${record.ejercicio}" será eliminada permanentemente.`,
        {
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          reverseButtons: true,
          customClass: {
            container: 'swal2-container-top-layer',
            popup: 'swal2-popup-top-layer'
          },
          target: document.body
        }
      )
      .then((result) => {
        if (result.isConfirmed) {
          onDelete(record._id)
        }
      })
  }, [record._id, record.ejercicio, onDelete])

  const handleEdit = useCallback(() => {
    onEdit(record)
  }, [record, onEdit])

  const handleViewDetails = useCallback(() => {
    onViewDetails(record)
  }, [record, onViewDetails])

  return (
    <div className='record-card'>
      <div className='record-info'>
        <div className='record-header'>
          <h3>{record.ejercicio}</h3>
          <span
            className={`record-category ${getCategoryClass(record.categoria)}`}
          >
            {record.categoria}
          </span>
        </div>
        <p className='record-details'>
          <span className='record-weight'>{record.peso}kg</span>
          {record.repeticiones && record.repeticiones !== '1' && (
            <span className='record-reps'>x {record.repeticiones} rep</span>
          )}
          <span className='record-date'>
            {new Date(record.fecha).toLocaleDateString()}
          </span>
        </p>
      </div>
      <div className='record-actions'>
        <button
          className='view-btn'
          onClick={handleViewDetails}
          title='Ver detalles'
        >
          👁️
        </button>
        <button className='edit-btn' onClick={handleEdit} title='Editar'>
          ✏️
        </button>
        <button
          className='delete-btn'
          onClick={handleDeleteClick}
          title='Eliminar'
        >
          ×
        </button>
      </div>
    </div>
  )
})

RecordCard.displayName = 'RecordCard'

RecordCard.propTypes = {
  record: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired
}

export default RecordCard
