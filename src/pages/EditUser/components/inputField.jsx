import { memo } from 'react'

const InputField = memo(
  ({ icon, type, name, value, onChange, placeholder, required = false }) => {
    return (
      <div className='cf-edit-user-input-field'>
        <span
          className={`cf-edit-user-input-icon cf-edit-user-${icon}-icon`}
        ></span>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className='cf-edit-user-text-input'
        />
      </div>
    )
  }
)

InputField.displayName = 'InputField'

export default InputField
