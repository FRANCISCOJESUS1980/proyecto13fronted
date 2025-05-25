import { memo } from 'react'
import PersonalInfoSection from './PersonalinfoSection'
import AddressSection from './AddressSection'
import FormActions from './FormActions'

const UserForm = memo(
  ({ user, isSubmitting, onChange, onAddressChange, onCancel }) => {
    return (
      <div className='cf-edit-user-input-wrapper'>
        <PersonalInfoSection user={user} onChange={onChange} />
        <AddressSection user={user} onAddressChange={onAddressChange} />
        <FormActions isSubmitting={isSubmitting} onCancel={onCancel} />
      </div>
    )
  }
)

UserForm.displayName = 'UserForm'

export default UserForm
