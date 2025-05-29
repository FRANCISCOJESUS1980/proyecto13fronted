import { memo } from 'react'
import MedicalField from './MedicalField'

const MedicalSection = memo(({ section, medicalInfo, handleChange }) => {
  const { title, icon, fields } = section

  return (
    <div className='cf-medico-section'>
      <h2 className='cf-medico-section-title'>
        <span className={`cf-medico-section-icon ${icon}`}></span>
        {title}
      </h2>
      <div className='cf-medico-grid'>
        {fields.map((fieldName) => (
          <MedicalField
            key={fieldName}
            fieldName={fieldName}
            value={medicalInfo[fieldName]}
            onChange={handleChange}
          />
        ))}
      </div>
    </div>
  )
})

MedicalSection.displayName = 'MedicalSection'

export default MedicalSection
