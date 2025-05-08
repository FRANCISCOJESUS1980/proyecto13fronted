import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import alertService from '../../../../../../../components/sweealert2/sweealert2'
import './PersonalRecordForm.css'

const CATEGORIAS = [
  'Levantamiento Olímpico',
  'Levantamiento de Potencia',
  'Gimnástico',
  'Cardio',
  'Otro'
]

const EJERCICIOS_COMUNES = [
  'Sentadilla (Back Squat)',
  'Press de Banca',
  'Peso Muerto',
  'Clean & Jerk',
  'Snatch',
  'Overhead Squat',
  'Front Squat',
  'Thruster',
  'Pull-up',
  'Muscle-up'
]

const PersonalRecordForm = ({
  record,
  onSubmit,
  onCancel,
  isEditing = false
}) => {
  const [formData, setFormData] = useState({
    ejercicio: '',
    peso: '',
    repeticiones: '1',
    fecha: new Date().toISOString().split('T')[0],
    categoria: 'Levantamiento de Potencia'
  })
  const [errors, setErrors] = useState({})
  const [customExercise, setCustomExercise] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const originalDataRef = useRef(null)
  const formRef = useRef(null)
  const cancelBtnRef = useRef(null)

  useEffect(() => {
    window.personalRecordHasUnsavedChanges = false

    return () => {
      window.personalRecordHasUnsavedChanges = false
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (record) {
      const recordData = {
        ejercicio: record.ejercicio || '',
        peso: record.peso || '',
        repeticiones: record.repeticiones || '1',
        fecha: record.fecha
          ? new Date(record.fecha).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        categoria: record.categoria || 'Levantamiento de Potencia'
      }

      setFormData(recordData)
      setCustomExercise(!EJERCICIOS_COMUNES.includes(record.ejercicio))

      originalDataRef.current = JSON.stringify(recordData)
      window.personalRecordHasUnsavedChanges = false
    } else {
      originalDataRef.current = JSON.stringify(formData)
    }
  }, [record])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      })
    }

    const updatedData = {
      ...formData,
      [name]: value
    }
    const currentData = JSON.stringify(updatedData)
    window.personalRecordHasUnsavedChanges =
      originalDataRef.current !== currentData
  }

  const handleExerciseChange = (e) => {
    const value = e.target.value

    if (value === 'custom') {
      setCustomExercise(true)
      setFormData({
        ...formData,
        ejercicio: ''
      })
    } else {
      setCustomExercise(false)
      setFormData({
        ...formData,
        ejercicio: value
      })
    }

    const updatedData = {
      ...formData,
      ejercicio: value === 'custom' ? '' : value
    }
    const currentData = JSON.stringify(updatedData)
    window.personalRecordHasUnsavedChanges =
      originalDataRef.current !== currentData
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.ejercicio.trim()) {
      newErrors.ejercicio = 'El ejercicio es obligatorio'
    }

    if (!formData.peso.trim()) {
      newErrors.peso = 'El peso es obligatorio'
    } else if (isNaN(formData.peso) || Number.parseFloat(formData.peso) <= 0) {
      newErrors.peso = 'El peso debe ser un número positivo'
    }

    if (
      formData.repeticiones &&
      (isNaN(formData.repeticiones) ||
        Number.parseInt(formData.repeticiones) <= 0)
    ) {
      newErrors.repeticiones = 'Las repeticiones deben ser un número positivo'
    }

    if (!formData.fecha) {
      newErrors.fecha = 'La fecha es obligatoria'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      window.personalRecordHasUnsavedChanges = false
      onSubmit(formData)
    } else {
      alertService.error(
        'Error de validación',
        'Por favor, corrige los errores en el formulario'
      )
    }
  }

  const handleCancelClick = () => {
    if (window.personalRecordHasUnsavedChanges) {
      alertService.clearAlerts()

      alertService
        .confirm(
          '¿Estás seguro?',
          'Tienes cambios sin guardar. ¿Deseas salir sin guardar?',
          {
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'No, continuar editando',
            allowOutsideClick: false,

            customClass: {
              container: 'swal2-container-top-layer',
              popup: 'swal2-popup-top-layer'
            },

            target: document.body
          }
        )
        .then((result) => {
          if (result.isConfirmed) {
            window.personalRecordHasUnsavedChanges = false
            onCancel()
          } else {
            if (cancelBtnRef.current) {
              setTimeout(() => {
                cancelBtnRef.current.focus()
              }, 100)
            }
          }
        })
    } else {
      onCancel()
    }
  }

  const getCategoryIcon = (categoria) => {
    switch (categoria) {
      case 'Levantamiento Olímpico':
        return <span className='cf-pr-category-icon cf-pr-olympic-icon'></span>
      case 'Levantamiento de Potencia':
        return (
          <span className='cf-pr-category-icon cf-pr-powerlifting-icon'></span>
        )
      case 'Gimnástico':
        return (
          <span className='cf-pr-category-icon cf-pr-gymnastic-icon'></span>
        )
      case 'Cardio':
        return <span className='cf-pr-category-icon cf-pr-cardio-icon'></span>
      default:
        return <span className='cf-pr-category-icon cf-pr-other-icon'></span>
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleCancelClick()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

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
        <div className='cf-pr-header'>
          <div className='cf-pr-title-container'>
            <div className='cf-pr-form-icon'></div>
            <h3 className='cf-pr-title'>
              {isEditing ? 'Editar Marca Personal' : 'Nueva Marca Personal'}
            </h3>
          </div>
          <button
            type='button'
            className='cf-pr-close-btn'
            onClick={handleCancelClick}
            aria-label='Cerrar formulario'
          >
            <span className='cf-pr-close-icon'></span>
          </button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className='cf-pr-form'>
          <div className='cf-pr-form-group'>
            <label htmlFor='ejercicio-select' className='cf-pr-label'>
              <span className='cf-pr-label-icon cf-pr-exercise-icon'></span>
              Ejercicio
            </label>
            <div className='cf-pr-input-container'>
              {!customExercise ? (
                <div className='cf-pr-select-wrapper'>
                  <select
                    id='ejercicio-select'
                    value={formData.ejercicio}
                    onChange={handleExerciseChange}
                    className={`cf-pr-select ${
                      errors.ejercicio ? 'cf-pr-error' : ''
                    }`}
                  >
                    <option value=''>Selecciona un ejercicio</option>
                    {EJERCICIOS_COMUNES.map((ejercicio) => (
                      <option key={ejercicio} value={ejercicio}>
                        {ejercicio}
                      </option>
                    ))}
                    <option value='custom'>Otro (personalizado)</option>
                  </select>
                  <span className='cf-pr-select-arrow'></span>
                </div>
              ) : (
                <input
                  type='text'
                  id='ejercicio'
                  name='ejercicio'
                  value={formData.ejercicio}
                  onChange={handleChange}
                  placeholder='Escribe el nombre del ejercicio'
                  className={`cf-pr-input ${
                    errors.ejercicio ? 'cf-pr-error' : ''
                  }`}
                />
              )}
              {customExercise && (
                <button
                  type='button'
                  className='cf-pr-select-list-btn'
                  onClick={() => setCustomExercise(false)}
                >
                  <span className='cf-pr-list-icon'></span>
                  Seleccionar de la lista
                </button>
              )}
            </div>
            {errors.ejercicio && (
              <span className='cf-pr-error-message'>
                <span className='cf-pr-error-icon'></span>
                {errors.ejercicio}
              </span>
            )}
          </div>

          <div className='cf-pr-form-row'>
            <div className='cf-pr-form-group'>
              <label htmlFor='peso' className='cf-pr-label'>
                <span className='cf-pr-label-icon cf-pr-weight-icon'></span>
                Peso (kg)
              </label>
              <div className='cf-pr-input-wrapper'>
                <input
                  type='number'
                  id='peso'
                  name='peso'
                  value={formData.peso}
                  onChange={handleChange}
                  min='0'
                  step='0.5'
                  className={`cf-pr-input ${errors.peso ? 'cf-pr-error' : ''}`}
                />
                <span className='cf-pr-input-unit'>kg</span>
              </div>
              {errors.peso && (
                <span className='cf-pr-error-message'>
                  <span className='cf-pr-error-icon'></span>
                  {errors.peso}
                </span>
              )}
            </div>

            <div className='cf-pr-form-group'>
              <label htmlFor='repeticiones' className='cf-pr-label'>
                <span className='cf-pr-label-icon cf-pr-reps-icon'></span>
                Repeticiones
              </label>
              <input
                type='number'
                id='repeticiones'
                name='repeticiones'
                value={formData.repeticiones}
                onChange={handleChange}
                min='1'
                className={`cf-pr-input ${
                  errors.repeticiones ? 'cf-pr-error' : ''
                }`}
              />
              {errors.repeticiones && (
                <span className='cf-pr-error-message'>
                  <span className='cf-pr-error-icon'></span>
                  {errors.repeticiones}
                </span>
              )}
            </div>
          </div>

          <div className='cf-pr-form-group'>
            <label htmlFor='categoria' className='cf-pr-label'>
              <span className='cf-pr-label-icon cf-pr-category-label-icon'></span>
              Categoría
            </label>
            <div className='cf-pr-select-wrapper'>
              <select
                id='categoria'
                name='categoria'
                value={formData.categoria}
                onChange={handleChange}
                className='cf-pr-select'
              >
                {CATEGORIAS.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
              <span className='cf-pr-select-arrow'></span>
            </div>
            <div className='cf-pr-category-preview'>
              {getCategoryIcon(formData.categoria)}
              <span className='cf-pr-category-name'>{formData.categoria}</span>
            </div>
          </div>

          <div className='cf-pr-form-group'>
            <label htmlFor='fecha' className='cf-pr-label'>
              <span className='cf-pr-label-icon cf-pr-date-icon'></span>
              Fecha
            </label>
            <input
              type='date'
              id='fecha'
              name='fecha'
              value={formData.fecha}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              className={`cf-pr-input cf-pr-date-input ${
                errors.fecha ? 'cf-pr-error' : ''
              }`}
            />
            {errors.fecha && (
              <span className='cf-pr-error-message'>
                <span className='cf-pr-error-icon'></span>
                {errors.fecha}
              </span>
            )}
          </div>

          <div className='cf-pr-form-actions'>
            <button
              type='button'
              onClick={handleCancelClick}
              className='cf-pr-cancel-btn'
              ref={cancelBtnRef}
            >
              <span className='cf-pr-cancel-icon'></span>
              Cancelar
            </button>
            <button type='submit' className='cf-pr-submit-btn'>
              <span
                className={`cf-pr-submit-icon ${
                  isEditing ? 'cf-pr-edit-icon' : 'cf-pr-save-icon'
                }`}
              ></span>
              {isEditing ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
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
