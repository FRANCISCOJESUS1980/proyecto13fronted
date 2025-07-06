import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { usePersonalRecordForm } from '../../../hooks/usePersonalRecordForm.jsx'
import FormHeader from '../../FormHeader.jsx'
import ExerciseField from '../../ExerciseField.jsx'
import WeightRepsFields from '../../WeightRepsFields.jsx'
import CategoryField from '../../CategoryField.jsx'
import DateField from '../../DateField.jsx'
import FormActions from '../../FormActions.jsx'
import './PersonalRecordForm.css'

const PersonalRecordForm = ({
  record,
  onSubmit,
  onCancel,
  isEditing = false
}) => {
  const [animationComplete, setAnimationComplete] = useState(false)

  const {
    formData,
    errors,
    customExercise,
    handleChange,
    handleExerciseChange,
    handleSubmit,
    handleCancel
  } = usePersonalRecordForm(record, onSubmit, onCancel, isEditing)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleCancel()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleCancel])

  return (
    <div
      className={`cf-pr-overlay ${animationComplete ? 'cf-pr-active' : ''}`}
      tabIndex='-1'
    >
      <div
        className={`cf-pr-container ${
          animationComplete ? 'cf-pr-slide-in' : ''
        }`}
      >
        <FormHeader isEditing={isEditing} onCancel={handleCancel} />

        <form onSubmit={handleSubmit} className='cf-pr-form'>
          <ExerciseField
            value={formData.ejercicio}
            customExercise={customExercise}
            error={errors.ejercicio}
            onChange={handleExerciseChange}
            onToggleCustom={(value) =>
              handleChange('ejercicio', value ? '' : formData.ejercicio)
            }
          />

          <WeightRepsFields
            peso={formData.peso}
            repeticiones={formData.repeticiones}
            pesoError={errors.peso}
            repeticionesError={errors.repeticiones}
            onChange={handleChange}
          />

          <CategoryField value={formData.categoria} onChange={handleChange} />

          <DateField
            value={formData.fecha}
            error={errors.fecha}
            onChange={handleChange}
          />

          <FormActions
            isEditing={isEditing}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        </form>
      </div>
    </div>
  )
}

PersonalRecordForm.propTypes = {
  record: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isEditing: PropTypes.bool
}

export default PersonalRecordForm
