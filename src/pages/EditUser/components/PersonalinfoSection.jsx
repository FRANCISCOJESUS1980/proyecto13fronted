import { memo } from 'react'
import InputField from './InputField'

const PersonalInfoSection = memo(({ user, onChange }) => {
  return (
    <>
      <InputField
        icon='user'
        type='text'
        name='nombre'
        value={user.nombre || ''}
        onChange={onChange}
        placeholder='Nombre'
        required
      />

      <InputField
        icon='email'
        type='email'
        name='email'
        value={user.email || ''}
        onChange={onChange}
        placeholder='Email'
        required
      />

      <InputField
        icon='phone'
        type='text'
        name='telefono'
        value={user.telefono || ''}
        onChange={onChange}
        placeholder='Teléfono'
      />
    </>
  )
})

PersonalInfoSection.displayName = 'PersonalInfoSection'

export default PersonalInfoSection
