const MedidasInput = ({ field, value, onChange }) => {
  return (
    <div className='cf-medidas-form-group'>
      <label htmlFor={field.name}>
        <span className={`cf-medidas-field-icon ${field.iconClass}`}></span>
        {field.label}
      </label>
      <input
        type='number'
        id={field.name}
        name={field.name}
        value={value}
        onChange={onChange}
        placeholder={field.placeholder}
        step={field.step || '1'}
        className='cf-medidas-input'
      />
    </div>
  )
}

export default MedidasInput
