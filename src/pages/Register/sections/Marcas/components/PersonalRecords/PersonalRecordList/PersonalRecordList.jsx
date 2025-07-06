import { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useUI } from '../../../hooks/useUI.jsx'
import RecordCard from '../../RecordCard.jsx'
import RecordDetailsModal from '../../RecordDetailsModal.jsx'
import './PersonalRecordList.css'

const PersonalRecordsList = memo(({ records, onDelete, onEdit }) => {
  const { viewDetails, setViewDetails } = useUI()

  const handleViewDetails = useCallback(
    (record) => {
      const recordCopy = {
        _id: record._id,
        ejercicio: record.ejercicio,
        categoria: record.categoria,
        peso: record.peso,
        repeticiones: record.repeticiones || '1',
        fecha: record.fecha
      }
      setViewDetails(recordCopy)
    },
    [setViewDetails]
  )

  const handleCloseDetails = useCallback(() => {
    setViewDetails(null)
  }, [setViewDetails])

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
          <RecordCard
            key={record._id}
            record={record}
            onDelete={onDelete}
            onEdit={onEdit}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {viewDetails && (
        <RecordDetailsModal
          record={viewDetails}
          onClose={handleCloseDetails}
          onEdit={onEdit}
        />
      )}
    </>
  )
})

PersonalRecordsList.displayName = 'PersonalRecordsList'

PersonalRecordsList.propTypes = {
  records: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}

export default PersonalRecordsList
