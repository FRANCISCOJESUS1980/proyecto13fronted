import { memo } from 'react'
import { FIELD_CONFIG, REQUIRED_FIELDS } from '../../constants/medicalConfig'

const MedicalField = memo(({ fieldName, value, onChange }) => {
  const config = FIELD_CONFIG[fieldName]
  const isRequired = REQUIRED_FIELDS.includes(fieldName)

  if (!config) return null

  const { label, type, icon, placeholder, options, fullWidth } = config

  const fieldClassName = fullWidth
    ? 'cf-medico-input-field cf-medico-full-width'
    : 'cf-medico-input-field'

  const renderInput = () => {
    const commonProps = {
      id: fieldName,
      name: fieldName,
      value,
      onChange,
      required: isRequired,
      placeholder,
      className:
        type === 'textarea'
          ? 'cf-medico-textarea'
          : type === 'select'
          ? 'cf-medico-select-input'
          : 'cf-medico-text-input'
    }

    switch (type) {
      case 'select':
        return (
          <select {...commonProps}>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      case 'textarea':
        return <textarea {...commonProps} />
      default:
        return <input {...commonProps} type={type} />
    }
  }

  return (
    <div className={fieldClassName}>
      <span className={`cf-medico-input-icon ${icon}`}></span>
      <label htmlFor={fieldName}>
        {label}
        {isRequired && <span className='cf-medico-required-asterisk'> *</span>}
      </label>
      {renderInput()}
    </div>
  )
})

MedicalField.displayName = 'MedicalField'

export default MedicalField
