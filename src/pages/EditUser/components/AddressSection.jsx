import { memo } from 'react'
import InputField from './InputField'

const AddressSection = memo(({ user, onAddressChange }) => {
  return (
    <>
      <h3 className='cf-edit-user-section-title'>Dirección</h3>

      <InputField
        icon='address'
        type='text'
        name='calle'
        value={user.direccion?.calle || ''}
        onChange={onAddressChange}
        placeholder='Calle'
      />

      <InputField
        icon='city'
        type='text'
        name='ciudad'
        value={user.direccion?.ciudad || ''}
        onChange={onAddressChange}
        placeholder='Ciudad'
      />

      <InputField
        icon='postal'
        type='text'
        name='codigoPostal'
        value={user.direccion?.codigoPostal || ''}
        onChange={onAddressChange}
        placeholder='Código Postal'
      />

      <InputField
        icon='country'
        type='text'
        name='pais'
        value={user.direccion?.pais || ''}
        onChange={onAddressChange}
        placeholder='País'
      />
    </>
  )
})

AddressSection.displayName = 'AddressSection'

export default AddressSection
