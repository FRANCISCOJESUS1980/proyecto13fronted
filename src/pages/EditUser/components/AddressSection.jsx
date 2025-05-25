import { memo } from 'react'
import inputField from './inputField'

const AddressSection = memo(({ user, onAddressChange }) => {
  return (
    <>
      <h3 className='cf-edit-user-section-title'>Dirección</h3>

      <inputField
        icon='address'
        type='text'
        name='calle'
        value={user.direccion?.calle || ''}
        onChange={onAddressChange}
        placeholder='Calle'
      />

      <inputField
        icon='city'
        type='text'
        name='ciudad'
        value={user.direccion?.ciudad || ''}
        onChange={onAddressChange}
        placeholder='Ciudad'
      />

      <inputField
        icon='postal'
        type='text'
        name='codigoPostal'
        value={user.direccion?.codigoPostal || ''}
        onChange={onAddressChange}
        placeholder='Código Postal'
      />

      <inputField
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
