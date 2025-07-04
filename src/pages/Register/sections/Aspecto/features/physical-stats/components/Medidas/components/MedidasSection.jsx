import MedidasInput from './MedidasInput'

const MedidasSection = ({ section, formData, onChange }) => {
  return (
    <div className='cf-medidas-section'>
      <h3 className='cf-medidas-section-title'>
        <span className={`cf-medidas-section-icon ${section.iconClass}`}></span>
        {section.title}
      </h3>
      <div className='cf-medidas-fields'>
        {section.fields.map((field) => (
          <MedidasInput
            key={field.name}
            field={field}
            value={formData[field.name]}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  )
}

export default MedidasSection
