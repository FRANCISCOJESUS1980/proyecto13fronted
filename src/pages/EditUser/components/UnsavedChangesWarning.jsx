import { memo } from 'react'

const UnsavedChangesWarning = memo(({ hasUnsavedChanges }) => {
  if (!hasUnsavedChanges) return null

  return (
    <div className='cf-edit-user-unsaved-changes'>
      <span className='cf-edit-user-warning-icon'></span>
      Tienes cambios sin guardar
    </div>
  )
})

UnsavedChangesWarning.displayName = 'UnsavedChangesWarning'

export default UnsavedChangesWarning
